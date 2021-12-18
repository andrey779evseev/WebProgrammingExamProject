<template>
  <div class="big-table-container">
    <div class="search">
      <input type="text" class="input" placeholder="Поиск.." :value="$store.getters.cardsSearchValue" @input="$store.commit('changeCardsSearchValue', $event.target.value)"/>
      <button class="btn">Поиск</button>
    </div>
    <div class="table">
      <div class="row">
        <span class="col-name">Фото</span>
        <span class="col-name">id</span>
        <span class="col-name">ФИО</span>
        <span class="col-name">Должность</span>
        <span class="col-name">Телефон</span>
        <span class="col-name">День рождения</span>
        <span class="col-name">Образование</span>
        <span class="col-name">Опыт работы</span>
        <span class="col-name">ВУЗ</span>
        <span class="col-name-square" style="margin-right: 1px;"></span>
        <span class="col-name-square"></span>
      </div>
      <div
          v-for="(card, index) in $store.getters.cards"
          :key="card.id"
      >
        <div v-if="index > (activePage - 1)*12 - 1 && index < activePage*12 || activePage === 1 && index < 12">
          <cards-big-table-item
              :get-src="getSrc"
              :change-card="changeCard"
              :card="card"
              :change-delete-dialog="changeDeleteDialog"
              :change-delete-index="changeDeleteIndex"
              :change-is-modal-showed="changeIsModalShowed"
              :change-delete-name="changeDeleteName"
              :get-formatted-date="getFormattedDate"
              :index="index"
          ></cards-big-table-item>
        </div>
      </div>
    </div>
    <pagination
        page-name="cards"
        v-model:changePage="changeActivePage"
        v-model:active-page="activePage"
    ></pagination>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator'
import {ServiceCardType} from '@/store'
import CardsBigTableItem from '@views/components/table/cards/big-table/cards-big-table-item.vue'
import Pagination from '@views/components/pagination.vue'

@Options({
  name: 'cards-big-table',
  components: {
    Pagination,
    CardsBigTableItem
  }
})
export default class CardsBigTable extends Vue {
  @Prop() activePage!: number
  @Emit('update:activePage') changeActivePage(page: number) {
    return page
  }
  @Prop() getSrc!: (key: string) => string
  @Prop() isModalShowed!: boolean
  @Emit('update:isModalShowed') changeIsModalShowed(value: boolean) {
    return value
  }
  @Prop() card!: ServiceCardType
  @Emit('update:card') changeCard(card: ServiceCardType) {
    return card
  }
  @Prop() deleteDialog!: boolean
  @Emit('update:deleteDialog') changeDeleteDialog(value: boolean) {
    return value
  }
  @Prop() deleteIndex: number
  @Emit('update:deleteIndex') changeDeleteIndex(index: number) {
    return index
  }
  @Prop() deleteName: string
  @Emit('update:deleteName') changeDeleteName(name: string) {
    return name
  }
  @Prop() getFormattedDate!: (date: Date) => string
}
</script>

<style scoped lang="less">
.big-table-container {
  height: 100%;
  padding: 35px 35px 51px 29px;
  display: flex;
  flex-direction: column;
  width: 100%;

  @media(max-width: 800px) {
    display: none;
  }

  .search {
    margin-bottom: 25px;
    display: flex;
    align-items: center;
    height: 35px;

    .input {
      width: 90%;
      height: 100%;
      margin-right: 6px;
      border: 1px solid #CED4DE;
      padding-left: 30px;
      color: #232235;

      &::placeholder {
        color: #BEBFC3;
        font-size: 15px;
      }
    }

    .btn {
      width: 10%;
      height: 100%;
      background: red;
      color: white;
      font-size: 14px;
      border: none;
    }
  }

  .table {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-bottom: 19px;

    .row {
      display: flex;
      margin-top: 1px;

      .col-name {
        background: #C8D1DE;
        font-size: 14px;
        font-weight: 600;
        margin-right: 1px;
        color: #25274F;
        display: flex;
        align-items: center;
        padding: 5px;
        flex: 1;
        word-break: break-all;
      }

      .col-name-square {
        width: 35px;
        background: #C8D1DE;
      }
    }
  }
}
</style>
