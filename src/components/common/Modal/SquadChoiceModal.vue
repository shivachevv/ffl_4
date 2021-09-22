<template>
  <v-dialog v-model="model" @click:outside="close" max-width="500px">
    <v-card>
      <div class="modal-container">
        <div>
          <ModalHeader> header </ModalHeader>
          <ModalBody> {{defenders}} </ModalBody>
          <ModalFooter> footer </ModalFooter>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalHeader from "./ModalHeader.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalBody from "./ModalBody.vue";

export default {
  name: "SquadChoiceModal",
  components: { ModalHeader, ModalBody, ModalFooter },
  data: () => ({
    positions: {
      gk: ["gk"],
      def: ["dr1", "dr2", "dc1", "dc2", "dl1", "dl2"],
      mid: ["mr1", "mr2", "mc1", "mc2", "ml1", "ml2"],
      st: ["st1", "st2", "st3"],
    },
  }),
  props: {
    model: {
      type: Boolean,
      required: true,
    },
    squad: {
      type: Array,
      required: true,
    },
  },
  methods: {
    close() {
      this.$emit("close-modal");
    },
  },
  computed: {
    goalkeeper() {
      return (this.squad.length ? this.squad : []).filter((player) =>
        this.positions.gk.includes(player.position)
      );
    },
    defenders() {
      return (this.squad.length ? this.squad : []).filter((player) =>
        this.positions.def.includes(player.position)
      );
    },
    midfielders() {
      return (this.squad.length ? this.squad : []).filter((player) =>
        this.positions.mid.includes(player.position)
      );
    },
    strikers() {
      return (this.squad.length ? this.squad : []).filter((player) =>
        this.positions.st.includes(player.position)
      );
    },
  },
  watch: {},
  created() {},
};
</script>
<style scoped>
.modal-container {
  padding: 4rem 3rem;
}
.round-dates {
  margin: -12px 0px;
}
.round-modal-button {
  margin: 0.5rem 2rem;
}
</style>
