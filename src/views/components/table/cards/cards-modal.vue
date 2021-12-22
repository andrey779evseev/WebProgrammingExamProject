<template>
  <div class="modal">
<!--    форма для создания карточки сотрудника-->
    <div class="modal-container">
      <div class="modal-info">
        <span class="title">{{ card.id !== 0 ? 'Редактировние служебной карты' : 'Добавлеие служебной карты' }}</span>
        <button class="close" @click="changeIsModalShowed(false);clearCard()">
          <img src="~@assets/icons/close.svg" alt="close">
        </button>
      </div>
      <div class="modal-content">
        <div class="modal-input-container">
          <span class="modal-label">ФИО</span>
          <input type="text" class="modal-input" v-model="card.name"/>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Должность</span>
          <el-select v-model="card.position" placeholder="Select" filterable>
            <el-option v-for="option in selectOptions"
                       :key="option.value"
                       :label="option.label"
                       :value="option.value"
            ></el-option>
          </el-select>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Образование</span>
          <input type="text" class="modal-input" v-model="card.education"/>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Опты работы</span>
          <input type="text" class="modal-input" v-model="card.experience"/>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">ВУЗ</span>
          <input type="text" class="modal-input" v-model="card.university"/>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Телефон</span>
          <input type="number" class="modal-input" v-model="card.phone"/>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Дата рождения</span>
          <el-date-picker
              v-model="card.birthday"
              type="date"
              placeholder="Выбирите дату рождения"
              :disabled-date="disabledDate"
          >
          </el-date-picker>
        </div>
        <div class="modal-input-container">
          <span class="modal-label">Фото</span>
          <input v-if="!(photo && card.id === 0 || card.id !== 0 && getSrc(card.photo))" class="modal-input" type="file"
                 placeholder="Загрузите фото" :value="photoInput"
                 v-on:change="(e: any) => {photoInput = e.target.value; saveImage(e.target.files[0])}">
          <div v-if="photo && card.id === 0 || card.id !== 0 && getSrc(card.photo)" class="photo-container">
            <img :src="card.id !== 0 ? getSrc(card.photo) : photo" alt="" height="50" width="50"
                 @click="dialogVisible = true; dialogImageUrl = getSrc(card.photo)">
            <el-icon @click="removeImage" class="btn" :size="25" color="#162147">
              <delete-filled/>
            </el-icon>
          </div>
          <el-dialog v-model="dialogVisible">
            <img style="width: 100%" :src="dialogImageUrl" alt=""/>
          </el-dialog>
        </div>
        <div class="modal-actions">
          <button class="modal-btn modal-cancel" @click="changeIsModalShowed(false);clearCard()">Отмена</button>
          <button class="modal-btn modal-add" @click="saveCard">{{ card.id === 0 ? 'Добавить' : 'Сохранить' }}</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Vue, Options, Prop, Emit} from 'vue-property-decorator'
import {ServiceCardType} from '@/store'
import {DeleteFilled} from '@element-plus/icons'

@Options({
  name: 'cards-modal',
  components: {
    DeleteFilled
  }
})
export default class CardsModal extends Vue {
  //обявление параметров приходящих из родительской компоненты
  @Prop() isModalShowed!: boolean
  @Prop() card: ServiceCardType
  @Prop() getSrc!: (key: string) => string
  //функции для обновления значения приходящего из родительской компоненты
  @Emit('update:isModalShowed') changeIsModalShowed(value: boolean) {
    return value
  }
  @Emit('update:card') changeCard(card: ServiceCardType) {
    return card
  }
  // обявление свойств которые в будушем используются как переменные
  photo = ''
  photoInput = ''
  selectOptions = [
    {value: 'admin', label: 'Администратор'},
    {value: 'guest', label: 'Гость'}
  ]
  dialogImageUrl: string = ''
  dialogVisible: boolean = false

  // очитска введенны данных карты сотрудника
  clearCard() {
    this.changeCard({
      id: 0,
      university: '',
      position: 'guest',
      photo: '',
      phone: 0,
      experience: '',
      education: '',
      birthday: new Date(),
      name: ''
    })
  }

  // созранение карты сотрудника
  saveCard() {
    if (this.card.id !== 0) {
      this.$store.commit('updateCard', this.card)
    } else {
      this.$store.commit('addCard', {
        ...this.card, id: Math.floor(Math.random() * (10000 - 1) + 1)
      })
    }
    this.clearCard()
    this.changeIsModalShowed(false)
    this.photoInput = ''
    this.photo = ''
    this.dialogImageUrl = ''
  }

  // созранение изображения в локальное хранилише в виде base64 строки
  saveImage(file) {
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      if (localStorage) {
        localStorage.setItem(this.card.photo, base64String as string)
      }
      this.photo = base64String as string
    }
    reader.readAsDataURL(file)
  }

  // удаление изображения из локального хранилиша
  removeImage() {
    if (localStorage)
      localStorage.removeItem(this.card.photo)

    this.dialogImageUrl = ''
    this.photo = ''
    this.photoInput = ''
  }

  // даты которые нельзя выбрать, для компонеты datepicker
  disabledDate(time) {
    return time.getTime() > Date.now()
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
      padding: 10px 24px 20px 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 100%;

      .modal-input-container {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 56px;
        justify-content: space-between;
        margin-bottom: 10px;

        .photo-container {
          display: flex;
          align-items: center;

          .btn {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 35px;
            height: 35px;
            border: 1px solid #CED4DE;
            margin-left: 20px;
            cursor: pointer;
          }
        }

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

      .modal-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 10px;

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
