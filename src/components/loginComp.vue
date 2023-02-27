<template>
  <div class="container w-25">
    <div class="row pt-5">
      <div class="col-12 d-flex justify-content-center">
        <div style="width: 18rem;">
          <div class="p-3">
            <h3 class="text-center strong p-3">Gateway to Allah</h3>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="username" placeholder="Username">
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" v-model="password" placeholder="Password">
            </div>
            <button class="btn btn-primary btn-block" @click="login()">Go to Allah</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="errorMessage">
      <p>{{ errorMessage }}</p>
    </div>
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
          console.log(user);
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
