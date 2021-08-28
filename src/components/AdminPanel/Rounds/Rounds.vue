<template>
  <div class="rounds-container">
    <h1 class="section-header">Rounds section</h1>

    <button @click.prevent="loadRounds()">Load data</button>
  </div>
</template>

<script>
import { requestResource } from "../../../utils/loadResource";
import { GET_RECOURSE_PATH } from "../../../common/apiRequests";
import axios from "axios";
export default {
  name: "Rounds",
  components: {},
  data() {
    return {
      currentRound: undefined,
      players: undefined,
      users: undefined,
      h2hrounds: undefined,
      success: false,
      error: false,
      errorMsg: "",
    };
  },
  methods: {
    loadRounds() {
      requestResource(GET_RECOURSE_PATH.ROUNDS_ALL);
    },
  },
  computed: {},
  watch: {},
  async created() {},
};
</script>

<style lang="scss">
$btn-color: #5ac683;

.rounds-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  .rounds {
    width: 40%;
    border-radius: 5px;
    margin: 20px 0 0 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    font-size: 1.4rem;
    box-shadow: 0px 0px 9px 0px rgba(0, 0, 0, 0.75);

    & > span {
      margin: 0 0 20px 0;
    }
  }

  .con-vs-alert-success {
    background: #46c93a80;
    color: white;
    margin: 15px 0 0 0;
  }
}
</style>
