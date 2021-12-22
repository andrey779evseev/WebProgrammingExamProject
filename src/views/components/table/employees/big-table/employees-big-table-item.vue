<template>
<!--  строка большой таблицы сотрудников-->
  <div class="row"
       v-if="index > (activePage - 1)*12 - 1 && index < activePage*12 || activePage === 1 && index < 12">
    <span class="col-cell col-name-id">{{ employee.id }}</span>
    <span class="col-cell col-name-initials">{{ employee.name }}</span>
    <span
        class="col-cell col-name-position">{{
        employee.position === 'admin' ? 'Администратор' : 'Гость'
      }}</span>
    <span class="col-cell col-name-age">{{ employee.age }}</span>
    <button v-if="employeePage === 1" class="col-cell-square" style="margin-right: 1px;" @click="() => {changeEmployee({...employee}); changeIsModalShowed(true);}">
      <img src="~@assets/icons/edit.svg" alt="edit">
    </button>
    <button v-if="employeePage === 2" class="col-cell-square" style="margin-right: 1px;" @click="()=>{$store.commit('updateEmployee', employee);$router.push({name: 'edit-or-create-employee'})}">
      <img src="~@assets/icons/edit.svg" alt="edit">
    </button>
    <button class="col-cell-square"
            @click="deleteEmployee(index)"
    >
      <img src="~@assets/icons/trash.svg" alt="trash">
    </button>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop} from 'vue-property-decorator'
import {EmployeeType} from '@/store'

@Options({
  name: 'employees-big-table-item'
})
export default class EmployeesBigTableItem extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() employeePage!: number
  @Prop() index!: number
  @Prop() employee!: EmployeeType
  @Prop() activePage!: number
  @Prop() changeEmployee: (employee: EmployeeType) => EmployeeType
  @Prop() changeIsModalShowed: (value: boolean) => boolean
  @Prop() deleteEmployee!: (index: number) => void
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.row {
  width: 100%;
  height: 35px;
  display: flex;

  @media (max-width: 1400px) and (min-width: 1000px) {
    height: 30px;
  }

  @media (max-width: 1000px) {
    height: 25px;
  }

  .col-cell {
    background: #E6EAF6;
    margin-right: 1px;
    font-size: 14px;
    color: #3B4272;
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 12px;
    width: calc((100% - 70px)/4);

    @media (max-width: 1000px) {
      font-size: 13px;
    }
  }

  .col-cell-square {
    background: #E6EAF6;
    width: 35px;
    height: 100%;
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
}
</style>
