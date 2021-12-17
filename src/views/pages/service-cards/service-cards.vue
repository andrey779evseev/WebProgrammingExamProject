<template>
  <div class="container">
    <div class="info">
      <span class="title">Служебные карты</span>
      <button class="btn" @click="isModalShowed = true">Добавить карту</button>
    </div>
    <cards-big-table
        v-model:active-page="activePage"
        :get-src="getSrc"
        v-model:is-modal-showed="isModalShowed"
        v-model:card="card"
        v-model:delete-dialog="deleteDialog"
        v-model:delete-index="deleteIndex"
        v-model:delete-name="deleteName"
        :get-formatted-date="getFormattedDate"
    ></cards-big-table>
    <cards-small-table
        v-model:active-page="activePage"
        :get-src="getSrc"
        v-model:is-modal-showed="isModalShowed"
        v-model:card="card"
        v-model:delete-dialog="deleteDialog"
        v-model:delete-index="deleteIndex"
        v-model:delete-name="deleteName"
        :get-formatted-date="getFormattedDate"
    ></cards-small-table>
  </div>
  <div v-if="isModalShowed">
    <cards-modal
        v-model:is-modal-showed="isModalShowed"
        :get-src="getSrc"
        v-model:card="card"
    ></cards-modal>
  </div>
  <el-dialog
      v-model="deleteDialog"
      title="Удаление служебной карты"
      width="75%"
  >
    <span>Вы действительно хотите удалить служебную карту сотрудника : "{{ deleteName }}" ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="deleteDialog = false">Отмена</el-button>
        <el-button type="danger" @click="()=>{deleteDialog = false; $store.commit('deleteCard', deleteIndex)}"
        >Подвердить</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {Vue, Options} from 'vue-property-decorator'
import {ServiceCardType} from '@/store'
import CardsModal from '@views/components/table/cards/cards-modal.vue'
import CardsSmallTable from '@views/components/table/cards/small-table/cards-small-table.vue'
import CardsBigTable from '@views/components/table/cards/big-table/cards-big-table.vue'

@Options({
  name: 'service-cards',
  components: {
    CardsModal,
    CardsSmallTable,
    CardsBigTable
  }
})
export default class ServiceCards extends Vue {
  activePage: number = 1
  deleteDialog: boolean = false
  deleteIndex: number
  deleteName: string
  isModalShowed: boolean = false
  isEdit: boolean = false
  card: ServiceCardType = {
    id: 0,
    university: '',
    position: 'guest',
    photo: (Math.random() + 1).toString(36).substring(7),
    phone: 0,
    experience: '',
    education: '',
    birthday: new Date(),
    name: ''
  }

  getFormattedDate(date: Date) {
    const year = date.getFullYear()
    let month = (1 + date.getMonth()).toString()
    month = month.length > 1 ? month : '0' + month
    let day = date.getDate().toString()
    day = day.length > 1 ? day : '0' + day
    return day + '.' + month + '.' + year
  }

  getSrc(id: string) {
    if (localStorage)
      return localStorage.getItem(id)
  }
}
</script>

<style scoped lang="less">
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background: white;
  width: 100%;


  //i can't remove that because on this width % stop reducing size
  @media(max-width: 1200px) {
    width: 95%;
  }
  @media(max-width: 1150px) {
    width: 90%;
  }
  @media(max-width: 1100px) {
    width: 85%;
  }
  @media(max-width: 1050px) {
    width: 80%;
  }
  @media(max-width: 1000px) {
    width: 90%;
  }
  @media(max-width: 950px) {
    width: 85%;
  }
  @media(max-width: 800px) {
    width: 100%;
  }
  @media(max-width: 400px) {
    width: 85%;
  }

  .info {
    height: 52px;
    width: 100%;
    border-bottom: 1px solid #FF0000;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      font-size: 18px;
      color: #262838;
      margin-left: 25px;

      @media(max-width: 400px) {
        font-size: 16px;
        white-space: normal;
      }
    }

    .btn {
      margin-right: 35px;
      width: 196px;
      height: 36px;
      background: red;
      color: white;
      font-size: 14px;
      border: none;
      outline: none;

      @media(max-width: 800px) {
        margin-right: 20px;
      }

      @media(max-width: 600px) {
        width: 130px;
      }

      @media(max-width: 400px) {
        width: 80px;
      }
    }
  }
}
</style>
