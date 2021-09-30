<template>
  <v-dialog
    v-model="isModalOpen"
    @click:outside="close"
    max-width="100%"
    v-if="isModalOpen"
  >
    <v-card>
      <div class="modal">
        <div>
          <ModalHeader>
            <span class="modal__title"> Choose your {{ title }} squad! </span>
          </ModalHeader>
          <ModalBody>
            <div class="modal__body">
              <v-select
                v-if="isH2h"
                label="Choose formation"
                class="modal__body__formation"
                attach=".modal__body__formation"
                v-model="formation"
                :items="h2hFormations"
                chips
                :full-width="false"
                :menu-props="{ bottom: true, offsetY: true }"
                @change="clearSquad"
              >
              </v-select>
              <div class="modal__body__field">
                <div class="modal__body__field__st">
                  <div v-for="count in formation.st" :key="count">
                    <SquadChoiceTeammate
                      position="ST"
                      :player="
                        h2hSquadselection.striker[`st${count}`] ||
                        makeEmptyPlayer('Striker')
                      "
                      :dropdownItems="calculatedDroprownItems.strikers"
                      :uniqueId="`striker${count}`"
                      @select-player="
                        playerChangeHandler($event, {
                          post: 'striker',
                          position: `st${count}`,
                          isSelect: true,
                        })
                      "
                      @deselect-player="
                        playerChangeHandler($event, {
                          post: 'striker',
                          position: `st${count}`,
                          isSelect: false,
                        })
                      "
                    ></SquadChoiceTeammate>
                  </div>
                </div>
                <div class="modal__body__field__mid">
                  <div v-for="count in formation.mid" :key="count">
                    <SquadChoiceTeammate
                      position="MID"
                      :player="
                        h2hSquadselection.midfielder[`mid${count}`] ||
                        makeEmptyPlayer('Midfielder')
                      "
                      :dropdownItems="calculatedDroprownItems.midfielders"
                      :uniqueId="`midfielder${count}`"
                      @select-player="
                        playerChangeHandler($event, {
                          post: 'midfielder',
                          position: `mid${count}`,
                          isSelect: true,
                        })
                      "
                      @deselect-player="
                        playerChangeHandler($event, {
                          post: 'midfielder',
                          position: `mid${count}`,
                          isSelect: false,
                        })
                      "
                    ></SquadChoiceTeammate>
                  </div>
                </div>
                <div class="modal__body__field__def">
                  <div v-for="count in formation.def" :key="count">
                    <SquadChoiceTeammate
                      position="DEF"
                      :player="
                        h2hSquadselection.defender[`def${count}`] ||
                        makeEmptyPlayer('Defender')
                      "
                      :dropdownItems="calculatedDroprownItems.defenders"
                      :uniqueId="`defender${count}`"
                      @select-player="
                        playerChangeHandler($event, {
                          post: 'defender',
                          position: `def${count}`,
                          isSelect: true,
                        })
                      "
                      @deselect-player="
                        playerChangeHandler($event, {
                          post: 'defender',
                          position: `def${count}`,
                          isSelect: false,
                        })
                      "
                    ></SquadChoiceTeammate>
                  </div>
                </div>
                <div class="modal__body__field__gk">
                  <SquadChoiceTeammate
                    position="GK"
                    :player="goalkeeper"
                  ></SquadChoiceTeammate>
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
import ModalHeader from "../ModalHeader.vue";
import ModalFooter from "../ModalFooter.vue";
import ModalBody from "../ModalBody.vue";
import SquadChoiceTeammate from "./SquadChoiceTeammate.vue";
// import CustomSquadDroprown from "./CustomSquadDroprown.vue";

export default {
  name: "SquadChoiceModal",
  components: {
    ModalHeader,
    ModalBody,
    ModalFooter,
    SquadChoiceTeammate,
    // CustomSquadDroprown,
  },
  props: {
    squad: {
      type: Array,
      required: true,
    },
    isCup: {
      type: Boolean,
      required: true,
    },
    isH2h: {
      type: Boolean,
      required: true,
    },
    isModalOpen: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    showDropdown: false,
    h2hDefaultFormation: { def: 4, mid: 4, st: 2 },
    cupDefaultFormation: { def: 3, mid: 3, st: 1 },
    formation: null,
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
    h2hSquadModel: {
      strikers: [],
      midfielders: [],
      defenders: [],
    },
    h2hSquadselection: {
      striker: {
        st1: null,
        st2: null,
        st3: null,
      },
      midfielder: {
        mid1: null,
        mid2: null,
        mid3: null,
        mid4: null,
        mid5: null,
      },
      defender: {
        def1: null,
        def2: null,
        def3: null,
        def4: null,
        def5: null,
      },
    },
  }),
  methods: {
    clearSquad() {
      this.h2hSquadselection = {
        striker: {
          st1: null,
          st2: null,
          st3: null,
        },
        midfielder: {
          mid1: null,
          mid2: null,
          mid3: null,
          mid4: null,
          mid5: null,
        },
        defender: {
          def1: null,
          def2: null,
          def3: null,
          def4: null,
          def5: null,
        },
      };
    },
    playerChangeHandler(player, { post, position, isSelect }) {
      // const lastPlayerName = player[player.length - 1];
      // const playerObject = this.strikers.find(
      //   ({ player }) => player.name === lastPlayerName
      // )?.player;
      // const isThePlayerTaken = Object.values(this.h2hSquadselection[post]).find(
      //   (player) => player?.name === lastPlayerName
      // );
      if (isSelect) {
        this.h2hSquadselection[post][position] = player;
      } else {
        this.h2hSquadselection[post][position] = null;
      }
    },
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
    calculatedDroprownItems() {
      const getPlayers = (allPlayers, selectedPlayers) =>
        allPlayers.filter(
          ({ player: { id } }) =>
            !Object.values(selectedPlayers)
              .map((player) => player?.id)
              .includes(id)
        );
      return {
        strikers: getPlayers(this.strikers, this.h2hSquadselection.striker),
        midfielders: getPlayers(
          this.midfielders,
          this.h2hSquadselection.midfielder
        ),
        defenders: getPlayers(this.defenders, this.h2hSquadselection.defender),
      };
    },
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
    title() {
      return this.isCup ? "Cup" : "Head to Head";
    },
  },
  watch: {
    isModalOpen(newValue) {
      this.formation = newValue
        ? this.isCup
          ? this.cupDefaultFormation
          : this.h2hDefaultFormation
        : this.cupDefaultFormation;
    },
  },
  created() {},
  mounted() {},
};
</script>
<style scoped lang="scss">
::v-deep .v-dialog {
  overflow: hidden !important;
}
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
      background-image: url("../../../../assets/images/user-page/pitch1.png");
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center center;

      .modal__body__field__st,
      .modal__body__field__mid,
      .modal__body__field__def,
      .modal__body__field__gk {
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
