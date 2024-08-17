<template>
    <div>
        <nav class="z-50 w-full navbar flex justify-between">
            <div class="flex">
                <div
                    class="flex flex-none items-center justify-start rtl:justify-end"
                >
                    <div
                        tabindex="0"
                        role="button"
                        class="btn btn-ghost btn-circle"
                        @click="show=!show"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </div>
                    <span
                        class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"
                        >Valton</span
                    >
                </div>
            </div>
            <div class="relative">
                <input
                    type="search"
                    id="default-search"
                    class="input input-bordered w-96 rounded-full"
                    placeholder="Search for collections, NFTs, etc."
                />
                <button
                    type="submit"
                    class="text-white absolute end-2 bottom-1.5 bg-slate-800 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm px-4 py-2"
                >
                    /
                </button>
            </div>
            <div class="flex mr-5">
                <button class="btn btn-ghost btn-circle mr-2.5">
                    <div class="indicator">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-7 w-7"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                        </svg>
                        <span
                            class="badge badge-xs badge-primary indicator-item"
                        ></span>
                    </div>
                </button>
                <div class="avatar">
                    <div class="w-12 mask mask-circle">
                        <img
                            src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        />
                    </div>
                </div>
            </div>
        </nav>
        <div class="flex">
            <aside
                :class="{
                    'z-40': true,
                    'w-64': show,
                    'w-32': !show,
                    'h-screen': true,
                    'pt-2.5': true,
                }"
            >
                <div class="h-full px-3 pb-4 overflow-y-auto text-white">
                    <ul class="space-y-2">
                        <MySideTitle
                            :info="info"
                            :show="show"
                            v-for="info in sideLi.mainLis"
                            :key="info.title"
                        ></MySideTitle>
                        <div v-if="show">
                            <div
                                v-for="category in sideLi.secondary"
                                :key="category.title"
                            >
                                <hr />
                                <p class="menu-title text-xl text-slate-50">
                                    {{ category.title }}
                                </p>
                                <MySideTitle
                                    :info="info"
                                    :show="show"
                                    v-for="info in category.lis"
                                    :key="info.title"
                                ></MySideTitle>
                            </div>
                        </div>
                    </ul>
                </div>
            </aside>
            <main class="flex-1"></main>
        </div>
    </div>
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
                    title: "Create Insurance",
                },
                {
                    svg: "/icons/home.svg",
                    link: "",
                    title: "Create Colleciton",
                },
                {
                    svg: "/icons/home.svg",
                    link: "",
                    title: "Create NFT",
                },
            ],
        },
    ],
};
</script>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
};
</script>
