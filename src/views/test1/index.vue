<template>
<splitpanes style="height: 400px" class="default-theme">
  <pane >1</pane>
  <pane>
    <splitpanes horizontal>
      <pane >2</pane>
      <pane>3</pane>
      <pane>4</pane>
    </splitpanes>
  </pane>
  <pane>5</pane>
</splitpanes>
</template>

<script lang="ts" setup>
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
</script>

<style>

.splitpanes__pane {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 2em;
  background-color: aqua;
}
</style>
