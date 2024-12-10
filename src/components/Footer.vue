<script>
import PlayStore from '../icons/PlayStore.vue';
import AppStore from '../icons/AppStore.vue';
import ReemoSm from '../icons/ReemoSm-.vue';
import Facebook from '../icons/Facebook.vue';
import Instagram from '../icons/Instagram.vue';
import Twitter from '../icons/Twitter.vue';
import LinkedIn from '../icons/LinkedIn.vue';
import Heading from '@/components/atoms/Heading.vue'
import NavDropdown from './molecules/NavDropdown.vue';

export default {
  name: "FooterLayout",
  components: { NavDropdown, PlayStore, AppStore, ReemoSm,Facebook, Instagram, Twitter, LinkedIn, Heading },
};
</script>

<template>
  <footer class="p-4 flex flex-col gap-4">
    <div class="rounded-[38px] sm:rounded-[52px] bg-secondary-100 pt-20 pb-12">
      <div class="flex flex-col justify-between sm:gap-20 m-auto sm:w-10/12 sm:p-0 sm:flex-row p-3.5">
        <div class="flex flex-col gap-20 justify-end">
          <div class="flex flex-col gap-6">
            <ReemoSm/>
            <ul class="flex gap-2">
              <li><a href=""><Facebook/></a></li>
              <li><a href=""><Instagram/></a></li>
              <li><a href=""><Twitter/></a></li>
              <li><a href=""><LinkedIn/></a></li>
            </ul>
          </div>
          <div class="flex flex-col gap-7">
            <a class="text-secondary-900 font-bold text-lg mb-0.5 sm:text-md" href="">Sobre Reemo</a>
            <a class="text-secondary-900 font-bold text-lg mb-0.5 sm:text-md" href="">Beneficios</a>
            <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
              <template #title>
                <Heading type="5">Facilidades</Heading>
              </template>
              <ul class="flex flex-col gap-2.5 text-sm">
                <li><a href="">Registro de vehículos</a></li>
                <li><a href="">Documentación y verificación</a></li>
                <li><a href="">Tarifas personalizadas</a></li>
                <li><a href="">Ubicación flexible</a></li>
                <li><a href="">Chat con propietarios</a></li>
                <li><a href="">Soporte a propietarios</a></li>
              </ul>
            </NavDropdown>
          </div>
        </div>
        <div class="flex flex-col sm:gap-10">
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Pagos</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Métodos de pago seguros</a></li>
              <li><a href="">Pago con tarjeta</a></li>
              <li><a href="">Integraciones</a></li>
              <li><a href="">Transferencias bancarias</a></li>
              <li><a href="">Gestión de pagos automáticos</a></li>
            </ul>
          </NavDropdown>
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Seguridad</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Uso seguro</a></li>
              <li><a href="">Verificaciones</a></li>
              <li><a href="">Seguro contra todo riesgo</a></li>
              <li><a href="">Encriptación de datos</a></li>
              <li><a href="">Pausar y cancelar reservas</a></li>
              <li><a href="">Atención de emergencias 24/7</a></li>
            </ul>
          </NavDropdown>
        </div>
        <div class="flex flex-col sm:gap-10">
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Propietarios</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Publicá tu vehículo</a></li>
              <li><a href="">Generá ingresos extras</a></li>
              <li><a href="">Gestión de reservas</a></li>
              <li><a href="">Soporte para propietarios</a></li>
            </ul>
          </NavDropdown>
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Usuarios</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Alquileres express</a></li>
              <li><a href="">Amplia selección de vehículos</a></li>
              <li><a href="">Chat directo con propietarios</a></li>
              <li><a href="">Alquiler flexible por día o semana</a></li>
            </ul>
          </NavDropdown>
        </div>
        <div class="flex flex-col sm:gap-10">
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Información importante</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Términos y condiciones de uso</a></li>
              <li><a href="">Política de privacidad</a></li>
              <li><a href="">Régimen de transparencia</a></li>
              <li><a href="">Tarifas y comisiones vigentes</a></li>
              <li><a href="">Información para usuarios PEP's</a></li>
              <li><a href="">Código de conducta y responsabilidad social</a></li>
              <li><a href="">Ley de Defensa del Consumidor (Ley 24.240)</a></li>
            </ul>
          </NavDropdown>
          <NavDropdown class="flex flex-col gap-5 bg-secondary-100 py-2 sm:p-0">
            <template #title>
              <Heading type="5">Contacto</Heading>
            </template>
            <ul class="flex flex-col gap-2.5 text-sm">
              <li><a href="">Soporte y ayuda</a></li>
              <li><a href="">Atención al cliente</a></li>
              <li><a href="">Consultas comerciales</a></li>
              <li><a href="">Reclamos y sugerencias</a></li>
            </ul>
          </NavDropdown>
        </div>
      </div>
    </div>
    <div class="rounded-[38px] sm:rounded-[52px] bg-secondary-100 py-2 sm:py-8 gap-x-8">
      <div class="flex flex-col-reverse sm:flex-row gap-x-8 gap-y-4 m-auto p-4 sm:w-3/4">
        <article class="flex flex-col gap-2">
          <Heading :type="6">&copy; Reemo, 2024. Todos los derechos reservados</Heading>
          <p class="block text-sm text-gray-500">Reemo S.A. Agente de Servicios de Movilidad - Registro Propio. Secretaría de Transporte de la Nación: Nro. de matrícula 2098. Inscripto ante la Secretaría de Innovación y Tecnología de la Nación como Proveedor de Plataformas Digitales para Alquiler de Vehículos, bajo el número 342, y como Agente Autorizado de Gestión de Alquileres Temporales y Transporte Compartido, bajo el número 278.</p>
        </article>
        <div class="flex gap-2 sm:gap-4 items-center">
          <a href="" class="h-fit">
            <PlayStore/>
          </a>
          <a href="" class="h-fit">
            <AppStore/>
          </a>
        </div>  
      </div>
    </div>
  </footer>
</template>
