<script>
import Heading from "../components/atoms/Heading.vue";
import { subscribeToAuthState } from '../services/auth.js';
import { saveCars, subscribeToNewPublication } from '../services/publication.js'

let unsubscribeAuth = () => { };

export default {
  name: "Publish",
  components: { Heading },
  data() {
    return {
      loading: false,
      step: 1,
      selectedFiles: [null, null, null, null],
      photoPreview: ["", "", "", ""],
      cars: [],
      accessories: [
        { id: 'bt', name: 'Bluetooth' },
        { id: 'gps', name: 'GPS' },
        { id: 'wifi', name: 'Wi-Fi' },
        { id: 'revCam', name: 'Cámara de reversa' },
        { id: 'parkSense', name: 'Sensores de estacionamiento' },
        { id: 'cruiseCtrl', name: 'Control de crucero' },
        { id: 'heatSeat', name: 'Asientos calefactables' },
        { id: 'ac', name: 'Aire acondicionado' },
        { id: 'sunRoof', name: 'Techo solar' },
        { id: 'touchScreen', name: 'Pantalla Táctil' },
        { id: 'wirelessCharge', name: 'Carga inalámbrica' },
        { id: 'soundSystem', name: 'Sistema de sonido' },
        { id: 'abs', name: 'Frenos ABS' },
        { id: 'airbag', name: 'Airbag' },
        { id: 'laneAssist', name: 'Asistente de mantenimiento de carril' },
        { id: 'blindSpot', name: 'Control de punto ciego' },
        { id: 'tractionCtrl', name: 'Control de tracción' }
      ],

      newCar: {
        marca: "",
        modelo: "",
        año: "",
        patente: "",
        description: "",
        combustible: "",
        direccion: "",
        kilometraje: "",
        precio: "",
        chasis: "",
        motor: "",
        asientos: "",
        puertas: "",
        transmision: "",
        accessories: []
      },
      loggedUser: {
        id: null,
        email: null,
        userName: null,
        lastName: null,
        name: null,
      },
      // Inicializamos errors que contiene todos los inputs que debe ingresar el usuario, que los vamos a usar más adelante para hacer las verificaciones
      errors: {
        marca: false,
        modelo: false,
        año: false,
        patente: false,
        description: false,
        direccion: false,
        combustible: false,
        kilometraje: false,
        precio: false,
        chasis: false,
        motor: false,
        asientos: false,
        puertas: false,
        transmision: false,
        accessories: false
      }
    };
  },
  methods: {
    toggleAccessory(accessory) {
      const index = this.newCar.accessories.findIndex(acc => acc.id === accessory.id);
      if (index === -1) {
        this.newCar.accessories.push({ id: accessory.id, name: accessory.name });
      } else {
        this.newCar.accessories.splice(index, 1);
      }
    },
    // Validamos las preguntas de la primera sección y agregamos mensajes "personalizados" según cada error (marca y modelo después vana estar cargados en una api por lo que va a ser un select)
    validateStep1() {
      // Validación para "marca" con los respectivos mensajes de cada erorr
      if (!this.newCar.marca) {
        // Si no hay ningún valor en marca, entra en este if y asigna un mensaje de error a this.errors.marca - Que después lo llamamos debajo del input en rojo
        this.errors.marca = "El campo marca no puede estar vacío";
      } else if (this.newCar.marca.length < 3) {
        // Si marca tiene valor pero tiene menos de tres letras, entra en este if y asigna un mensaje de error a this.errors.marca. Que después lo llamamos debajo del input en rojo
        this.errors.marca = "La marca debe tener al menos 3 letras";
      } else {
        // Como no hay ningún error, se asigna null a this.errors.marca, lo que significa que no hay ningún error para este campo.
        this.errors.marca = null;
      }

      // SE REPITEN VALIDACIONES DE MARCA ⬇️⬇️⬇️⬇️⬇️⬇️

      // Validación para "modelo" con los respectivos mensajes de cada erorr
      if (!this.newCar.modelo) {
        this.errors.modelo = "El campo modelo no puede estar vacío";
      } else if (this.newCar.modelo.length < 3) {
        this.errors.modelo = "El modelo debe tener al menos 3 letras";
      } else {
        this.errors.modelo = null;
      }

      // Validación para "año" con los respectivos mensajes de cada erorr
      if (!this.newCar.año) {
        this.errors.año = "El campo año no puede estar vacío";
      } else if (isNaN(this.newCar.año)) {
        this.errors.año = "El año debe ser un número";
      } else if (this.newCar.año < 2005 ) {
        this.errors.año = "El año debe ser mayor a 2005";
      } else if (this.newCar.año > 2024 ) {
        this.errors.año = "El año no puede ser mayor que 2024";
      } else {
        this.errors.año = null;
      }

      // Validación para "patente" con los respectivos mensajes de cada erorr
      if (!this.newCar.patente) {
        this.errors.patente = "El campo patente no puede estar vacío";
      } else if (this.newCar.patente.length < 6) {
        this.errors.patente = "La patente debe tener al menos 6 caracteres";
      } else if (this.newCar.patente.length > 7) {
        this.errors.patente = "La patente no puede tener más de 7 caracteres - No pongas espacios ni guiones";
      } else {
        this.errors.patente = null;
      }

      // Retorna true solo si todos los campos son válidos, es decir qwue no se encontraron errores
      return !this.errors.marca && !this.errors.modelo && !this.errors.año && !this.errors.patente;
    },

    validateStep2() {

      if (!this.newCar.description) {
        this.errors.description = "El campo descripción no puede estar vacío";
      } else if (this.newCar.description.length < 80) {
        this.errors.description = "La descripción debe tener al menos 80 letras";
      } else if (this.newCar.description.length > 300) {
        this.errors.description = "La descripción no puede tener más de 300 letras";
      } else {
        this.errors.description = null;
      }

      if (!this.newCar.direccion) {
        this.errors.direccion = "El campo dirección no puede estar vacío";
      } else if (this.newCar.direccion.length < 6) {
        this.errors.direccion = "La dirección debe tener al menos 6 caracteres";
      } else if (this.newCar.direccion.length > 200) {
        this.errors.direccion = "La dirección no puede tener más de 200 caracteres";
      } else if (!/^[\w\s.,#-]+$/.test(this.newCar.direccion)) {
        this.errors.direccion = "La dirección contiene caracteres no permitidos";
      } else if (!/\d/.test(this.newCar.direccion)) {
        this.errors.direccion = "La dirección debe contener al menos un número";
      } else {
        this.errors.direccion = null; // Validación exitosa
      }

      if (!this.newCar.combustible) {
        this.errors.combustible = "El campo combustible no puede estar vacío";
      } else {
        this.errors.combustible = null;
      }

      if (!this.newCar.transmision) {
        this.errors.transmision = "El campo transmisión no puede estar vacío";
      } else {
        this.errors.transmision = null;
      }

      if (!this.newCar.kilometraje) {
        this.errors.kilometraje = "El campo kilometraje no puede estar vacío";
      } else {
        this.errors.kilometraje = null;
      }

      return !this.errors.description && !this.errors.direccion && !this.errors.combustible && !this.errors.kilometraje && !this.errors.transmision;
    },

    validateStep3() {
      if (!this.newCar.chasis) {
        this.errors.chasis = "El campo chasis no puede estar vacío";
      } else {
        this.errors.chasis = null;
      }

      if (!this.newCar.motor) {
        this.errors.motor = "El campo motor no puede estar vacío";
      } else {
        this.errors.motor = null;
      }

      if (!this.newCar.puertas) {
        this.errors.puertas = "El campo puertas no puede estar vacío";
      } else if (isNaN(this.newCar.puertas)) {
        this.errors.puertas = "El campo puertas debe ser un número";
      } else if (this.newCar.puertas < 2 ) {
        this.errors.puertas = "El auto debe tener más de 2 puertas";
      } else if (this.newCar.puertas > 5 ) {
        this.errors.puertas = "El auto no puede tener más de 5 puertas";
      } else {
        this.errors.puertas = null;
      }

      if (!this.newCar.asientos) {
        this.errors.asientos = "El campo asientos no puede estar vacío";
      } else if (isNaN(this.newCar.asientos)) {
        this.errors.asientos = "El campo asientos debe ser un número";
      } else if (this.newCar.asientos < 2 ) {
        this.errors.asientos = "El auto debe tener más de 2 asientos";
      } else if (this.newCar.asientos > 7 ) {
        this.errors.asientos = "El auto no puede tener más de 7 asientos";
      } else {
        this.errors.asientos = null;
      }

      // Se me ocurrió validarlo así pero no se si está bien, sino lo sacamos
      if (this.newCar.accessories.length == 0 ) {
        this.errors.accessories = "Selecciona al menos un accessorio";
      } else {
        this.errors.accessories = null;
      }

      if (!this.newCar.precio) {
        this.errors.precio = "El campo precio no puede estar vacío";
      } else if (this.newCar.precio < 1000) {
        this.errors.precio = "El precio por hora no puede ser menor a $1000";
      } else if (this.newCar.precio > 15000) {
        this.errors.precio = "El precio por hora no puede ser mayor a $15000";
      } else if (isNaN(this.newCar.precio)) {
        this.errors.precio = "El campo precio debe ser un número";
      } 
      else {
        this.errors.precio = null;
      }

      return !this.errors.chasis && !this.errors.motor && !this.errors.puertas && !this.errors.asientos && !this.errors.accessories && !this.errors.precio;
    },

    validateStep4() {
      if (this.selectedFiles.length < 4) {
        this.errors.photos = "El auto no puede tener más de 7 asientos";
        return false;
      }
      this.errors.photos = null;
      return true;
    },

    nextStep() {
      // Hacemos la validación antes de pasar al siguiente paso
      if (this.step === 1 && !this.validateStep1()) return;
      if (this.step === 2 && !this.validateStep2()) return;
      if (this.step === 3 && !this.validateStep3()) return;
      this.step += 1;
    },
    prevStep() {
      this.step -= 1;
    },

    handleFileSelection(index, event) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles.splice(index, 1, file); 
      this.photoPreview.splice(index, 1, URL.createObjectURL(file));
    }
  },

    async handleSubmit() {

      // Nos aseguramos la validación de todos los datos del formulario antes de que sea enviado - Es otra capa de verificación
      if (this.step === 1 && !this.validateStep1()) return;
      if (this.step === 2 && !this.validateStep2()) return;
      if (this.step === 3 && !this.validateStep3()) return;
      if (this.step === 4 && !this.validateStep4()) return;

      this.loading = true

      try {
      // Generar un ID único para la publicación (carId)
      const carId = `${this.loggedUser.id}-${Date.now()}`;

      // Llamar a la función saveCars y pasar las imágenes seleccionadas junto con el carId
      await saveCars({
        user_id: this.loggedUser.id,
        email: this.loggedUser.email,
        ...this.newCar
      }, this.selectedFiles, carId);

      // Reiniciar el formulario después de guardar y las imágenes con sus respectivas previewsa
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
        direccion: "",
        precio: "",
      };
      this.selectedFiles = [null, null, null, null];
      this.photoPreview = ["", "", "", ""]; 

      this.$router.push('/Profile');
    } catch (error) {
      console.error("Error al guardar los datos del auto:", error);
    } finally {
      this.loading = false;
    }
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

  <form action="#" @submit.prevent="handleSubmit" class="max-w-md w-96 m-auto my-4">
    <Heading :type="1">Registrar vehículo</Heading>

    <section v-if="step === 1">
      <div class="relative w-full  group mb-10">
        <input type="text" name="marca" id="marca"
          class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.marca" />
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.marca" class="text-red-500 text-xs italic mt-2">{{ errors.marca }}</p>
        <label for="marca"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Marca</label>
      </div>
      <div class="relative w-full  group mb-10">
        <input type="text" name="modelo" id="modelo"
          class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.modelo" />
          
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.modelo" class="text-red-500 text-xs italic mt-2">{{ errors.modelo }}</p>
        <label for="modelo"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Modelo</label>
      </div>
      <div class="relative w-full  group mb-10">
        <input type="number" name="motor" id="año"
          class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " min="2005" max="2024" v-model="newCar.año" />
          
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.año" class="text-red-500 text-xs italic mt-2">{{ errors.año }}</p>
        <label for="año"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Año</label>
      </div>
      <div class="relative w-full  group mb-10">
        <input type="text" name="patente" id="patente"
          class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.patente" />

          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.patente" class="text-red-500 text-xs italic mt-2">{{ errors.patente }}</p>

        <label for="patente"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Patente</label>
      </div>
      <button @click="nextStep" type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center mt-5">Siguiente</button>
    </section>




    <section v-if="step === 2">
      <div class="relative w-full  group mb-10">

        <label for="description" class="block mb-2  font-medium text-gray-900">Descripción</label>
        <textarea v-model="newCar.description" id="description" name="description" rows="4"
          class="block p-2.5 w-full  text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-none"
          placeholder="Escribí una descripción del auto"></textarea>
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.description" class="text-red-500 text-xs italic mt-2">{{ errors.description }}</p>
      </div>

      <div class="relative w-full  group mb-10">
        <input type="text" name="direccion" id="direccion"
          class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.direccion" />

          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.direccion" class="text-red-500 text-xs italic mt-2">{{ errors.direccion }}</p>

        <label for="direccion"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Dirección</label>
      </div>

      <div class="relative w-full  group mb-10">
        <label for="underline_select" class="sr-only">Combustible</label>
        <select id="underline_select" name="combustible" v-model="newCar.combustible"
          class="block w-full py-2.5 px-0  text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          <option class="p-4" value="" disabled selected>Combustible</option>
          <option class="p-4">Nafta</option>
          <option class="p-4">Gasoil</option>
          <option class="p-4">GNC</option>
          <option class="p-4">Batería</option>
        </select>
        <!-- Parrafo para mostrar el mensaje de error -->
        <p v-if="errors.combustible" class="text-red-500 text-xs italic mt-2">{{ errors.combustible }}</p>
        <label for="underline_select" class="sr-only">Underline select</label>
      </div>

      <div class="relative w-full  group mb-10">
        <input type="number" name="kilometraje" id="kilometraje"
          class="block py-2.5 px-0 w-full  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.kilometraje" />
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.kilometraje" class="text-red-500 text-xs italic mt-2">{{ errors.kilometraje }}</p>
        <label for="kilometraje"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Kilometraje</label>
      </div>

      <div class="relative w-full  group mb-10">
        <label for="underline_select" class="sr-only">Transmisión</label>
        <select id="underline_select" name="transmision" v-model="newCar.transmision"
          class="block w-full py-2.5 px-0  text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
          >
          <option class="text-gray-300 ps-8" value="" disabled selected>Transmisión</option>
          <option class="ps-8" value="Manual" selected>Manual</option>
          <option class="ps-8" value="Automático">Automático</option>
        </select>
        <!-- Parrafo para mostrar el mensaje de error -->
        <p v-if="errors.transmision" class="text-red-500 text-xs italic mt-2">{{ errors.transmision }}</p>

      </div>

      <button @click="prevStep" type="button"
        class="me-4 text-white bg-violet-400 hover:bg-zinc-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center">Anterior</button>
      <button @click="nextStep" type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center">Siguiente</button>


    </section>


    <section v-if="step === 3">
      <Heading :type="1">Paso 3</Heading>
      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="relative w-full  group mb-10">
          <label for="underline_select" class="sr-only">Chasis</label>
          <select id="underline_select" name="chasis" v-model="newCar.chasis"
            class="block w-full py-2.5 px-0  text-gray-500 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-gray-200 peer">
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
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.chasis" class="text-red-500 text-xs italic mt-2">{{ errors.chasis }}</p>
          <label for="underline_select" class="sr-only">Underline select</label>
        </div>

        <div class="relative w-full  group mb-10">
          <input type="text" name="motor" id="motor"
            class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " v-model="newCar.motor" />
          <label for="motor"
            class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Motor</label>
            <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.motor" class="text-red-500 text-xs italic mt-2">{{ errors.motor }}</p>
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6">





        <div class="relative w-full  group mb-10">
          <input type="number" name="puertas" id="puertas"
            class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" " v-model="newCar.puertas" />
          <label for="puertas"
            class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">N°
            Puertas</label>
            <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.puertas" class="text-red-500 text-xs italic mt-2">{{ errors.puertas }}</p>
        </div>
        <div class="relative w-full  group mb-10">
          <input type="number" name="asientos" id="asientos"
            class="block py-2.5 px-0 w-full  text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder="" v-model="newCar.asientos" />
          <label for="asientos"
            class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">N°
            Asientos</label>
            <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.asientos" class="text-red-500 text-xs italic mt-2">{{ errors.asientos }}</p>
        </div>
      </div>


      <div class="relative w-full  group mb-10">
        <input type="number" name="precio" id="precio"
          class="block py-2.5 px-0 w-full  bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" " v-model="newCar.precio" />
        <label for="precio"
          class="peer-focus:font-medium absolute  text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Precio/Hora</label>
          <!-- Parrafo para mostrar el mensaje de error -->
          <p v-if="errors.precio" class="text-red-500 text-xs italic mt-2">{{ errors.precio }}</p>
      </div>

      <div class="relative w-full group mb-10">
        <h3 class="text-gray-700 font-semibold mb-2">Selecciona accesorios adicionales:</h3>
        <div v-for="accessory in accessories" :key="accessory.id" class="flex items-center mb-2">
          <input 
            type="checkbox" 
            :id="accessory.id" 
            :value="accessory" 
            :checked="newCar.accessories.some(acc => acc.id === accessory.id)"
            @change="toggleAccessory(accessory)" 
            />
          <label :for="accessory.id" class="ml-2 text-gray-500">{{ accessory.name }}</label>
        </div>
        <p v-if="errors.accessories" class="text-red-500 text-xs italic mt-2">{{ errors.accessories }}</p>
      </div>

      <button @click="prevStep" type="button"
        class="me-4 text-white bg-violet-400 hover:bg-zinc-600  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center">Anterior</button>
      <button @click="nextStep" type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg  w-full sm:w-auto px-5 py-2.5 text-center">Siguiente</button>

    </section>


    <section v-if="step === 4">
      <Heading :type="1">Paso 4</Heading>
    
      <div class="mb-4">
        <input type="file" @change="handleFileSelection(0, $event)" />
        <input type="file" @change="handleFileSelection(1, $event)" />
        <input type="file" @change="handleFileSelection(2, $event)" />
        <input type="file" @change="handleFileSelection(3, $event)" />
        <p v-if="errors.photos" class="text-red-500 text-xs italic mt-2">{{ errors.photos }}</p>
      </div>
    
      <!-- Vista previa de imágenes seleccionadas -->
      <div class="flex flex-wrap mx-auto justify-center items-center gap-8">
        <div v-for="(photo, index) in photoPreview" :key="index">
          <img :src="photo" alt="Vista previa" class="max-w-[200px]" />
        </div>
      </div>
    
      <button @click="prevStep" type="button" class="me-4 text-white bg-violet-400 hover:bg-zinc-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center">Anterior</button>
      <button type="submit"  :disabled="loading"  :class="{'bg-gray-400 cursor-not-allowed': loading, 'bg-blue-700 hover:bg-blue-800': !loading}" class="text-white font-medium rounded-lg w-full sm:w-auto px-5 py-2.5 text-center"
>
  {{ loading ? "Cargando..." : "Finalizar" }}
</button>  
    </section>
  </form>
</template>