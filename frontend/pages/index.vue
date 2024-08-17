<template>
    <TheBody class="w-full" :login="login"></TheBody>
</template>

<script setup>
</script>

<script>

export default {
    data() {
        return {
            login: false,
        };
    },
    methods: {
        changeLogin(login) {
            this.login = login;
        },
    },
};
</script>

<style>
</style>