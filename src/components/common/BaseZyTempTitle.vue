<template>
    <div class="tit-box" :style="{backgroundImage: `url(${bgClass}.png)`}  | PUBLIC_PATH">
        {{tempTitle}}
    </div>
</template>
<script>
export default {
    props: {
        bgClass: {
            type: String,
            default: 'jgy_bg_1'
        },
        tempTitle: {
            type: String,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/mixin.scss";
.tit-box {
    height: 2.2rem;
    display: flex;
    align-items: center;
    padding: 0 1.05rem;
    font-size: 0.85rem;
    background-size: 100% 100%;
    @include font_color6();
    font-weight: bold;
}
</style>