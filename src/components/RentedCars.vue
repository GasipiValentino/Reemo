<script>
import {collection, getDocs, query, where} from 'firebase/firestore'
import {db} from '../services/firebase.js'
import { subscribeToAuthState } from '../services/auth.js';

import TarjetasVehiculos from '../components/TarjetasVehiculos.vue';

let unsubscribeAuth = () => {};

export default{
    name:'RentedCars',
    components: {TarjetasVehiculos},
    data(){
        return{
            rentedCars: [],
            loading: false,
            internalUserId: this.userId, // Variable interna para manejar el userId
        };
    },
    props: {
        userId: {
            type: null,
            required: true,
        }
    },
    methods: {
    async fetchRentedCars(){
        try {
            this.loading = true;

            // Crear la consulta a firebase
            const carsCollection = collection(db, 'cars')
            const q = query(carsCollection, where('rented_by', '==', this.internalUserId))
            // console.log('Id del usuario', this.internalUserId)

            // Obtenemos los documentos de la colleccion filtrada
            const carsSnapshot = await getDocs(q);
            const rentedCarsData = carsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            this.rentedCars = rentedCarsData;

        } catch (error) {
            console.error('Error al obtener los autos alquilados:', error);
        }finally{
          this.loading = false;
        }
        }
    },
    mounted(){
        unsubscribeAuth = subscribeToAuthState(newUserData => {
        if (newUserData && newUserData.id){
            this.internalUserId = newUserData.id
            this.fetchRentedCars();
        }else{
            this.internalUserId = null;
        }
      });
    },
    unmounted(){
        unsubscribeAuth()
    }

}


</script>

<template>

  <div>
    <h2 class="text-center text-2xl font-bold">Autos Alquilados</h2>
    <div v-if="loading" class="flex justify-center items-center">
      <div>Loading...</div>
    </div>
    <div v-else>
      <div v-if="rentedCars.length === 0">
        <p>No has alquilado autos.</p>
      </div>
      <div v-else class="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <TarjetasVehiculos v-for="car in rentedCars" :key="car.id" :car="car" /> <!-- Aquí usas el componente -->
      </div>
    </div>
  </div>

</template>