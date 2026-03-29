<template>
    <v-card @click="openCard" class="route-card">
        <div class="route-card-header">
            <h1>{{route.title}}</h1>
            <span>{{route.description}}</span>
        </div>
    </v-card>
</template>


<script setup>
    const props = defineProps({
        route:Object
    });

    const openCard = () => {
        navigateTo(`/view-route/${props.route.id}`);
    };
</script>

<style scoped lang="scss">
.route-card {
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 30px;
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