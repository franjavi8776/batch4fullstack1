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
              <tr v-for="item in ventas" :key="item.id">
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
    <ModalVentas
      :productos="productos"
      :clientes="clientes"
      :carritoVentas="carritoVentas"
      :clienteId="clienteId"
      :fechaVenta="fechaVenta"
      @update:clienteId="clienteId = $event"
      @update:fechaVenta="fechaVenta = $event"
      @agregarProducto="agregarProducto"
      @registrarVenta="registrarVenta"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalVentas from "../components/ModalVentas.vue";

let clienteId = ref("");
let fechaVenta = ref("");

const ventas = ref([]);
const productos = ref([]);
const clientes = ref([]);
const carritoVentas = ref([]);
const baseURL = "http://localhost:3001/";

onMounted(() => {
  obtenerDatosVentas();
  obtenerDatosProductos();
  obtenerDatosClientes();
});

const obtenerDatosVentas = async () => {
  try {
    const { data } = await axios.get(baseURL + "ventas");
    //console.log(data);

    ventas.value = data.data.map((item) => ({
      ...item,
      fecha: item.fecha.slice(0, 10),
    }));
    ventas.value.sort((a, b) => a.id - b.id);
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

const obtenerDatosClientes = async () => {
  try {
    const { data } = await axios.get(baseURL + "clientes");
    //console.log(data);

    clientes.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const agregarProducto = (item) => {
  const index = carritoVentas.value.findIndex((venta) => venta.id === item.id);

  if (index !== -1) {
    carritoVentas.value[index].cantidad += 1;
  } else {
    carritoVentas.value.push({ ...item, cantidad: 1 });
  }
};

const registrarVenta = async (clienteId, fechaVenta, carritoVentas) => {
  const ventasARegistrar = carritoVentas.map((item) => ({
    producto_id: item.id,
    cliente_id: Number(clienteId),
    cantidad: item.cantidad,
    fecha: fechaVenta,
  }));

  try {
    await Promise.all(
      ventasARegistrar.map((venta) => axios.post(baseURL + "ventas", venta))
    );

    await Promise.all(
      carritoVentas.map((item) => {
        const producto = productos.value.find((p) => p.id === item.id);

        const nuevoStock = producto.stock - item.cantidad;

        return axios.put(`${baseURL}productos/${item.id}`, {
          ...producto,
          stock: nuevoStock,
        });
      })
    );

    obtenerDatosVentas();
    obtenerDatosProductos();

    limpiarCarrito();

    const modalElement = document.getElementById("modalVentas");
    const modal = bootstrap.Modal.getInstance(modalElement);
    modal.hide();
  } catch (error) {
    console.log(error);
  }
};

const limpiarCarrito = () => {
  location.reload();
};
</script>
