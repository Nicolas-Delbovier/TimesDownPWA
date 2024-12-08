<template>
    <div id="main">
        Theme selection
        <span>{{ cards }}</span>
    </div>
</template>

<script>
export default {
    props: ['cards']

}
</script>

<style scoped>
#main {
    text-align: center;
    background: rgb(188, 230, 188);
}
</style>