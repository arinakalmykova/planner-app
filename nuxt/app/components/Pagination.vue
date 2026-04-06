<template>
  <div class="pagination">
    <i
      class="mdi mdi-chevron-left arrow"
      @click="$emit('prev')"
      :class="{ disabled: currentPage === 1 }"
    ></i>
    <span>Страница {{ currentPage }} из {{ totalPages }}</span>
    <i
      class="mdi mdi-chevron-right arrow"
      @click="$emit('next')"
      :class="{ disabled: currentPage === totalPages }"
    ></i>
  </div>
</template>

<script setup>
defineProps({
  currentPage: Number,
  totalPages: Number,
});
const emit = defineEmits(["prev", "next"]);
</script>

<style scoped lang="scss">
.pagination {
  margin: auto;
  display:flex;
  flex-diretion:row;
  justify-content:center;
  align-items:center;
  gap:20px;
  
  .arrow {
    font-size: 1.8rem;
    cursor: pointer;
    user-select: none;

    &.disabled {
      opacity: 0.3;
      pointer-events: none;
    }
  }
}
</style>
