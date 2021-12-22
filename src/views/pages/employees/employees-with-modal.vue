<template>
  <div class="container">
    <div class="info">
      <span class="title">Сотрудники</span>
      <button class="btn" @click="isModalShowed = true;">Добавить сотрудника</button>
    </div>
    <!--    компонент большой таблицы -->
    <employees-big-table
        v-model:active-page="activePage"
        v-model:delete-employee="deleteEmployee"
        v-model:employee="employee"
        v-model:is-modal-showed="isModalShowed"
        :employee-page="1"
    ></employees-big-table>
    <!--    компонент маленькой таблицы для адаптивности-->
    <employees-small-table
        v-model:active-page="activePage"
        v-model:delete-employee="deleteEmployee"
        v-model:employee="employee"
        v-model:is-modal-showed="isModalShowed"
        :employee-page="1"
    ></employees-small-table>
  </div>
  <!--    модальное окно для создания-->
  <employees-modal  v-if="isModalShowed"
      v-model:is-modal-showed="isModalShowed"
      v-model:employee="employee"
  ></employees-modal>
  <!--  модальное окно для подтверждения удаления-->
  <el-dialog
      v-model="deleteDialog"
      title="Удаление сотрудника"
      width="75%"
  >
    <span>Вы действительно хотите удалить сотрудника "{{ deleteName }}" ?</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="success" @click="deleteDialog = false">Отмена</el-button>
        <el-button type="danger" @click="()=>{deleteDialog = false; $store.commit('deleteEmployee', deleteIndex)}"
        >Подвердить</el-button
        >
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-property-decorator'
import {EmployeeType} from '@/store'
import EmployeesModal from '@views/components/table/employees/employees-modal.vue'
import EmployeesSmallTable from '@views/components/table/employees/small-table/employees-small-table.vue'
import EmployeesBigTable from '@views/components/table/employees/big-table/employees-big-table.vue'

@Options({
  name: 'employees-with-modal',
  components: {
    EmployeesModal,
    EmployeesSmallTable,
    EmployeesBigTable
  }
})
export default class EmployeesWithModal extends Vue {
  // обявление свойств которые в будушем используются как переменные
  activePage: number = 1
  isModalShowed: boolean = false
  employee: EmployeeType = {id: 0, name: '', position: 'admin', age: 0}
  deleteDialog: boolean = false
  deleteIndex: number
  deleteName: string

  // функция для удаления сотрудника из масива по индексу
  deleteEmployee(index: number) {
    this.deleteDialog = true
    this.deleteIndex = index
    this.deleteName = this.$store.state.employees[index].name
  }
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.container {
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  background: white;
  width: 100%;

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

      @media (max-width: 400px) {
        margin-left: 12px;
      }
      @media (max-width: 320px) {
        margin-left: 10px;
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
      @media (max-width: 500px) {
        width: 120px;
      }
      @media (max-width: 400px) {
        margin-right: 12px;
        width: 110px;
      }
      @media (max-width: 320px) {
        margin-right: 10px;
        width: 100px;
      }
    }
  }
}
</style>
