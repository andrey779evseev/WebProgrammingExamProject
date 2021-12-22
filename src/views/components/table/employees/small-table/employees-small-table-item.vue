<template>
<!--  строка маленькой таблицы-->
  <div class="table-small-cols"
       v-if="index > (activePage - 1)*12 - 1 && index < activePage*12 || activePage === 1 && index < 12">
    <div class="table-small-row">
      <span class="small-col-name">id</span>
      <span class="small-cell">{{ employee.id }}</span>
    </div>
    <div class="table-small-row">
      <span class="small-col-name">ФИО</span>
      <p class="small-cell">{{ employee.name }}</p>
    </div>
    <div class="table-small-row">
      <span class="small-col-name">Должность</span>
      <span class="small-cell">{{ employee.position === 'admin' ? 'Администратор' : 'Гость' }}</span>
    </div>
    <div class="table-small-row">
      <span class="small-col-name">Возраст</span>
      <span class="small-cell">{{ employee.age }}</span>
    </div>
    <div class="table-small-row">
      <button class="small-table-edit-btn" v-if="employeePage === 1"
              @click="() => {changeEmployee({...employee}); changeIsModalShowed(true);}">
        <img src="~@assets/icons/edit.svg" alt="edit">
      </button>
      <button class="small-table-edit-btn" v-if="employeePage === 2"
              @click="()=>{$store.commit('updateEmployee', employee); $router.push({name: 'edit-or-create-employee'})}">
        <img src="~@assets/icons/edit.svg" alt="edit">
      </button>
      <button class="small-table-delete-btn" @click="deleteEmployee(index)">
        <img src="~@assets/icons/trash.svg" alt="trash">
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator'
import {EmployeeType} from '@/store'

@Options({
  name: 'employees-small-table-item'
})
export default class EmployeesSmallTableItem extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() employeePage!: number
  @Prop() index!: number
  @Prop() employee!: EmployeeType
  @Prop() activePage!: number
  @Prop() changeEmployee!: (employee: EmployeeType) => EmployeeType
  @Prop() changeIsModalShowed!: (value: boolean) => boolean
  @Prop() deleteEmployee!: (index: number) => void
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.table-small-cols {
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;

  .table-small-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 1px;
    height: 35px;

    .small-table-edit-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #3B4272;
      background: #E6EAF6;
      width: 49.8%;
      border: none;
      height: 100%;
      margin-right: 1px;
    }

    .small-table-delete-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      color: #3B4272;
      background: #E6EAF6;
      width: 50%;
      border: none;
      height: 100%;
    }

    .small-cell {
      height: 100%;
      color: #3B4272;
      background: #E6EAF6;
      width: 50%;
      padding-left: 20px;
      display: flex;
      align-items: center;
      padding-right: 10px;
      overflow-x: auto;
      white-space: nowrap;
      font-size: 14px;

      @media(max-width: 800px) {
        font-size: 12px;
      }

      @media (max-width: 320px) {
        padding-left: 10px;
      }
      @media (max-width: 400px) {
        padding-left: 11px;
      }
    }

    .small-col-name {
      height: 100%;
      background: #C8D1DE;
      color: #25274F;
      width: 50%;
      margin-right: 1px;
      padding-left: 20px;
      display: flex;
      align-items: center;
      font-size: 14px;

      @media(max-width: 800px) {
        font-size: 12px;
      }
      @media (max-width: 320px) {
        padding-left: 10px;
      }
      @media (max-width: 400px) {
        padding-left: 11px;
      }
    }
  }
}
</style>
