<template>
    <nav
        class="z-50 w-full navbar sticky top-0 left-0 flex justify-between"
        style="backdrop-filter: blur(10px)"
    >
        <div class="flex w-56 mr-5">
            <div class="flex-none justify-start">
                <div class="btn btn-ghost btn-circle" @click="toggleShow">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6   w-7"
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
                    class="text-4xl font-semibold hover:text-sky-500 select-none"
                    >Valton</span
                >
            </div>
        </div>
        <div class="relative flex items-center w-1/3">
            <form class="flex items-center w-full" action="/search" method="GET">
            <input
                type="search"
                id="default-search"
                class="input rounded-full input-bordered rounded-r-none w-full h-11 hover:border-sky-500 focus:border-sky-800"
                placeholder="Search for collections, NFTs, etc."
            />
            <button
                type="submit"
                class="bg-sky-500 hover:bg-sky-600 text-white font-medium rounded-r-full px-5 py-2"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-7 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fill-rule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clip-rule="evenodd"
                    />
                </svg>
            </button>
        </form>
        </div>

        <div class="ml-5">
            <div v-if="isConnected ">
                <div v-if="isLoggedIn" class="flex mr-5">
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
                            <span class="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                    </button>
                    <div class="avatar w-12 mask mask-circle">
                        <img
                            :src="account.avatar"
                            :alt="account.name"
                        />
                    </div>
                </div>
                <div v-else>
                    <button class="btn btn-primary w-56 text-lg" @click="openConnect">
                        Connect Wallet
                    </button>
                </div>
            </div>
            <div v-else>
                <progress class="progress progress-info w-56"></progress>
            </div>
        </div>
    </nav>
</template>



<script >
import { TonConnectUI } from "@tonconnect/ui";

export default {
    setup() {},
    props: {
        show: Boolean,
    },
    data() {
        return {
            isLoggedIn: false,
            isConnected: false,
        };
    },
    methods: {
        toggleShow() {
            this.$emit("update-show", !this.show);
        },
        openConnect() {
            this.$nuxt.tonConnect.openModal();
        },
    },
    async mounted() {
        this.isLoggedIn = await this.$nuxt.tonConnect.connected;
        this.$nuxt.tonConnect.onStatusChange(async (walletInfo) => {
            this.isLoggedIn = this.$nuxt.tonConnect.connected;
            if (this.isLoggedIn) {
                try {
                    const { user, token } = await api("/auth/login", "POST", {
                            ...walletInfo.account,
                            proof: walletInfo.connectItems.tonProof.proof,
                        })
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', JSON.stringify(user))
                } catch {
                    alert("Время токена вышло обновите страницу!")
                    this.$nuxt.tonConnect.disconnect()
                }
            }
        });
        this.isConnected = true;
    },
};
</script>
