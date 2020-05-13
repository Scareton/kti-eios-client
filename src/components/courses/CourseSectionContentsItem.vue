<template>
  <v-card outlined class="mb-2 pa-3" @click="clicked" :disabled="content.blocked">
    <div class="subtitle-2">
      <span>{{dictionary.courseContentType(content.type)}}:</span>
      {{content.name}}
    </div>
    <div class="body-2">{{content.description}}</div>
    <v-chip
      v-if="$store.state.user.data.role === 1"
      :color="style.color"
      :dark="style.dark"
      small
      class="caption mt-2"
    >{{status.text}}</v-chip>
  </v-card>
</template>

<script>
export default {
  props: {
    course: {
      type: Object
    },
    section: {
      type: Object
    },
    content: {
      type: Object,
      default: null
    }
  },
  computed: {
    status() {
      let code;
      let student = this.content.students.find(
        item => item._id === this.$store.state.user.data._id
      );

      if (student) {
        code = student.s;
      } else 
        code = 0;

      return { code, text: this.dictionary.userCourseContentStatus(code) };
    },
    style() {
      if (this.status.code === 0) return { color: "grey darken-3", dark: true };
      if (this.status.code === 1) return { color: "blue-grey darken-2", dark: true };
      if (this.status.code === 2) return { color: "light-blue darken-4", dark: true };
      if (this.status.code === 3) return { color: "primary", dark: true };
      if (this.status.code === 4) return { color: "red darken-4", dark: true };
      if (this.status.code === 5) return { color: "green darken-2", dark: true };
      if (this.status.code === 6) return { color: "blue darken-4", dark: true };
      else return { color: "primary", dark: true };
    }
  },
  methods: {
    clicked() {
      this.$emit("clicked", this.content);
    }
  }
};
</script>