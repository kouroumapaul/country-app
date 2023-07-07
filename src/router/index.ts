import { createRouter, createWebHistory } from "vue-router";
import Home from '../views/Home.vue';
import CountryDetail from '../views/CountryDetail.vue';


const routes = [
    {path : '/', component : Home, name:'home'},
    {path : '/country/:code', component : CountryDetail, name:'country'},
];

const router = createRouter({
    history : createWebHistory(),
    routes,
})

export default router