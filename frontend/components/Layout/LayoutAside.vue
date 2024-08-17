<template>
    <aside
        :class="{
            'z-40': true,
            'w-48': show,
            'w-32': !show,
            'h-full': true,
            'pt-2.5': true,
        }"
    >
        <div class="h-full px-3 pb-2 overflow-y-auto text-white">
            <ul class="space-y-2">
                <LayoutAsideTitle
                    :info="info"
                    :show="show"
                    v-for="info in sideLi.mainLis"
                    :key="info.title"
                ></LayoutAsideTitle>
                <div v-if="show">
                    <div
                        v-for="category in sideLi.secondary"
                        :key="category.title"
                    >
                        <hr />
                        <p class="menu-title text-xl text-slate-50">
                            {{ category.title }}
                        </p>
                        <LayoutAsideTitle
                            :info="info"
                            :show="show"
                            v-for="info in category.lis"
                            :key="info.title"
                        ></LayoutAsideTitle>
                    </div>
                </div>
            </ul>
        </div>
        
    </aside>
</template>

<script setup>
const sideLi = {
    mainLis: [
        {
            svg: "/icons/home.svg",
            link: "",
            title: "Home",
        },
        {
            svg: "/icons/collection.svg",
            link: "",
            title: "Collections",
        },
        {
            svg: "/icons/home.svg",
            link: "",
            title: "Mint",
        },
    ],
    secondary: [
        {
            title: "Create",
            lis: [
                {
                    svg: "/icons/home.svg",
                    link: "",
                    title: "Insurance",
                },
                {
                    svg: "/icons/home.svg",
                    link: "",
                    title: "Colleciton",
                },
                {
                    svg: "/icons/home.svg",
                    link: "",
                    title: "NFT",
                },
            ],
        },
    ],
};
</script>

<script>
export default {
    props: {
        show: Boolean
    }
};
</script>