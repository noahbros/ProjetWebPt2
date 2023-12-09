<!-- Noah Brosseau : Page roles-->
<template>
    <div>
        
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue';

    const propsRoles = defineProps({
    roles: {
        type: Object,
        default: () => ({
            id: '',
            nom: 'test'
        })
    }
})
</script>

<style scoped>
    
</style>