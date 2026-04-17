import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

export function useFormularioAdmin(mostrarNotificacion, crearAutor, crearPost, actualizarPost, eliminarPost, obtenerImagenAleatoria, obtenerPosts, datosExternos) {
    const formAutor = ref({ nombre: '', apellidos: '' })
    const formPost = ref({ titulo: '', contenido: '', imagen: '', autor_id: '' })
    const ideas = ref([])
    const cargandoIdeas = ref(false)

    const onAutorResultado = (mensaje, tipo) => {
        mostrarNotificacion(mensaje, tipo)
        if (tipo === 'exito') {
            formAutor.value = { nombre: '', apellidos: '' }
            router.reload({ only: ['autores'] })
        }
    }

    const onPostResultado = (mensaje, tipo) => {
        mostrarNotificacion(mensaje, tipo)
        if (tipo === 'exito') {
            formPost.value = { titulo: '', contenido: '', imagen: '', autor_id: '' }
            router.reload({ only: ['posts'] })
        }
    }

    const guardarAutor = () => {
        if (!formAutor.value.nombre || !formAutor.value.apellidos) {
            mostrarNotificacion('Complete todos los campos', 'error')
            return
        }
        crearAutor(formAutor.value, onAutorResultado)
    }

    const generarImagenAleatoria = () => {
        formPost.value.imagen = obtenerImagenAleatoria()
        mostrarNotificacion('Imagen aleatoria generada', 'info')
    }

    const guardarPost = () => {
        if (!formPost.value.titulo || !formPost.value.contenido || !formPost.value.autor_id) {
            mostrarNotificacion('Complete todos los campos', 'error')
            return
        }
        if (!formPost.value.imagen) {
            formPost.value.imagen = obtenerImagenAleatoria()
        }
        crearPost(formPost.value, onPostResultado)
    }

    const editarPost = (post) => {
        const nuevoTitulo = prompt('Editar titulo:', post.titulo)
        if (nuevoTitulo && nuevoTitulo !== post.titulo) {
            actualizarPost(post.id, {
                titulo: nuevoTitulo,
                contenido: post.contenido,
                imagen: post.imagen,
                autor_id: post.autor_id
            }, (mensaje, tipo) => {
                mostrarNotificacion(mensaje, tipo)
                if (tipo === 'exito') {
                    router.reload({ only: ['posts'] })
                }
            })
        } else if (nuevoTitulo === '') {
            mostrarNotificacion('El titulo no puede estar vacio', 'error')
        }
    }

    const eliminarPostHandler = (id) => {
        eliminarPost(id, onPostResultado)
    }

    const cargarIdeas = async () => {
        cargandoIdeas.value = true
        await obtenerPosts(4)
        ideas.value = datosExternos.value
        mostrarNotificacion(
            ideas.value.length > 0 ? 'Noticias de tecnologia cargadas' : 'Error al cargar noticias',
            ideas.value.length > 0 ? 'exito' : 'error'
        )
        cargandoIdeas.value = false
    }

    const usarIdea = (idea) => {
        formPost.value.titulo = idea.titulo
        formPost.value.contenido = idea.contenido
        formPost.value.imagen = idea.imagen || obtenerImagenAleatoria()
        mostrarNotificacion('Idea cargada en el formulario', 'info')
    }

    return {
        formAutor,
        formPost,
        ideas,
        cargandoIdeas,
        guardarAutor,
        guardarPost,
        editarPost,
        eliminarPostHandler,
        generarImagenAleatoria,
        cargarIdeas,
        usarIdea
    }
}
