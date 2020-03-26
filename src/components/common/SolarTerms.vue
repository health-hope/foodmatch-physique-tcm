<template>
    <div class="solar" :style="{backgroundImage:`${list[code - 1].gcolor}`}">
        <div class="solar-c" :style="{border: `1px solid ${list[code - 1].bcolor}`}">
            <header>{{ list[code - 1].name }}</header>
            <p>{{content}}</p>
            <img :src="`0/solar/${code}.png`"/>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            list: [
                {name:'立春', bcolor:'#B5E19B', gcolor:'linear-gradient(269deg, #E0EED1 0%, #D4EDC5 100%)'},
                {name:'雨水', bcolor:'#B5E19B', gcolor:'linear-gradient(269deg, #E0EED1 0%, #D4EDC5 100%)'},
                {name:'惊蛰', bcolor:'#A3DCAA', gcolor:'linear-gradient(269deg, #D3ECD5 0%, #C9EACD 100%)'},
                {name:'春分', bcolor:'#A3DCAA', gcolor:'linear-gradient(269deg, #D3ECD5 0%, #C9EACD 100%)'},
                {name:'清明', bcolor:'#AADFC6', gcolor:'linear-gradient(269deg, #D1EFE1 0%, #C3EAD8 100%)'},
                {name:'谷雨', bcolor:'#AADFC6', gcolor:'linear-gradient(269deg, #D1EFE1 0%, #C3EAD8 100%)'},
                {name:'立夏', bcolor:'#DAB7D7', gcolor:'linear-gradient(269deg, #EDD5E9 0%, #E5CAD8 100%)'},
                {name:'小满', bcolor:'#DAB7D7', gcolor:'linear-gradient(269deg, #EDD5E9 0%, #E5CAD8 100%)'},
                {name:'芒种', bcolor:'#DEB1C0', gcolor:'linear-gradient(269deg, #EBD3DA 0%, #EBC5D2 100%)'},
                {name:'夏至', bcolor:'#DEB1C0', gcolor:'linear-gradient(269deg, #EBD3DA 0%, #EBC5D2 100%)'},
                {name:'小暑', bcolor:'#E3A2A2', gcolor:'linear-gradient(269deg, #EFCBCB 0%, #EDC1C1 100%)'},
                {name:'大暑', bcolor:'#E3A2A2', gcolor:'linear-gradient(269deg, #EFCBCB 0%, #EDC1C1 100%)'},
                {name:'立秋', bcolor:'#E6B18E', gcolor:'linear-gradient(269deg, #F0D0BD 0%, #F1CBB2 100%)'},
                {name:'处暑', bcolor:'#E6B18E', gcolor:'linear-gradient(269deg, #F0D0BD 0%, #F1CBB2 100%)'},
                {name:'白露', bcolor:'#E4C397', gcolor:'linear-gradient(269deg, #F1DFBC 0%, #F0D7B4 100%)'},
                {name:'秋分', bcolor:'#E4C397', gcolor:'linear-gradient(269deg, #F1DFBC 0%, #F0D7B4 100%)'},
                {name:'寒露', bcolor:'#E0CD91', gcolor:'linear-gradient(269deg, #E6E0AB 0%, #EBDCAE 100%)'},
                {name:'霜降', bcolor:'#E0CD91', gcolor:'linear-gradient(269deg, #E6E0AB 0%, #EBDCAE 100%)'},
                {name:'立冬', bcolor:'#BED5F0', gcolor:'linear-gradient(269deg, #D0E4F6 0%, #D1E3F7 100%)'},
                {name:'小雪', bcolor:'#BED5F0', gcolor:'linear-gradient(269deg, #D0E4F6 0%, #D1E3F7 100%)'},
                {name:'大雪', bcolor:'#B9C6EE', gcolor:'linear-gradient(269deg, #D4DCF0 0%, #CBD3F0 100%)'},
                {name:'冬至', bcolor:'#B9C6EE', gcolor:'linear-gradient(269deg, #D4DCF0 0%, #CBD3F0 100%)'},
                {name:'小寒', bcolor:'#AFD5EC', gcolor:'linear-gradient(269deg, #D3E5EF 0%, #C8E0EE 100%)'},
                {name:'大寒', bcolor:'#AFD5EC', gcolor:'linear-gradient(269deg, #D3E5EF 0%, #C8E0EE 100%)'}
            ],
        }
    },
    props: {
        code: {             // 对应24节气
            type: String,
            default: "1"
        },
        content: {
            type: String,
            default: ""
        }
    }
}
</script>
<style lang="scss" scoped>
.solar {
    width: 15.65rem /* 626/40 */;
    min-height: 5.15rem /* 206/40 */;
    padding: .25rem /* 10/40 */;
    box-sizing: border-box;
    transform: scaleX(-1);
    .solar-c {
        transform: scaleX(-1);
        width: 100%;
        height: 100%;
        min-height: 4.65rem /* 186/40 */;
        padding: .55rem /* 22/40 */;
        box-sizing: border-box;
        position: relative;
        z-index: 22;
        img {
            width: 3.65rem;
            height:3.65rem;
            position: absolute;
            z-index: 2;
            right: .95rem /* 38/40 */;
            top: .55rem /* 22/40 */;
        }
        header {
            font-family: "SourceHanSerifCN-Bold";
            font-size: 1rem /* 40/40 */;
            color: #333333;
            letter-spacing: 0;
            line-height: 1.4rem /* 56/40 */;
            margin-bottom: .2rem /* 8/40 */;
        }
        p {
            font-size: .7rem /* 28/40 */;
            color: rgba(51,51,51,0.60);
            letter-spacing: 0;
            line-height: 1.1rem /* 44/40 */;
            word-break: break-all;
            position: relative;
            z-index: 22;
        }
    }
}
</style>