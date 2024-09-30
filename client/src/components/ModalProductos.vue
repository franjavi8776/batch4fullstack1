<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalProductos"
    data-bs-backdrop="static"
    data-bs-keyboard="false"
    tabindex="-1"
    aria-labelledby="staticBackdropLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">
            Datos del proveedor
          </h1>
          <button
            @click="$emit('reset')"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <form action="#" class="needs-validation" novalidate>
          <div class="modal-body">
            <div class="mb-3">
              <label for="nombre" class="form-label">Nombre del Producto</label>
              <input
                type="text"
                id="nombre"
                :value="nombre"
                @input="$emit('update:nombre', $event.target.value)"
                class="form-control"
                required
              />
            </div>

            <div class="mb-3">
              <label for="codigo" class="form-label">Codigo</label>
              <input
                type="text"
                :value="codigo"
                @input="$emit('update:codigo', $event.target.value)"
                id="codigo"
                class="form-control"
                required
              />
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="costo" class="form-label">Costo</label>
                  <input
                    type="number"
                    :value="costo"
                    @input="$emit('update:costo', Number($event.target.value))"
                    id="costo"
                    class="form-control"
                    required
                  />
                </div>
              </div>
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="precio" class="form-label">Precio</label>
                  <input
                    type="number"
                    :value="precio"
                    @input="$emit('update:precio', Number($event.target.value))"
                    id="precio"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="mb-3">
              <label for="stock" class="form-label">Stock</label>
              <input
                type="number"
                :value="stock"
                @input="$emit('update:stock', Number($event.target.value))"
                id="stock"
                class="form-control"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="$emit('reset')"
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              v-if="seleccionado == null"
              type="button"
              @click="$emit('registrar')"
              class="btn btn-primary"
            >
              Guardar
            </button>
            <button
              v-else
              type="button"
              @click="$emit('actualizar')"
              class="btn btn-primary"
            >
              Actualizar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  nombre: {
    type: String,
    required: true,
  },
  codigo: {
    type: String,
    required: true,
  },
  costo: {
    type: Number,
    required: true,
  },
  precio: Number,
  stock: Number,
  seleccionado: Object,
});
</script>
