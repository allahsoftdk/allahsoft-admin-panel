<script lang="ts">
import axios from "axios";
import { useLoginStore } from "@/stores/login";
import Swal from "sweetalert2";
export default {
    setup() {
        const loginStore = useLoginStore();
        return { loginStore }
    },
    props: {
        user: {},
    },
    data() {
        return {
        }
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
};
</script>

<template>
    <div class="row p-3">
        <div class="col-12">
            <div class="row p-2 bg-light shadow border">
                <div class="col-4">
                    <img src="../../public/favicon.ico" class="rounded" alt="allahsoft">
                    <router-link to="/" class="btn text-success"><h2><strong>Allahsoft.dk</strong></h2></router-link>
                </div>
                <div class="col-4 text-center p-2">
                    <h3>Welcome {{ loginStore.getUserLogin?.name }}</h3>
                </div>
                <div class="col-4 d-flex justify-content-end">
                     <button @click="logOut()" class="btn btn-warning"><strong>Log out <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
  <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
</svg></strong></button>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
.colored-toast.swal2-icon-info {
    background-color: #3fc3ee !important;
}
</style>
