<template>
  <header class="header">
    <div class="container-name">
      <span @click="$store.commit('toggleIsSidebarShowed')" class="name">PRO<span class="red">JECT</span></span>
      <img src="~@assets/icons/arrow.svg" alt="arrow" class="arrow">
    </div>
    <div class="info">
      <img src="~@assets/icons/avatar.svg" alt="avatar" class="avatar" @click="isMenuShowed = !isMenuShowed">
      <div class="container-info">
        <span class="name-info">andrew evseev</span>
        <span class="quit" @click="logout">выйти</span>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-property-decorator'

@Options({
  name: 'layout-header',
})
export default class LayoutHeader extends Vue {
  logout() {
    alert('you got out')
  }
}
</script>
<style scoped lang="less">
.header {
  height: 74px;
  background: #232235;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media(max-width: 1400px) and (min-width: 1000px) {
    height: 60px;
  }

  @media(max-width: 1000px) {
    height: 55px;
  }

  @media(max-width: 800px) {
    height: 50px;
  }

  @media(max-width: 600px) {
    height: 40px;
  }

  .container-name {
    padding-left: 42px;
    width: 300px;
    height: 100%;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-right: 1px solid #34353E;

    @media(max-width: 1400px) and (min-width: 1000px) {
      width: 200px;
      padding-right: 15px;
      padding-left: 30px;
    }

    @media(max-width: 1000px) {
      width: 200px;
    }

    @media(max-width: 800px){
      width: 120px;
      padding-right: 10px;
      padding-left: 20px;
    }

    @media(max-width: 600px) {
      width: 100px;
      padding-left: 10px;
      padding-right: 5px;
    }

    .arrow {
      @media(max-width: 800px) {
        width: 10px;
      }
    }

    .name {
      font-family: 'PT Serif Caption', serif;
      font-size: 24px;

      @media(max-width: 800px) {
        font-size: 16px;
      }

      @media(max-width: 600px) {
        font-size: 14px;
      }

      .red {
        color: #FF0000;
      }
    }
  }

  .info {
    display: flex;
    margin-right: 26px;
    align-items: center;

    .avatar {
      @media(max-width: 800px) {
        width: 30px;
        height: 30px;
      }
      @media(max-width: 600px) {
        width: 20px;
        height: 20px;
      }
    }

    @media(max-width: 1400px) and (min-width: 1000px) {
      margin-right: 16px;
    }

    @media(max-width: 800px) {
      margin-right: 10px;
    }

    @media(max-width: 600px) {
      margin-right: 5px;
    }

    .container-info {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 19px;

      @media(max-width: 1400px) and (min-width: 1000px) {
        margin-left: 12px;
      }

      @media(max-width: 800px) {
        margin-left: 8px;
      }

      @media(max-width: 600px) {
        margin-left: 4px;
      }

      .name-info {
        color: #BAC6DA;
        font-size: 15px;

        @media(max-width: 800px) {
          font-size: 14px;
        }
        @media(max-width: 600px) {
          font-size: 11px;
        }
      }

      .quit {
        font-size: 14px;
        text-decoration-line: underline;
        color: #FF0000;
        cursor: pointer;

        @media(max-width: 800px) {
          font-size: 13px;
        }
        @media(max-width: 600px) {
          font-size: 10px;
        }
      }
    }
  }
}
.flex {
  display: flex !important;
}
</style>
