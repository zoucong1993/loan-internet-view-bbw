<template>
    <div class="w"
         :id="id"
         :ref="id"
         :style="offsetStyle"
         :data-type="nodeItem.type"
         :data-text="nodeItem.nodeName"
         @mouseup="handleMouseUp"
         @click.stop="handleClick">
        <i :class="['icon', nodeItem.type]"></i>
        <span class="text">{{nodeItem.nodeName}}</span>
        <i class="ep"></i>
        <i class="el-icon-circle-close" @click.stop="delConnections"></i>
    </div>
</template>

<script>
    // 连线颜色
    const LINE_COLOR = '#C3CCD6';
    // 连线宽度
    const LINE_WIDTH = 2;
    // 选中所有节点的 `选择器`
    const NODE_SELECTOR = '.statemachine .w';
    // 每个节点的最大 向外 连线数量
    const MAX_CONNECTIONS = 999;
    // 排除节点拖拽干扰，可向外连线的点
    const LINE_POINT = '.ep';
    export default {
        name: "NodeElement",
        props: {
            index: {
                type: Number
            },
            instance: {
                type: Object,
                default: function(){
                    return {}
                },
                required: true
            },
            itemData: {
                type: Object,
                default: function(){
                    return {}
                }
            }

        },
        computed: {
            offsetStyle(){
                return {left: this.itemData.left, top: this.itemData.top}
            },
            nodeItem(){
                return this.itemData
            },
            id(){
                return this.itemData.id
            },
            clicked(){
                return this.itemData.clicked
            }
        },
        mounted(){
            let thisEle = this.$refs[this.id];
            this.initNode(thisEle);
        },
        methods: {
            initNode(el){
                this.instance.draggable(el);

                this.instance.makeSource(el, {
                    filter: LINE_POINT,
                    anchor: "Continuous",
                    connectorStyle: { stroke: LINE_COLOR, strokeWidth: LINE_WIDTH, outlineStroke: "transparent", outlineWidth: 1 },
                    connectionType:"basic",
                    extract:{
                        "action":"the-action"
                    },
                    maxConnections: MAX_CONNECTIONS,
                    // onMaxConnections: function (info, e) {
                    //     alert("Maximum connections (" + info.maxConnections + ") reached");
                    // }
                });

                this.instance.makeTarget(el, {
                    dropOptions: { hoverClass: "dragHover" },
                    anchor: "Continuous",
                    allowLoopback: false
                });

                this.instance.fire("jsPlumbDemoNodeAdded", el);
            },
            delConnections(){
                this.$emit('del', this.index, this.$refs[this.id])
            },
            handleClick(){
                Array.from(jsPlumb.getSelector(NODE_SELECTOR)).forEach(val => {
                    if(this.hasClass(val, 'clicked')){
                        this.removeClass(val, 'clicked')
                    }
                })
                this.addClass(this.$refs[this.id], 'clicked')
                this.$emit('click')
            },
            handleMouseUp(){
                let ele = this.$refs[this.id];
                this.nodeItem.left = ele.offsetLeft + 'px';
                this.nodeItem.top = ele.offsetTop + 'px';
                this.$emit('mouseup', this.index, this.nodeItem)
            },
            hasClass(el, className) {
                let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
                return reg.test(el.className)
            },

            addClass(el, className) {
                if (this.hasClass(el, className)) {
                    return
                }

                let newClass = el.className.split(' ')
                newClass.push(className)
                el.className = newClass.join(' ')
            },
            removeClass(el, className) {
                if (!this.hasClass(el, className)) {
                    return
                }

                let reg = new RegExp('(^|\\s)' + className + '(\\s|$)', 'g')
                el.className = el.className.replace(reg, ' ')
            }
        }
    }
</script>

<style scoped>

</style>