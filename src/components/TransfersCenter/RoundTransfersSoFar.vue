<template>
  <div class="transfers-container">
    <h2>Transfers submitted for round {{ currentRound }}</h2>
    <TransferInfo
      v-for="transfer in roundTransfersSoFar"
      :key="transfer.id"
      :transfer="transfer"
      :isCurrent="false"
    />
  </div>
</template>

<script>
const TransferInfo = () => import("./TransferInfo.vue");

export default {
  name: "RoundTransfersSoFar",
  components: {
    TransferInfo,
  },
  props: {
    currentRound: {
      type: Number,
      required: true,
    },
    roundTransfersSoFar: {
      type: Array,
      required: true,
    },
  },
  methods: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/common/breakpoints.scss";

.transfers-container {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 5px 0;
  background-color: #bebebe;

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
  }

  // .tr-cont {
  //   width: 100%;
  //   height: 100%;
  //   display: flex;
  //   padding: 0 0 0 10px;
  //   flex-direction: row;
  //   justify-content: space-between;
  //   align-items: stretch;
  //   // background-color: #9fa5a9;
  //   position: relative;
  //   @media #{$mobile} {
  //     padding: 0px;
  //   }

  //   span {
  //     padding: 7px;
  //     font-weight: bold;
  //     text-align: center;
  //     @media #{$mobile} {
  //       padding: 0px;
  //       margin: 0px;
  //     }

  //     &:nth-child(1) {
  //       width: 4%;
  //       margin: 0 0 0 5px;
  //       @media #{$mobile} {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //     }
  //     &:nth-child(2) {
  //       width: 23%;
  //       border-bottom: 3px solid green;
  //       margin: 0 0 0 5px;
  //       @media #{$mobile} {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //     }
  //     &:nth-child(3) {
  //       width: 23%;
  //       border-bottom: 3px solid green;
  //       margin: 0 5px 0 0;
  //       @media #{$mobile} {
  //         margin: 0 0 0 1px;
  //       }
  //     }
  //     &:nth-child(4) {
  //       width: 23%;
  //       border-bottom: 3px solid #c84c50;
  //       margin: 0 0 0 5px;
  //       @media #{$mobile} {
  //         margin: 0 0 0 1px;
  //       }
  //     }
  //     &:nth-child(5) {
  //       width: 23%;
  //       border-bottom: 3px solid #c84c50;
  //       margin: 0 5px 0 0;
  //       @media #{$mobile} {
  //         padding: 0px;
  //         margin: 0px;
  //       }
  //     }
  //     &:nth-child(6) {
  //       width: 4%;
  //       margin: 0 5px 0 0;
  //       @media #{$mobile} {
  //         padding: 0px;
  //         margin: 0px 10px 0 0;
  //       }
  //     }
  //   }

  //   .pending {
  //     background-color: #828a8d;
  //   }
  //   .confirmed {
  //     background-color: #91ca91;
  //   }
  //   .cancelled {
  //     background-color: #793638;
  //     color: white;
  //   }
  // }
}
</style>
