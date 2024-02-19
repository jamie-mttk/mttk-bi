<template>
    <div class="drag-container"  :class="panelClass"  @dragover.prevent.stop="detecting" @mousedown.prevent.stop="laryerMouseDown" @mousemove="laryerMouseMove"
        @mouseup="laryerMouseUp" @drop.prevent.stop="handleDropFromPallet">

        <GridRect v-if="showGrid" :grid="gridWidth"></GridRect>
        <div v-for="item in $props.modelValue" class="drag-container-item"
            :class="{ 'drag-container-item-active': isItemChoosed(item) }" :style="dragContainerItemStyle(item)"
            :key="item.key" @mousedown="handleMouseDown($event, item)">

            <lcWrap :modelValue="item"></lcWrap>

            <!-- Draw the resize points of the current item -->
            <div @mousedown.stop="resizeMousedown(item, $event, 'resize-lt')
                " v-if="isItemChoosed(item)" class="resize-icon resize-left-top">
            </div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-lc')
                " v-if="isItemChoosed(item)" class="resize-icon resize-left-center"></div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-lb')
                " v-if="isItemChoosed(item)" class="resize-icon resize-left-bottom"></div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-rt')
                " v-if="isItemChoosed(item)" class="resize-icon resize-right-top">
            </div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-rc')
                " v-if="isItemChoosed(item)" class="resize-icon resize-right-center"></div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-rb')
                " v-if="isItemChoosed(item)" class="resize-icon resize-right-bottom"></div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-ct')
                " v-if="isItemChoosed(item)" class="resize-icon resize-center-top">
            </div>
            <div @mousedown.stop="
                resizeMousedown(item, $event, 'resize-cb')
                " v-if="isItemChoosed(item)" class="resize-icon resize-center-bottom"></div>

        </div>
    </div>
</template>
<script lang="ts" setup>
import { computed, ref, inject } from 'vue'
import { setByPath } from '@/utils/pathUtil'
import {cloneComponent} from './PanelUtil'
import lcWrap from '../wrap/index.vue'
import GridRect from './GridRect.vue'
import useDropDetect from './dropDetect'


const props = defineProps({
    //Components list to display in the canvas
    modelValue: {
        type: Array,
        default() {
            return []
        }
    },
})
//update:Modelvalue: once componet list is changed
// const emit = defineEmits(['update:modelValue'])
//
const context = inject('context')
//
const showGrid = computed(() => !!context.codeManager.getCode().showGrid)
const gridWidth = computed(() => context.codeManager.getCode().gridWidth || 64)

//running mode
const flag = ref('')
//Used to record move start point
const containerMoveObj = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
}


//Record the initial position of sizing
const resizeItem = {
    startX: 0,
    startY: 0,
    x: 0,
    y: 0,
    w: 0,
    h: 0,
}

//Drag container item style, this is the outer div of the drawing component
const dragContainerItemStyle = computed(() => {
    return function (item) {
        const config = {}
        //top
        config.top = (item.config?.display?.position?.y || '0') + 'px'
        //left
        config.left = (item.config?.display?.position?.x || '0') + 'px'
        //width
        if (item.config?.display?.position?.w) {
            if (typeof item.config?.display?.position?.w == 'string' && item.config?.display?.position?.w.endsWith('%')) {
                config.width = item.config?.display?.position?.w
            } else {
                config.width = item.config?.display?.position?.w + 'px'
            }
        }
        //height
        if (item.config?.display?.position?.h) {
            if (typeof item.config?.display?.position?.h == 'string' && item.config?.display?.position?.h.endsWith('%')) {
                config.height = item.config?.display?.position?.h
            } else {
                config.height = item.config?.display?.position?.h + 'px'
            }
        }
        //z
        if (item.config?.display?.position?.z) {
            config['z-index'] = item.config?.display?.position?.z
        }
        //test
        // config.border = '2px solid red'

        //
        return config;
    }
})
//Whether it is editable
const editable = computed(() => context.mode.value == 'edit')
//Whether the component is the one current choosed
const isItemChoosed = computed(() => {
    return function (item) {
        return editable.value && item.key == context.choosedManager.get()?.key
    }
})
//
//Once component is clicked
function handleClickTarget(item) {
    //
    if (!editable.value) {
        //Not allow to choose
        return
    }

    // 
    if (context.choosedManager.get()?.key) {
        //current is choosed
        if (item && context.choosedManager.get()?.key == item.key) {
            //If choosed is not changed,return to avoid duplicated event triggered
            return
        }
    } else {
        //current is unchoosed
        if (!item) {
            //If item is undefined,return to avoid duplicated event triggered
            return
        }
    }
    //
    context.choosedManager.set(item)
}
//
function laryerMouseDown() {
    // console.log('mouse down clicked')
    //

    // handleClickTarget(undefined)
}
//
function handleMouseDown(event, item) {
    //
    // console.log(event)
    //Choose the current component
    // componentChoosed(context, event, item)
    //
    if (!editable.value) {
        //Not allow to move
        return
    }
    //
    flag.value = "move";
    // 
    handleClickTarget(item);
    //
    event = event || window.event;
    //Record move start position
    containerMoveObj.startX = event.pageX;
    containerMoveObj.startY = event.pageY;
    //
    containerMoveObj.x = item.config?.display?.position.x
    containerMoveObj.y = item.config?.display?.position.y
}


//
function resizeMousedown(item, event, type) {
    //
    if (!editable.value) {
        //Not allow to resize
        return
    }
    //Choose it
    handleClickTarget(item);
    //set running mode
    flag.value = type;
    //Current mouse position
    resizeItem.startX = event.pageX;
    resizeItem.startY = event.pageY;
    //Component original position
    resizeItem.x = item.config?.display?.position.x;
    resizeItem.y = item.config?.display?.position.y;
    resizeItem.w = item.config?.display?.position.w || 0;
    resizeItem.h = item.config?.display?.position.h || 0;
}
//Floor value to grid width if needed
function alignToGrid(value){
    if(!showGrid.value){
        return value;
    }
    //0.5 is the align threashold,this can avoid a small movement to trigger a gridwidth change
   return Math.floor((value+0.5*gridWidth.value)/gridWidth.value)*gridWidth.value;
        
}
//Mouse move 
function laryerMouseMove(ev) {
    if (!flag.value) {
        return
    }
    if (!context.choosedManager.get()||context.choosedManager.get().key=='_root') {
        return;
    }
    if (flag.value == "move") {
        //This means the user is trying to move the component
        //  Calculuate the moving distance from current position to start moving position
        const dx = ev.pageX - containerMoveObj.startX,
            dy = ev.pageY - containerMoveObj.startY;

        // 
        const x = containerMoveObj.x + dx,
            y = containerMoveObj.y + dy;
        //
  
        // 
        context.choosedManager.get().config.display.position.x = x;
        context.choosedManager.get().config.display.position.y = y;
        //
        // console.log(dx,dy,x,y)
    } else if (flag.value.includes("resize")) {
        //This means user is trying to resize
        //The current position of the mouse
        const { pageX, pageY } = ev;
        // Calcuate distance moved from start position
        let dx = pageX - resizeItem.startX,
            dy = pageY - resizeItem.startY;
        //
        // console.log(flag.value,pageX, pageY,resizeItem.startX,resizeItem.startY,dx,dy)
        //Calcuate position based on resize type
        switch (flag.value) {
            // left/top
            case "resize-lt":
                //Please note: all the calculation are based on the start moving position
                //resizeItem.x /y is the current position, context.choosedManager.get().config.display.position.x/y is the position after moved
                context.choosedManager.get().config.display.position.y = resizeItem.y + dy;
                context.choosedManager.get().config.display.position.x = resizeItem.x + dx;
                dx = -dx;
                dy = -dy;
                break;

            // top/center
            case "resize-ct":
                context.choosedManager.get().config.display.position.y = resizeItem.y + dy;
                dx = 0;
                dy = -dy;
                break;

            //top/right
            case "resize-rt":
                context.choosedManager.get().config.display.position.y = resizeItem.y + dy;
                dy = -dy;
                break;

            // center/left
            case "resize-lc":
                console.log(dy);
                context.choosedManager.get().config.display.position.x = resizeItem.x + dx;
                dy = 0;
                dx = -dx;
                break;

            // center/right
            case "resize-rc":
                // console.log(dx);
                dy = 0;
                break;

            // bottom/center
            case "resize-cb":
                dx = 0;
                break;
            // bottom/;eft
            case "resize-lb":
                context.choosedManager.get().config.display.position.x = resizeItem.x + dx
                dx = -dx;
                break;
        }
        // Calculate the width and height
        if (resizeItem.w + dx > 20) {
            context.choosedManager.get().config.display.position.w = resizeItem.w + dx;
        }
        if (resizeItem.h + dy > 20) {
            context.choosedManager.get().config.display.position.h = resizeItem.h + dy;
        }
    }
}

function laryerMouseUp() {
    //   console.log("laryerMouseUp",arguments);
    // 在鼠标抬起的时候判断是否
    if (!flag.value) {
        return false;
    }
    if (flag.value == "move") {
        //align x and y
        context.choosedManager.get().config.display.position.x =  alignToGrid(context.choosedManager.get().config.display.position.x)
        context.choosedManager.get().config.display.position.y =  alignToGrid(context.choosedManager.get().config.display.position.y)
    } else if (flag.value.includes("resize")) {
        context.choosedManager.get().config.display.position.w =  alignToGrid(context.choosedManager.get().config.display.position.w)
        context.choosedManager.get().config.display.position.h =  alignToGrid(context.choosedManager.get().config.display.position.h)
	}
    //clear flags
    flag.value = "";
}

//
const {detecting,clearDetect,droppingClass}=useDropDetect(context)
//
const panelClass=computed(() => {
    const result=[]
    //
   if(droppingClass.value){
    result.push(droppingClass.value)
   }
    if( context.mode.value=='edit'){
        result.push('panel-edit-mode')
    }
    //
    return result;
})


//Once user choose component from pallet
function handleDropFromPallet(event) {

    //
    clearDetect()
    //
    const componentKey = event.dataTransfer.getData('text')
    //
    // console.log('DROP',event.dataTransfer.getData('text'),event.dataTransfer)
    // build new component
    const component = cloneComponent(context, componentKey)
    if (!component) {
        return
    }
    //event.offsetX
    setByPath(component, 'config.display.position.x', alignToGrid(event.offsetX), true)
    setByPath(component, 'config.display.position.y', alignToGrid(event.offsetY), true)
    if (!component.config?.display?.style) {
        setByPath(component, 'config.display.style', {}, true)
    }
    if (!component.config.display.style.width) {
        component.config.display.style.width = '100%'
    }
    if (!component.config.display.style.height) {
        component.config.display.style.height = '100%'
    }
    //
    props.modelValue.push(component)
    // emit('update:modelValue',[...props.modelValue,component])
    //choose the dropped component
    context.choosedManager.set(component)
    //
    calPanelHeight();
}

function resetPanelHeight(){

}
//calculate panel height based on the components inside
function calPanelHeight(){
    let height=0
    for(const comp of props.modelValue){
        height=Math.max(height,calSingleComponent(comp))
        console.log(height,comp.key)
    }    
    // console.log(height)
    //32 the spare space 
    return height+32;
}
function calSingleComponent(comp){
    return (comp?.config?.display?.position?.y||0) + (comp?.config?.display?.position?.h||0)
}




</script>


<style lang="scss">

.drag-container {
    min-width: 32px;
    min-height: 32px;
    //try to fullfill the whole parent,but it may not work as expected
    width: 100%;
    // height: 100%;
   
    position: relative;

    .drag-container-item {
        -webkit-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        user-select: none;
        position: absolute;
        cursor: pointer;
        border: 1px solid transparent;



        .resize-icon {
            position: absolute;
            height: 10px;
            width: 10px;
            background-color: white;
            border: 1px solid #0cf;
            // cursor: nwse-resize;
            border-radius: 50%;
        }

        // 这里是点的样式i
        .resize-left-top {
            left: -15px;
            top: -15px;
            cursor: nwse-resize;
        }

        .resize-left-center {
            left: -15px;
            top: 50%;
            margin-top: -10px;
            cursor: ew-resize;
        }

        .resize-left-bottom {
            left: -15px;
            bottom: -15px;
            cursor: nesw-resize;
        }

        .resize-right-top {
            right: -15px;
            top: -15px;
            cursor: nesw-resize;
        }

        .resize-right-center {
            right: -15px;
            top: 50%;
            margin-top: -10px;
            cursor: ew-resize;
        }

        .resize-right-bottom {
            right: -15px;
            bottom: -15px;
            cursor: nwse-resize;
        }

        .resize-center-top {
            top: -15px;
            left: 50%;
            margin-left: -10px;
            cursor: ns-resize;
        }

        .resize-center-bottom {
            bottom: -15px;
            left: 50%;
            margin-left: -10px;
            cursor: ns-resize;
        }
    }

    .drag-container-item-active {
        // outline: 2px outset var(--el-color-primary);
        // outline-offset: 2px;
        //Override the z-index with !important
        // z-index: 2700 !important;
        z-index: 999 !important;
    }
}
</style>