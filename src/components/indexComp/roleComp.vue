<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useRoleStore } from "../../stores/role";
export default {
    setup() {
        const role = useRoleStore();
        return { role }
    },
    data() {
        return {
            roleName: "",
        }
    },
    methods: {
        async createRole() {
            axios({
                method: "post",
                url: "http://localhost/api/role/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
                data: {
                    role: this.roleName
                },
            })
                .then((res) => {
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
                        title: 'Success role created'
                    })

                    if (this.roleName != "") {
                        this.role.addRole({
                            id: res.data.id,
                            role: this.roleName,
                        });
                    }
                    this.roleName = "";

                })
                .catch((err) => { console.log(err) });
        },
        deleteRole(roleId: number, roleName: string) {
            Swal.fire({
                title: 'Delete the ' + roleName + "?",
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
                        url: "http://localhost/api/role/" + roleId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.role.deleteRole(roleId);
                            Swal.fire(
                                'Deleted!',
                                'The alarm has been deleted.',
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
    }
};
</script>

<template>
    <div class="row">
        <div class="col-12 pb-3 border-bottom">
            <div class="row">
                <div class="col-11"><input class="form-control" id="name" v-model="roleName"
                        placeholder="Enter the alarms name"></div>
                <div class="col-1 d-flex justify-content-end"><button type="submit" class="btn btn-success text-white"
                        @click="createRole()">Create
                    </button></div>
            </div>
        </div>
        <div class="col-12">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="rolee in role.getRole">
                        <th scope="row">{{ rolee.id }}</th>
                        <td> {{ rolee.role }}</td>
                        <td><a class=" text-light btn btn-info" href="#">Edit</a></td>
                        <td><button type="button" @click="deleteRole(rolee.id, rolee.role)"
                                class="btn btn-danger">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>
