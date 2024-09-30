<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">Ventas</h5>
          </div>
          <div class="col-md-6 text-end">
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalVentas"
            >
              <i class="fa fa-plus"></i>
              Nuevo
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>fecha</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in ventas" :key="item">
                <td>{{ item.id }}</td>
                <td>{{ item.cliente }}</td>
                <td>{{ item.producto }}</td>
                <td>{{ item.cantidad }}</td>
                <td>{{ item.fecha }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ModalVentas :productos="productos" />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalVentas from "../components/ModalVentas.vue";

const ventas = ref([]);
const productos = ref([]);
const baseURL = "http://localhost:3001/";

onMounted(() => {
  obtenerDatosVentas();
  obtenerDatosProductos();
});

const obtenerDatosVentas = async () => {
  try {
    const { data } = await axios.get(baseURL + "ventas");
    //console.log(data);

    ventas.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const obtenerDatosProductos = async () => {
  try {
    const { data } = await axios.get(baseURL + "productos");
    //console.log(data);

    productos.value = data.data;
  } catch (error) {
    console.log(error);
  }
};
</script>
