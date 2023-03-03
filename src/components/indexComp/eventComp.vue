<script lang="ts">
import axios from "axios";
import Swal from "sweetalert2";
import { useEventStore } from "../../stores/event";
export default {
    setup() {
        const event = useEventStore();
        return { event }
    },
    data() {
        return {
            eventName: "",
            eventDate: "",
            eventFrom: "",
            eventTo: ""
        }
    },
    methods: {
        async createEvent() {
            axios({
                method: "post",
                url: "http://localhost/api/event/",
                headers: {
                    Accept: "application/json",
                },
                withCredentials: true,
                data: {
                    name: this.eventName,
                    eventDate: this.eventDate,
                    eventFrom: this.eventFrom,
                    eventTo: this.eventTo,
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

                    this.event.addIslamicEvent({
                        id: res.data.id,
                        name: this.eventName,
                        eventDate: this.eventDate,
                        eventFrom: this.eventFrom,
                        eventTo: this.eventTo,
                    });
                    this.eventName = "";
                    this.eventDate = "";
                    this.eventFrom = "";
                    this.eventTo = "";

                })
                .catch((err) => { console.log(err) });
        },
        deleteEvent(eventId: number, eventName: string) {
            Swal.fire({
                title: 'Delete the ' + eventName + "?",
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
                        url: "http://localhost/api/event/" + eventId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                    })
                        .then(() => {
                            this.event.deleteIslamicEvent(eventId);
                            Swal.fire(
                                'Deleted!',
                                'The event has been deleted.',
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
        updateEvent(eventId: number, eventName: string, eventDate: string, eventFrom: string, eventTo: string) {
            Swal.fire({
                title: 'Update alarm name',
                html: `<div class="form-group"><label for="eventname">Event name</label><input type="text" class="form-control" id="eventname" value="`+eventName+`"></div><div class="form-group"><label for="eventdate">Event date</label><input type="text" class="form-control" id="eventdate" value="`+eventDate+`"></div><div class="form-group"><label for="eventfrom">Event from</label><input type="text" class="form-control" id="eventfrom" value="`+eventFrom+`"></div><div class="form-group"><label for="eventto">Event to</label><input type="text" class="form-control" id="eventto" value="`+eventTo+`"></div>`,
                confirmButtonColor: "green",
                confirmButtonText: 'Update',
                focusConfirm: false,
                preConfirm: (res) => {
                    const eventname = Swal.getPopup().querySelector('#eventname').value 
                    const eventdate = Swal.getPopup().querySelector('#eventdate').value
                    const eventfrom = Swal.getPopup().querySelector('#eventdate').value
                    const eventto = Swal.getPopup().querySelector('#eventdate').value
                    return { eventname: eventname, eventdate: eventdate, eventfrom: eventfrom, eventto: eventto  }
                }
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    axios({
                        method: "put",
                        url: "http://localhost/api/event/" + eventId,
                        headers: {
                            Accept: "application/json",
                        },
                        withCredentials: true,
                        data: {
                            name: result.value?.eventname,
                            eventDate: result.value?.eventdate,
                            eventFrom: result.value?.eventfrom,
                            eventTo: result.value?.eventto,
                        },
                    })
                        .then(() => {
                            this.event.updateEvent(eventId ,result.value?.eventname, result.value?.eventdate, result.value?.eventfrom, result.value?.eventto);
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
                <div class="col-2">
                    <input class="form-control" id="name" v-model="eventName" placeholder="Event name">
                </div>
                <div class="col-2">
                    <input class="form-control" id="name" v-model="eventDate" placeholder="Event date">
                </div>
                <div class="col-2">
                    <input class="form-control" id="name" v-model="eventFrom" placeholder="Event from">
                </div>
                <div class="col-2">
                    <input class="form-control" id="name" v-model="eventTo" placeholder="Event to">
                </div>
                <div class="col-1 d-flex justify-content-end"><button type="submit" class="btn btn-success text-white"
                        @click="createEvent()">Create
                    </button></div>
            </div>
        </div>
        <div class="col-12">
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Event date</th>
                        <th scope="col">From</th>
                        <th scope="col">To</th>
                        <th scope="col">Edit</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="eventt in event.getEvent">
                        <th scope="row">{{ eventt.id }}</th>
                        <td> {{ eventt.name }}</td>
                        <td>{{ eventt.eventDate }}</td>
                        <td>{{ eventt.eventFrom }}</td>
                        <td>{{ eventt.eventTo }}</td>
                        <td><button type="button" class="btn btn-info text-white"
                                @click="updateEvent(eventt.id , eventt.name, eventt.eventDate , eventt.eventFrom, eventt.eventTo )">Edit</button></td>
                        <td><button type="button" class="btn btn-danger"
                                @click="deleteEvent(eventt.id, eventt.name)">Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>
