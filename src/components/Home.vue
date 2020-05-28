<template>
  <v-layout row wrap>
    <v-flex xs4 v-for="movie in movies" :key="movie._id">
      <v-card>
        <v-card-title>
          <div>
            <div class="headline">
              <v-btn text v-bind:to="`/movie/${movie._id}`">
              {{movie.name}}
              </v-btn>
            </div>
            <span class="green--text">{{movie.release_year}} . {{movie.genre}}</span>
          </div>
        </v-card-title>
        <v-card-text>
          {{movie.description}}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<!--<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      movies: [],
      // message: 'Hello there, how are you this morning?',
    };
  },
  mounted() { // Load xong
    this.fetchMovies();
  },
  methods: {
    // reply() {
    //   this.message = "I'm doing great. Thank You!";
    // },
    async fetchMovies() {
      const token = window.localStorage.getItem('auth');
      console.log(token);
      return axios({
        methods: 'get',
        url: '/movies',
        headers: {
          Authorization: `JWT ${token}`,
          'Content-Type': 'application/json',
        },
      })
        .then((response) => {
          console.log(response);
          this.movies = response.data.movies;
          this.current_user = response.data.current_user;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>-->

<script>
export default {
  name: 'Movies',
  computed: {
    movies() {
      return this.$store.getters.fetchMovies;
    },
  },
  mounted() {
    this.$store.dispatch('fetchMovies');
  },
};
</script>

<style scoped>

</style>
