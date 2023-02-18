<template>
  <Teleport to="body">
    <transition name="modal">
      <div v-if="model" class="modal-mask">
        <div class="modal-wrapper">
          <div class="modal-header">
            <h2>User Detail</h2>
            <VBtn @click="close" text color="primary">
              <VIcon name="close-line" />
            </VBtn>
          </div>
          <div class="modal-container">
            <div class="modal-body">
              <div class="row">
                <div class="col-12 col-lg-5">
                  <div class="profile__avatar">
                    <img
                      :src="items.avatar || '/no-image.jpg'"
                      :alt="items.title"
                    />
                  </div>
                  <h2 class="profile__title">{{ items.title }}</h2>
                  <div class="profile__subtitle">
                    {{ items.gender }} | {{ items.age }} Years old
                  </div>
                </div>
                <div class="col-12 col-lg-7">
                  <div class="profile__list">
                    <div class="profile__item">
                      <VIcon name="earth-line" />
                      <span class="profile__label">Country:</span>
                      <span class="profile__value">{{ items.country }}</span>
                    </div>
                    <div class="profile__item">
                      <VIcon name="pushpin-2-line" />
                      <span class="profile__label">state:</span>
                      <span class="profile__value">{{ items.state }}</span>
                    </div>
                    <div class="profile__item">
                      <VIcon name="pushpin-2-line" />
                      <span class="profile__label">street:</span>
                      <span class="profile__value">{{ items.street }} </span>
                    </div>
                    <div class="profile__item">
                      <VIcon name="phone-line" />
                      <span class="profile__label">Phone:</span>
                      <span class="profile__value">{{ items.phone }}</span>
                    </div>
                    <div class="profile__item">
                      <VIcon name="map-pin-time-line" />
                      <span class="profile__label">timezone:</span>
                      <span class="profile__value">{{ items.timezone }} H</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { IProfileItem } from "@/types/profile";
import { computed } from "vue";
import VBtn from "./VBtn.vue";
import VIcon from "./VIcon.vue";

interface IProps {
  modelValue: boolean;
  items: IProfileItem["detaile"];
}
const props = defineProps<IProps>();
const emit = defineEmits(["update:modelValue"]);
const items = computed(() => props.items);
const model = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
function close() {
  model.value = false;
}
</script>
