<template>
  <b-container fluid class="pt-5 mt-5">
    <b-row class="d-flex justify-content-center h-100 pt-5">
      <b-col class="p-5" cols="9" md="7" sm="8" lg="4">
        <b-card>
          <b-card-body>
            <validation-observer>
              <h4 class="text-center">{{ title }}</h4>
              <hr />
              <form @submit.prevent="handleSubmit" autocomplete="off">
                <b-form-group>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <float-label>
                      <b-form-input
                        name="username"
                        placeholder="Username"
                        required
                        v-model="payload.email"
                        type="email"
                        :class="{ 'is-invalid': IsSignedIn && !payload.username }"
                      />
                    </float-label>
                    <validation-error-label :error="errors[0]" />
                  </validation-provider>
                </b-form-group>
                <b-form-group>
                  <validation-provider v-slot="{ errors }" rules="required">
                    <float-label>
                      <b-form-input
                        autocomplete="new-password"
                        name="password"
                        placeholder="Password"
                        required
                        v-model="payload.password"
                        type="password"
                        :class="{ 'is-invalid': IsSignedIn && !payload.password }"
                      />
                    </float-label>
                    <validation-error-label :error="errors[0]" />
                  </validation-provider>
                </b-form-group>
                <b-row>
                  <b-col>
                    <b-button
                      block
                      class="mb-3"
                      type="submit"
                      variant="primary"
                    >
                      <span v-if="Loading">
                        <b-spinner
                          small
                        />
                        Loading...
                      </span>
                      <span v-else>Sign in</span>
                    </b-button>
                  </b-col>
                </b-row>
              </form>
            </validation-observer>
            <b-row>
              <b-col>
                <b-alert
                  v-if="HasError"
                  show
                  variant="danger"
                  class="text-center"
                >
                  {{ ErrorMessage }}
                </b-alert>
              </b-col>
            </b-row>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import { required } from 'vee-validate/dist/rules';
import { ValidationObserver, ValidationProvider, extend } from 'vee-validate';

import {
  BButton,
  BCard,
  BCardBody,
  BCol,
  BContainer,
  BFormInput,
  BFormGroup,
  BRow,
} from 'bootstrap-vue';
import FloatLabel from 'vue-float-label/components/FloatLabel.vue';
import ValidationErrorLabel from '@/components/shared/ValidationErrorLabel.vue';

extend('required', {
  ...required,
  message: 'This field is required',
});

export default {
  components: {
    BButton,
    BCard,
    BCardBody,
    BCol,
    BContainer,
    BFormInput,
    BFormGroup,
    BRow,
    FloatLabel,
    ValidationErrorLabel,
    ValidationObserver,
    ValidationProvider,
  },
  data() {
    return {
      payload: {
        password: '',
        email: '',
      },
    };
  },
  computed: {
    ...mapGetters({
      ErrorMessage: 'userStore/ErrorMessage',
      HasError: 'userStore/HasError',
      IsSignedIn: 'userStore/IsSignedIn',
      Loading: 'userStore/Loading',
      Users: 'userStore/Data',
    }),
    title() {
      return 'Sign In';
    },
  },
  methods: {
    ...mapActions({
      Login: 'userStore/Login',
      LoadUsers: 'userStore/LoadUsers',
    }),
    handleSubmit() {
      this.Login(this.payload);
    },
  },
  mounted() {
    this.LoadUsers();
  },
};
</script>
