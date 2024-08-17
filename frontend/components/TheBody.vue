<template>
    <div class="ml-10">
        <div class="flex" >
            <div v-for="(category, index) in categoryes" :key="index">
                <BtnCategory v-if="category" :title="category" :isActive="index === ActiveTab"/>
            </div>
        </div>

        <div class="col-start-4 col-span-8 w-full min-h-96 mt-5">
            <div class="flex gap-5 flex-wrap mt-5 ml-2.5">
                <div class="mr-6" v-for="collection in collections" :key="collection.name">
                    <MyCollectionCard
                        :title="collection.name"
                        :volume="collection.volume"
                        :image="collection.image"
                        :secure="collection.secure"
                        :last_buy="collection.last_buy"
                        :description="collection.description"
                    />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
const categoryes = [
    'Все', 'Лучшие', 'Игры', 'Бренды', 'С заработком', 'Прочее'
]
const collections = [
    {
        name: "Boruto every day",
        volume: 222000,
        image: "https://tvalagoas.com.br/hf-conteudo/uploads/posts/2023/03/23805_0070b0b865e760c15d3d59f329494e27.jpg",
        last_buy: "1h ago",
        secure: 20,
        description: "Best collection for fun Boruto. Just for fun."
    },
    {
        name: "Shoes colleciton",
        volume: 222423,
        image: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg",
        last_buy: "1h ago",
        secure: 100,
        description: "Run and make money."
    },
    {
        name: "Boruto every night",
        volume: randomInteger(5000, 100000),
        image: "https://avatars.githubusercontent.com/u/100941986?v=4",
        last_buy: randomTimeAgo(),
        secure: randomInteger(5, 100),
        description: "Best collection for fun Boruto. With money."
    },
    {
        name: "Naruto games",
        volume: randomInteger(5000, 100000),
        image: "http://3.bp.blogspot.com/_3sU0MnRawMI/TRlEybg69hI/AAAAAAAADHI/ZrA-5XywmGs/s1600/naruto-shippuden%2B7.jpg",
        last_buy: randomTimeAgo(),
        secure: randomInteger(5, 100),
        description: "Best collection for fun Naruto. Just for games."
    },
    {
        name: "Naruto brand",
        volume: randomInteger(5000, 100000),
        image: "https://wallpapertag.com/wallpaper/full/7/2/b/710425-cool-naruto-wallpapers-hd-2560x1600-for-ipad-pro.jpg",
        last_buy: randomTimeAgo(),
        secure: randomInteger(5, 100),
        description: "Best collection for fun Naruto. Just for fun."
    },
    {
        name: "Naruto with money",
        volume: randomInteger(5000, 100000),
        image: "https://www.animenewsnetwork.com/thumbnails/crop600x315/cms/the-list/105504/naruto-money.jpg",
        last_buy: randomTimeAgo(),
        secure: randomInteger(5, 100),
        description: "Best collection for fun Naruto. With money."
    },
]

function randomTimeAgo() {
    const times = [
        '1h ago',
        '2h ago',
        '5h ago',
        '10h ago',
        '1d ago',
        '2d ago',
        '5d ago',
        '1w ago'
    ];

    return times[Math.floor(Math.random() * times.length)];
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
</script>

<script>
export default {
    data() {
        return {
            ActiveTab: 0
        };
    },
    methods: {
    },
    props: {
        login: Boolean,
    },
};
</script>

<style>
</style>