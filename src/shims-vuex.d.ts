import { Store } from "vuex";
import { State } from "./store";
// файлы необходимые для корректной работы проекта
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
