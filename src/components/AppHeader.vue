<template>
  <header class="app__header">
    <h1 class="app__header__title">{{ title }}</h1>
    <slot />
  </header>
</template>
<script setup lang="ts">
import { computed } from "vue";

interface IProps {
  title: string;
}
const props = defineProps<IProps>();
const title = computed(() => props.title);
</script>
