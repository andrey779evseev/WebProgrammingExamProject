<template>
  <div class="modal">
    <div class="modal-container">
<!--      форма для создания сотрудника-->
      <div class="modal-info">
        <span class="title">{{ employee.id !== 0 ? 'Редактировние сотрудника' : 'Добавление сотрудника' }}</span>
        <button class="close" @click="changeIsModalShowed(false); clearEmployee()">
          <img src="~@assets/icons/close.svg" alt="close">
        </button>
      </div>
      <div class="modal-content">
        <div class="modal-input-container modal-initials">
          <span class="modal-label">ФИО</span>
          <input type="text" class="modal-input" v-model="employee.name"/>
        </div>
        <div class="modal-input-container modal-position">
          <span class="modal-label">Должность</span>
          <el-select v-model="employee.position" placeholder="Select" filterable>
            <el-option v-for="option in selectOptions"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"
            ></el-option>
          </el-select>
        </div>
        <div class="modal-input-container modal-age">
          <span class="modal-label">Возраст</span>
          <input type="number" class="modal-input" v-model="employee.age"/>
        </div>
        <div class="modal-actions">
          <button class="modal-btn modal-cancel" @click="changeIsModalShowed(false);clearEmployee()">Отмена</button>
          <button class="modal-btn modal-add" @click="saveEmployee">{{ employee.id !== 0 ? 'Сохранить' : 'Добавить' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator'
import {EmployeeType} from '@/store'

@Options({
  name: 'employees-modal'
})
export default class EmployeesModal extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() isModalShowed!: boolean
  @Prop() employee: EmployeeType
  //функции для обновления значения приходящего из родительской компоненты
  @Emit('update:isModalShowed') changeIsModalShowed(value: boolean) {
    return value
  }
  @Emit('update:employee') changeEmployee(employee: EmployeeType) {
    return employee
  }
  // обявление свойств которые в будушем используются как переменные
  selectOptions = [
    {value: 'admin', label: 'Администратор'},
    {value: 'guest', label: 'Гость'}
  ]

  // очистка введеных данных сотрудника
  clearEmployee() {
    this.changeEmployee({id: 0, name: '', position: 'admin', age: 0})
  }

  //сохранение сотрудника
  saveEmployee() {
    if(this.employee.id !== 0) {
      this.$store.commit('updateEmployees', this.employee)
    }
    else {
      this.$store.commit('addEmployee', {...this.employee, id: Math.floor(Math.random() * (10000 - 1) + 1)})
    }
    this.clearEmployee()
    this.changeIsModalShowed(false)
  }
}
</script>

<style scoped lang="less">
// здесь используется не css а препроцессор less css
.modal {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.64);
  width: 100%;
  height: 100vh;
  z-index: 98;

  .modal-container {
    display: flex;
    flex-direction: column;
    width: 627px;
    height: 350px;
    background: white;
    transition: all 0.3s linear;


    @media (max-width: 800px) {
      width: 550px;
    }

    @media (max-width: 700px) {
      width: 500px;
    }

    @media (max-width: 600px) {
      width: 430px;
    }

    @media (max-width: 550px) {
      width: 400px;
    }


    @media (max-width: 500px) {
      width: 350px;
    }

    @media (max-width: 400px) {
      width: 285px;
    }

    @media (max-width: 320px) {
      width: 280px;
    }


    .modal-info {
      width: 100%;
      height: 48px;
      background: #D6D6FA;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        font-size: 17px;
        color: #162147;
        font-weight: 600;
        margin-left: 26px;
      }

      .close {
        margin-right: 24px;
        display: flex;
        flex-direction: column;
        border: none;
        outline: none;
        background: transparent;
      }
    }

    .modal-content {
      padding: 23px 24px 24px 26px;

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

          &:focus {
            border: 1px solid #4F5C9C;
            color: #070054;
          }
        }

        .modal-label {
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

        .modal-add {
          background: #FF0000;
          color: white;
          width: 117px;
        }
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
