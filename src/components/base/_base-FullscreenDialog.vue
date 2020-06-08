<template>
  <div>
    <v-dialog fullscreen hide-overlay v-model="_display">
      <v-card tile color="grey lighten-4" class="row flex-column align-center" style="max-height:100%;overflow-y:scroll;">
        <div :class="[color, '']" style="position: sticky;top: 0;z-index: 9999;">
          <div :class="['pa-0 my-0 mx-auto', {'col-9': breakpoint === 'desktop'}, {'col': breakpoint !== 'desktop'}]">
            <v-toolbar dark color="transparent" flat>
              <v-toolbar-title>{{title}}</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon dark @click="_display = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-toolbar>
          </div>
        </div>
        <div :class="['pa-0 my-0 mx-auto', {'col-9': breakpoint === 'desktop'}, {'col': breakpoint !== 'desktop'}]">
          <slot @dialogClose="_display = false" />
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    display: {
      default: false
    },
    color: {
      default: "blue-grey darken-3"
    },
    title: {
      default: ""
    }
  },
  computed: {
    breakpoint() {
      return this.$store.state.breakpoint
    },
    _display: {
      get() {
        return this.display;
      },
      set(status) {
        console.log(status);
        this.$emit("update:display", status);
      }
    }
  }
};
</script>

<style>
.contentContainer {
  max-width: 70%;
  margin-right: auto;
  margin-left: auto;
  max-height: calc(100vh - 64px - 32px);
  overflow-y: auto;
}
</style>