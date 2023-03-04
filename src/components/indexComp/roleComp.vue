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
                confirmButtonColor: '#099c27',
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
                            const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-right',
                            iconColor: 'white',
                            customClass: {
                            popup: 'colored-toast'
                            },
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                            });

                            Toast.fire({
                            icon: 'success',
                            title: 'Role delete'
                            })
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
        updateRole(roleId: number, roleName: string) {
            Swal.fire({
                title: 'Update alarm name',
                html: `<label for="eventname">Update prayer alarm</label><textarea class="form-control pt-2" id="eventname"rows="3">` + roleName + `</textarea>`,
                confirmButtonColor: "green",
                confirmButtonText: 'Update',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                focusConfirm: false,
                preConfirm: (res) => {
                    const updateRole = Swal.getPopup().querySelector('#eventname').value 
                    return { newRole: updateRole }
                }
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    axios({
                        method: "put",
                        url: "http://localhost/api/role/" + roleId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                        data: {
                            name: result.value?.newRole
                        },
                    })
                        .then(() => {
                            this.role.updatePrayerAlarm(roleId, result.value?.newRole);
                            const Toast = Swal.mixin({
                            toast: true,
                            position: 'top-right',
                            iconColor: 'white',
                            customClass: {
                            popup: 'colored-toast'
                            },
                            showConfirmButton: false,
                            timer: 2000,
                            timerProgressBar: true
                            });

                            Toast.fire({
                            icon: 'success',
                            title: 'Role updated'
                            })
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
                        @click="createRole()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
</svg> Create
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
                        <td><button type="button" @click="updateRole(rolee.id, rolee.role)"
                                class="btn btn-info text-white"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg> Edit</button></td>
                        <td><button type="button" @click="deleteRole(rolee.id, rolee.role)"
                                class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
</svg> Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>
