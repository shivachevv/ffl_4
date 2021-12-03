<template>
  <div class="transfer">
    <span class="position text-uppercase">{{
      transfer.position | prettyPosition
    }}</span>
    <div class="transfer-in">
      <span v-if="transfer.to_player">{{ transfer.to_player.name }}</span>
      <v-tooltip top v-if="transfer.to_player">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="teamImagePath(transfer.to_player)"
            alt="league"
          />
        </template>
        <span>{{ transfer.to_player.club }}</span>
      </v-tooltip>
    </div>
    <div class="transfer-out">
      <span v-if="transfer.from_player">{{ transfer.from_player.name }}</span>
      <v-tooltip top v-if="transfer.from_player">
        <template v-slot:activator="{ on, attrs }">
          <img
            v-bind="attrs"
            v-on="on"
            :src="teamImagePath(transfer.from_player)"
            alt="league"
          />
        </template>
        <span>{{ transfer.from_player.club }}</span>
      </v-tooltip>
    </div>
    <div v-if="!isCurrent" class="buttons">
      <span title="Confirmed" v-if="transfer.status === 'approved'"
        ><v-icon small color="green darken-2" class="h2h-icon"
          >fas fa-check</v-icon
        ></span
      >
      <span title="Cancelled" v-if="transfer.status === 'declined'">
        <v-icon small color="red darken-2" class="h2h-icon"
          >fas fa-times</v-icon
        >
      </span>
      <span title="Pending" v-if="transfer.status === 'pending'">
        <v-icon small color="blue darken-2" class="h2h-icon"
          >fas fa-clock</v-icon
        >
      </span>
    </div>
    <div class="buttons" v-else>
      <v-btn
        xSmall
        color="success darken-2"
        v-if="isTransferOk"
        @click.prevent="() => $emit('confirm', transfer)"
        >Confirm</v-btn
      >
      <v-btn
        xSmall
        color="error darken-2"
        class="ml-1"
        @click.prevent="() => $emit('cancel', transfer)"
        >Cancel</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    transfer: {
      type: Object,
      required: true,
    },
    isCurrent: {
      type: Boolean,
      required: true,
    },
    isTransferOk: {
      type: Boolean,
      required: false,
    },
  },
  methods: {
    teamImagePath(player) {
      return player.league
        ? `https://ff-legends.com/team-logos/${player.league
            .toLowerCase()
            .split(" ")
            .join("-")}/${player.club.toLowerCase().split(" ").join("-")}.png`
        : "";
    },
  },
  filters: {
    prettyPosition(value) {
      return value.length === 2 ? value : value.substring(0, 2);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@/common/breakpoints.scss";

.transfer {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  font-weight: bold;

  .position {
    width: 10%;
  }

  .transfer-in,
  .transfer-out {
    width: 35%;
    display: flex;
    align-items: center;

    span:first-child {
      display: inline-block;
      width: 80%;
    }

    img {
      width: 10%;
      margin-left: 5px;
    }
  }
  .transfer-in span:first-child {
    border-bottom: 2px solid green;
  }
  .transfer-out span:first-child {
    border-bottom: 2px solid #c84c50;
  }

  .buttons {
    width: 20%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
