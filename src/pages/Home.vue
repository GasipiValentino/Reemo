<script>
import InfoCards from '../components/InfoCards.vue';
import Heading from '../components/Heading.vue';
import HomeLayout from '../components/HomeLayout.vue';

export default {
    name: 'Home',
    components: { Heading, InfoCards, HomeLayout }
}
</script>

<template>
    
    <HomeLayout></HomeLayout>
    <a href="/#Publish"><img class="hidden lg:block h-auto mb-8 max-w-5xl rounded-lg mx-auto" src="/public/banner.jpg" alt="banner de rent car"></a>
    <InfoCards></InfoCards>




</template>