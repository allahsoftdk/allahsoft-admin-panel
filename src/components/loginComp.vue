<template>
  <div>
    <label for="fname">First name:</label><br />
    <input type="text" v-model="username" placeholder="password" /><br /><br />
    <label for="lname">Last name:</label><br />
    <input
      type="password"
      v-model="password"
      placeholder="password"
    /><br /><br />
    <button @click="login()">Login</button>
  </div>
  <div v-if="errorMessage">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";
import { userStore } from "../stores/user";
export default {
  name: "userLogin",
  computed: {
    ...mapStores(userStore),
  },
  data() {
    return {
      username: "",
      password: "",
      errorMessage: "",
    };
  },
  methods: {
    async login() {
      console.log("User: " + this.username + "\n Password: " + this.password);
      axios({
        method: "post",
        url: "http://localhost/api/auth/login",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
        data: {
          name: this.username,
          password: this.password,
        },
      })
        .then((user) => {
          this.userStore.setUser(user.data);
          if (user.data.roleId.role === "admin") {
            this.$router.push("/");
          } else {
            this.errorMessage = "You are not an admin and cannot log in here";
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style></style>
