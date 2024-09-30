import { createRouter, createWebHistory } from "vue-router";
import ProductosView from "../views/ProductosView.vue";
import ClientesView from "../views/ClientesView.vue";
import VentasView from "../views/VentasView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: ProductosView,
    },
    {
      path: "/clientes",
      component: ClientesView,
    },
    {
      path: "/ventas",
      component: VentasView,
    },
  ],
});

export default router;
