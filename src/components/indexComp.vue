<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";
import { userStore } from "../stores/user";
export default {
  props: {
    user: {},
  },
  computed: {
    ...mapStores(userStore),
  },
  methods: {
    logOut() {
      axios({
        method: "post",
        url: "http://localhost/api/auth/logout",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
        .then(() => {
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<template>
  <h2>Index page</h2>
  <p>User: {{ userStore.getUser() }}</p>
  <button @click="logOut()">Log out</button>
</template>

<style></style>
