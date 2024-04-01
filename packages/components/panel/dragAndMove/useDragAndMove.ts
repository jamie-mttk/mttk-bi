import { computed, ref, inject } from 'vue'
import { alignToGrid, parseStyleValue } from '../absolute/util'

import {  useMouse } from '@vueuse/core'

export default function useDragAndMove() {
  //
  const context=inject('context')
  //Choosed item
  const choosed = computed(() => context.choosedManager.get())
  //Whether it is editable
  const editable = computed(() => context.mode.value == 'edit')
  //Record mouse position
  const { x: mouseX, y: mouseY } = useMouse()
  //
  //action flag ''/move/resize-xxx
  const actionFlag = ref('')

  //Record the initial position of sizing or moving(x/y does not make sense)
  const orginRecord = {
    startX: 0,
    startY: 0,
    left: 0,
    top: 0,
    width: 0,
    height: 0
  }
  //Start move
  function triggerMove() {
    //
    if (!editable.value) {
      //Not allow to move
      return
    }
    //
    actionFlag.value = 'move'
    //
    //Record move start position
    orginRecord.startX = mouseX.value
    orginRecord.startY = mouseY.value
    //
    orginRecord.left = parseStyleValue(choosed.value.config?.display?.style.left) || 0
    orginRecord.top = parseStyleValue(choosed.value.config?.display?.style.top) || 0
  }

  //resize-lt/resize-lc/resize-lb/resize-rt/resize-rc/resize-rb/resize-ct/resize-cb
  function trggerResize(type) {
    //
    if (!editable.value) {
      //Not allow to resize
      return
    }

    //set running mode
    actionFlag.value = type
    //Current mouse position
    orginRecord.startX = mouseX.value
    orginRecord.startY = mouseY.value
    //Component original position
    orginRecord.left = parseStyleValue(choosed.value.config?.display?.style.left) || 0
    orginRecord.top = parseStyleValue(choosed.value.config?.display?.style.top) || 0
    orginRecord.width = parseStyleValue(choosed.value.config?.display?.style.width) || 64
    orginRecord.height = parseStyleValue(choosed.value.config?.display?.style.height) || 32
  }

  //Mouse move
  function handleMouseMove() {
    if (!actionFlag.value) {
      return
    }
    if (!choosed.value || choosed.value.type == '_container') {
      return
    }
    if (actionFlag.value == 'move') {
      //This means the user is trying to move the component
      //  Calculuate the moving distance from current position to start moving position
      const dx = mouseX.value - orginRecord.startX || 0,
        dy = mouseY.value - orginRecord.startY || 0

      //
      const x = orginRecord.left + dx,
        y = orginRecord.top + dy
      //
      context.choosedManager.get().config.display.style.left = x + 'px'
      context.choosedManager.get().config.display.style.top = y + 'px'
      //
      // console.log(dx,dy,x,y)
    } else if (actionFlag.value.includes('resize')) {
      //This means user is trying to resize
      //The current position of the mouse

      // Calcuate distance moved from start position
      let dx = mouseX.value - orginRecord.startX || 0,
        dy = mouseY.value - orginRecord.startY || 0
      //
      // console.log(flag.value,pageX, pageY,orginRecord.startX,orginRecord.startY,dx,dy)
      //Calcuate position based on resize type
      switch (actionFlag.value) {
        // left/top
        case 'resize-lt':
          //Please note: all the calculation are based on the start moving position
          //orginRecord.left /y is the current position, context.choosedManager.get().config.display.style.left/y is the position after moved
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dx = -dx
          dy = -dy
          break

        // top/center
        case 'resize-ct':
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          dx = 0
          dy = -dy
          break

        //top/right
        case 'resize-rt':
          context.choosedManager.get().config.display.style.top = orginRecord.top + dy + 'px'
          dy = -dy
          break

        // center/left
        case 'resize-lc':
          console.log(dy)
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dy = 0
          dx = -dx
          break

        // center/right
        case 'resize-rc':
          // console.log(dx);
          dy = 0
          break

        // bottom/center
        case 'resize-cb':
          dx = 0
          break
        // bottom/;eft
        case 'resize-lb':
          context.choosedManager.get().config.display.style.left = orginRecord.left + dx + 'px'
          dx = -dx
          break
      }
      // Calculate the width and height
      if (orginRecord.width + dx > 20) {
        context.choosedManager.get().config.display.style.width = orginRecord.width + dx + 'px'
      }
      if (orginRecord.height + dy > 20) {
        context.choosedManager.get().config.display.style.height = orginRecord.height + dy + 'px'
      }
    }
  }

  function trggerDone() {
    //
    if (!choosed.value || choosed.value.type == '_container') {
      return false
    }
    //
    if (actionFlag.value == 'move') {
      //align x and y
      context.choosedManager.get().config.display.style.left = alignToGrid(
        context.choosedManager.get().config.display.style.left,
        context
      )
      context.choosedManager.get().config.display.style.top = alignToGrid(
        context.choosedManager.get().config.display.style.top,
        context
      )
    } else if (actionFlag.value.includes('resize')) {
      context.choosedManager.get().config.display.style.width = alignToGrid(
        context.choosedManager.get().config.display.style.width,
        context
      )
      context.choosedManager.get().config.display.style.height = alignToGrid(
        context.choosedManager.get().config.display.style.height,
        context
      )
    }
    //clear flags
    actionFlag.value = ''
  }
  //
  return { choosed,triggerMove, trggerResize, handleMouseMove, trggerDone }
}
