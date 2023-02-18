<template>
  <svg aria-hidden="true" class="icon">
    <use :href="symbolId" fill="currentColor" />
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  name: string;
}
const props = defineProps<IProps>();
const symbolId = computed(() => `#icon-${props.name}`);
</script>

<style lang="scss" scoped>
.icon {
    width: 2rem;
    height: 2rem;
}
</style>