<template>
  <div>
    <v-card v-if="course && section && content" outlined>
      <v-tabs  v-model="tab" dark background-color="teal darken-3" show-arrows>
        <v-tabs-slider color="teal lighten-3"></v-tabs-slider>
        <v-tab v-for="(id, i) in course.groups" :key="id" :href="`#tab-${i}`">{{allGroups.find(g => g._id === id).name}}</v-tab>
      </v-tabs>
  
      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(id, i) in course.groups" :key="id" :value="'tab-' + i">
          <course-section-content-students-tab :content="content" :group="allGroups.find(g => g._id === id)" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
export default {
  components: {
    CourseSectionContentStudentsTab: () =>
      import("./CourseSectionContentStudentsTab")
  },
  props: {
    course: {
      type: Object
    },
    section: {
      type: Object
    },
    content: {
      type: Object
    }
  },
  data: () => ({
    tab: null
  }),
  computed: {
    allGroups() {
      return this.$store.state.groups.groups;
    }
  }
};
</script>