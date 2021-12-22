import {createRouter, createMemoryHistory, RouteRecordRaw} from 'vue-router'
import EmployeesWithModal from '@views/pages/employees/employees-with-modal.vue'
import {
  EDITOR_CREATE_EMPLOYEE,
  EMPLOYEES_WITH_MODAL,
  EMPLOYEES_WITHOUT_MODAL,
  SERVICE_CARDS,
} from './routerNames'
import EmployeesWithoutModal from '@views/pages/employees/employees-without-modal.vue'
import EditOrCreateEmployee from '@views/pages/employees/edit-or-create-employee.vue'
import ServiceCards from '@views/pages/service-cards/service-cards.vue'
const Layout = () => import('@/views/layouts/layout.vue')
//файл описывающий все возможные маршруты в проекте и какие компоненты должны на них отображатся а также дополнительные параметры
const routes: Array<RouteRecordRaw> = [
  {
    name: 'home',
    path: '/',
    redirect: '/employees-with-modal'
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: 'employees-with-modal',
        name: EMPLOYEES_WITH_MODAL,
        component: EmployeesWithModal
      },
      {
        path: 'employees-without-modal',
        name: EMPLOYEES_WITHOUT_MODAL,
        component: EmployeesWithoutModal
      },
      {
        path: 'edit-or-create-employee',
        name: EDITOR_CREATE_EMPLOYEE,
        component: EditOrCreateEmployee,
      },
      {
        path: 'service-cards',
        name: SERVICE_CARDS,
        component: ServiceCards,
      }
    ],
  },


  {path: '/:pathMatch(.*)*', redirect: '/'},
]

const router = createRouter({
  history: createMemoryHistory(process.env.BASE_URL),
  routes,
})


export default router
