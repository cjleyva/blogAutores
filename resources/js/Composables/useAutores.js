import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

export function useAutores() {
    const cargando = ref(false)
    const error = ref(null)

    const crearAutor = async (datos, onResultado) => {
        cargando.value = true
        error.value = null

        router.post('/admin/autores', datos, {
            onSuccess: () => {
                cargando.value = false
                if (onResultado) {
                    onResultado('Autor creado exitosamente', 'exito')
                }
            },
            onError: (errors) => {
                cargando.value = false
                let mensajeError = 'Error al crear autor'

                if (errors?.nombre) mensajeError = errors.nombre[0]
                else if (errors?.apellidos) mensajeError = errors.apellidos[0]

                error.value = mensajeError
                if (onResultado) {
                    onResultado(mensajeError, 'error')
                }
            }
        })
    }

    return {
        cargando,
        error,
        crearAutor
    }
}
