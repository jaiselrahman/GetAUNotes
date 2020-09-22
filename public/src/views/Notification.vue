<template>
  <v-container>
    <v-layout justify-center v-if="!isSupported">
      <v-flex xs12 sm8 md6>
        <v-card>
          <v-card-title primary-title>Notification not supported!</v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container v-else>
        <select-group @group-selected="onGroupSelected"></select-group>
        <v-layout justify-center>
          <v-btn color="primary" :disabled="!group" v-if="subscribed" @click="unsubscribe">Unsubscribe</v-btn>
          <v-btn color="primary" :disabled="!group" v-else @click="subscribe">Subscribe</v-btn>
        </v-layout>
    </v-container>
  </v-container>
</template>

<script>
import SelectGroup from "@/components/SelectGroup.vue";

import NotificationService from "@/data/NotificationService";
NotificationService.use(localStorage);

export default {
  name: "Notification",
  components: {
    SelectGroup,
  },
  data() {
    return {
      group: null,
      isSupported: NotificationService.isSupported(),
    };
  },
  methods: {
    onGroupSelected(group) {
      this.group = group;
    },
    subscribe() {
      NotificationService.requestPermission()
        .then(() => {
          NotificationService.subscribeTo(this.group).then(() => {
            console.log("SubscribeTo ", this.group);
          });
        })
        .catch((e) => {
          alert(
            "Notification blocked! You can enable them from browser settings"
          );
        });
    },
    unsubscribe() {
      NotificationService.unsubscribeFrom(this.group).then(() => {
        console.log("UnSubscribeFrom ", this.group);
      });
    },
  },
  mounted() {},
  computed: {
    subscribed() {
      if (!this.group) return false;

      let subscribedGroup = NotificationService.getSubscribedGroup();

      if (!subscribedGroup) return false;

      return (
        subscribedGroup.department === this.group.department &&
        subscribedGroup.year === this.group.year &&
        subscribedGroup.regulation === this.group.regulation
      );
    },
  },
};
</script>
