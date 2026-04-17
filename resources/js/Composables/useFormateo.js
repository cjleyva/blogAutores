export function useFormateo() {
    const formatearFecha = (fecha) => {
        if (!fecha) return 'Fecha no disponible'
        return new Date(fecha).toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    const formatearFechaCorta = (fecha) => {
        if (!fecha) return ''
        return new Date(fecha).toLocaleDateString('es-ES')
    }

    const truncarTexto = (texto, longitud = 100) => {
        if (!texto) return ''
        if (texto.length <= longitud) return texto
        return texto.substring(0, longitud) + '...'
    }

    const capitalizar = (texto) => {
        if (!texto) return ''
        return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase()
    }

    const slugify = (texto) => {
        if (!texto) return ''
        return texto
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '')
    }

    return {
        formatearFecha,
        formatearFechaCorta,
        truncarTexto,
        capitalizar,
        slugify
    }
}
