<template>
    <li>
        <button
            :href="info.link"
            :class="{
                'flex items-center': show,
                'grid justify-items-center': !show,
                'p-2 rounded-lg w-full': true,
                'hover:bg-info/50': true,
            }"
        >
            <img class="w-6 h-6" :src="info.svg" />
            <span
                :class="{
                    'ms-3': show,
                    'text-sm': !show,
                }"
                >{{ info.title }}</span
            >
        </button>
    </li>
</template>


<script>
export default {
    props: {
        show: Boolean,
        info: Object,
    },
    data() {
        return {
            svg: "",
        };
    },
    async mounted() {},
};
</script>