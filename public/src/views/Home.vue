<template>
  <v-container>
    <v-layout justify-center>
      <v-flex
        xs12
        sm8
        md6
        v-show="!$global.loading && (!groups || groups.length == 0) && (!notes || notes.length == 0)"
      >
        <v-card text-xs-center>
          <v-card-title primary-title>Nothing Found!</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <group-list :groups="groups" :base-path="basePath" v-if="$route.params.sub == null"></group-list>
    <notes-list :notes="notes" v-else :show-delete="isSignedIn" @delete="deleteNote"></notes-list>
  </v-container>
</template>

<script>
import GroupService from "@/data/GroupService";
import NoteService from "@/data/NoteService";

import GroupList from "@/components/GroupList";
import NotesList from "@/components/NotesList";

export default {
  name: "home",
  components: {
    GroupList,
    NotesList
  },
  props: {
    isSignedIn: Boolean
  },
  data() {
    return {
      groups: null,
      notes: null,
      basePath: "/n"
    };
  },
  methods: {
    loadData(group) {
      this.$global.loading = true;
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
      } else {
        let g = {
          department: group.dep,
          regulation: group.reg,
          year: group.year,
          subject: group.sub
        };
        return NoteService.getNotes(g).then(notes => {
          this.notes = notes;
          this.$global.loading = false;
        });
      }
      return load(group.dep, group.year, group.reg).then(groups => {
        this.groups = groups;
        this.$global.loading = false;
      });
    },
    deleteNote(note) {
      NoteService.deleteNote(note)
        .then(() => {
          this.notes = this.notes.filter(n => n.id !== note.id);
        })
        .catch(e => {
          alert(e.message);
        });
    }
  },
  mounted() {
    this.loadData(this.$route.params);
  }
};
</script>
