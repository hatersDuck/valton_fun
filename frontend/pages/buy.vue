<template>
    <div class="flex justify-center">
        <div class="w-1/2">
            <img :src="nft.image" class="w-full h-full rounded-xl object-cover scale-95">
        </div>
        <div class="mt-10">
        <div class="w-auto rounded-xl p-5 bg-neutral/75">
            <h2 class="text-2xl font-bold">{{ nft.name }}</h2>
            <p class="text-gray-600 mt-3">{{ nft.collection }}</p>
            <div class="flex mt-5">
                <button class="btn btn-gray mr-5">Add to watchlist</button>
                <button class="btn btn-gray">Add to collection</button>
            </div>
            <div class="flex mt-5">
                <p class="text-xl font-bold">Price</p>
                <p class="text-xl font-bold ml-auto">${{ nft.price }}</p>
            </div>
            <div class="mt-10">
                <button class="btn btn-primary w-full">Buy Now</button>
            </div>
        </div>
        <div class="mt-10 bg-neutral/75 rounded-xl p-5 ">
            <div class="text-sm text-white-600 mb-2">
                Statistic
            </div>
            <div class="flex">
                <div class="flex-1">
                    <p class="text-xl text-primary font-bold">10 sold</p>
                    <p class="text-sm text-white-600">This week</p>
                </div>
                <div class="flex-1">
                    <p class="text-xl text-primary font-bold">100 views</p>
                    <p class="text-sm text-white-600">This week</p>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script setup>
const nft = {
        collection: "Boruto every day",
        name: "Boruto #432",
        price: 0.01,
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
}
</script>