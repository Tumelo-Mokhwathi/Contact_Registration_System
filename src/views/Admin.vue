<template>
  <b-container fluid class="mt-5 pt-5">
    <b-row class="mb-3">
      <h3 class="col-12 col-md-8">Contact Forms</h3>
      <b-col class="text-right" cols="12" md="4">
        <b-button
          variant="primary"
          class="ml-3"
          @click="setupModifyModal(formStates.create, null)"
        >
          Create
        </b-button>
      </b-col>
    </b-row>
    <grid :fields="fields" :isBusy="Loading" :values="Users" :tableId="'TableId1'" />
    <registration
      @close-modal="closeModal"
      :form-state="formState"
      :form-states="formStates"
      :modal-id="modifyModalId"
      :is-loading="Loading"
      :is-submit-disabled="false"
      :notification="notification"
      :payload="payload"
      @submit="submitHandler"
    />
  </b-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import Grid from '@/components/shared/Grid.vue';
import Registration from '@/views/Registration.vue';

export default {
  components: {
    Grid,
    Registration,
  },
  computed: {
    ...mapGetters({
      Loading: 'userStore/Loading',
      Users: 'userStore/Data',
    }),
    emptyPayload: () => ({
      companyName: '',
      email: '',
      name: '',
      phone: '',
      plainPassword: '',
      surname: '',
    }),
    fields() {
      return [
        {
          key: 'name',
          label: 'Name',
          sortable: true,
        },
        {
          key: 'surname',
          label: 'Surname',
          sortable: true,
        },
        {
          key: 'email',
          label: 'Email',
          sortable: true,
        },
        {
          key: 'phone',
          label: 'Contact No.',
          sortable: true,
        },
        {
          key: 'companyName',
          label: 'Company',
          sortable: true,
        },
      ];
    },
    formStates() {
      return {
        create: {
          actionButtonText: 'Create',
          actionButtonVariant: 'primary',
          cancelButtonText: 'Cancel',
          headingText: 'Create',
          submitMethod: this.Register,
        },
      };
    },
    modifyModalId() {
      return `modifyModal-${Math.random()}`;
    },
    UsersList() {
      if (!this.Users || this.Users.length < 1) {
        return [];
      }

      return this.Users;
    },
  },
  created() {
    this.formState = this.formStates.create;
  },
  data() {
    return {
      formState: null,
      notification: {
        message: '',
        type: 'alert-danger',
      },
      payload: {},
    };
  },
  methods: {
    ...mapActions({
      Register: 'userStore/Register',
      LoadContacts: 'userStore/LoadContacts',
    }),
    closeModal() {
      this.notification.message = '';
      this.$bvModal.hide(this.modifyModalId);
    },
    setupModifyModal(formState, payload) {
      if (!payload) {
        this.payload = { ...this.emptyPayload };
      } else {
        this.payload = { ...payload };
      }
      this.formState = formState;
      this.$bvModal.show(this.modifyModalId);
    },
    submitHandler(payload) {
      this.payload = payload;
      this.submit();
    },
    submit() {
      this.notification.message = '';
      this.formState.submitMethod(this.payload)
        .then(() => {
          this.$bvModal.hide(this.modifyModalId);
        })
        .catch((error) => {
          if (!error) {
            this.notification.message = 'An error occurred';
            return;
          }

          const message = (error
            && error.response
            && error.response.data
            && error.response.data.message)
            ? error.response.data.message
            : error.toString();
          this.notification.message = message;
        });
    },
  },
  mounted() {
    this.LoadContacts();
  },
};
</script>
