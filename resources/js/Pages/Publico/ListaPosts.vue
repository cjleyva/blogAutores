<template>
    <Index>
        <div class="pagina-inicio">
            <!-- Hero Section -->
            <section class="hero">
                <div class="contenedor">
                    <h1 class="hero-titulo">Bienvenido a Blog Autores</h1>
                    <p class="hero-subtitulo">Descubre artículos, ideas y perspectivas únicas</p>
                    <div class="hero-stats">
                        <div class="stat">
                            <i class="fas fa-file-alt"></i>
                            <span>{{ posts?.length || 0 }} artículos</span>
                        </div>
                        <div class="stat">
                            <i class="fas fa-users"></i>
                            <span>{{ totalAutores }} autores</span>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Grid de posts -->
            <div class="contenedor">
                <div class="seccion-titulo">
                    <h2><i class="fas fa-newspaper"></i> Últimos artículos</h2>
                    <p>Lo más reciente de nuestra comunidad</p>
                </div>

                <div v-if="posts && posts.length > 0" class="grid-posts">
                    <article v-for="post in posts" :key="post.id" class="tarjeta-post">
                        <div class="tarjeta-imagen">
                            <img :src="post.imagen" :alt="post.titulo" loading="lazy">
                            <div class="tarjeta-categoria">
                                <i class="fas fa-tag"></i> Artículo
                            </div>
                        </div>
                        <div class="tarjeta-contenido">
                            <h3>{{ post.titulo }}</h3>
                            <p>{{ truncarTexto(post.contenido, 120) }}</p>
                            <div class="tarjeta-meta">
                                <span class="autor">
                                    <i class="fas fa-user-circle"></i>
                                    {{ post.autor?.nombre_completo || 'Anónimo' }}
                                </span>
                                <span class="fecha">
                                    <i class="fas fa-calendar"></i>
                                    {{ formatearFecha(post.created_at) }}
                                </span>
                            </div>
                            <Link :href="`/post/${post.id}`" class="boton-leer">
                                Leer artículo
                                <i class="fas fa-arrow-right"></i>
                            </Link>
                        </div>
                    </article>
                </div>

                <div v-else class="sin-posts">
                    <i class="fas fa-inbox"></i>
                    <p>No hay artículos aún</p>
                </div>

                <!-- Bonus: Inspiración externa -->
                <div class="seccion-bonus">
                    <h3><i class="fas fa-chart-line"></i> Inspiración para ti</h3>
                    <div class="grid-bonus">
                        <div v-for="idea in ideasExternas" :key="idea.id" class="tarjeta-bonus">
                            <i class="fas fa-quote-left"></i>
                            <h4>{{ idea.titulo }}</h4>
                            <p>{{ truncarTexto(idea.contenido, 100) }}</p>
                            <small><i class="fas fa-globe"></i> Comunidad creativa</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Index>
</template>

<script setup>
import Index from '../../Layouts/Index.vue'
import { Link } from '@inertiajs/vue3'
import { ref, computed, onMounted } from 'vue'
import { useApiExterna } from '../../Composables/useApiExterna'
import { useFormateo } from '../../Composables/useFormateo'
import './styles/ListaPosts.css'

const props = defineProps({
    posts: {
        type: Array,
        default: () => []
    }
})

const { datosExternos, obtenerPosts } = useApiExterna()
const { truncarTexto, formatearFecha } = useFormateo()
const ideasExternas = ref([])

const totalAutores = computed(() => {
    const autoresUnicos = new Set(props.posts?.map(p => p.autor?.id) || [])
    return autoresUnicos.size
})

onMounted(async () => {
    await obtenerPosts(3)
    ideasExternas.value = datosExternos.value
})
</script>

<style src="./styles/ListaPosts.css" scoped></style>
