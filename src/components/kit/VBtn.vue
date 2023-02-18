<script setup lang="ts">
import { computed } from "vue";
interface IProps {
  rounded?: boolean;
  outline?: boolean;
  text?: boolean;
  dark?: boolean;
  disabled?: boolean;
  to?: string;
  router?: boolean;
  color?: "primary" | "secondary";
}
const props = defineProps<IProps>();
const btnClasess = computed(() => ({
  "v-btn": true,
  "v-btn--outlined": props.outline,
  "v-btn--disabled": props.disabled,
  "v-btn--rounded": props.rounded,
  "v-btn--text": props.text,
  "v-btn--dark": props.dark,
  "v-btn--secondary": props.color === "secondary",
  "v-btn--primary": props.color === "primary",
}));
const btnComponent = computed(() =>
  props.router ? 'a' : "button"
);
const btnAttrs = computed(() => ({
  disabled: props?.disabled || undefined,
  href: props?.to || undefined,
}));
const componentRole = computed(() => (props.router ? "link" : "button"));
</script>

<template>
  <component
    :is="btnComponent"
    v-bind="btnAttrs"
    :class="btnClasess"
    :role="componentRole"
  >
    <span class="v-btn__content">
      <slot />
    </span>
  </component>
</template>
