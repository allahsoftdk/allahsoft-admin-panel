<script lang="ts">
import { useUserStore } from '@/stores/user'; 
export default {
    props:["id"],
    setup() {
        const userStore = useUserStore();
        return { userStore }
    },
    methods: {},
};
</script>

<template>
    <div class="row p-3">
        <div class="col-12">
            <div class="row p-2 bg-light shadow border">
                <div class="col-3 text-center">
                    <h3>Name: {{ userStore.getUserById(1)?.name }}</h3>
                </div>
                <div class="col-3 text-center">
                    <h3>Email: {{ userStore.getUserById(1)?.email }}</h3>
                </div>
                <div class="col-3 text-center">
                    <h3>Role: {{ userStore.getUserById(1)?.role.role }}</h3>
                </div>
                <div class="col-3 text-center">
                    <h3>Created at: {{ userStore.getUserById(1)?.createdAt}}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<style>

</style>
