<template>
  <div>
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <h5 class="card-title">Productos</h5>
          </div>
          <div class="col-md-6 text-end">
            <button
              type="button"
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#modalProductos"
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
                <th>nombre</th>
                <th>Codigo</th>
                <th>Costo</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in productos" :key="item">
                <td>{{ item.id }}</td>
                <td>{{ item.nombre }}</td>
                <td>{{ item.codigo }}</td>
                <td>{{ item.costo }}</td>
                <td>{{ item.precio }}</td>
                <td>{{ item.stock }}</td>
                <td>
                  <span v-if="item.estado" class="badge text-bg-success"
                    >Activo</span
                  >
                  <span v-else class="badge text-bg-danger">Inactivo</span>
                </td>
                <td>
                  <button
                    @click="seleccionar(item)"
                    class="btn btn-warning btn-sm"
                  >
                    <i class="fa fa-edit"></i>
                  </button>

                  <button
                    v-if="item.estado"
                    @click="estado(item.id)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-ban"></i>
                  </button>
                  <button
                    v-else
                    @click="estado(item.id)"
                    class="btn btn-primary btn-sm"
                  >
                    <i class="fa fa-check"></i>
                  </button>
                  <button
                    v-if="item.estado == 0"
                    @click="eliminar(item.id)"
                    class="btn btn-danger btn-sm"
                  >
                    <i class="fa fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <ModalProductos
      :nombre="nombre"
      :codigo="codigo"
      :costo="costo"
      :precio="precio"
      :stock="stock"
      :seleccionado="seleccionado"
      @update:nombre="nombre = $event"
      @update:codigo="codigo = $event"
      @update:costo="costo = $event"
      @update:precio="precio = $event"
      @update:stock="stock = $event"
      @registrar="registrar"
      @actualizar="actualizar"
      @reset="reset"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import ModalProductos from "@/components/ModalProductos.vue";

const productos = ref([]);
const baseURL = "http://localhost:3001/productos";

const nombre = ref("");
const codigo = ref("");
const costo = ref(0);
const precio = ref(0);
const stock = ref(0);

const seleccionado = ref(null);

onMounted(() => {
  obtenerDatos();
});

const obtenerDatos = async () => {
  try {
    const { data } = await axios.get(baseURL);
    //console.log(data);

    productos.value = data.data;
  } catch (error) {
    console.log(error);
  }
};

const registrar = async () => {
  const datos = {
    nombre: nombre.value,
    codigo: codigo.value,
    costo: costo.value,
    precio: precio.value,
    stock: stock.value,
    estado: 1,
  };

  try {
    const { data } = await axios.post(baseURL, datos);
    //console.log(data);
    obtenerDatos();
    reset();
    // document.querySelector('button.btn-close').click();
    var myModalEl = document.getElementById("modalProductos");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.log(error);
  }
};

// seelccionar
const seleccionar = (item) => {
  seleccionado.value = item;

  nombre.value = item.nombre;
  codigo.value = item.codigo;
  costo.value = item.costo;
  precio.value = item.precio;
  stock.value = item.stock;

  var myModalEl = document.getElementById("modalProductos");
  var modal = new bootstrap.Modal(myModalEl);
  modal.show();
};

// actualizar
const actualizar = async () => {
  const datos = {
    nombre: nombre.value,
    codigo: codigo.value,
    costo: costo.value,
    precio: precio.value,
    stock: stock.value,
    estado: seleccionado.value.estado,
  };

  try {
    const { data } = await axios.put(
      baseURL + "/" + seleccionado.value.id,
      datos
    );
    //console.log(data);
    obtenerDatos();
    reset();
    // document.querySelector('button.btn-close').click();
    var myModalEl = document.getElementById("modalProductos");
    var modal = bootstrap.Modal.getInstance(myModalEl);
    modal.hide();
  } catch (error) {
    console.log(error);
  }
};

// ESTADO
const estado = async (id) => {
  try {
    const { data } = await axios.patch(baseURL + "/estado/" + id);
    obtenerDatos();
  } catch (error) {
    console.log(error);
  }
};

// ELIMINAR
const eliminar = async (id) => {
  try {
    const { data } = await axios.delete(baseURL + "/" + id);
    obtenerDatos();
  } catch (error) {
    console.log(error);
  }
};

const reset = () => {
  nombre.value = "";
  codigo.value = "";
  costo.value = 0;
  precio.value = 0;
  stock.value = 0;
  seleccionado.value = null;
};
</script>
