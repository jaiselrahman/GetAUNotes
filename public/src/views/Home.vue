<template>
  <v-container>
    <v-layout v-show="loading" justify-center align-center fill-height>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-layout>
    <v-layout justify-center>
      <v-flex xs12 sm8 md6 v-show="!loading && (!groups || groups.length == 0)">
        <v-card text-xs-center>
          <v-card-title primary-title>Nothing Found!</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <group-list :groups="groups" :base-path="basePath"></group-list>
  </v-container>
</template>

<script>
import GroupService from "@/data/GroupService";

import GroupList from "@/components/GroupList";

export default {
  name: "home",
  components: {
    GroupList
  },
  data() {
    return {
      groups: null,
      basePath: "/n",
      loading: false
    };
  },
  methods: {
    loadData(group) {
      this.loading = true;
      this.groups = null;
      let load;
      if (group.dep == null) {
        load = GroupService.getDepartments;
        this.basePath = "/n";
      } else if (group.year == null) {
        load = GroupService.getYears;
        this.basePath = `/n/${group.dep}`;
      } else if (group.reg == null) {
        load = GroupService.getRegulations;
        this.basePath = `/n/${group.dep}/${group.year}`;
      } else if (group.sub == null) {
        load = GroupService.getSubjects;
        this.basePath = `/n/${group.dep}/${group.year}/${group.reg}`;
      }
      return load(group.dep, group.year, group.reg, group.sub).then(groups => {
        this.groups = groups;
        this.loading = false;
      });
    }
  },
  mounted() {
    this.loadData(this.$route.params);
  },
  beforeRouteUpdate(to, from, next) {
    this.loadData(to.params).then(() => {
      next();
    });
  }
};
</script>
