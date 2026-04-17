<template>
    <Index>
        <div class="panel-admin">
            <div class="contenedor">
                <h1><i class="fas fa-chalkboard-user"></i> Administrar Blog</h1>

                <div class="grid-panel">
                    <!-- Autores -->
                    <div class="tarjeta">
                        <h2><i class="fas fa-users"></i> Autores</h2>

                        <form @submit.prevent="guardarAutor" class="formulario-inline">
                            <input
                                v-model="formAutor.nombre"
                                type="text"
                                placeholder="Nombre"
                                required
                                :disabled="cargandoAutor"
                            >
                            <input
                                v-model="formAutor.apellidos"
                                type="text"
                                placeholder="Apellidos"
                                required
                                :disabled="cargandoAutor"
                            >
                            <button type="submit" :disabled="cargandoAutor">
                                <i v-if="cargandoAutor" class="fas fa-spinner fa-spin"></i>
                                <i v-else class="fas fa-plus"></i>
                                {{ cargandoAutor ? 'Guardando...' : 'Agregar' }}
                            </button>
                        </form>

                        <div class="lista">
                            <div v-for="autor in autores" :key="autor.id" class="item">
                                <span><i class="fas fa-user"></i> {{ autor.nombre }} {{ autor.apellidos }}</span>
                                <span class="badge">{{ autor.posts_count || 0 }} posts</span>
                            </div>
                        </div>
                    </div>

                    <!-- Nuevo Post -->
                    <div class="tarjeta">
                        <h2><i class="fas fa-pen-nib"></i> Nuevo Post</h2>

                        <form @submit.prevent="guardarPost" class="formulario-vertical">
                            <input
                                v-model="formPost.titulo"
                                type="text"
                                placeholder="Titulo"
                                required
                                :disabled="cargandoPost"
                            >
                            <textarea
                                v-model="formPost.contenido"
                                placeholder="Contenido"
                                rows="5"
                                required
                                :disabled="cargandoPost"
                            ></textarea>

                            <div class="campo-imagen">
                                <input
                                    v-model="formPost.imagen"
                                    type="url"
                                    placeholder="URL de la imagen"
                                    required
                                    :disabled="cargandoPost"
                                >
                                <button type="button" @click="generarImagenAleatoria" class="btn-imagen" :disabled="cargandoPost">
                                    <i class="fas fa-random"></i> Aleatoria
                                </button>
                            </div>

                            <select
                                v-model="formPost.autor_id"
                                required
                                :disabled="cargandoPost"
                            >
                                <option value="">Seleccionar autor</option>
                                <option v-for="autor in autores" :key="autor.id" :value="autor.id">
                                    {{ autor.nombre }} {{ autor.apellidos }}
                                </option>
                            </select>
                            <button type="submit" :disabled="cargandoPost">
                                <i v-if="cargandoPost" class="fas fa-spinner fa-spin"></i>
                                <i v-else class="fas fa-cloud-arrow-up"></i>
                                {{ cargandoPost ? 'Publicando...' : 'Publicar' }}
                            </button>
                        </form>
                    </div>

                    <!-- Lista de Posts -->
                    <div class="tarjeta ancho-completo">
                        <h2><i class="fas fa-table-list"></i> Posts Publicados</h2>

                        <div v-if="posts && posts.length > 0" class="lista-posts">
                            <div v-for="post in posts" :key="post.id" class="item-post">
                                <div class="info-post">
                                    <strong><i class="fas fa-file-alt"></i> {{ post.titulo }}</strong>
                                    <small><i class="fas fa-user"></i> {{ post.autor?.nombre }} {{ post.autor?.apellidos || 'Sin autor' }}</small>
                                    <small><i class="fas fa-calendar"></i> {{ formatearFechaCorta(post.created_at) }}</small>
                                </div>
                                <div class="acciones">
                                    <button @click="editarPost(post)" class="btn-editar" :disabled="cargandoPost">
                                        <i class="fas fa-pencil"></i> Editar
                                    </button>
                                    <button @click="eliminarPostHandler(post.id)" class="btn-eliminar" :disabled="cargandoPost">
                                        <i class="fas fa-trash"></i> Eliminar
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="sin-posts">
                            <p><i class="fas fa-info-circle"></i> No hay posts aun. Crea el primero!</p>
                        </div>
                    </div>
                </div>

                <!-- Api externa -->
                <div class="bonus">
                    <h3><i class="fas fa-lightbulb"></i> Ideas para posts</h3>
                    <button @click="cargarIdeas" class="btn-ideas" :disabled="cargandoIdeas">
                        <i v-if="cargandoIdeas" class="fas fa-spinner fa-spin"></i>
                        <i v-else class="fas fa-download"></i>
                        {{ cargandoIdeas ? 'Cargando...' : 'Cargar ideas' }}
                    </button>
                    <div v-if="ideas.length" class="grid-ideas">
                        <div v-for="idea in ideas" :key="idea.id" class="tarjeta-idea">
                            <h4>{{ idea.titulo }}</h4>
                            <p>{{ truncarTexto(idea.contenido, 100) }}</p>
                            <button @click="usarIdea(idea)" class="btn-usar">
                                <i class="fas fa-copy"></i> Usar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <Notificacion
            :visible="notificacionVisible"
            :mensaje="notificacionMensaje"
            :tipo="notificacionTipo"
            @cerrar="ocultarNotificacion"
        />
    </Index>
</template>

<script setup>
import Index from '../../Layouts/Index.vue'
import Notificacion from '../../Components/common/Notificacion.vue'
import { ref } from 'vue'
import { useFormateo } from '../../Composables/useFormateo'
import { useAutores } from '../../Composables/useAutores'
import { usePosts } from '../../Composables/usePosts'
import { useApiExterna } from '../../Composables/useApiExterna'
import { useFormularioAdmin } from '../../Composables/useFormularioAdmin'
import './styles/Administrar.css'

const props = defineProps({
    autores: { type: Array, default: () => [] },
    posts: { type: Array, default: () => [] }
})

const { formatearFechaCorta, truncarTexto } = useFormateo()
const { cargando: cargandoAutor, crearAutor } = useAutores()
const { cargando: cargandoPost, crearPost, actualizarPost, eliminarPost } = usePosts()
const { datosExternos, obtenerPosts, obtenerImagenAleatoria } = useApiExterna()

const notificacionVisible = ref(false)
const notificacionMensaje = ref('')
const notificacionTipo = ref('exito')
let timeoutId = null

const mostrarNotificacion = (mensaje, tipo = 'exito') => {
    if (timeoutId) clearTimeout(timeoutId)
    notificacionMensaje.value = mensaje
    notificacionTipo.value = tipo
    notificacionVisible.value = true
    timeoutId = setTimeout(() => {
        notificacionVisible.value = false
    }, 3000)
}

const ocultarNotificacion = () => {
    notificacionVisible.value = false
    if (timeoutId) clearTimeout(timeoutId)
}

const {
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
} = useFormularioAdmin(
    mostrarNotificacion,
    crearAutor,
    crearPost,
    actualizarPost,
    eliminarPost,
    obtenerImagenAleatoria,
    obtenerPosts,
    datosExternos
)
</script>
