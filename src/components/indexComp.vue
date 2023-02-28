<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";
import { userStore } from "../stores/user";
import Swal from "sweetalert2";
export default {
  props: {
    user: {},
  },
  data() {
    return {
      allUsers: {},
      allPosts: {},
      allPostComment: {}
    }
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
          })

          Toast.fire({
            icon: 'info',
            title: 'You have been logout'
          })
          this.$router.push("/login");
        })
        .catch((err) => console.log(err));
    },
    async fetchAllUsers() {
      axios({
        method: "get",
        url: "http://localhost/api/user/",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          this.allUsers = res.data;
        })
        .catch((err) => console.log(err));
    },
    async fetchAllPosts() {
      axios({
        method: "get",
        url: "http://localhost/api/post/",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          this.allPosts = res.data;
        })
        .catch((err) => console.log(err));
    },
    async fetchAllPostComments() {
      axios({
        method: "get",
        url: "http://localhost/api/post_comment/",
        headers: {
          Accept: "application/json",
        },
        withCredentials: true,
      })
        .then((res) => {
          this.allPostComment = res.data;
        })
        .catch((err) => console.log(err));
    },
    deleteUser() {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          axios({
            method: "delete",
            url: "http://localhost/api/post_comment/1",
            headers: {
              Accept: "application/json",
            },
            withCredentials: true,
          })
            .then(() => {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )
            })
            .catch((err) => Swal.fire({
              title: 'Error!',
              text: 'An error happen',
              icon: 'error',
              confirmButtonText: 'Okay'
            }));
        }
      })
    },
  },
  created() {
    return [
      this.fetchAllUsers(),
      this.fetchAllPosts(),
      this.fetchAllPostComments()
    ];
  }
};
</script>

<template>
  <div class="container-fluid">
    <div class="row p-3">
      <nav class="navbar navbar-expand-lg navbar-light rounded shadow border">
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
          <div class="col-12 border rounded shadow">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Users</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>{{ allUsers.length }}</h4>
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
          <div class="col-12 border rounded shadow">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Posts</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>{{ allPosts.length }}</h4>
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
          <div class="col-12 border rounded shadow">
            <div class="row">
              <div class="col-6 pt-2">
                <h5>Comments</h5>
              </div>
              <div class="col-6 pt-2">
                <a class="" href="#">View Details</a>
              </div>
              <div class="col-12 text-success">
                <h4>{{ allPostComment.length }}</h4>
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
          <div class="col-12 border rounded shadow">
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
          <div class="col-12 border rounded shadow">
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
      <div class="col-10">
        <div class="row">
          <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
        </div>

        <div class="row pt-3 p-3">
          <div class="col-12 border rounded shadow" style="overflow: auto; max-height: 517px;">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Role</th>
                  <th scope="col">Activity</th>
                  <th scope="col">Terminate</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="allUser in allUsers">
                  <th scope="row">{{ allUser.id }}</th>
                  <td> {{ allUser.name }}</td>
                  <td>{{ allUser.email }}</td>
                  <td>{{ allUser.roleId }}</td>
                  <td><a class="text-info" href="#">View activity</a></td>
                  <td><button type="button" @click="deleteUser()" class="btn btn-link text-danger">Terminate</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-4 text-muted text-start pt-2">
        <p>v1.02.1</p>
      </div>
      <div class="col-4 text-muted text-center pt-2">
        <p>Copyright © 2023 Allahsoft.dk</p>
      </div>
      <div class="col-4 text-muted text-end pt-2">
        <p>Build: 270223</p>
      </div>
    </div>

  </div>
</template>

<style>
.colored-toast.swal2-icon-info {
  background-color: #3fc3ee !important;
}
</style>
