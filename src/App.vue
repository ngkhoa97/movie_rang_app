<template>
  <v-app id="inspire">
    <v-navigation-drawer
      app
      v-model="drawer"
    >
      <v-list dense>
        <v-list-item class="side_bar_link" link v-bind:to="{ name: 'Home' }">
          <v-list-item-action>
            <v-icon>mdi-home</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item class="side_bar_link" link v-bind:to="{ name: 'Contact' }">
          <v-list-item-action>
            <v-icon>mdi-contacts</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Contact</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>Home</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn text id="add_movie_link" v-bind:to="{ name: 'AddMovie' }"
               v-if="current_user">
          Add Movie
        </v-btn>
        <v-btn text id="user_email" v-if="current_user">{{
          current_user.email }}
        </v-btn>
        <v-btn text id="register_btn" v-bind:to="{ name: 'Register' }"
               v-if="!current_user">
          Register
        </v-btn>
        <v-btn text id="login_btn" v-bind:to="{ name: 'Login' }"
               v-if="!current_user">Login
        </v-btn>
        <v-btn @click="logout" text id="logout_btn"
               v-if="current_user">Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content class="pt-0">
      <v-container fluid>
        <div id="app">
          <router-view/>
        </div>
      </v-container>
    </v-content>
    <v-footer
      app
      color="indigo"
    >
      <span class="white--text">&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<!--<script>
import axios from 'axios';
import './assets/stylesheets/main.css';
import bus from './bus';

export default {
  props: {
    source: String,
  },

  data: () => ({
    drawer: null,
    current_user: null,
  }),
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  listenToEvents() {
    bus.$on('refreshUser', () => {
      this.fetchUser();
    });
  },
  async fetchUser() {
    return axios({
      method: 'get',
      url: '/api/current_user',
    })
      .then((response) => {
        this.current_user = response.data.current_user;
      })
      .catch(() => {
      });
  },
  logout() {
    return axios({
      method: 'get',
      url: '/api/logout',
    })
      .then(() => {
        bus.$emit('refreshUser');
        this.$router.push({ name: 'Home' });
      })
      .catch(() => {
      });
  },
};
</script>-->
<script>
import axios from 'axios';
import './assets/stylesheets/main.css';
import bus from './bus';

export default {
  data: () => ({
    drawer: null,
    current_user: null,
  }),
  props: {
    source: String,
  },
  mounted() {
    this.fetchUser();
    this.listenToEvents();
  },
  methods: {
    listenToEvents() {
      bus.$on('refreshUser', () => {
        this.fetchUser();
      });
    },
    async fetchUser() {
      return axios({
        method: 'get',
        url: '/api/current_user',
      })
        .then((response) => {
          this.current_user = response.data.current_user;
        })
        .catch(() => {
        });
    },
    logout() {
      return axios({
        method: 'get',
        url: '/api/logout',
      })
        .then(() => {
          bus.$emit('refreshUser');
          this.$router.push({ name: 'Home' });
        })
        .catch(() => {
        });
    },
  },
};
</script>
