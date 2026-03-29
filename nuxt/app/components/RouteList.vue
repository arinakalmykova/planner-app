<template>
    <div class="routes-list">
        <RouteCard v-for="route in routes" :key="route.id" :route="route" />
    </div>
</template>

<script setup>
    const props = defineProps({
        routes:Array
    });
</script>

<style scoped lang="scss">
.routes-list {
    display:flex;
    flex-direction:column;
    gap:20px;
}
</style>