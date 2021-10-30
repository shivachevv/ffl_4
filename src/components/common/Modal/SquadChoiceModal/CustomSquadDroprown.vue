<template>
  <div>
    <v-expand-transition>
      <div v-show="show">
        <v-row
          v-for="{ player } in items"
          :key="player.id"
          @click="selectItem(player)"
          >{{ player.name }}</v-row
        >
      </div>
    </v-expand-transition>
  </div>
</template>

<script>
export default {
  name: "CustomSquadDroprown",
  props: {
    items: {
      type: Array,
      required: true,
    },
    selected: {
      type: Array,
    },
    show: {
      type: Boolean,
    },
  },
  data: () => ({}),
  methods: {
    selectItem(selected) {
      this.$emit("select", selected);
      this.$emit("close");
    },
  },
  computed: {},
  watch: {},
  created() {},
};
</script>
<style scoped lang="scss"></style>
