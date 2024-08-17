<template>
    <div class="card card-compact w-96 bg-base-100 shadow-xl bg-neutral/50 text-white transition-all duration-100 ease-in-out group" style="transform-origin: center;">
        <figure class="max-h-48 group-hover:scale-105"><img :src="image" :alt="title" /></figure>
        <div class="card-body bg-neutral rounded-b-2xl group-hover:scale-105">
            <h2 class="card-title">{{ title }}</h2>
            <p >{{ description }}</p>
            <div class="card-actions justify-between">
                <div>
                    <span class="flex">
                        Volume: 
                        <svg class="mt-0.5" width="16" height="16" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.702 2.15h6.596c.42 0 .787 0 1.08.027.296.027.639.09.936.304.4.288.66.732.715 1.222.041.365-.072.694-.194.966-.12.268-.3.587-.506.954l-4.675 8.311a.75.75 0 0 1-1.308 0L2.688 5.652l-.017-.03c-.206-.366-.386-.685-.506-.953-.121-.272-.235-.601-.194-.966a1.75 1.75 0 0 1 .715-1.222c.297-.215.64-.277.937-.304.292-.027.658-.027 1.079-.027zM3.554 3.705a.25.25 0 0 0-.09.154.956.956 0 0 0 .07.197c.089.197.233.456.46.86l3.256 5.788V3.65H4.736c-.465 0-.761 0-.976.02a.955.955 0 0 0-.206.035zM8.75 3.65v7.054l3.255-5.787c.228-.405.372-.664.46-.86a.948.948 0 0 0 .072-.198.25.25 0 0 0-.09-.154.956.956 0 0 0-.207-.034c-.215-.02-.511-.021-.976-.021H8.75z" fill="currentColor"></path></svg>
                        {{ (volume/1000).toFixed(1) }}K ~ ${{ (volume*5/1000).toFixed(1) }}K
                    </span>
                    <span>
                        Last buy {{ last_buy }}
                    </span>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="40" :style="{ fill: `hsl(${secure * 1.6}, 100%, 50%)` }" class="bi bi-shield-lock-fill" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd" d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"/>
                </svg>
            </div>
        </div>
        </div>
</template>

<script>
export default {
    props:{
        title: String,
        volume: Number,
        image: String,
        secure: Number,
        last_buy: String,
        description: String
    }
}
</script>