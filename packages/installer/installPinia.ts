import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

export function installPinia(globalContext) {
    const pinia = createPinia()
    pinia.use(piniaPluginPersistedstate)
    globalContext.vueApp.use(pinia)
    //
    return pinia;
}