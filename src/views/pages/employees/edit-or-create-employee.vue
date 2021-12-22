<template>
  <div class="modal-container">
    <div class="modal-info">
      <button class="modal-back" @click="goBack">
        <img src="~@assets/icons/arrow-left.svg" alt="back-arrow" class="back-arrow">
      </button>
      <span class="modal-title">{{ employee.id !== 0 ? 'Редактирование сотрудника' : 'Добавление сотрудника' }}</span>
    </div>
    <div class="my-modal-content">
<!--      форма для создания сотрудника-->
      <div class="modal-input-container modal-initials">
        <span class="modal-input-label">ФИО</span>
        <input type="text" class="modal-input" v-model="employee.name"/>
      </div>
      <div class="modal-input-container modal-position">
        <span class="modal-input-label">Должность</span>
        <el-select v-model="employee.position" placeholder="Select" filterable>
          <el-option v-for="option in selectOptions"
                     :key="option.value"
                     :label="option.label"
                     :value="option.value"
          ></el-option>
        </el-select>
      </div>
      <div class="modal-input-container modal-age">
        <span class="modal-input-label">Возраст</span>
        <input type="number" class="modal-input" v-model="employee.age"/>
      </div>
      <div class="modal-actions">
        <button class="modal-btn modal-cancel" @click="goBack">Отмена</button>
        <button class="modal-btn modal-my-add" @click="saveEmployee">{{ employee.id !== 0 ? 'Сохранить' : 'Добавить' }}</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-property-decorator'
import {EmployeeType} from '@/store'

@Options({
  name: 'edit-or-create-employee'
})
export default class EditOrCreateEmployee extends Vue {
  // обявление свойств которые в будушем используются как переменные
  selectOptions = [
    {value: 'admin', label: 'Администратор'},
    {value: 'guest', label: 'Гость'}
  ]
  employee: EmployeeType
  // функция отрабатываящяя перед прогрузкой шаблона html
  beforeMount() {
    this.employee = this.$store.getters.employee
  }

  // функция возврашения на предыдущюю страницу
  goBack() {
    this.$router.push({name: 'employees-without-modal'})
    this.$store.commit('updateEmployee', {id: 0, name: '', position: 'admin', age: 0})
  }

  // функция сохранения сотрудника
  saveEmployee() {
    if(this.$store.getters.employee.id !== 0)
      this.$store.commit('updateEmployees', this.employee)
    else {
      this.$store.commit('addEmployee', {
        ...this.employee,
        id: Math.floor(Math.random() * (10000 - 1) + 1)
      })
    }
    this.goBack()
  }
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.modal-container {
  display: flex;
  flex-direction: column;
  width: 99%;
  height: 398px;
  background: white;
  transition: all 0.3s linear;

  .modal-info {
    width: 100%;
    height: 52px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #FF0000;

    .modal-title {
      font-size: 17px;
      color: #162147;
      font-weight: 600;
      margin-left: 15px;

      @media(max-width: 320px) {
        font-size: 16px;
      }
    }

    .modal-back {
      display: flex;
      flex-direction: column;
      border: none;
      outline: none;
      background: transparent;
      margin-left: 22px;

      .back-arrow {
        height: 14px;
        width: 14px;
        filter: invert(20%) sepia(90%) saturate(6691%) hue-rotate(357deg) brightness(97%) contrast(114%);
      }
    }
  }

  .my-modal-content {
    padding: 35px 44px 56px 50px;

    @media(max-width: 800px) {
      padding: 25px 32px 36px 35px;
    }

    @media(max-width: 320px) {
      padding: 25px 15px 15px 15px;
    }

    .modal-input-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      height: 56px;
      justify-content: space-between;

      .modal-input {
        border: 1px solid #CED4DE;
        padding: 9px 0 9px 15px;
        color: #162147;
        background: white;
        height: 35px;
        width: 100%;
        outline: none;
        font-size: 14px;
      }

      .modal-input:focus {
        border: 1px solid #4F5C9C;
        color: #070054;
      }

      .modal-input-label {
        color: #586174;
        font-size: 13px;
      }
    }

    .modal-initials {
      margin-bottom: 14px;
    }

    .modal-position {
      margin-bottom: 13px;
    }

    .modal-age {
      margin-bottom: 24px;
    }

    .modal-actions {
      display: flex;
      justify-content: flex-end;

      .modal-btn {
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: none;
        outline: none;
        height: 36px;
      }

      .modal-cancel {
        margin-right: 6px;
        color: #FF0000;
        background: #FFD3D3;
        width: 104px;
      }

      .modal-my-add {
        background: #FF0000;
        color: white;
        width: 117px;
      }
    }
  }
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
