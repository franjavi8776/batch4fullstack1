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
                          <th>Nombre</th>
                          <th>Codigo</th>
                          <th>Precio</th>
                          <th>Stock</th>
                          <th>Agregar</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in productos" :key="item">
                          <td>{{ item.nombre }}</td>
                          <td>{{ item.codigo }}</td>
                          <td>{{ item.precio }}</td>
                          <td>{{ item.stock }}</td>
                          <td>
                            <button class="btn btn-primary btn-sm">+</button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-6">carro</div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Understood</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  productos: {
    type: Array,
    required: true,
  },
});
</script>
