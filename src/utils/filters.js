import Vue from "vue";

Vue.filter("prettyPosition", (value) =>
  value.length === 2 ? value : value.substring(0, 2)
);
