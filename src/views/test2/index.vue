<template>
  <div style="max-width: 600px">
    <el-alert title="Success alert" type="success" effect="dark" :closable="false"/>
    <el-alert title="Info alert" type="info" effect="dark" :closable="false"/>
    <el-alert title="Warning alert" type="warning" effect="dark" :closable="false"/>
    <el-alert title="Error alert" type="error" effect="dark" :closable="false" />


    <el-alert title="Success alert" type="success"  :closable="false"/>
    <el-alert title="Info alert" type="info"  :closable="false"/>
    <el-alert title="Warning alert" type="warning" :closable="false" />
    <el-alert title="Error alert" type="error"  :closable="false"/>

  </div>
</template>

<style scoped>
.el-alert {
  margin: 20px 0 0;
}
.el-alert:first-child {
  margin: 0;
}
</style>
