<template>
  <div>
    <v-calendar ref="calendar" :event-more="false" v-model="value" :weekdays="[1, 2, 3, 4, 5, 6, 0]" :events="events">
      <template v-slot:event="{ event }">
        <div
          style="height: 100%; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; padding: 0 4px 0 8px"
          :class="event.style.color"
          @mouseover="showMenu($event, event)"
          @mouseleave="selectedOpen = false"
          @click="$router.push(event.link)"
        >{{event.name}}</div>
      </template>
    </v-calendar>
    <v-menu v-model="selectedOpen" :activator="selectedElement" :close-on-content-click="false" rigth offset-y>
      <v-card width="400">
        <v-card-title>{{selectedEvent.name}}</v-card-title>
        <v-card-text>
          <div class="body-1">Курс: {{selectedEvent.course}}</div>
          <div class="body-1">Раздел: {{selectedEvent.section}}</div>
          <div class="caption mt-2">Нажмите на событие, чтобы перейти к нему</div>
        </v-card-text>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
export default {
  data: () => ({
    value: null,
    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,
    events: []
  }),
  computed: {
    courses() {
      return this.$store.state.courses.list;
    }
  },
  methods: {
    getEvents() {
      if (this.courses[0]) {
        let events = [];
        this.courses.forEach(course => {
          course.sections.forEach(section => {
            section.content.forEach(c => {
              if (c.deadline) {
                if (this.$store.state.user.data.role === 1) {
                  let student = c.students[0];
                  let status = 0;
                  if (student !== undefined && student.s) status = student.s;
                  events.push({
                    link: `/courses/${course._id}`,
                    start: this.dictionary.formatDate(new Date(c.deadline)),
                    course: course.name,
                    section: section.name,
                    name: c.name,
                    style: this.dictionary.courseContentStatusColor(status)
                  });
                } else {
                  events.push({
                    link: `/courses/${course._id}`,
                    start: this.dictionary.formatDate(new Date(c.deadline)),
                    course: course.name,
                    section: section.name,
                    name: c.name,
                    style: this.dictionary.courseContentStatusColor(0)
                  });
                }
              }
            });
          });
        });
        this.events = events;
      } else this.events = [];
    },
    showMenu(nativeEvent, event) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => (this.selectedOpen = true), 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    }
  },
  watch: {
    courses: {
      handler() {
        this.getEvents();
      },
      immediate: true
    }
  }
};
</script>