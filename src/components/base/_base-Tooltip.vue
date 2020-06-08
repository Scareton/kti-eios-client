<template>
  <v-tooltip :bottom="bottom" :top="top" :left="left" :right="right">
    <template v-slot:activator="{ on }">
      <div v-on="on">
        <slot />
      </div>
    </template>
    <span>{{text}}</span>
  </v-tooltip>
</template>

<script>
export default {
  props: {
    text: {
      default: ""
    },
    bottom: {
      type: Boolean,
      default: true
    },
    left: {
      type: Boolean,
      default: false
    },
    right: {
      type: Boolean,
      default: false
    },
    top: {
      type: Boolean,
      default: false
    }
  }
};
</script>