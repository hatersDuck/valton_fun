<template>
    <div class="grid grid-cols-12 place-content-center w-full">
        <div class="col-start-2 col-span-10 sticky w-full">
            <img
                class="rounded-2xl w-full object-cover h-64"
                :src="collection.banner"
            />
        </div>
        <div class="col-start-2 col-span-10 w-full min-h-96 mt-5">
            <div class="card card-compact shadow-xl">
                <div class="mb-5 w-2/3 rounded-xl">
                    <div class="flex w-full">
                        <div class="avatar">
                            <div class="w-40 rounded-full">
                                <img :src="collection.avatar" />
                            </div>
                        </div>
                        <div class="ml-10">
                            <p class="text-white text-5xl font-extrabold">{{ collection.name }}</p>
                            <p class="flex mt-1">
                               <a class="hover:underline hover:text-white" :href="'https://tonviewer.com/' + collection.address">@{{ collection.address.slice(0, 5) + '...' + collection.address.slice(-3) }}</a> &nbsp;‧ 
                               {{ collection.owners }} owners ‧ {{ collection.count_nfts }} nfts
                            </p>
                            <p class="flex">
                                Insurance: {{ collection.secure }}%
                            </p>
                            <p class="flex">
                                Volume: 
                                <svg class="mt-0.5" width="16" height="20" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.702 2.15h6.596c.42 0 .787 0 1.08.027.296.027.639.09.936.304.4.288.66.732.715 1.222.041.365-.072.694-.194.966-.12.268-.3.587-.506.954l-4.675 8.311a.75.75 0 0 1-1.308 0L2.688 5.652l-.017-.03c-.206-.366-.386-.685-.506-.953-.121-.272-.235-.601-.194-.966a1.75 1.75 0 0 1 .715-1.222c.297-.215.64-.277.937-.304.292-.027.658-.027 1.079-.027zM3.554 3.705a.25.25 0 0 0-.09.154.956.956 0 0 0 .07.197c.089.197.233.456.46.86l3.256 5.788V3.65H4.736c-.465 0-.761 0-.976.02a.955.955 0 0 0-.206.035zM8.75 3.65v7.054l3.255-5.787c.228-.405.372-.664.46-.86a.948.948 0 0 0 .072-.198.25.25 0 0 0-.09-.154.956.956 0 0 0-.207-.034c-.215-.02-.511-.021-.976-.021H8.75z" fill="currentColor"></path></svg>
                                {{ (collection.volume/1000).toFixed(1) }}K ~ ${{ (collection.volume*5/1000).toFixed(1) }}K ‧ last sale: {{ collection.last_buy }}
                            </p>
                            <div class="rating">
                                Rating owners:
                                <input type="radio" name="rating-9" class="rating-hidden" />
                                <input type="radio" name="rating-9" class="mask mask-star-2" />
                                <input type="radio" name="rating-9" class="mask mask-star-2" checked />
                                <input type="radio" name="rating-9" class="mask mask-star-2" />
                                <input type="radio" name="rating-9" class="mask mask-star-2" />
                                <input type="radio" name="rating-9" class="mask mask-star-2" />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
            <div role="tablist" class="tabs tabs-boxed">
                <a role="tab" class="tab">Главная</a>
                <a role="tab" class="tab tab-active">Рынок</a>
                <a role="tab" class="tab">Сообщество</a>
                <a role="tab" class="tab">Статистика</a>
            </div>
            
            <div class="col-start-4 col-span-8 w-full min-h-96 mt-5">
            <div class="flex gap-5 flex-wrap mt-5 ml-2.5">
                <div v-for="nft in nfts" :key="nft.name">
                    <MyNftBuyCard
                        :collection="nft.collection"
                        :name="nft.name"
                        :price="nft.price"
                        :image="nft.image"
                    />
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
const collection =     {
        name: "Boruto every day",
        volume: 222000,
        banner: "https://tvalagoas.com.br/hf-conteudo/uploads/posts/2023/03/23805_0070b0b865e760c15d3d59f329494e27.jpg",
        avatar: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.fWjuhFPaAAbbnXW9-nRjMAHaHa%26pid%3DApi&f=1&ipt=6a24a7331c7bce82ad3461a9d224c51ee31bf92263244f0c53a80ed3f79413ff&ipo=images",
        address: "EQDmkj65Ab_m0aZaW8IpKw4kYqIgITw_HRstYEkVQ6NIYCyW",
        owner: "EQDtU7yZnlpK9po_nD3lN299kMSH4VKPMx5xbb6FkD1REsF3",
        last_buy: "1h ago",
        owners: 100,
        secure: 20,
        count_nfts: 222,
        description: "Best collection for fun Boruto. Just for fun."
    }
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
</script>