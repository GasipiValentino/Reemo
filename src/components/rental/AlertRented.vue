<script>
import { db } from '../../services/firebase.js';
import { subscribeToAuthState } from "../../services/auth.js";
import { updateRentalStatus, fetchRentalRequests } from '../../services/rentedCarService.js';

let unsubscribeAuth = () => { };

export default {
  name: "AlertRented",
  data() {
    return {
      loggedUser: {},
      pendingRequests: [],
      isVisible: true,
    };
  },
  async created() {
    await this.fetchRentalRequests();
  },
  methods: {
    fetchRentalRequests() {

      const request = fetchRentalRequests(this.loggedUser.id, (requests) => {

        this.pendingRequests = requests.filter(request => request.status === 'pendiente');
        console.log('Solicitudes pendientes actualizadas:', this.pendingRequests);
      })
      

      // try {
      //   const requests = await fetchRentalRequests(this.loggedUser.id);

      //   this.pendingRequests = requests.filter(request => request.status === 'pendiente')
      //   console.log('solicitudes pendientes:', this.pendingRequests)

      // } catch (error) {
      //   console.error("Error al obtener las solicitudes de alquiler:", error);
      // }

    },

    async acceptRequest(reqId) {
      await updateRentalStatus(reqId, 'aceptado')
      this.closeView()
    },
    async rejectRequest(requestId) {
      await updateRentalStatus(requestId, 'rechazado');
      this.closeView()
    },
    async updateRequestStatus(requestId, status) {
      const requestRef = doc(db, 'rental_requests', requestId);
      await updateDoc(requestRef, { status });
      console.log(`Solicitud de alquiler ${status}`);
    },

    closeView() {
      this.isVisible = false;
    }
  },
  mounted() {
    unsubscribeAuth = subscribeToAuthState((newUserData) => {
      // console.log('Datos del usuario:', newUserData);
      this.loggedUser = newUserData;
      if (this.loggedUser && this.loggedUser.id) {
        this.fetchRentalRequests(this.loggedUser.id); // Llamada a la función para obtener solicitudes

      }
    });
  },
  unmounted() {
    unsubscribeAuth();
  },


};
</script>





<template>
  <!-- modal para aceptar o rechazar una noti -->
  <!-- https://flowbite.com/docs/components/modal/ -->


  <!-- Mas alerts -->
  <!-- https://flowbite.com/blocks/application/crud-success-message/ -->



  <!-- Notifications -->

  <button type="button" data-dropdown-toggle="notification-dropdown"
    class="p-2 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 mr-10">
    <span class="sr-only">View notifications</span>
    <!-- Bell icon -->
    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
      <path
        d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
    </svg>
    <div v-if="pendingRequests.length >= 1 && isVisible">
      <div
        class="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 rounded-full -top-0 -end--2">
        {{ pendingRequests.length }}</div>
    </div>

  </button>

  <!-- Dropdown menu -->
  <div
    class="hidden z-50 my-4 max-w-sm max-h-80 text-base list-none bg-white rounded divide-y divide-gray-100 shadow-lg"
    id="notification-dropdown">
    <div class="block py-2 px-4 text-base font-medium text-center text-gray-700 bg-gray-50">
      Notificaciones
    </div>

    <!-- Div que contendrá el scroll del contenido del v-for -->
    <div v-if="pendingRequests.length >= 1 && isVisible" class="overflow-y-scroll max-h-60">
      <div v-for="request in pendingRequests" :key="request.id" class="border p-4 mb-4">
        <div class="inline-flex items-center justify-center flex-shrink-0 w-12 h-12 rounded-lg">
          <img class="w-12 h-12 rounded-full" :src="request.photoURL" alt="Bonnie Green avatar">
          <span class="sr-only">Refresh icon</span>
        </div>
        <div class="ms-3 text-sm font-normal">
          <span class="mb-1 text-sm font-semibold text-gray-900">Solicitud de Alquiler</span>
          <div class="mb-2 text-sm font-normal">
            <span class="mb-1 text-sm font-semibold text-blue-900">{{ request.name }}</span> quiere alquilar tu auto!
            Responde cuanto antes.
          </div>
          <div class="mb-2 text-sm font-normal">Estado de solicitud:
            <span class="mb-1 text-sm font-semibold text-blue-900">{{ request.status }}</span>
          </div>

          <div class="grid grid-cols-2 gap-2">
            <div>
              <a @click="acceptRequest(request.id)"
                class="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-white bg-secondary-900 rounded-lg hover:bg-secondary-500 focus:ring-4 focus:outline-none focus:ring-secondary-300">Aceptar</a>
            </div>
            <div>
              <a @click="rejectRequest(request.id)"
                class="cursor-pointer inline-flex justify-center w-full px-2 py-1.5 text-xs font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200">Rechazar</a>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="ms-3 text-sm font-normal px-5 py-5">
      <div class="mb-2 text-sm font-normal">Estado de solicitud:
        <span class="mb-1 text-sm font-semibold text-blue-900">No hay solicitudes...</span>
      </div>
    </div>

    <a href="#" class="block py-2 text-base font-medium text-center text-gray-900 bg-gray-50 hover:bg-gray-100">
      <div class="inline-flex items-center">
        <svg aria-hidden="true" class="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
          <path fill-rule="evenodd"
            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
            clip-rule="evenodd"></path>
        </svg>
        Ver todo
      </div>
    </a>
  </div>


</template>