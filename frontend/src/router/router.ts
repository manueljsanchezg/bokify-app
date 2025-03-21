import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import RegisterPage from "../views/RegisterPage.vue"
import LoginPage from "../views/LoginPage.vue"
import { validateToken } from "../service/auth.service";
import { jwtStorage } from "../storage/storage";
import { watch } from "vue";

const routes = [
    {path: "/", component: HomeView, meta: { requiresAuth: true } },
    {path: "/register", component: RegisterPage },
    {path: "/login", component: LoginPage },
]

export const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach(async (to) => {
    try {
        if(to.meta.requiresAuth) {
            if (!jwtStorage.value) {
                return "/login";
            }
            const isValid = await validateToken();
            if (!isValid) {
                return "/login";
            }
        }    
    } catch (error) {
        return "/login";
    }
})

watch(jwtStorage, () => {
    if(!jwtStorage.value) router.replace("/login")
})