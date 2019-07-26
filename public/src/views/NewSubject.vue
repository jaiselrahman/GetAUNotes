<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md6 pa-3>
      <v-form @submit.prevent="addSubject()" ref="form" lazy>
        <v-select
          :items="departments"
          item-text="name"
          item-value="id"
          v-model="department"
          label="Select Department"
          :rules="[ v => !!v || 'Select Department' ]"
          required
          return-object
        ></v-select>
        <v-select
          :items="years"
          item-text="name"
          item-value="id"
          v-model="year"
          label="Select Year"
          :rules="[ v => !!v || 'Select Year' ]"
          required
          return-object
        ></v-select>
        <v-select
          :items="regulations"
          item-text="name"
          item-value="id"
          v-model="regulation"
          label="Select Regulation"
          :rules="[ v => !!v || 'Select Regulation' ]"
          required
          return-object
        ></v-select>
        <v-layout justify-end mt-1 mb-1>
          <v-flex xs3 md4 pr-1>
            <v-text-field
              label="Subject code"
              v-model="subject.id"
              :rules="[ v => !!v || 'Enter subject code' ]"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs9 md8 pl-1>
            <v-text-field
              label="Subject name"
              v-model="subject.name"
              :rules="[ v => !!v || 'Enter subject name' ]"
              required
            ></v-text-field>
          </v-flex>
        </v-layout>
        <v-layout mt-1 mb-1 align-center>
          <v-progress-circular v-show="loading" indeterminate color="primary"></v-progress-circular>
          <v-spacer></v-spacer>
          <v-btn type="submit" style="margin: 0px;" round color="primary">Add Subject</v-btn>
        </v-layout>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import GroupService from "@/data/GroupService";

export default {
  name: "AddGroup",
  data() {
    return {
      department: null,
      departments: [],
      year: null,
      years: [],
      regulation: null,
      regulations: [],
      subject: {
        id: null,
        name: null
      },
      loading: false
    };
  },
  methods: {
    addSubject() {
      if (!this.$refs.form.validate()) return;

      this.loading = true;

      let group = {
        department: this.department,
        year: this.year,
        regulation: this.regulation,
        subject: this.subject
      };

      GroupService.addSubjectGroup(group)
        .then(() => {
          this.loading = false;
        })
        .catch(e => {
          console.log(e);
          this.loading = false;
        });
    }
  },
  mounted() {
    GroupService.getDepartments().then(
      departments => (this.departments = departments)
    );
    GroupService.getYears().then(years => (this.years = years));
    GroupService.getRegulations().then(
      regulations => (this.regulations = regulations)
    );
  }
};
</script>
