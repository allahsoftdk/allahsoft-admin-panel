<script lang="ts">
import { axiosInstance } from "../../utils/axiosInstance";
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
            eventTo: "",
            errorMessage: "",
        }
    },
    methods: {
        async createEvent() {
            axiosInstance.post("/api/event/", {
                name: this.eventName,
                eventDate: this.eventDate,
                eventFrom: this.eventFrom,
                eventTo: this.eventTo,
            })
                .then((res) => {
                    this.errorMessage = "";
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
                .catch((err) => { this.errorMessage = err.response.data.msg; });
        },
        deleteEvent(eventId: number, eventName: string) {
            Swal.fire({
                title: 'Delete the ' + eventName + "?",
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#099c27',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axiosInstance.delete("/api/event/" + eventId, {
                    })
                        .then(() => {
                            this.event.deleteIslamicEvent(eventId);
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
                                title: 'Event delete'
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
        updateEvent(eventId: number, eventName: string, eventDate: string, eventFrom: string, eventTo: string) {
            Swal.fire({
                title: 'Update event',
                html: `<div class="form-group"><label for="eventname">Event name</label><input type="text" class="form-control" id="eventname" value="` + eventName + `"></div><div class="form-group"><label for="eventdate">Event date</label><input type="text" class="form-control" id="eventdate" value="` + eventDate + `"></div><div class="form-group"><label for="eventfrom">Event from</label><input type="text" class="form-control" id="eventfrom" value="` + eventFrom + `"></div><div class="form-group"><label for="eventto">Event to</label><input type="text" class="form-control" id="eventto" value="` + eventTo + `"></div>`,
                confirmButtonColor: "green",
                confirmButtonText: 'Update',
                showCancelButton: true,
                cancelButtonColor: '#d33',
                focusConfirm: false,
                preConfirm: (res) => {
                    const eventname = Swal.getPopup().querySelector('#eventname').value
                    const eventdate = Swal.getPopup().querySelector('#eventdate').value
                    const eventfrom = Swal.getPopup().querySelector('#eventfrom').value
                    const eventto = Swal.getPopup().querySelector('#eventto').value
                    return { eventname: eventname, eventdate: eventdate, eventfrom: eventfrom, eventto: eventto }
                }
            }).then((result) => {
                console.log(result);
                if (result.isConfirmed) {
                    axiosInstance.put("/api/event/" + eventId, {
                        name: result.value?.eventname,
                        eventDate: result.value?.eventdate,
                        eventFrom: result.value?.eventfrom,
                        eventTo: result.value?.eventto,
                    })
                        .then(() => {
                            this.event.updateEvent(eventId, result.value?.eventname, result.value?.eventdate, result.value?.eventfrom, result.value?.eventto);
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
                                title: 'Event updated'
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
                <div class="text-center text-danger" v-if="errorMessage">
                    <h6>{{ errorMessage }}</h6>
                </div>
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
                        @click="createEvent()"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                            fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path
                                d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                            <path fill-rule="evenodd"
                                d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
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
                                @click="updateEvent(eventt.id, eventt.name, eventt.eventDate, eventt.eventFrom, eventt.eventTo)"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-pencil-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
                                </svg> Edit</button></td>
                        <td><button type="button" class="btn btn-danger" @click="deleteEvent(eventt.id, eventt.name)"><svg
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg> Delete</button></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style></style>
