<template>
    <button @click="first" class="btn">Test1</button>
</template>

<script>
export default defineComponent({
    data(){
        return{}
    },

    methods: {
        async first(){
            this.$nuxt.tonConnect.disconnect()
        }
    }
})
</script>
