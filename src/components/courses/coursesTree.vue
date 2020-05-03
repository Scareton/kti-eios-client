<template>
  <v-skeleton-loader type="list-item-three-line" v-if="coursesWaitFlag" />
  <div v-else class="pa-4 courses-tree">
    <v-treeview item-key="_id._id" :items="courses">
      <template v-slot:label="{ item }">{{item._id.name || item.name}}</template>
      <template v-slot:prepend="{ item, open }">
        <v-icon v-if="item._id.type === 'level'">{{ open ? 'mdi-briefcase' : 'mdi-briefcase-outline' }}</v-icon>
        <v-icon v-else-if="item._id.type === 'discipline'">{{ open ? 'mdi-book' : 'mdi-book-outline' }}</v-icon>
        <v-icon v-else>mdi-file-outline</v-icon>
      </template>
    </v-treeview>
  </div>
</template>

<script>
export default {
  data: () => ({
    coursesWaitFlag: true
  }),
  computed: {
    courses() {
      return this.$store.state.courses.list;
    }
  },
  created() {
    this.$store.dispatch("courses/get").then(() => {
      this.coursesWaitFlag = false;
    });
  }
};
</script>

<style>
.courses-tree .v-treeview-node__label {
  font-size: 15px;
}
</style>