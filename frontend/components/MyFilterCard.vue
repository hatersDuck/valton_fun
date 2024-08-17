<template>
    <div class="flex flex-col w-full bg-neutral/75 rounded-xl px-5 py-5">
        <div>
            <h1 class="text-white text-2xl font-bold">Filters</h1>
        </div>
        <br />
        <div class="mt-5">
            <h1 class="text-white text-2xl font-bold">Price range</h1>
            <div class="flex gap-5 mt-5">
                <input
                    type="number"
                    class="relative w-full rounded-xl bg-transparent text-white border-2 transition-all focus:border-sky-400 border-gray-500 py-2 pl-3 pr-10 text-left focus:outline-none"
                    placeholder="From"
                />
            </div>
        </div>
    </div>
</template>