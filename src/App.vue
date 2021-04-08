<template>
  <div id="app">
    <app-header>
      <template #logo>
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          Registration System
        </router-link>
      </template>
      <template #menu>
        <b-navbar-nav class="ml-auto">
          <b-nav-item
          v-if="IsSignedIn && User"
          >
            {{ User }}
          </b-nav-item>
          <b-nav-item
            @click="SignOut"
            v-b-modal.logoutModal
            v-if="IsSignedIn"> Sign Out
          </b-nav-item>
        </b-navbar-nav>
      </template>
    </app-header>
    <router-view class="router-content" />
    <app-footer :currentYear="currentYear" :version="version" />
    <b-modal id="logoutModal" title="Sign Out">
      <p>Are you sure you want to Sign Out?</p>
    </b-modal>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import AppFooter from '@/components/shared/AppFooter.vue';
import AppHeader from '@/components/shared/AppHeader.vue';

export default {
  computed: {
    ...mapGetters({
      IsSignedIn: 'userStore/IsSignedIn',
      Loading: 'userStore/Loading',
      User: 'userStore/User',
    }),
    appName() {
      return 'Bank System';
    },
  },
  components: {
    AppFooter,
    AppHeader,
  },
  data() {
    return {
      currentYear: new Date().getFullYear(),
      version: process.env.VUE_APP_VERSION,
    };
  },
  methods: {
    SignOut() {
      this.$router.push({ name: 'Login' });
    },
  },
  name: 'app',
};
</script>
<style>
</style>
