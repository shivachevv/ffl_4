<template>
  <div class="league-pow sha hover">
    <!-- <div class="pow-heading up">
      <div>
        <img :src="require(`@/assets/images/home/pow.png`)" alt="pow-icon`" />
      </div>
      <h2>Player of the week</h2>
    </div>

    <div class="pow-points" v-for="p in powRdy[0]" :key="p.player" @click="playerPopupHandler(p)">
      <h2 class="pow up">
        {{p.player}} /
        <span>{{p.team}}</span>
      </h2>
      <span class="pow-points-number">{{p.pts}} pts</span>
    </div>
    <div class="pow-points" v-for="p in powRdy[1]" :key="p.player" @click="playerPopupHandler(p)">
      <h2 class="pow up">
        {{p.player}} /
        <span>{{p.team}}</span>
      </h2>
      <span class="pow-points-number">{{p.pts}} pts</span>
    </div>
    <div class="pow-points" v-for="p in powRdy[2]" :key="p.player" @click="playerPopupHandler(p)">
      <h2 class="pow up">
        {{p.player}} /
        <span>{{p.team}}</span>
      </h2>
      <span class="pow-points-number">{{p.pts}} pts</span>
    </div>-->
  </div>
</template>

<script>
// import { mapActions, mapGetters } from "vuex";

// export default {
//   name: "Pow",
//   props: {
//     selectedLeagueObj: {
//       type: Object,
//       required: true
//     },
//     players: {
//       type: Object,
//       required: true
//     },
//     currentRound: {
//       type: Number,
//       required: true
//     },
//     users: {
//       type: Object,
//       required: true
//     }
//   },
//   methods: {
//     // ...mapActions(["fetchPow"]),
//     playerPopupHandler(p) {
//       return this.$emit("playerPopupSelected", p);
//     }
//   },
//   computed: {
//     // ...mapGetters(["pow"]),
//     powRdy() {
//       const teams = this.selectedLeagueObj.teams;
//       const userTeams = Object.values(this.users)
//         .filter(x => {
//           if (this.selectedLeagueObj.id === x.league) {
//             return x;
//           }
//         })
//         .map(x => {
//           return x.rounds[`r${this.currentRound}`].team
//         });

//       console.log(teams, userTeams);

//       return "test";
//     }
//   },
//   created() {
//     // this.fetchPow();
//   }
// };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// /********** PLAYERS OF THE WEEK **********/
// .league-pow {
//   width: 100%;
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   align-items: center;
//   background-color: #4e585e;
//   margin: 20px 0 0 0;
//   position: relative;
//   transition: all 0.3s;
//   &:hover {
//     transform: scale(1.03);
//   }
// }
// .pow-heading {
//   width: 100%;
//   height: 50px;
//   display: flex;
//   flex-direction: row;
//   justify-content: flex-start;
//   align-items: center;
//   background-color: #4e585e;
//   > div {
//     display: inline-block;
//     width: 50px;
//     height: 50px;
//     background-color: #838a8e;
//     text-align: center;
//   }
//   img {
//     width: 30px;
//     margin: 10px 0 10px 0;
//   }
//   h2 {
//     width: 100%;
//     height: 100%;
//     text-align: center;
//     font-size: 1.125rem;
//     color: #c6c6c6;
//     line-height: 50px;
//   }
// }
// .pow-points {
//   width: 100%;
//   height: 50px;
//   display: flex;
//   flex-direction: row;
//   justify-content: space-between;
//   align-items: center;
//   background-color: #9fa5a9;
//   border-top: 1px solid #c6c6c6;
//   &:hover {
//     background-color: darken($color: #9fa5a9, $amount: 5);
//     cursor: pointer;
//     h2 {
//       text-decoration: underline;
//       span {
//         text-decoration: underline;
//       }
//     }

//     span.pow-points-number {
//       width: 30%;
//       border-left: 10px solid #794446;
//       text-decoration: none;
//     }
//   }
//   // &:nth-child(2) {
//   //   border-top: none;
//   //   > span {
//   //     height: 50px;
//   //     transition: all 0.3s;
//   //   }
//   // }
//   h2 {
//     width: 100%;
//     height: 100%;
//     text-align: left;
//     font-size: 1rem;
//     color: #232f37;
//     line-height: 50px;
//     padding: 0 0 0 15px;
//     span {
//       display: inline-block;
//       font-size: 0.75rem;
//       color: #232f37;
//       margin: 0 0 0 5px;
//       transition: all 0.3s;
//     }
//   }
//   > span {
//     display: inline-block;
//     align-self: flex-end;
//     height: 49px;
//     width: 25%;
//     background-color: #633d3e;
//     border-left: 5px solid #794446;
//     text-align: center;
//     line-height: 50px;
//     color: #e5e3e4;
//     transition: all 0.3s;
//   }
// }
</style>