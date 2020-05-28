<template>
  <v-layout>
    <star-rating></star-rating>
  </v-layout>
</template>

<script>
import Vue from 'vue';
import StarRating from 'vue-star-rating';

Vue.component('star-rating', StarRating);

export default {
  name: 'Star-a-Rating',
  data() {
    return {
      text: 'da vao',
    };
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    StarRating,
  },
};
</script>

<style scoped>

</style>
