<template>
  <div class="sidebar" :class="{ 'show': $store.getters.isSidebarShowed }">
    <nav>
      <router-link class="menu-item" :to="{ name: EmployeesWithModal }">
        <img src="~@assets/icons/people.svg" alt="people" class="icon"><span class="name">Сотрудники (модальное)</span>
      </router-link>
      <router-link class="menu-item" :to="{ name: EmployeesWithoutModal }">
        <img src="~@assets/icons/people.svg" alt="people" class="icon"><span class="name">Сотрудники (страничка)</span>
      </router-link>
      <router-link class="menu-item" :to="{ name: ServiceCards }">
        <el-icon class="icon"><postcard /></el-icon><span class="name">Служебные карточки</span>
      </router-link>
    </nav>
  </div>
</template>
<script lang="ts">
import {Options, Vue} from 'vue-property-decorator'
import {
  EMPLOYEES_WITH_MODAL, EMPLOYEES_WITHOUT_MODAL,
  POINTS, REFERENCE_SHOP_BOOKS, SERVICE_CARDS, UI_COMPONENTS
} from '@/router/routerNames'
import {Postcard, SetUp} from '@element-plus/icons'

@Options({
  name: 'layout-sidebar',
  components: {
    Postcard,
    SetUp
  }
})
export default class LayoutSidebar extends Vue {
  Points = POINTS
  EmployeesWithModal = EMPLOYEES_WITH_MODAL
  EmployeesWithoutModal = EMPLOYEES_WITHOUT_MODAL
  ReferenceShopBooks = REFERENCE_SHOP_BOOKS
  ServiceCards = SERVICE_CARDS
  UiComponents = UI_COMPONENTS
}
</script>

<style scoped lang="less">
.show {
  display: block !important;

  @media(max-width: 500px) {
    position: fixed;
    left: 0;
    top: 40px;
    height: 100%;
    z-index: 999;
  }
}

.sidebar {
  background: #0B0B10;
  width: 300px;
  min-width: 300px;
  transition: all 0.8s;
  overflow: visible;
  margin-left: 0;

  @media (max-width: 1400px) and (min-width: 1001px) {
    width: 200px;
    min-width: 200px;
  }

  @media (max-width: 1000px) {
    width: 58px;
    min-width: 58px;
  }

  @media (max-width: 500px) {
    display: none;
  }

  & nav {
    margin-top: 28px;

    @media (max-width: 600px) {
      margin-top: 15px;
    }
  }

  .menu-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    padding-left: 30px;
    height: 40px;
    color: #B8C3E0;
    transition: color 0.15s ease, background-color 0.15s ease,
    border-color 0.15s ease, box-shadow 0.15s ease,
    -webkit-box-shadow 0.15s ease;
    text-decoration: none;
    margin-bottom: 5px;
    font-size: 16px;
    font-weight: 400;

    @media (max-width: 1000px) {
      padding-left: 20px;
    }

    &:hover {
      text-decoration: none;
      background-color: #232235;
      border-right: 2px solid #FF0000;
      color: #B8C3E0;
      transition: color 0.15s ease, background-color 0.15s ease,
      border-color 0.15s ease, box-shadow 0.15s ease,
      -webkit-box-shadow 0.15s ease;
    }

    .name {
      @media (max-width: 1000px) {
        display: none;
      }
    }

    .icon {
      margin-right: 20px;

      &:focus {
        outline: unset;
      }
    }
  }

  .router-link-active {
    color: #B8C3E0;
    background-color: #232235;
    border-right: 2px solid #FF0000;
  }
}
</style>
