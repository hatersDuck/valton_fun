<template>
    <div>
        <LayoutNav :show="showAside" @update-show="updateShowAside"></LayoutNav>
        <div class="flex">
            <LayoutAside :show="showAside"></LayoutAside>
            <main class="flex w-full">
                <div class="bg-default w-full overflow-x-hidden">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
    name: "default",
    props: {
    },
    data() {
        return {
            showAside: false
        };
    },
    methods: {
        updateShowAside(){
            this.showAside = !this.showAside
        }
    },
});
</script>
