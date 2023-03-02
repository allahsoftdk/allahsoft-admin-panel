<script lang="ts">
import axios from "axios";
import { useUserStore } from "../stores/user";
import Swal from "sweetalert2";
export default {
    setup() {
        const userStore = useUserStore();
        return { userStore }
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
                <div class="col-2">
                    <h2><strong>Allahsoft.dk</strong></h2>
                </div>
                <div class="col-10 d-flex justify-content-end">
                     <button @click="logOut()" class="btn btn-warning"><i><strong>Log out</strong></i></button>
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
