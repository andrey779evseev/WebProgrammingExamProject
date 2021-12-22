import {createStore} from 'vuex'


// описание типов для обьектов
export interface EmployeeType {
  id: number
  name: string
  position: 'admin' | 'guest'
  age: number
}

export interface ServiceCardType {
  id: number
  name: string
  birthday: Date
  photo: string
  phone: number
  position: 'admin' | 'guest'
  education: string
  experience: string,
  university: string
}

// описание типа хранимых данных в хранилише
export interface State {
  employees: EmployeeType[]
  isSidebarShowed: boolean
  employee: EmployeeType | undefined
  cards: ServiceCardType[]
  cardsSearchValue: string
  employeesSearchValue: string
}

// функция генерирующая случайную строку
function generateString(length) {
  const characters ='абвгдеёжзиклмнопрстуфхцчшщьыэюя';
  let result = ' ';
  const charactersLength = characters.length;
  for ( let i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result.charAt(1).toUpperCase() + result.slice(2);
}

// случайная генерация элементов массива : сотркудников и карт сотрудников
const cards = []
const employees = []
for (let i = 0; i < 37; i++) {
  employees.push({
    id: Math.floor(Math.random() * (10000 - 1) + 1),
    name: generateString(Math.floor(Math.random() * (10 - 5) + 5)),
    position: Math.floor(Math.random() * (3 - 1) + 1) === 1 ? 'admin' : 'guest',
    age: Math.floor(Math.random() * (100 - 1) + 1)
  })
  cards.push({
    id: Math.floor(Math.random() * (10000 - 1) + 1),
    name: generateString(Math.floor(Math.random() * (10 - 5) + 5)),
    birthday: new Date(),
    education: generateString(10),
    experience: generateString(10),
    phone: Math.floor(Math.random() * (99999999 - 11111111) + 11111111),
    photo: (Math.random() + 1).toString(36).substring(7),
    position: Math.floor(Math.random() * (3 - 1) + 1) === 1 ? 'admin' : 'guest',
    university: generateString(10)
  })
}

// создание экземпляра хранилиша по ранее описаному типу
export default createStore<State>({
  state: {
    // данные
    employees,
    cards,
    isSidebarShowed: false,
    employee: {id: 0, name: '', position: 'admin', age: 0},
    cardsSearchValue: '',
    employeesSearchValue: ''
  },
  mutations: {
    // мутации для изменения даннх
    addCard(state, card: ServiceCardType) {
      state.cards.push(card)
    },
    updateCard(state, card: ServiceCardType) {
      const index = state.cards.findIndex(e => e.id === card.id)
      state.cards[index] = {...card}
    },
    deleteCard(state, index: number) {
      state.cards.splice(index, 1)
    },
    addEmployee(state, employee: EmployeeType) {
      state.employees.push(employee)
    },
    deleteEmployee(state, index: number) {
      state.employees.splice(index, 1)
    },
    updateEmployees(state, employee: EmployeeType) {
      const index = state.employees.findIndex(e => e.id === employee.id)
      state.employees[index].age = employee.age
      state.employees[index].name = employee.name
      state.employees[index].position = employee.position
    },
    toggleIsSidebarShowed(state) {
      state.isSidebarShowed = !state.isSidebarShowed
    },
    updateEmployee(state, employee: EmployeeType) {
      state.employee = employee
    },
    changeCardsSearchValue(state, value: string) {
      state.cardsSearchValue = value
    },
    changeEmployeesSearchValue(state, value: string) {
      state.employeesSearchValue = value
    }
  },
  actions: {},// экшэны для получения данных с сервера
  getters: {
    // геттэры для динамического получения данных
    employees(state): EmployeeType[] {
      return state.employees.filter(e => e.name.includes(state.employeesSearchValue))
    },
    isSidebarShowed(state): boolean {
      return state.isSidebarShowed
    },
    employee(state): EmployeeType {
      return state.employee
    },
    cards(state): ServiceCardType[] {
      return state.cards.filter(c => c.name.includes(state.cardsSearchValue))
    },
    cardsSearchValue(state): string {
      return state.cardsSearchValue
    },
    employeesSearchValue(state): string {
      return state.employeesSearchValue
    }
  }
})

