<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { usePrayerAlarmStore } from "../../stores/prayerAlarm";
export default {
    setup() {
        const prayerAlarm = usePrayerAlarmStore();
        return { prayerAlarm }
    },
    data() {
        return {
            alarmName: "",
        }
    },
    methods: {
        async createPrayerAlarm() {
            axios({
                method: "post",
                url: "http://localhost/api/prayer_alarm/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
                data: {
                    prayerAlarm: this.alarmName
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
                        title: 'Success Alarm created'
                    })

                    if (this.alarmName != "") {
                        this.prayerAlarm.addAlarm({
                            id: res.data.id,
                            prayerAlarm: this.alarmName,
                        });
                    }
                    this.alarmName = "";

                })
                .catch((err) => { console.log(err) });
        },
        deletePrayerAlarm(alarmId: number, alarmName: string) {
            Swal.fire({
                title: 'Delete the ' + alarmName + " alarm?",
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
                        url: "http://localhost/api/prayer_alarm/" + alarmId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.prayerAlarm.deletePrayerAlarm(alarmId);
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
        updatePrayerAlarm(alarmId: number, alarmName: string) {
            Swal.fire({
                title: 'Update alarm name',
                html: `<label for="eventname">Update prayer alarm</label><textarea class="form-control pt-2" id="eventname"rows="3">` + alarmName + `</textarea>`,
                confirmButtonColor: "green",
                confirmButtonText: 'Update',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                focusConfirm: false,
                preConfirm: (res) => {
                    const updatePrayerAlarmName = Swal.getPopup().querySelector('#eventname').value 
                    return { newAlarm: updatePrayerAlarmName }
                }
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    axios({
                        method: "put",
                        url: "http://localhost/api/prayer_alarm/" + alarmId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                        data: {
                            setPrayerAlarm: result.value?.newAlarm
                        },
                    })
                        .then(() => {
                            this.prayerAlarm.updatePrayerAlarm(alarmId, result.value?.newAlarm);
                            Swal.fire(
                                'Updated!',
                                'The alarm has been updated.',
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
                <div class="col-11 "><input class="form-control border" id="name" v-model="alarmName"
                        placeholder="Enter the alarms name"></div>
                <div class="col-1 d-flex justify-content-end"><button type="submit" class="btn btn-success text-white"
                        @click="createPrayerAlarm()">Create
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
                    <tr v-for="alarm in prayerAlarm.getPrayerAlarm">
                        <th scope="row">{{ alarm.id }}</th>
                        <td> {{ alarm.prayerAlarm }}</td>
                        <td><button type="button" class="btn btn-info text-white"
                                @click="updatePrayerAlarm(alarm.id, alarm.prayerAlarm)">Edit</button>
                        </td>
                        <td><button type="button" class="btn btn-danger"
                                @click="deletePrayerAlarm(alarm.id, alarm.prayerAlarm)">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>
