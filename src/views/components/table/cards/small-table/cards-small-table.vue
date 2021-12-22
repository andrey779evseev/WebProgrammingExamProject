<template>
<!--  маленькая таблица карточек сотрудников-->
  <div class="small-table-container">
    <div class="search">
      <input type="text" class="input" placeholder="Поиск.."  :value="$store.getters.cardsSearchValue" @input="$store.commit('changeCardsSearchValue', $event.target.value)"/>
      <button class="btn"><el-icon :size="20"><search/></el-icon></button>
    </div>
<!--    цикл по массиву карточек сотрудников-->
    <div class="table" v-for="(card, index) in $store.getters.cards"
         :key="card.id">
      <div v-if="index > (activePage - 1)*12 - 1 && index < activePage*12 || activePage === 1 && index < 12">
        <cards-small-table-item
            :get-src="getSrc"
            :change-card="changeCard"
            :card="card"
            :change-delete-dialog="changeDeleteDialog"
            :change-delete-index="changeDeleteIndex"
            :change-is-modal-showed="changeIsModalShowed"
            :change-delete-name="changeDeleteName"
            :get-formatted-date="getFormattedDate"
            :index="index"
        ></cards-small-table-item>
      </div>
    </div>
<!--    пагинация-->
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
import {Search} from '@element-plus/icons'
import CardsSmallTableItem from '@views/components/table/cards/small-table/cards-small-table-item.vue'
import Pagination from '@views/components/pagination.vue'

@Options({
  name: 'cards-small-table',
  components: {
    Search,
    Pagination,
    CardsSmallTableItem
  }
})
export default class CardsSmallTable extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() activePage!: number
  @Prop() getSrc!: (key: string) => string
  @Prop() isModalShowed!: boolean
  @Prop() card!: ServiceCardType
  @Prop() deleteDialog!: boolean
  @Prop() deleteIndex: number
  @Prop() deleteName: string
  @Prop() getFormattedDate!: (date: Date) => string
  //функции для обновления значения приходящего из родительской компоненты
  @Emit('update:activePage') changeActivePage(page: number) {
    return page
  }
  @Emit('update:isModalShowed') changeIsModalShowed(value: boolean) {
    return value
  }
  @Emit('update:card') changeCard(card: ServiceCardType) {
    return card
  }
  @Emit('update:deleteDialog') changeDeleteDialog(value: boolean) {
    return value
  }
  @Emit('update:deleteIndex') changeDeleteIndex(index: number) {
    return index
  }
  @Emit('update:deleteName') changeDeleteName(name: string) {
    return name
  }
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.small-table-container {
  padding: 10px 20px 30px 20px;
  width: 100%;
  display: none;

  @media(max-width: 800px) {
    display: block;
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
}
</style>
