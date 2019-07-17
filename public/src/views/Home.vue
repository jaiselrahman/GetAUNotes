<template>
  <group-list :groups="groups"></group-list>
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
      groups: []
    };
  },
  mounted() {
    GroupService.getDepartments().then(
      departments => (this.groups = departments)
    );
  }
};
</script>
