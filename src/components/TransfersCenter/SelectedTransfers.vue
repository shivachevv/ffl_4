<template>
  <div class="transfers">
    <h2 v-if="allowedTransfersCount">New transfers</h2>
    <h2 class="no-transfers" v-else>No transfers left</h2>
    <TransferInfo
      v-for="transfer in transfers"
      :key="transfer.id"
      :transfer="transfer"
      :isCurrent="true"
      :isTransferOk="isTransferOk(transfer)"
      @confirm="confirm"
      @cancel="cancel"
    />
  </div>
</template>

<script>
const TransferInfo = () => import("./TransferInfo.vue");

export default {
  name: "SelectedTransfers",
  components: {
    TransferInfo,
  },
  props: {
    transfers: {
      type: Array,
      required: true,
    },
    allowedTransfersCount: {
      type: Number,
      required: true,
    },
  },
  methods: {
    confirm(transfer) {
      this.$emit("confirm", transfer);
    },
    cancel(transfer) {
      this.$emit("cancel", transfer);
    },
    isTransferOk(transfer) {
      return !!transfer.to_player && !!transfer.from_player;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.transfers {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  h2 {
    height: 40px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #3c474d;
    margin: 0 0 5px 0;
    background-color: #59a95d;
    font-size: 1.3rem;

    &.no-transfers {
      background-color: #bd7272;
    }
  }
}
</style>
