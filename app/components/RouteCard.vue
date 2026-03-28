<template>
    <div class="route-card">
        <div class="route-card-header">
            <h1>{{route.title}}</h1>
            <span>{{route.description}}</span>
        </div>
        <v-btn  class="primary btn-open" to="`/route/${props.props.id}`">Открыть</v-btn>
    </div>
</template>


<script setup>
    const props = defineProps({
        route:Object
    });
</script>

<style scoped lang="scss">
.route-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 30px;
    margin-bottom: 10px;
    gap: 10px;

    .route-card-header {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }

    .btn-open {
        align-self: flex-start;
    }
}
</style>