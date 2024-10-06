<script>
import Heading from "../components/Heading.vue";
import { subscribeToAuthState } from '../services/auth';
import { saveCars , subscribeToNewPublication} from '../services/publication.js'

let unsubscribeAuth = () => {};

export default {
  name: "Publish",
  components: { Heading },
  data() {
    return {
      cars: [],
      newCar: {
        marca: "",
        modelo: "",
        año: "",
        chasis: "",
        motor: "",
        combustible: "",
        kilometraje: "",
        patente: "",
        transmision: "",
        puertas: "",
        asientos: "",
        description: "",
        estado: "",
        precio: "",
      },
      loggedUser: {
        id: null,
        email: null,
        userName: null,
        lastName: null,
        name: null,
      },
    };
  },
  methods: {
    handleSubmit() {
      saveCars({
        user_id: this.loggedUser.id,
        email: this.loggedUser.email,        
        ...this.newCar
      });
      this.newCar = {
        marca: "",
        modelo: "",
        año: "",
        chasis: "",
        motor: "",
        combustible: "",
        kilometraje: "",
        patente: "",
        transmision: "",
        puertas: "",
        asientos: "",
        description: "",
        estado: "",
        precio: "",
      };
      this.$router.push('/Profile');
    },
  },
  async mounted() {
    subscribeToNewPublication((newCar) => (this.cars = newCar));
    unsubscribeAuth = subscribeToAuthState(
      (newUserData) => (this.loggedUser = newUserData)
    );
  },
  unmounted() {
    unsubscribeAuth();
  },
};
</script>

<template>
  
  <form 
  action="#"
  @submit.prevent="handleSubmit"
  class="max-w-md my-4 mx-auto" 
  >
    <Heading>Registrar vehículo</Heading>

    <div class="relative w-full my-5 group">
      <p class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
      >{{ loggedUser.email }}</p>
      <span class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email</span>
    </div>

    <div class="relative w-full mb-5 group">
      <input
        type="text"
        name="marca"
        id="marca"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        v-model="newCar.marca"
      />
      <label
        for="marca"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Marca</label
      >
    </div>
    <div class="relative w-full mb-5 group">
      <input
        type="text"
        name="modelo"
        id="modelo"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        v-model="newCar.modelo"
      />
      <label
        for="modelo"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Modelo</label
      >
    </div>
    <div class="relative w-full mb-5 group">
      <input
        type="number"
        name="motor"
        id="año"
        class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required
        min="2005"
        max="2024"
        v-model="newCar.año"
      />
      <label
        for="año"
        class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >Año</label
      >
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative w-full mb-5 group">
        <label 
        for="underline_select" 
        class="sr-only"
        >Estado</label>
        <select
          id="underline_select"
          name="estado"
          v-model="newCar.estado"
          class="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option class="p-4" value="" disabled selected>Estado</option>
          <option class="p-4" >Excelente</option>
          <option class="p-4" >Bueno</option>
          <option class="p-4" >Malo</option>
          <option class="p-4" >Muy malo</option>
        </select>
          <label for="underline_select" class="sr-only">Underline select</label>
        </div>

      <div class="relative w-full mb-5 group">
        <input
          type="number"
          name="precio"
          id="precio"
          class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="newCar.precio"
        />
        <label
          for="precio"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Precio</label>
      </div>

      <div class="relative w-full mb-5 group">
        <label 
        for="underline_select" 
        class="sr-only"
        >Chasis</label>
        <select
          id="underline_select"
          name="chasis"
          v-model="newCar.chasis"
          class="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option class="text-gray-200 p-4" value="" disabled selected>Chasis</option>
          <option class="p-4">Hatchback</option>
          <option class="p-4">Sedán</option>
          <option class="p-4">Coupé</option>
          <option class="p-4">SUV</option>
          <option class="p-4">Deportivo</option>
          <option class="p-4">Pickup</option>
          <option class="p-4">Minivan</option>
          <option class="p-4">Van</option>
          <option class="p-4">Wagon</option>
          <option class="p-4">Convertible</option>
          <option class="p-4">Limusina</option>
          <option class="p-4">Furgoneta</option>
          <option class="p-4">Todoterreno</option>
          <option class="p-4">Autobús</option>
          <option class="p-4">Caravana</option>
        </select>
        <label for="underline_select" class="sr-only">Underline select</label>
      </div>

      <div class="relative w-full mb-5 group">
        <input
          type="text"
          name="motor"
          id="motor"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="newCar.motor"
        />
        <label
          for="motor"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Motor</label
        >
      </div>
    </div>
    <div class="grid md:grid-cols-2 md:gap-6">
      <div class="relative w-full mb-5 group">
        <label 
        for="underline_select" 
        class="sr-only"
        >Combustible</label>
        <select
          id="underline_select"
          name="combustible"
          v-model="newCar.combustible"
          class="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        >
          <option class="p-4" value="" disabled selected>Combustible</option>
          <option class="p-4" >Nafta</option>
          <option class="p-4" >Gasoil</option>
          <option class="p-4" >GNC</option>
          <option class="p-4" >Batería</option>
        </select>
        <label for="underline_select" class="sr-only">Underline select</label>
      </div>

      <div class="relative w-full mb-5 group">
        <input
          type="number"
          name="kilometraje"
          id="kilometraje"
          class="block py-2.5 px-0 w-full text-sm bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="newCar.kilometraje"
        />
        <label
          for="kilometraje"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Kilometraje</label>
      </div>
      <div class="relative w-full mb-5 group">
        <input
          type="text"
          name="patente"
          id="patente"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="newCar.patente"
        />
        <label
          for="patente"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >Patente</label>
      </div>
      <div class="relative w-full mb-5 group">
        <label 
          for="underline_select" 
          class="sr-only"
          >Transmisión</label>
          <select
          id="underline_select"
          name="transmision"
          v-model="newCar.transmision"
          class="block w-full py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
        >
          <option class="text-gray-300 ps-8" value="" disabled selected>Transmisión</option>
          <option class="ps-8" value="Manual" selected>Manual</option>
          <option class="ps-8" value="Automático" >Automático</option>
        </select>
      </div>
      <div class="relative w-full mb-5 group">
        <input
          type="number"
          name="puertas"
          id="puertas"
          min="3"
          max="5"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          v-model="newCar.puertas"
        />
        <!--  DESCRIPCION -->
        <label
          for="puertas"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >N° Puertas</label>
      </div>
      <div class="relative w-full mb-5 group">
        <input
          type="number"
          name="asientos"
          id="asientos"
          min="3"
          max="5"
          class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
          v-model="newCar.asientos"
        />
        <label
          for="asientos"
          class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >N° Asientos</label>
      </div>
    </div>
    <div class="relative w-full mb-5 group">
  
      <label for="description" class="block mb-2 text-sm font-medium text-gray-900">Descripción</label>
      <textarea 
        v-model="newCar.description" 
        id="description" 
        name="description" 
        rows="4" 
        class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"  
        placeholder="Escribí una descripción del auto"></textarea>
    </div>
    <button
      type="submit"
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
    >
      Finalizar
    </button>
  </form>
</template>
