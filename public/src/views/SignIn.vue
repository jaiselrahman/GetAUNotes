<template>
  <v-layout justify-center>
    <v-flex xs10 md6 lg4>
      <v-card>
        <v-flex pa-3>
          <v-form @submit.prevent="signIn()" ref="form">
            <v-text-field
              name="email"
              label="Email Id"
              v-model="email"
              :rules="[ v => !!v || 'Email Id required']"
            ></v-text-field>
            <v-text-field
              name="password"
              label="Password"
              v-model="password"
              :rules="[ v => !!v || 'Password required']"
              :append-icon="value ? 'visibility' : 'visibility_off'"
              :append-icon-cb="() => (value = !value)"
              :type="value ? 'password' : 'text'"
            ></v-text-field>
            <v-layout justify-end mt-1 mb-1>
              <v-btn type="submit" style="margin: 0px;" small round color="primary">SignIn</v-btn>
            </v-layout>
          </v-form>
        </v-flex>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: "signIn",
  data() {
    return {
      email: "",
      password: "",
      value: true
    };
  },
  methods: {
    signIn() {
      if (this.$refs.form.validate()) {
        // redirect to upload
      }
    }
  }
};
</script>

