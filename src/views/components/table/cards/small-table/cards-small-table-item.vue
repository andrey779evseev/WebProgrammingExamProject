<template>
<!--  строка маленькой таблицы карточек сотрудников-->
  <div class="small-table-item">
    <div class="small-table-names">
      <span class="col-name">Фото</span>
      <span class="col-name">id</span>
      <span class="col-name">ФИО</span>
      <span class="col-name">Должность</span>
      <span class="col-name">Телефон</span>
      <span class="col-name">День рождения</span>
      <span class="col-name">Образование</span>
      <span class="col-name">Опыт работы</span>
      <span class="col-name">ВУЗ</span>
      <button class="col-cell-square" style="margin-right: 1px;" @click="changeIsModalShowed(true);changeCard({...card})">
        <img src="~@assets/icons/edit.svg" alt="edit">
      </button>
    </div>
    <div class="small-table-cells">
      <div class="col-cell" style="display: flex; justify-content:center; align-items:center;">
        <img :src="getSrc(card.photo)" :alt="card.name" height="35">
      </div>
      <span class="col-cell">{{ card.id }}</span>
      <span class="col-cell">{{ card.name }}</span>
      <span class="col-cell">{{ card.position }}</span>
      <span class="col-cell">{{ card.phone }}</span>
      <span class="col-cell">{{ getFormattedDate(card.birthday) }}</span>
      <span class="col-cell">{{ card.education }}</span>
      <span class="col-cell">{{ card.experience }}</span>
      <span class="col-cell">{{ card.university }}</span>
      <button class="col-cell-square" @click="changeDeleteDialog(true);changeDeleteIndex(index);changeDeleteName(card.name)">
        <img src="~@assets/icons/trash.svg" alt="trash">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator'
import {ServiceCardType} from '@/store'

@Options({
  name: 'cards-small-table-item'
})
export default class CardsSmallTableItem extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() getSrc!: (key:string) => string
  @Prop() card!: ServiceCardType
  @Prop() changeCard!: (card: ServiceCardType) => ServiceCardType
  @Prop() changeIsModalShowed!: (value: boolean) => boolean
  @Prop() changeDeleteDialog!: (value: boolean) => boolean
  @Prop() changeDeleteIndex!: (index: number) => number
  @Prop() changeDeleteName!: (name: string) => string
  @Prop() getFormattedDate!: (date: Date) => string
  @Prop() index!: number
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.small-table-item {
  display: flex;
  margin-bottom: 10px;
  height: 400px;

  .small-table-names {
    width: 50%;
    display: flex;
    flex-direction: column;
    margin-right: 1px;

    .col-name {
      background: #C8D1DE;
      font-size: 14px;
      font-weight: 600;
      margin-right: 1px;
      color: #25274F;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 5px;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 1px;
      @media(max-width: 800px) {
        font-size: 12px;
      }
    }

    .col-cell-square {
      background: #C8D1DE;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      padding: 5px;
    }
  }

  .small-table-cells {
    width: 50%;
    display: flex;
    flex-direction: column;

    .col-cell-square {
      background: #E6EAF6;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border: none;
      outline: none;
      padding: 5px;
    }

    .col-cell {
      background: #E6EAF6;
      margin-right: 1px;
      font-size: 14px;
      color: #3B4272;
      height: 100%;
      display: flex;
      align-items: center;
      padding: 5px;
      width: 100%;
      overflow-x: auto;
      white-space: nowrap;
      margin-bottom: 1px;
      @media(max-width: 800px) {
        font-size: 12px;
      }
    }
  }
}
</style>
