<template>
<!--  макет повторяющийся для всез страниц-->
  <div class="layout">
    <layout-header></layout-header>
    <div class="container-custom">
      <layout-sidebar></layout-sidebar>
      <div class="content">
        <slot>
          <router-view/>
        </slot>
      </div>
    </div>
  </div>
</template>


<script lang="ts">
import { Options, Vue } from "vue-class-component";
import LayoutSidebar from '@layouts/layout-sidebar.vue'
import LayoutHeader from '@layouts/layout-header.vue'
@Options({
  name: 'layout',
  components: {
    LayoutHeader,
    LayoutSidebar
  }
})
export default class Layout extends Vue {
}
</script>


<style lang="less">
// здесь используется не css а препроцессор less css
body {
  // подключение кастомного шрифта
  @font-face {
    font-family: Gilroy;
    //noinspection CssUnknownTarget
    src: url("~@assets/fonts/Gilroy/Gilroy-Regular.ttf");
    font-weight: 100;
    font-style: normal;
  }
  margin: 0;
  font-family: Gilroy,serif;
  font-style: normal;
  font-weight: normal;
}
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  .container-custom {
    flex-grow: 1;
    background: #ECECEC;
    display: flex;
    justify-content: space-between;
    overflow-x: auto;
    .content {
      margin: 24px 27px 24px 27px;
      width: 100%;
    }
  }
}
</style>
