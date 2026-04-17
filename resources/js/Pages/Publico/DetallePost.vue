<template>
    <Index>
        <div class="detalle-post">
            <div class="contenedor">
                <!-- Botón volver -->
                <Link href="/" class="boton-volver">
                    <i class="fas fa-arrow-left"></i>
                    Volver al inicio
                </Link>

                <!-- Contenido del post -->
                <article class="articulo-principal">
                    <!-- Cabecera -->
                    <header class="articulo-cabecera">
                        <h1>{{ post.titulo }}</h1>
                        <div class="articulo-meta">
                            <div class="autor-info">
                                <i class="fas fa-user-circle"></i>
                                <span>{{ post.autor?.nombre }} {{ post.autor?.apellidos || 'Anónimo' }}</span>
                            </div>
                            <div class="fecha-info">
                                <i class="fas fa-calendar"></i>
                                <span>{{ formatearFecha(post.created_at) }}</span>
                            </div>
                        </div>
                    </header>

                    <!-- Imagen -->
                    <div class="articulo-imagen">
                        <img :src="post.imagen" :alt="post.titulo">
                    </div>

                    <!-- Contenido -->
                    <div class="articulo-contenido">
                        {{ post.contenido }}
                    </div>
                </article>

                <!-- Posts relacionados (bonus) -->
                <div class="relacionados">
                    <h3><i class="fas fa-chart-line"></i> También te puede interesar</h3>
                    <div class="grid-relacionados">
                        <div v-for="relacionado in relacionados" :key="relacionado.id" class="tarjeta-relacionada">
                            <i class="fas fa-quote-right"></i>
                            <h4>{{ relacionado.titulo }}</h4>
                            <p>{{ truncarTexto(relacionado.contenido, 100) }}</p>
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
import { ref, onMounted } from 'vue'
import { useApiExterna } from '../../Composables/useApiExterna'
import { useFormateo } from '../../Composables/useFormateo'
import './styles/DetallePost.css'

const props = defineProps({
    post: {
        type: Object,
        required: true
    }
})

const { datosExternos, obtenerPosts } = useApiExterna()
const { formatearFecha, truncarTexto } = useFormateo()
const relacionados = ref([])

onMounted(async () => {
    await obtenerPosts(3)
    relacionados.value = datosExternos.value
})
</script>

<style src="./styles/DetallePost.css" scoped></style>
