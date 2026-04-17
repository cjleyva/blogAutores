<template>
    <Transition name="slide">
        <div v-if="visible" :class="['notificacion', `notificacion-${tipo}`]">
            <div class="notificacion-contenido">
                <i :class="icono"></i>
                <span>{{ mensaje }}</span>
            </div>
            <button @click="cerrar" class="notificacion-cerrar">
                <i class="fas fa-times"></i>
            </button>
        </div>
    </Transition>
</template>

<script setup>
import { computed, watch } from 'vue'

const props = defineProps({
    visible: { type: Boolean, default: false },
    mensaje: { type: String, default: '' },
    tipo: { type: String, default: 'exito' },
    duracion: { type: Number, default: 3000 }
})

const emit = defineEmits(['cerrar'])

let timeout = null

const icono = computed(() => {
    const iconos = {
        exito: 'fas fa-check-circle',
        error: 'fas fa-times-circle',
        info: 'fas fa-info-circle'
    }
    return iconos[props.tipo] || iconos.info
})

const cerrar = () => {
    if (timeout) clearTimeout(timeout)
    emit('cerrar')
}

watch(() => props.visible, (nuevo) => {
    if (nuevo) {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            cerrar()
        }, props.duracion)
    }
})
</script>

<style scoped>
.notificacion {
    position: fixed;
    top: 80px;
    right: 20px;
    min-width: 280px;
    max-width: 400px;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1100;
    backdrop-filter: blur(10px);
    font-size: 0.875rem;
}

.notificacion-exito {
    background: #10b981;
    color: white;
}

.notificacion-error {
    background: #ef4444;
    color: white;
}

.notificacion-info {
    background: #3b82f6;
    color: white;
}

.notificacion-contenido {
    display: flex;
    align-items: center;
    gap: 10px;
    flex: 1;
}

.notificacion-contenido i {
    font-size: 1.1rem;
}

.notificacion-cerrar {
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    padding: 0 4px;
    font-size: 0.9rem;
    opacity: 0.7;
    transition: opacity 0.3s;
}

.notificacion-cerrar:hover {
    opacity: 1;
}

@media (max-width: 640px) {
    .notificacion {
        left: 10px;
        right: 10px;
        top: 70px;
        min-width: auto;
        max-width: none;
        width: calc(100% - 20px);
        padding: 0.6rem 0.8rem;
        font-size: 0.75rem;
        border-radius: 0.5rem;
    }
    .notificacion-contenido {
        gap: 8px;
    }
    .notificacion-contenido i {
        font-size: 1rem;
    }
    .notificacion-cerrar {
        padding: 0 3px;
        font-size: 0.8rem;
    }
}

@media (max-width: 480px) {
    .notificacion {
        top: 65px;
        padding: 0.5rem 0.7rem;
        font-size: 0.7rem;
    }
    .notificacion-contenido {
        gap: 6px;
    }
    .notificacion-contenido i {
        font-size: 0.9rem;
    }
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    transform: translateX(100%);
    opacity: 0;
}

.slide-leave-to {
    transform: translateX(100%);
    opacity: 0;
}
</style>
