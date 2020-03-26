<template>
    <!-- better-scroll作用于子元素，所以要有一层wrapper封装 -->
    <div ref="wrapper" class="wrapper">
        <slot></slot>
    </div>
</template>

<script>
    import BScroll from 'better-scroll'
    export default {
        //props中所涉及属性的作用自行查看better-scroll文档
        data() {
            return {
                scroll: null
            }
        },
        props: {
            probeType: {
                type: Number,
                default: 1
            },
            click: {
                type: Boolean,
                default: true
            },
            data: {
                default: null
            },
            scrollX: {
                type: Boolean,
                default: false
            },
            scrollY: {
                type: Boolean,
                default: false
            }
        },
        mounted() {
            setTimeout(() => {
                this._initScroll()
            }, 20)
        },
        methods: {
            //初始化滚动组件
            _initScroll() {
                if (!this.$refs.wrapper) {
                    return
                }
                this.scroll = new BScroll(this.$refs.wrapper, {
                    probeType: this.probeType,
                    click: this.click,
                    scrollX: this.scrollX,
                    scrollY: this.scrollY
                })
                this.$emit('example',this.scroll)
            },
            //所使用到的函数作用自行查看文档 
            enable() {
                this.scroll && this.scroll.enable()
            },
            disable() {
                this.scroll && this.scroll.disable()
            },
            refresh() {
                this.scroll && this.scroll.refresh()
            }
        },
        watch: {
            //观察传入的数据，一旦数据发生变化，重新渲染滚动组件
            data() {
                setTimeout(() => {
                    this.refresh()
                }, 20);
            }
        }
    }
</script>
<style lang="scss" scoped>
.wrapper {
    overflow: hidden;
}
</style>
