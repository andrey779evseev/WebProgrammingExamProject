<template>
  <router-view></router-view>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'

export default class AppComponent extends Vue {
  created() {}
  // главная корневая компонента
}
</script>

<style>
/*переопределение общих стилей*/
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.el-select .el-input__inner {
  border: 1px solid #ced4de !important;
  padding: 9px 0 9px 15px !important;
  color: #162147 !important;
  background: white !important;
  height: 35px !important;
  width: 100% !important;
  outline: none !important;
  font-size: 14px !important;
  border-radius: 0;
}
.el-select .el-input__inner:focus {
  border: 1px solid #4f5c9c !important;
  color: #070054 !important;
}
.el-select-dropdown__item.selected {
  color: #070054 !important;
}
.el-date-editor .el-input__inner {
  border: 1px solid #ced4de;
  color: #162147;
  background: white;
  height: 35px;
  width: 100%;
  outline: none;
  font-size: 14px;
  border-radius: 0;
}
.el-date-editor .el-input__inner:focus {
  border: 1px solid #4f5c9c !important;
  color: #070054 !important;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100% !important;
}
button {
  cursor: pointer;
  border: none;
  outline: none;
  -webkit-tap-highlight-color: transparent;
}
input {
  outline: none;
  border: none;
  -webkit-tap-highlight-color: transparent;
}
</style>
