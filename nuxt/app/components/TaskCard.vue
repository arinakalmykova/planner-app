<template>
    <v-card @click="openCard" class="route-card">
        <div class="route-card-header">
            <h1>{{route.title}}</h1>
            <span>{{route.description}}</span>
        </div>
        <v-card-actions class="route-card-actions">
          <v-spacer />
          <v-icon @click="deleteRoute">mdi-trash-can</v-icon>
        </v-card-actions>
    </v-card>
</template>


<script setup>
    import store from "../store/store";
    import {useRouter} from "vue-router";

    const router = useRouter();
    const props = defineProps({
        route:Object
    });

    const openCard = () => {
        router.push(`/view-route/${props.route.id}`);
    };

    const deleteRoute = async (e) => {
        e.stopPropagation();
        await store.dispatch("deleteRoute", props.route.id)
    };
</script>

<style scoped lang="scss">
.route-card {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border: 1px solid #ccc;
    border-radius: 5px;
    padding: 30px;
    gap: 10px;

    .route-card-header {
        display: flex;
        flex-direction: column;
        gap: 5px;
    }
}
</style>