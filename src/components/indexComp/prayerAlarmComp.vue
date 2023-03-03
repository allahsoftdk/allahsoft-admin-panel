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
    }
};
</script>

<template>
    <div class="row">
        <div class="col-6">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="alarm in prayerAlarm.getPrayerAlarm">
                        <th scope="row">{{ alarm.id }}</th>
                        <td> {{ alarm.prayerAlarm }}</td>
                        <td><button type="button" class="btn btn-danger">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="col-6">
            <label for="name">Alarm name</label>
            <input class="form-control" id="name" v-model="alarmName" placeholder="Enter the alarms name">
            <button type="submit" class="btn btn-info mt-3 text-white" @click="createPrayerAlarm()">Create
                Alarm</button>
        </div>
    </div>
</template>

<style></style>
