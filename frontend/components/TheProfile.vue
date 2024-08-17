<template>
    <div class="grid grid-cols-12 place-content-center w-full">
        <div class="col-start-1 col-span-11">
            <div class="sticky w-full h-1/3">
                <img
                    class="rounded-2xl w-full object-cover h-52"
                    src="https://mir-s3-cdn-cf.behance.net/e8572d7c2adc7cdcf4ed29f251b48d85/1e0313cb-170e-498f-800c-6515e03722ac_rwc_0x626x3840x638x3840.jpeg?h=434a2e43df4c46f8b281ad6b539eed69"
                />
                <div class="absolute top-36 left-10">
                    <MyCard></MyCard>
                    <div class="mt-5">
                        <MyFilterCard></MyFilterCard>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-start-4 col-span-8 w-full min-h-96 mt-5">
            <MyTabs :tabs="tabs"></MyTabs>
            <div class="flex gap-5 flex-wrap mt-5 ml-2.5">
                <div v-for="nft in nfts" :key="nft.name">
                    <MyNftCard
                        :collection="nft.collection"
                        :name="nft.name"
                        :price="nft.price"
                        :image="nft.image"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const nfts = [
    {
        collection: "Boruto every day",
        name: "Boruto #432",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
        onSale: true,
        inFavorites: true,
    },
    {
        collection: "Boruto every day",
        name: "Boruto #433",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
    },
    {
        collection: "Boruto every day",
        name: "Boruto #434",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
    },
    {
        collection: "Boruto every day",
        name: "Boruto #435",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
    },
    {
        collection: "Boruto every day",
        name: "Boruto #436",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
    },
    {
        collection: "Boruto every day",
        name: "Boruto #437",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
    },
];
const tabs = [
    {
        name: "Owned",
        counter: 5,
    },
    {
        name: "On sale",
        counter: 0,
    },
    {
        name: "Favorites",
        counter: 0,
    },
    {
        name: "Collections",
        counter: 1,
    },
];
</script>

<script>
export default {
    props: {
        login: Boolean,
    },
};
</script>

<style>
</style>