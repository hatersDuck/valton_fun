<template>
    <div class="tabs tabs-boxed flex md:gap-7 bg-neutral/75 h-16 items-center w-max">
        <a
            v-for="tab in tabs"
            :key="tab.name"
            :class="[
                [tab.name == selectedElement.name ? 'tab-active' : ''],
                'tab font-bold text-base ml-2.5 ',
            ]"
            @click="selectedElement = tab"
            >{{ tab.name }} {{ tab.counter }}</a
        >
    </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps({
    tabs: Array,
});

const tabs = props.tabs;
const selectedElement = ref(tabs[0]);
</script>