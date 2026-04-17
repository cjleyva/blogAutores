<template>
    <div>
        <nav class="barra-navegacion">
            <div class="contenedor">
                <Link href="/" class="logo">
                    <i class="fas fa-pen-fancy"></i> Blog Autores
                </Link>

                <div class="menu">
                    <Link v-if="!esAdmin" href="/admin" class="enlace">
                        <i class="fas fa-chalkboard-user"></i>
                        <span>Admin</span>
                    </Link>

                    <Link v-if="esAdmin" href="/" class="enlace-inicio">
                        <i class="fas fa-arrow-left"></i>
                        <span>Inicio</span>
                    </Link>

                    <button @click="abrirModal" class="boton-inspiracion">
                        <i class="fas fa-lightbulb"></i>
                        <span>Ideas</span>
                    </button>
                </div>
            </div>
        </nav>

        <main>
            <slot />
        </main>

        <footer class="pie-pagina">
            <div class="contenedor">
                <p><i class="fas fa-heart"></i> 2026 Blog Autores - Creado para compartir ideas</p>
            </div>
        </footer>

        <!-- Modal -->
        <div v-if="modalVisible" class="modal" @click.self="cerrarModal">
            <div class="contenido-modal">
                <button class="cerrar" @click="cerrarModal">
                    <i class="fas fa-times"></i>
                </button>
                <h2><i class="fas fa-lightbulb"></i> Ideas de la comunidad</h2>

                <div v-if="cargando" class="cargando">
                    <i class="fas fa-spinner fa-spin"></i> Cargando ideas...
                </div>

                <div v-else class="grid-ideas">
                    <div v-for="idea in ideasExternas" :key="idea.id" class="tarjeta-idea">
                        <h3>{{ idea.titulo }}</h3>
                        <p>{{ truncarTexto(idea.contenido, 120) }}</p>
                        <small><i class="fas fa-database"></i> Comunidad creativa</small>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { Link, usePage } from '@inertiajs/vue3'
import { useApiExterna } from '../Composables/useApiExterna'
import { useFormateo } from '../Composables/useFormateo'
import './styles/Index.css'

const page = usePage()
const url = computed(() => page.url)
const esAdmin = computed(() => url.value === '/admin' || url.value?.startsWith('/admin/'))

const { datosExternos, cargando, obtenerPosts } = useApiExterna()
const { truncarTexto } = useFormateo()

const modalVisible = ref(false)
const ideasExternas = ref([])

const abrirModal = async () => {
    modalVisible.value = true
    await obtenerPosts(4)
    ideasExternas.value = datosExternos.value
}

const cerrarModal = () => {
    modalVisible.value = false
}
</script>
