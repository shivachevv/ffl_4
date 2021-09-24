<template>
  <v-dialog v-model="model" @click:outside="close" max-width="100%">
    <v-card>
      <div class="modal">
        <div>
          <ModalHeader>
            <span class="modal__title"> Choose your {{ title }} squad! </span>
          </ModalHeader>
          <ModalBody>
            <div class="modal__body">
              <v-select
                label="Choose formation"
                class="modal__body__formation"
                attach=".modal__body__formation"
                v-model="h2hFormation"
                :items="h2hFormations"
                chips
                :full-width="false"
                :menu-props="{ bottom: true, offsetY: true }"
              >
              </v-select>
              <div class="modal__body__field">
                <div class="modal__body__field__st">
                  <Teammate
                    v-for="player in h2hFormation.st"
                    :key="player"
                    position="ST"
                    :player="makeEmptyPlayer('Striker')"
                    :isAdditional="true"
                    @player-action="selectPlayerHandler"
                  ></Teammate>
                </div>
                <div class="modal__body__field__mid">
                  <Teammate
                    v-for="player in h2hFormation.mid"
                    :key="player"
                    position="ST"
                    :player="makeEmptyPlayer('Midfielder')"
                    :isAdditional="true"
                    @player-action="selectPlayerHandler"
                  ></Teammate>
                </div>
                <div class="modal__body__field__def">
                  <Teammate
                    v-for="player in h2hFormation.def"
                    :key="player"
                    position="DEF"
                    :player="makeEmptyPlayer('Defender')"
                    :isAdditional="true"
                    @player-action="selectPlayerHandler"
                  ></Teammate>
                </div>
                <div class="modal__body__field__gk">
                  <Teammate
                    position="GK"
                    :player="goalkeeper"
                    :isAdditional="true"
                  ></Teammate>
                </div>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <div class="modal__buttons">
              <v-btn
                color="error"
                class="white--text"
                @click.prevent="close"
                large
              >
                <v-icon left dark> fas fa-chevron-left </v-icon>
                Back
              </v-btn>
              <v-btn color="#59A95D" class="white--text" large>
                <v-icon left dark> fas fa-check </v-icon>
                Submit Squad
              </v-btn>
            </div>
          </ModalFooter>
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import ModalHeader from "./ModalHeader.vue";
import ModalFooter from "./ModalFooter.vue";
import ModalBody from "./ModalBody.vue";
import Teammate from "../../TeamDetails/Teammate.vue";

export default {
  name: "SquadChoiceModal",
  components: { ModalHeader, ModalBody, ModalFooter, Teammate },
  props: {
    model: {
      type: Boolean,
      required: true,
    },
    squad: {
      type: Array,
      required: true,
    },
    type: {
      type: String,
      required: false,
    },
  },
  data: () => ({
    h2hFormation: { def: 4, mid: 4, st: 2 },
    h2hFormations: [
      { text: "3-5-2", value: { def: 3, mid: 5, st: 2 } },
      { text: "3-4-3", value: { def: 3, mid: 4, st: 3 } },
      { text: "4-4-2", value: { def: 4, mid: 4, st: 2 } },
      { text: "4-5-1", value: { def: 4, mid: 5, st: 1 } },
      { text: "4-3-3", value: { def: 4, mid: 3, st: 3 } },
      { text: "5-4-1", value: { def: 5, mid: 4, st: 1 } },
      { text: "5-3-2", value: { def: 5, mid: 3, st: 2 } },
      { text: "5-2-3", value: { def: 5, mid: 2, st: 3 } },
    ],
    positions: {
      gk: ["gk"],
      def: ["dr1", "dr2", "dc1", "dc2", "dl1", "dl2"],
      mid: ["mr1", "mr2", "mc1", "mc2", "ml1", "ml2"],
      st: ["st1", "st2", "st3"],
    },
  }),
  methods: {
    selectPlayerHandler(player) {
      console.log(player);
    },
    close() {
      this.$emit("close-modal");
    },
    makeEmptyPlayer(name) {
      return {
        name,
      };
    },
  },
  computed: {
    goalkeeper() {
      return (this.squad.length ? this.squad : []).filter((player) =>
        this.positions.gk.includes(player.position)
      )[0]?.player;
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
    isCup() {
      return this.type === "cup";
    },
    isH2h() {
      return this.type === "h2h";
    },
    title() {
      return this.type === "cup" ? "Cup" : "Head to Head";
    },
  },
  watch: {},
  created() {},
};
</script>
<style scoped lang="scss">
.modal {
  width: 100%;
  .modal__title {
    padding: 15px 0 5px 0;
  }
  .modal__body {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    .modal__body__formation {
      width: 100%;
      padding: 10px 20%;
    }

    .modal__body__field {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: center;
      padding: 20px 90px;
      background-image: url("../../../assets/images/user-page/pitch1.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      .modal__body__field__st,
      .modal__body__field__mid,
      .modal__body__field__def,
      .modal__body__field__gk {
        width: 80%;
        display: flex;
        flex-direction: row;
        justify-content: space-evenly;
        align-items: center;
        margin: 30px 0;
        ::v-deep .teammate {
          width: 150px;
          margin: 5px 10px;
        }
      }
    }
  }
  .modal__buttons {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px 0;
  }
}
</style>
