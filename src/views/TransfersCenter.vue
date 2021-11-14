<template>
  <div v-if="!loading">
    <v-row class="mt-5" justify="space-between">
      <v-col cols="7" class="px-0 py-0 elevation-8">
        <TeamHeader :user="loggedUser"></TeamHeader>
        <RoundTransfersSoFar
          :currentRound="currentRound"
          :roundTransfersSoFar="roundTransfersSoFar"
        />
        <SelectedTransfers
          :transfers="combinedTransfers"
          @confirm="confirmTransfer"
          @cancel="cancelTransfer"
          :allowedTransfersCount="allowedTransfersCount"
        ></SelectedTransfers>

        <UserTransfersTeam
          :user="loggedUser"
          :roundPlayersArray="roundPlayersArray"
          :currentRound="currentRound"
          :transfersAvail="allowedTransfersCount"
          :transferredOut="transferredOut"
          :transferredIn="transferredIn"
          :maxTransfersOutReached="maxTransfersOutReached"
          :selectedPlayersPositions="selectedPlayersPositions"
          :hasWildcard="hasWildcard"
          :wildcard="wildcard"
          @makeTransferOut="makeTransferOut"
        ></UserTransfersTeam>
      </v-col>
      <v-col cols="4" class="px-0 py-0 elevation-8">
        <AllPlayersSection
          :playersCathegorized="playersCathegorized"
          :maxTransfersInReached="maxTransfersInReached"
          :transferredIn.sync="transferredIn"
          :selectedPlayersOutPositions="selectedPlayersOutPositions"
          :areTransfersEqual="areTransfersEqual"
          :positions="getPositions"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
import { TransferRequest } from "../common/entitiesClasses";
const TeamHeader = () => import("../components/TeamDetails/TeamHeader.vue");
const RoundTransfersSoFar = () =>
  import("../components/TransfersCenter/RoundTransfersSoFar.vue");
const SelectedTransfers = () =>
  import("../components/TransfersCenter/SelectedTransfers.vue");
const UserTransfersTeam = () =>
  import("../components/TransfersCenter/UserTransfersTeam.vue");
const AllPlayersSection = () =>
  import("../components/TransfersCenter/AllPlayersSection.vue");

export default {
  name: "TransfersCenter",
  components: {
    TeamHeader,
    RoundTransfersSoFar,
    SelectedTransfers,
    UserTransfersTeam,
    AllPlayersSection,
  },
  data() {
    return {
      // TO DO: make this 2
      transfersPerWeek: 2,
      transferredIn: [],
      transferredOut: [],
      wildcard: false,
    };
  },
  computed: {
    ...mapState("user", ["loggedUser", "userPlayers"]),
    ...mapState("transfers", ["transfers"]),
    ...mapState("rounds", ["currentRoundIndex"]),
    ...mapState("footballPlayers", ["footballPlayers"]),
    ...mapState("leagues", ["leagues"]),
    ...mapGetters(["getPositions"]),

    roundTransfersSoFar() {
      return (this.transfers || [])
        .filter(
          (transfer) =>
            +transfer.round_id === +this.currentRound &&
            +transfer.user_id === +this.loggedUser.id &&
            (transfer.status === "approved" || transfer.status === "pending")
        )
        .map((transfer) => ({
          ...transfer,
          to_player: this.addLeagueName(transfer?.to_player),
          from_player: this.addLeagueName(transfer?.from_player),
        }));
    },
    currentRound() {
      return +this.currentRoundIndex + 1;
    },
    allowedTransfersCount() {
      return this.transfersPerWeek - this.roundTransfersSoFar.length;
    },
    loading() {
      return !this.loggedUser || !this.transfers || !this.currentRoundIndex;
    },
    maxTransfersOutReached() {
      return +this.allowedTransfersCount === +this.transferredOut.length;
    },
    maxTransfersInReached() {
      return +this.allowedTransfersCount === +this.transferredIn.length;
    },
    roundPlayersArray() {
      const positions = [
        "dc1",
        "dc2",
        "dl1",
        "dl2",
        "dr1",
        "dr2",
        "gk",
        "mc1",
        "mc2",
        "ml1",
        "ml2",
        "mr1",
        "mr2",
        "st1",
        "st2",
        "st3",
      ];
      const initialTeam = this.userPlayers
        ? Object.entries(this.userPlayers)
            .filter(([position]) => positions.includes(position))
            .map(([position, player]) => {
              return { position, player: player[0] };
            })
        : [];

      const newPlayers = this.roundTransfersSoFar.map(
        ({ position, to_player, status }) => ({
          position,
          player: to_player,
          isPending: status === "pending",
        })
      );

      return initialTeam.map((player) => {
        const transferredInPlayer = newPlayers.find(
          (newPlayer) => newPlayer.position === player.position
        );
        const resultPlayer = transferredInPlayer || player;

        resultPlayer.isSelected = !!this.isSelected(resultPlayer.player);

        resultPlayer.isAllowed =
          !this.areTransfersEqual &&
          this.selectedPlayersInPositions.length >
            this.selectedPlayersOutPositions.length
            ? this.selectedPlayersInPositions.includes(
                resultPlayer.player.position
              )
            : true;

        return resultPlayer;
      });
    },
    playersCathegorized() {
      return (this.footballPlayers || []).reduce((result, player) => {
        if (!result[player?.league]) result[player?.league] = {};
        if (!result[player?.league][player?.club])
          result[player?.league][player?.club] = {};

        result[player?.league][player?.club][player.whoscored_id] = player;

        return result;
      }, {});
    },
    selectedPlayersPositions() {
      const positionsIn = this.transferredIn.map((player) => player.position);
      const positionsOut = this.transferredOut.map((player) => player.position);
      return [...new Set([...positionsIn, ...positionsOut])];
    },
    selectedPlayersInPositions() {
      const positionsIn = this.transferredIn.map((player) => player.position);
      return [...new Set([...positionsIn])];
    },
    selectedPlayersOutPositions() {
      const positionsOut = this.transferredOut.map((player) => player.position);
      return [...new Set([...positionsOut])];
    },
    areTransfersEqual() {
      const positionsIn = this.transferredIn
        .map((player) => player.position)
        .sort((a, b) => a.localeCompare(b));
      const positionsOut = this.transferredOut
        .map((player) => player.position)
        .sort((a, b) => a.localeCompare(b));
      const combinedPositions = [...new Set([...positionsIn, ...positionsOut])];
      return (
        combinedPositions.length === positionsIn.length &&
        combinedPositions.length === positionsOut.length &&
        positionsIn.length === positionsOut.length &&
        !!positionsIn.length
      );
    },
    combinedTransfers() {
      let playersIn = [...this.transferredIn]
        .sort((a, b) => a.position.localeCompare(b.position))
        .map(this.addLeagueName);
      let playersOut = [...this.transferredOut]
        .sort((a, b) => a.position.localeCompare(b.position))
        .map(this.addLeagueName);
      const combinedPositions =
        playersIn.length > playersOut.length
          ? playersIn.map((player) => player.position)
          : playersOut.map((player) => player.position);

      return combinedPositions.map((position) => {
        const to_player = playersIn.find((player) => player.position);
        const from_player = playersOut.find((player) => player.position);
        playersIn = playersIn.filter((player) => player.id !== to_player.id);
        playersOut = playersOut.filter(
          (player) => player.id !== from_player.id
        );
        return { position, to_player, from_player };
      });
    },
    hasWildcard() {
      // TO DO: get real value
      return true;
    },
  },
  methods: {
    ...mapActions("user", ["fetchLoggedUser", "fetchUserPlayers"]),
    ...mapActions("transfers", ["fetchTransfers", "createTransfer"]),
    ...mapActions("rounds", ["fetchRounds"]),
    ...mapActions("footballPlayers", [
      "fetchAllPlayers",
      "fetchPlayersByLeague",
    ]),
    addLeagueName(player) {
      const leaguePlayerIn = this.leagues.find(
        (league) => +league.id === +player?.football_league_id
      );
      const leaguePlayerOut = this.leagues.find(
        (league) => +league.id === +player?.football_league_id
      );
      if (leaguePlayerIn?.name) {
        player.league = leaguePlayerIn?.name || "";
      }

      if (leaguePlayerOut?.name) {
        player.league = leaguePlayerOut?.name || "";
      }

      return player;
    },
    isSelected(playerOut) {
      return this.transferredOut.find((player) => player.id === playerOut.id);
    },
    makeTransferOut(playerOut) {
      if (this.isSelected(playerOut)) {
        this.transferredOut = this.transferredOut.filter(
          (player) => player.id !== playerOut.id
        );
        return;
      }

      if (this.transferredOut.length < this.allowedTransfersCount) {
        this.transferredOut.push(playerOut);
      }
    },
    async confirmTransfer({ to_player, from_player }) {
      const payload = new TransferRequest({
        round_id: 12,
        position: from_player.squadPosition,
        from: from_player.whoscored_id,
        to: to_player.whoscored_id,
      });

      await this.createTransfer(payload);
    },
    cancelTransfer(transfer) {
      this.transferredOut = this.transferredOut.filter(
        (player) => player.id !== transfer?.from_player?.id
      );

      this.transferredIn = this.transferredIn.filter(
        (player) => player.id !== transfer?.to_player?.id
      );
    },
  },
  async created() {
    await this.fetchLoggedUser();
    await this.fetchTransfers();
    await this.fetchRounds();
    await this.fetchUserPlayers({
      userId: this.loggedUser?.id,
      round_id: 13,
      // TO DO
      // round_id: this.currentRound,
    });
    await this.fetchAllPlayers({
      queryParams: {
        points: true,
      },
    });
    // TO DO: get the WC info from the DB and assign it to 'wildcard'
  },
};
</script>
