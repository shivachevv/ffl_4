<template>
  <div class="filter-by-pos sha">
    <h3 class="filter-title up">Position filter</h3>
    <div class="checkboxes">
      <div
        v-for="position in playerPositions"
        :key="position"
        :class="[position.toLowerCase(), 'position']"
      >
        <label :class="{ checked: selected.includes(position) }">
          {{ position }}
          <input
            type="checkbox"
            :value="position"
            v-model="selected"
            @change="filterSelectHandler"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ByPosition",
  components: {},
  props: {
    positions: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selected: [],
      playerPositions: ["GK", "DL", "DC", "DR", "ML", "MC", "MR", "ST"],
    };
  },
  computed: {},
  methods: {
    filterSelectHandler() {
      this.$emit("update:positions", this.selected);
    },
  },
  watch: {
    positions() {
      this.selected = this.positions;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../../common/breakpoints.scss";

.filter-by-pos {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #d3d3d3;

  .filter-title {
    width: 100%;
    padding: 5px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #3b464d;
    color: lightgrey;
    border-bottom: 2px solid #893e40;
    font-weight: bold;
    font-size: 1rem;
  }

  .checkboxes {
    display: grid;
    // grid-column-gap: 5px;
    // grid-row-gap: 5px;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(4, 1fr);

    .position {
      margin: 10px;
      justify-self: center;
      filter: drop-shadow(0px 0px 6px rgb(34, 34, 34, 0.7));
      @media #{$mobile} {
        margin: 10px 0 10px 0;
      }
      input {
        display: none;
      }
      label {
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        background-color: #3b464d;
        color: lightgrey;
        border-radius: 100%;
        text-align: center;
        position: relative;
        z-index: 2;
        font-weight: bold;
        font-size: 0.8rem;

        &::after {
          position: absolute;
          top: auto;
          left: auto;
          content: "";
          width: 140%;
          height: 140%;
          max-width: 0%;
          max-height: 0%;
          background-color: #3b464d4f;
          z-index: 1;
          border-radius: 50%;
          transition: all 0.2s;
        }

        &.checked::after {
          max-height: 140%;
          max-width: 140%;
          z-index: -1;
        }
      }
    }

    .gk {
      grid-column: 2 / span 1;
      grid-row: 4 / span 1;
    }
    .dl {
      grid-column: 1 / span 1;
      grid-row: 3 / span 1;
    }
    .dc {
      grid-column: 2 / span 1;
      grid-row: 3 / span 1;
    }
    .dr {
      grid-column: 3 / span 1;
      grid-row: 3 / span 1;
    }
    .ml {
      grid-column: 1 / span 1;
      grid-row: 2 / span 1;
    }
    .mc {
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
    }
    .mr {
      grid-column: 3 / span 1;
      grid-row: 2 / span 1;
    }
    .st {
      grid-column: 2 / span 1;
      grid-row: 1 / span 1;
    }
  }
}
</style>
