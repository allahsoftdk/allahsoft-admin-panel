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

    },
    created() { }
};
</script>

<template>
    <div class="row p-3">
        <nav class="navbar navbar-expand-lg navbar-light shadow border">
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
                        <button @click="logOut()" class="btn btn-info">Log out</button>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
</template>

<style>
.colored-toast.swal2-icon-info {
    background-color: #3fc3ee !important;
}
</style>
