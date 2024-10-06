<script>
import Accordion from '../components/Accordion.vue';
import Heading from '../components/Heading.vue';
import HomeLayout from '../components/HomeLayout.vue';

export default {
    name: 'Home',
    components: { Heading, Accordion, HomeLayout }
}
</script>

<template>
    
    <HomeLayout></HomeLayout>
    <a href="/#Publish"><img class="hidden lg:block h-auto mb-8 max-w-5xl rounded-lg mx-auto" src="/public/banner.jpg" alt="banner de rent car"></a>
    <Accordion></Accordion>




</template>