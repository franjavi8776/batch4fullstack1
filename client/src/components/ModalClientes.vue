<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="modalClientes"
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
              <label for="nombre" class="form-label">Nombre</label>
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
              <label for="apellido" class="form-label">Apellido</label>
              <input
                type="text"
                :value="apellido"
                @input="$emit('update:apellido', $event.target.value)"
                id="apellido"
                class="form-control"
                required
              />
            </div>

            <div class="row">
              <div class="col-md-6">
                <div class="mb-3">
                  <label for="email" class="form-label">Email</label>
                  <input
                    type="email"
                    :value="email"
                    @input="$emit('update:email', $event.target.value)"
                    id="email"
                    class="form-control"
                    required
                  />
                </div>
              </div>
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
  apellido: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  seleccionado: Object,
});
</script>
