<script lang="ts">
import { axiosInstance } from "../utils/axiosInstance"
import Swal from "sweetalert2";
import { useLoginStore } from "@/stores/login";
export default {
  name: "userLogin",
  setup() {
    const loginInfo = useLoginStore();
    return { loginInfo }
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
      await axiosInstance.post("/api/auth/login", {
        withCredentials: true,
        name: this.username,
        password: this.password,
      })
        .then((user) => {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-right',
            iconColor: 'white',
            customClass: {
              popup: 'colored-toast'
            },
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true
          });

          Toast.fire({
            icon: 'success',
            title: 'Success login'
          })
          this.loginInfo.setUserLogin(user.data);
          if (user.data.roleId.role === "admin") {
            this.$router.push("/");
          } else {
            this.errorMessage = "You are not an admin and cannot log in here";
          }
        })
        .catch((err) => {
          this.errorMessage = err.response.data.msg;
        });
    },
  },
};
</script>


<template>
  <div class="container w-25">
    <div class="row pt-5">
      <div class="col-12 d-flex justify-content-center">
        <div style="width: 18rem;">
          <div class="p-3">
            <h3 class="text-center strong p-3">Allahsoft.dk</h3>
            <div class="text-center text-danger" v-if="errorMessage">
              <h6>{{ errorMessage }}</h6>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" v-model="username" placeholder="Username">
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" v-model="password" placeholder="Password">
            </div>
            <div class="text-center">
              <button class="btn btn-primary btn-block" @click="login()">Login</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<style>
.colored-toast.swal2-icon-success {
  background-color: #a5dc86 !important;
}
</style>
