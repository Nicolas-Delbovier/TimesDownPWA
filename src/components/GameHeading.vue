<script setup>

defineProps({
    round: {
        type: Number,
        required: true,
    },
    roundTypeLabel: {
        type: [String],
        required: true
    },

});
</script>

<template>
    <div id="round-title" class="flex flex-col items-center justify-center mt-8">
        <span class="font-medium text-3xl ">
            Manche {{ round }}
        </span>
        <span class="mt-1">
            ({{ roundTypeLabel }})
        </span>
    </div>
</template>

<style scoped></style>