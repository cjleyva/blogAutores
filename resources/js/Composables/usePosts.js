import { ref } from 'vue'
import { router } from '@inertiajs/vue3'

export function usePosts() {
    const cargando = ref(false)
    const error = ref(null)

    const crearPost = async (datos, onResultado) => {
        cargando.value = true
        error.value = null

        router.post('/admin/posts', datos, {
            onSuccess: () => {
                cargando.value = false
                if (onResultado) {
                    onResultado('Post publicado exitosamente', 'exito')
                }
            },
            onError: (errors) => {
                cargando.value = false
                let mensajeError = 'Error al crear post'
                if (errors?.titulo) mensajeError = errors.titulo[0]
                else if (errors?.contenido) mensajeError = errors.contenido[0]
                else if (errors?.imagen) mensajeError = errors.imagen[0]
                else if (errors?.autor_id) mensajeError = errors.autor_id[0]
                error.value = mensajeError
                if (onResultado) {
                    onResultado(mensajeError, 'error')
                }
            }
        })
    }

    const actualizarPost = async (id, datos, onResultado) => {
        cargando.value = true
        error.value = null

        router.put(`/admin/posts/${id}`, datos, {
            onSuccess: () => {
                cargando.value = false
                if (onResultado) {
                    onResultado('Post actualizado exitosamente', 'exito')
                }
            },
            onError: (errors) => {
                cargando.value = false
                const mensajeError = 'Error al actualizar post'
                error.value = mensajeError
                if (onResultado) {
                    onResultado(mensajeError, 'error')
                }
            }
        })
    }

    const eliminarPost = async (id, onResultado) => {
        if (!confirm('¿Eliminar este post?')) {
            return false
        }

        cargando.value = true
        error.value = null

        router.delete(`/admin/posts/${id}`, {
            onSuccess: () => {
                cargando.value = false
                if (onResultado) {
                    onResultado('Post eliminado exitosamente', 'exito')
                }
            },
            onError: (errors) => {
                cargando.value = false
                const mensajeError = 'Error al eliminar post'
                error.value = mensajeError
                if (onResultado) {
                    onResultado(mensajeError, 'error')
                }
            }
        })

        return true
    }

    return {
        cargando,
        error,
        crearPost,
        actualizarPost,
        eliminarPost
    }
}
