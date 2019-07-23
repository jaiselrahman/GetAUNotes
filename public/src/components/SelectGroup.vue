<template>
  <v-layout v-bind="binding">
    <v-flex xs12 sm3 pl-1 pr-1>
      <v-select
        :items="departments"
        item-text="name"
        item-value="id" 
        v-model="department"
        label="Select Department"
        @change="onDepartmentSelected"
        return-object
      ></v-select>
    </v-flex>
    <v-flex xs12 sm3 pl-1 pr-1>
      <v-select
        :items="years"
        item-text="name"
        item-value="id" 
        v-model="year"
        label="Select Year"
        @change="onYearSelected"
        return-object
      ></v-select>
    </v-flex>
    <v-flex xs12 sm3 pl-1 pr-1>
      <v-select
        :items="regulations"
        item-text="name"
        item-value="id" 
        v-model="regulation"
        label="Select Regulation"
        @change="onRegulationSelected"
        return-object
      ></v-select>
    </v-flex>
    <v-flex xs12 sm3 pl-1 pr-1 v-if="showSubject">
      <v-select
        :items="subjects"
        item-text="name"
        v-model="subject"
        label="Select Subject"
        @change="onSubjectSelected"
        return-object
      ></v-select>
    </v-flex>
  </v-layout>
</template>

<script>
import GroupService from "@/data/GroupService";

export default {
  name: "SelectGroup",
  data() {
    return {
      department: Object,
      departments: [],
      year: Object,
      years: [],
      subject: Object,
      subjects: [],
      regulation: Object,
      regulations: []
    };
  },
  props: {
    showSubject: Boolean,
    group: Object
  },
  methods: {
    onDepartmentSelected() {
      this.year = null;
      this.regulation = null;
      this.subject = null;
      this.$emit("group-selected", null);

      GroupService.getYears(this.department.id).then(
        years => (this.years = years)
      );
    },
    onYearSelected() {
      this.regulation = null;
      this.subject = null;
      this.$emit("group-selected", null);

      GroupService.getRegulations().then(
        regulations => (this.regulations = regulations)
      );
    },
    onRegulationSelected() {
      if (this.showSubject) {
        this.subject = null;
        this.$emit("group-selected", null);

        GroupService.getSubjects(
          this.department.id,
          this.year.id,
          this.regulation.id
        ).then(subjects => (this.subjects = subjects));
      } else {
        const group = {
          department: this.department.id,
          year: this.year.id,
          regulation: this.regulation.id
        };
        this.$emit("group-selected", group);
      }
    },
    onSubjectSelected() {
      const group = {
        department: this.department.id,
        year: this.year.id,
        regulation: this.regulation.id,
        subject: this.subject.id
      };
      this.$emit("group-selected", group);
    }
  },
  mounted() {
    GroupService.getDepartments().then(
      departments => (this.departments = departments)
    );
  },
  computed: {
    binding() {
      const binding = {};

      if (this.$vuetify.breakpoint.xs) {
        binding.column = true;
      } else {
        binding.class = "justify-center";
      }

      return binding;
    }
  }
};
</script>

<style>
</style>
