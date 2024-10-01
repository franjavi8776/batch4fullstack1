<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalVentas"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title" id="staticBackdropLabel">Ventas</h4>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-6">
              <h5>Productos</h5>
              <div class="card">
                <div class="card-body">
                  <div class="table-responsive">
                    <table class="table">
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Codigo</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Agregar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in productos" :key="item.id">
                          <td>{{ item.id }}</td>
                          <td>{{ item.nombre }}</td>
                          <td>{{ item.codigo }}</td>
                          <td>{{ item.precio }}</td>
                          <td>{{ item.stock }}</td>
                          <td>
                            <button
                              class="btn btn-primary btn-sm"
                              @click="$emit('agregarProducto', item)"
                            >
                              +
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card">
                <div class="card-body">
                  <h3>Registrar Ventas</h3>
                  <div class="row">
                    <div class="col-4">
                      <select
                        class="form-select"
                        @change="$emit('update:clienteId', $event.target.value)"
                      >
                        <option value="" disabled selected>
                          Elegir cliente
                        </option>
                        <option
                          v-for="item in clientes"
                          :key="item.id"
                          :value="item.id"
                        >
                          {{ item.nombre + " " + item.apellido }}
                        </option>
                      </select>
                    </div>
                    <div class="col-4">
                      <input
                        type="text"
                        placeholder="Ingrese NIT"
                        class="form-control"
                      />
                    </div>
                    <div class="col-4">
                      <input
                        type="date"
                        class="form-control"
                        :value="fechaVenta"
                        @input="$emit('update:fechaVenta', $event.target.value)"
                      />
                    </div>
                  </div>
                  <div
                    class="row mt-3"
                    v-for="item in carritoVentas"
                    :key="item"
                  >
                    <div class="col-3">{{ item.nombre }}</div>
                    <div class="col-2">{{ item.cantidad }}</div>
                    <div class="col-2">{{ item.precio }}</div>
                    <div class="col-2">{{ item.cantidad * item.precio }}</div>
                    <div class="col-3">Eliminar</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cerrar
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="
              $emit('registrarVenta', clienteId, fechaVenta, carritoVentas)
            "
          >
            Registrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  productos: {
    type: Array,
    required: true,
  },
  clientes: {
    type: Array,
    required: true,
  },
  carritoVentas: {
    type: Array,
    required: true,
  },
  clienteId: {
    type: String,
    required: true,
  },
  fechaVenta: {
    type: String,
    required: true,
  },
});
</script>
