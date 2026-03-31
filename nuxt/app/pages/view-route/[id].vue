<template>
  <v-container v-if="route">
    <v-icon class="arrow" @click="router.back()" >mdi-arrow-left</v-icon>

    <h2 class="primary">Маршрут</h2>
    <div class="route-header">
      <template v-if="editingRoute">
        <v-text-field v-model="routeCopy.title" label="Название маршрута" />
        <v-textarea v-model="routeCopy.description" label="Описание маршрута" />
        <v-btn small color="primary" @click="saveRoute">Сохранить</v-btn>
        <v-btn small @click="cancelRouteEdit">Отмена</v-btn>
      </template>
      <template v-else>
        <h3>{{ routeCopy.title }}</h3>
        <p>{{ routeCopy.description }}</p>
        <v-icon small @click="editingRoute = true" data-test="edit-route">mdi-pencil</v-icon>
      </template>
    </div>

    <img
      v-if="routeCopy.coverImage"
      :src="`http://localhost:3001/uploads/routes/${routeCopy.coverImage}`"
      width="300"
    />

    <h2>Точки маршрута</h2>
    <div v-if="routeCopy.points?.length">
      <div v-for="point in routeCopy.points" :key="point.id" class="point">
        <template v-if="editingPoint[point.id]">
          <v-text-field v-model="point.title" label="Название точки" />
          <v-textarea v-model="point.description" label="Описание точки" />
          <v-btn small color="primary" @click="savePoint(point)" data-test="save-route"
            >Сохранить</v-btn
          >
          <v-btn small @click="cancelPointEdit(point)" data-test="cancel-route">Отмена</v-btn>
        </template>
        <template v-else>
          <h3>{{ point.title }}</h3>
          <p>{{ point.description }}</p>
          <v-icon small @click="editingPoint[point.id] = true"
            >mdi-pencil</v-icon
          >
          <v-btn small color="red" @click="deletePoint(point.id)" data-test="delete-point"
            >Удалить</v-btn
          >
        </template>
        <img
          v-if="point.image"
          :src="`http://localhost:3001/uploads/points/${point.image}`"
          width="200"
        />
      </div>
    </div>
    <p v-else>Пока нет точек</p>
    <v-btn @click="showDialog = true">Добавить точку</v-btn>
    <AppPointDialog
      v-model="showDialog"
      :routeId="routeCopy.id"
      @saved="refresh"
    />
  </v-container>
</template>

<script setup>

import AppPointDialog from "../../components/AppPointDialog.vue";
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import store from "../../store/store";

const vueRoute = useRoute();
const router = useRouter();
const routeId = Number(vueRoute.params.id);

const showDialog = ref(false);

const route = computed(() => store.getters.getRouteById(routeId));

const routeCopy = ref(route.value ? JSON.parse(JSON.stringify(route.value)) : {
  title: '',
  description: '',
  points: [],
  coverImage: ''
});

const editingRoute = ref(false);
const editingPoint = ref({});

onMounted(async () => {
  if (!store.state.routes.length) {
    await store.dispatch("fetchRoutes");
  }
  if (route.value) {
    routeCopy.value = JSON.parse(JSON.stringify(route.value));
  }
});

const saveRoute = async () => {
  await store.dispatch("updateRoute", { routeId, route: routeCopy.value });
  editingRoute.value = false;
  await store.dispatch("fetchRoutes");
};

const cancelRouteEdit = () => {
  routeCopy.value = JSON.parse(JSON.stringify(route.value));
  editingRoute.value = false;
};

const savePoint = async (point) => {
  await store.dispatch("updatePoint", {
    routeId,
    pointId: point.id,
    data: point,
  });
  editingPoint.value[point.id] = false;
  await store.dispatch("fetchRoutes");
};
const cancelPointEdit = (point) => {
  const originalPoint = route.value.points.find((p) => p.id === point.id);
  Object.assign(point, originalPoint);
  editingPoint.value[point.id] = false;
};

const deletePoint = async (pointId) => {
  await store.dispatch("deletePoint", { routeId, pointId });
  await store.dispatch("fetchRoutes");
};
</script>

<style scoped lang="scss">
.v-container {

  .arrow{
    margin-bottom:30px;
  }

  h2 {
    font-size: 1.8rem;
    margin-bottom: 15px;
    border-bottom: 2px solid #eee;
    padding-bottom: 5px;
  }

  img {
    display: block;
    margin: 15px 0;
    border-radius: 8px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  .route-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 20px;

    h3 {
      font-size: 1.5rem;
      margin: 0;
    }

    p {
      font-size: 1rem;
      line-height: 1.4;
    }

    .v-icon {
      cursor: pointer;
      color: #1976d2;
      &:hover {
        color: #0d47a1;
      }
    }

    .v-btn {
      margin-right: 10px;
      font-size: 0.9rem;
    }
  }

  .point {
    border: 1px solid #ddd;
    padding: 15px;
    margin-bottom: 15px;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);

    display: flex;
    flex-direction: column;
    gap: 10px;

    h3 {
      font-size: 1.3rem;
      margin: 0;
    }

    p {
      font-size: 0.95rem;
      line-height: 1.4;
    }

    .v-btn {
      align-self: flex-start;
      font-size: 0.85rem;
      &.red {
        background-color: #e53935;
        color: #fff;
        &:hover {
          background-color: #b71c1c;
        }
      }
      &.primary {
        background-color: #1976d2;
        color: #fff;
        &:hover {
          background-color: #0d47a1;
        }
      }
    }

    .v-icon {
      cursor: pointer;
      color: #1976d2;
      &:hover {
        color: #0d47a1;
      }
    }

    img {
      max-width: 100%;
      border-radius: 6px;
    }
}
}
</style>
