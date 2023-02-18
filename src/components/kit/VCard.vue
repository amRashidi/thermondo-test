<template>
  <div class="card">
    <div class="card__profile">
      <img
        loading="lazy"
        class="card__profile__img"
        :src="avatar"
        :alt="name"
      />
    </div>
    <div class="card__wrapper">
      <h4 class="card__title">{{ name }}</h4>
      <div class="card__subtitle">
        <VIcon name="road-map-line" />
        <span> {{ address }}</span>
      </div>

      <div class="card__actions">
        <v-btn color="primary" text router :to="mail">
          <VIcon name="mail-send-line" />
        </v-btn>
        <v-btn color="primary" text router :to="tel">
          <VIcon name="phone-line" />
        </v-btn>
        <v-btn class="remove-btn" color="primary" text @click="remove">
          <VIcon name="delete-bin-line" />
        </v-btn>
      </div>
      <v-btn class="view-btn" color="primary" @click="select">View</v-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import VBtn from "@/components/kit/VBtn.vue";
import VIcon from "@/components/kit/VIcon.vue";
import { IProfileCart } from "@/types/profile";
import { computed } from "vue";
interface IProps {
  user: IProfileCart;
}
const props = defineProps<IProps>();
const emit = defineEmits(["view", "remove"]);
const name = computed(() => props.user.title);
const address = computed(() => props.user.address);
const avatar = computed(() => props.user.avatar || "/no-image.jpg");
const tel = computed(() => `tel:${props.user.phone}`);
const mail = computed(() => `mailto:${props.user.email}`);
const id = computed(() => props.user.id);

function select() {
  emit("view", id.value);
}
function remove() {
  emit("remove", id.value);
}
</script>

