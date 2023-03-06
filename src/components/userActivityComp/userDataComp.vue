<script lang="ts">
import { useUserStore } from "@/stores/user";
export default {
  props: ["id"],
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  methods: {},
};
</script>

<template>
  <div class="row p-3">
    <div class="col-12">
      <div class="row p-2 bg-light shadow border">
        <div class="col-3 text-center">
          <h3>Name: {{ userStore.getUserById(id)?.name }}</h3>
        </div>
        <div class="col-3 text-center">
          <h3>Email: {{ userStore.getUserById(id)?.email }}</h3>
        </div>
        <div class="col-3 text-center">
          <h3>Role: {{ userStore.getUserById(id)?.role.role }}</h3>
        </div>
        <div class="col-3 text-center">
          <h3>Created at: {{ userStore.getUserById(id)?.createdAt }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>

<style></style>
