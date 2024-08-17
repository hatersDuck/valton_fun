<template>
    <button :class="[
                'btn btn-ghost bg-primary rounded-xl mr-3 h-10 mt-2',
                [isActive ? 'bg-white' : ''],

            ]">
        <span class="select-none text-black text-l ">
            {{ title }}
        </span>
    </button>
</template>

<script>
export default {
    props: {
        title: String,
        isActive: Boolean
    },
};
</script>