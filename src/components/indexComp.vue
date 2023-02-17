<script lang="ts">
import axios from "axios";
import { mapStores } from "pinia";
import { userStore } from "../stores/user";
import { io } from "socket.io-client";
const socket = io("http://localhost:80/socket.io/");
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
  <div>
    <h2>Index page</h2>
    <p>User: {{ userStore.getUser }}</p>
    <button @click="logOut()">Log out</button>
  </div>
  <div>
    <ul id="messages"></ul>
    <form id="form" action="">
      <input id="input" autocomplete="off" /><button>Send</button>
    </form>
  </div>
</template>

<style>
body {
  margin: 0;
  padding-bottom: 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
}

#form {
  background: rgba(0, 0, 0, 0.15);
  padding: 0.25rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  height: 3rem;
  box-sizing: border-box;
  backdrop-filter: blur(10px);
}
#input {
  border: none;
  padding: 0 1rem;
  flex-grow: 1;
  border-radius: 2rem;
  margin: 0.25rem;
}
#input:focus {
  outline: none;
}
#form > button {
  background: #333;
  border: none;
  padding: 0 1rem;
  margin: 0.25rem;
  border-radius: 3px;
  outline: none;
  color: #fff;
}

#messages {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#messages > li {
  padding: 0.5rem 1rem;
}
#messages > li:nth-child(odd) {
  background: #efefef;
}
</style>
