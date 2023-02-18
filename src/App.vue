<template>
  <div class="app">
    <div class="container">
      <AppHeader :title="`Profile List | ${items.length}`">
        <div>
          <VBtn
            color="primary"
            :disabled="!items.length || loading"
            @click="handleProfile"
            >Add</VBtn
          >
          <VBtn
            color="primary"
            :disabled="!items.length || loading"
            @click="getProfiles"
            >Renew</VBtn
          >
        </div>
      </AppHeader>
      <main class="app__main">
        <div class="row">
          <template v-if="loading">
            <div class="col-12 col-lg-3" v-for="i in 20" :key="i">
              <VCardSkeleton />
            </div>
          </template>
          <template v-else-if="items.length">
            <div class="col-12 col-lg-3" v-for="(profile, i) in items" :key="i">
              <VCard
                :user="profile"
                @view="handleView"
                @remove="handleRemove"
              />
            </div>
          </template>
          <template v-else>
            <div>No Data</div>
          </template>
        </div>
      </main>
    </div>
    <VModal v-model="modal" :items="detailItem" />
  </div>
</template>

<script setup lang="ts">
import api from "@/plugins/api";
import { ref, Ref } from "vue";
import VBtn from "@/components/kit/VBtn.vue";
import VCard from "@/components/kit/VCard.vue";
import VCardSkeleton from "@/components/skeleton/VCardSkeleton.vue";
import VModal from "@/components/kit/VModal.vue";
import { IProfile, IProfileItem } from "./types/profile";
import AppHeader from "./components/AppHeader.vue";
const items: Ref<IProfileItem[]> = ref([]);
const count = ref(0);
const loading = ref(false);
const modal = ref(false);

const detailItem = ref({
  title: "",
  avatar: "",
  gender: "",
  age: "",
  country: "",
  state: "",
  street: "",
  phone: "",
  timezone: "",
});
function createProfile(profiles: IProfile[]) {
  return profiles.map((item) => ({
    title: `${item.name.title}. ${item.name.first} ${item.name.last}`,
    avatar: item.picture.medium,
    address: `${item.location.country} - ${item.location.state}`,
    phone: item.phone,
    email: item.email,
    id: item.id.value,
    detaile: {
      avatar: item.picture.large,
      title: `${item.name.first} ${item.name.last}`,
      gender: item.gender,
      age: String(item.dob.age) || "-",
      country: item.location.country,
      state: item.location.state,
      street: Object.values(item.location.street).join(", "),
      phone: item.cell,
      timezone: item.location.timezone.offset,
    },
  }));
}
async function getProfiles(count?: number) {
  loading.value = true;
  try {
    const profiles = await api.get(
      `https://randomuser.me/api?results=${Number(count) || 20}`
    );
    if (profiles.data.results && profiles.data.results.length) {
      items.value = createProfile(profiles.data.results);
    }
  } catch (error) {
    // catcher function need here + showing toast
  } finally {
    loading.value = false;
  }
}
async function handleProfile() {
  count.value += 1;
  const profiles = await api.get(
    `https://randomuser.me/api?results=${count.value}`
  );
  if (profiles.data.results && profiles.data.results.length) {
    items.value.unshift(...createProfile(profiles.data.results));
  }
}
function handleView(id: string) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index > -1) detailItem.value = items.value[index].detaile;
  modal.value = true;
}
function handleRemove(id: string) {
  const index = items.value.findIndex((item) => item.id === id);
  if (index > -1) items.value.splice(index, 1);
}
getProfiles();
</script>
