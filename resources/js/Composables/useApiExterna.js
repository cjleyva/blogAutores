import { ref } from 'vue'
import axios from 'axios'

export function useApiExterna() {
    const datosExternos = ref([])
    const cargando = ref(false)
    const error = ref(null)

    const imagenesDisponibles = [
        'https://picsum.photos/id/0/800/400',
        'https://picsum.photos/id/1/800/400',
        'https://picsum.photos/id/10/800/400',
        'https://picsum.photos/id/15/800/400',
        'https://picsum.photos/id/26/800/400',
        'https://picsum.photos/id/42/800/400',
        'https://picsum.photos/id/100/800/400',
    ]

    const obtenerImagenAleatoria = () => {
        return imagenesDisponibles[Math.floor(Math.random() * imagenesDisponibles.length)]
    }

    const obtenerPosts = async (limite = 4) => {
        cargando.value = true
        error.value = null

        // Timeout de 8 segundos
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error('Timeout')), 8000)
        })

        try {
            const apiPromise = axios.get('https://api.rss2json.com/v1/api.json', {
                params: {
                    rss_url: 'https://news.google.com/rss/topics/CAAqJggKIiBDQkFTRWdvSUwyMHZNRGRqTVhZU0FtVnVHZ0pWVXlnQVAB?hl=es-419&gl=ES&ceid=ES%3Aes-419'
                }
            })

            const respuesta = await Promise.race([apiPromise, timeoutPromise])

            datosExternos.value = (respuesta.data.items || []).slice(0, limite).map(item => ({
                id: Math.random(),
                titulo: (item.title || 'Noticia tecnologica').substring(0, 60),
                contenido: (item.description || item.content || '')
                    .replace(/<[^>]*>/g, '')
                    .replace(/\s+/g, ' ')
                    .substring(0, 120),
                imagen: obtenerImagenAleatoria(),
            }))
        } catch (err) {
            console.error('Error:', err)
            error.value = 'Error al cargar noticias'
            datosExternos.value = obtenerContenidoLocal(limite)
        } finally {
            cargando.value = false
        }
    }

    const obtenerContenidoLocal = (limite) => {
        const contenidos = [
            {
                titulo: 'IA transforma la tecnologia',
                contenido: 'Los avances en IA estan revolucionando la industria tecnologica con nuevas herramientas.'
            },
            {
                titulo: 'Energias renovables en auge',
                contenido: 'La energia solar y eolica alcanzan records de eficiencia a nivel mundial.'
            },
            {
                titulo: 'Computacion cuantica avanza',
                contenido: 'Google e IBM compiten por lograr la supremacia cuantica.'
            },
            {
                titulo: 'Tendencias tecnologicas 2024',
                contenido: 'Realidad aumentada, metaverso y cloud computing marcan el rumbo.'
            }
        ]
        return contenidos.slice(0, limite).map(item => ({
            id: Math.random(),
            titulo: item.titulo,
            contenido: item.contenido,
            imagen: obtenerImagenAleatoria(),
        }))
    }

    return {
        datosExternos,
        cargando,
        error,
        obtenerPosts,
        obtenerImagenAleatoria
    }
}
