<template>
  <v-layout>
    <v-flex xs4>
      <v-card>
        <v-card-title>
          <div>
            <div class="headline">{{ movie.name }}</div>
            <span class="grey--text">{{ movie.release_year }} . {{movie.genre }}</span>
          </div>
        </v-card-title>
        <h6 class="card-title">Rate this movie</h6>
        <div class="rating">
          How was your experience getting help with this issues?
          <star-rating
            @rating-selected ="setRating"
            v-model="rating"
            :show-rating="false"></star-rating>
        </div>
        <v-card-text>
          {{ movie.description }}
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios';
// eslint-disable-next-line import/extensions,no-unused-vars
import Vue from 'vue';
import StarRating from 'vue-star-rating';

// shared state
// eslint-disable-next-line no-unused-vars
const state = {
  note: 0,
};

export default {
  name: 'Movie',
  data() {
    return {
      rating: 3,
      rating_old: 0,
      movie: [],
    };
  },
  watch: {
  },
  mounted() {
    this.rating_old = this.rating;
    this.getMovie();
  },
  methods: {
    async rate() {
      this.$swal({
        title: 'Are you sure?',
        text: 'Dang gia rating !!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result) {
          console.log('adsf');
          this.rating = 2;
        }
      });
    },
    async setRating(rating) {
      this.$swal({
        title: 'Are you sure?',
        text: 'Dang gia rating !!',
        icon: 'warning',
        buttons: true,
        dangerMode: true,
      }).then((result) => {
        if (result) {
          // console.log(rating);
          // this.rating = rating;
          // this.rating_old = rating;
          // eslint-disable-next-line no-unused-vars
          const movieId = this.$route.params.id;
          axios({
            method: 'post',
            data: {
              rate: rating,
            },
            url: `/movies/rate/${movieId}`,
            headers: {
              'Content-Type': 'application/json',
            },
          })
            .then(() => {
              this.$swal(`Thank you for rating! ${rating}`, 'success');
              this.rating = rating;
              this.rating_old = rating;
            })
            .catch((error) => {
              this.rating = this.rating_old;
              const { message } = error.response.data;
              this.$swal('Oh oo!', `${message}`, 'error');
            });
        } else {
          this.rating = this.rating_old;
          console.log(`Khong cap nhat :${rating}`);
        }
      });
    },
    async getMovie() {
      return axios({
        method: 'get',
        url: `/movie/${this.$route.params.id}`,
      })
        .then((res) => {
          // console.log(res.data.movie);
          this.movie = res.data.movie;
        })
        .catch(() => {
        });
    },
  },
  components: { 'star-rating': StarRating },
};
</script>

<style scoped>

</style>
