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
    fetchUserAmount() {
      axios({
        method: "post",
        url: "http://localhost/api/user/",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
        .then((data) => {
          console.log(data);
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    return this.fetchUserAmount();
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row p-3">
      <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #e3f2fd;">
        <a class="navbar-brand" href="#">Navbar</a>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" href="#">Features</a>
            </li>
            <li class="nav-item">
              <strong>{{ userStore.getUser.roleId.role }}</strong>
            </li>
            <li class="nav-item">
              <button @click="logOut()" class="btn btn-warning">Log out</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="row p-3">
      <div class="col-2">
        <div class="row">
          <div class="col-12 border">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Users</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>548</h4>
              </div>
            </div>
            <div class="row border-top bg-light pt-1">
              <div class="col-8">
                <h6>Users today</h6>
              </div>
              <div class="col-4 text-success text-right d-flex justify-content-end">
                <h6>12</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-2">
          <div class="col-12 border">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Posts</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>12.927</h4>
              </div>
            </div>
            <div class="row border-top bg-light pt-1">
              <div class="col-8">
                <h6>Posts today</h6>
              </div>
              <div class="col-4 text-success text-right d-flex justify-content-end">
                <h6>64</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-2">
          <div class="col-12 border">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Comments</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>23.456</h4>
              </div>
            </div>
            <div class="row border-top bg-light pt-1">
              <div class="col-8">
                <h6>Comments today</h6>
              </div>
              <div class="col-4 text-success text-right d-flex justify-content-end">
                <h6>102</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-2">
          <div class="col-12 border">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Follows</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>728</h4>
              </div>
            </div>
            <div class="row border-top bg-light pt-1">
              <div class="col-8">
                <h6>Follows today</h6>
              </div>
              <div class="col-4 text-success text-right d-flex justify-content-end">
                <h6>12</h6>
              </div>
            </div>
          </div>
        </div>

        <div class="row pt-2">
          <div class="col-12 border">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Likes</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>46.791</h4>
              </div>
            </div>
            <div class="row border-top bg-light pt-1">
              <div class="col-8">
                <h6>Likes today</h6>
              </div>
              <div class="col-4 text-success text-right d-flex justify-content-end">
                <h6>912</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-10 border-top border-right border-bottom">aaa</div>
    </div>

    <div class="row">
      <footer class="text-center">
        <div class="text-muted">
          <h6>Copyright © 2023 by Allahsoft.dk</h6>
        </div>
      </footer>
    </div>

  </div>
</template>

<style></style>
