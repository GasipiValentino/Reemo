<script>
import UserEdit from "./organisms/UserEdit.vue";

export default {
  name: "User",
  components: { UserEdit },
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  methods: {
    openUserEdit() {
      this.$refs.UserEdit.openUserEdit();
    },
  },
};
</script>

<template>
  <div
    class="max-w-md w-96 mx-auto p-4 sm:px-8 sm:py-4 flex rounded-xl items-center bg-blue-100"
  >
    <div class="flex-shrink-0">
      <img
        v-if="user.photoURL"
        class="w-8 h-8 rounded-full"
        :src="`${user.photoURL}`"
        :alt="`Perfil de ${user.userName}`"
      />
      <!-- <img v-else :src="`https://unavatar.io/${user.userName}`" alt="Foto de perfil inexistente"> -->
    </div>
    <div class="flex-1 min-w-0 ms-4">
      <h2 class="text-lg font-semibold text-gray-900 truncate">
        {{ user.name }} {{ user.lastName }}
      </h2>
      <p class="text-sm text-gray-500 truncate">
        {{ user.userName }}
      </p>
    </div>
    <div class="inline-flex items-center text-base font-semibold text-gray-900">
      <!-- <router-link to="/Profile/Edit" class="text-blue-700 underline">Editar</router-link> -->
      <button type="button" @click="openUserEdit">Editar</button>
    </div>
  </div>
  <UserEdit ref="UserEdit" />
</template>
