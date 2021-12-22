<template>
<!--  большая таблица сотрудников-->
  <div class="table-container-small">
    <div class="search-small">
      <input type="text" class="search-input-small" placeholder="Поиск.."  :value="$store.getters.employeesSearchValue" @input="$store.commit('changeEmployeesSearchValue', $event.target.value)">
      <button class="search-btn-small">
        <img src="~@assets/icons/search.svg" alt="search" class="search-btn-small-icon">
      </button>
    </div>
<!--    цикл по массиву сотрудников-->
    <div class="table-small"
         v-for="(employee, index) in $store.getters.employees" :key="employee.id"
    >
      <employees-small-table-item
          :employee="employee"
          v-model:delete-employee="deleteEmployee"
          v-model:active-page="activePage"
          v-model:change-employee="changeEmployee"
          v-model:change-is-modal-showed="changeIsModalShowed"
          :index="index"
          :employee-page="employeePage"
      ></employees-small-table-item>
    </div>
    <div style="display:flex;justify-content:center;">
<!--      пагинация-->
      <pagination
          page-name="employees"
          v-model:active-page="activePage"
          v-model:changePage="changeActivePage"
      ></pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator'
import {EmployeeType} from '@/store'
import Pagination from '@views/components/pagination.vue'
import EmployeesSmallTableItem from '@views/components/table/employees/small-table/employees-small-table-item.vue'

@Options({
  name: 'small-table',
  components: {
    Pagination,
    EmployeesSmallTableItem
  }
})
export default class EmployeesSmallTable extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() employeePage!: number
  @Prop() activePage!: number
  @Prop() deleteEmployee!: (index: number) => void
  @Prop() employee: EmployeeType | undefined
  @Prop() isModalShowed: boolean
  //функции для обновления значения приходящего из родительской компоненты
  @Emit('update:activePage') changeActivePage(page: number) {
    return page
  }
  @Emit('update:employee') changeEmployee(employee: EmployeeType) {
    return employee
  }
  @Emit('update:isModalShowed') changeIsModalShowed(value: boolean) {
    return value
  }
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.table-container-small {
  display: none;
  padding: 35px 35px 51px 29px;
  flex-direction: column;

  @media (max-width: 800px) {
    display: flex;
  }

  .search-small {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 25px;

    .search-input-small {
      border: 1px solid #CED4DE;
      padding: 9px 0 8px 20px;
      height: 35px;
      width: 90%;
      color: #232235;

      &::placeholder {
        color: #BEBFC3;
      }
    }

    .search-btn-small {
      width: 10%;
      height: 35px;
      background: #FF0000;
      border: none;
      margin-left: 5px;
      display: flex;
      justify-content: center;
      align-items: center;

      .search-btn-small-icon {
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
