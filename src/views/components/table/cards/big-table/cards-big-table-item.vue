<template>
  <div class="row">
    <div class="col-cell" style="display: flex; justify-content:center; align-items:center;">
      <img :src="getSrc(card.photo)" alt="" height="35">
    </div>
    <span class="col-cell">{{ card.id }}</span>
    <span class="col-cell">{{ card.name }}</span>
    <span class="col-cell">{{ card.position }}</span>
    <span class="col-cell">{{ card.phone }}</span>
    <span class="col-cell">{{ getFormattedDate(card.birthday) }}</span>
    <span class="col-cell">{{ card.education }}</span>
    <span class="col-cell">{{ card.experience }}</span>
    <span class="col-cell">{{ card.university }}</span>
    <button class="col-cell-square" style="margin-right: 1px;" @click="changeCard({...card});changeIsModalShowed(true);;">
      <img src="~@assets/icons/edit.svg" alt="">
    </button>
    <button class="col-cell-square" @click="changeDeleteDialog(true);changeDeleteIndex(index);changeDeleteName(card.name)">
      <img src="~@assets/icons/trash.svg" alt="">
    </button>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator'
import {ServiceCardType} from '@/store'

@Options({
  name: 'cards-big-table-item'
})
export default class CardsBigTableItem extends Vue {
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
.row {
  display: flex;
  margin-top: 1px;

  .col-cell-square {
    background: #E6EAF6;
    width: 35px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    outline: none;

    & img {
      @media (max-width: 1400px) {
        height: 11px;
      }
      @media (max-width: 1000px) {
        height: 10px;
      }
    }
  }

  .col-cell {
    background: #E6EAF6;
    margin-right: 1px;
    font-size: 14px;
    color: #3B4272;
    display: flex;
    align-items: center;
    padding: 5px;
    flex: 1;
    word-break: break-all;
  }
}
</style>
