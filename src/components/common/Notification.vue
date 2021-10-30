<template>
  <div>
    <v-snackbar
      v-for="(item, i) in notifications"
      v-model="item.visible"
      :color="notificationColors[item.type]"
      :key="i + 'notification'"
      timeout='-1'
    >
      {{ item.text }}

      <template v-slot:action="{ attrs }">
        <v-btn icon v-bind="attrs" @click="item.visible = false">
          <v-icon color="white">fa-times </v-icon>
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Footer",
  data() {
    return {
      notificationColors: {
        error: "red",
        success: "green",
      },
    };
  },
  computed: {
    ...mapGetters("notifications", ["notifications"]),
    // notifications() {
    //   return this.$store.getters["notifications/notifications"];
    // },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../common/breakpoints.scss";

/***************** FOOTER *******************/

footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: #4e585e;
  margin: 20px 0 0 0;
  font-size: 0.75rem;
}

.footer-logo,
.footer-fb {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 50px 0 0;
}

.footer-logo a,
.footer-fb a {
  color: #ffffff;
  text-decoration: none;
  transition: all 0.2s;
  margin: 0 0 0 10px;
}

.footer-logo a:hover,
.footer-fb a:hover {
  text-decoration: underline;
}

.footer-logo img,
.footer-fb img {
  width: 44px;
}

.footer-pele,
.footer-maradona,
.footer-cat {
  // height: 250px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-left: 1px solid #60666a;
  margin: 10px 0;
  padding: 10px 50px;
}

.footer-maradona,
.footer-cat {
  border-right: 1px solid #60666a;
}

.footer-pele h2,
.footer-maradona h2,
.footer-cat h2 {
  color: #ffffff;
  margin: 0 0 10px;
  text-align: center;
}

.footer-pele a,
.footer-maradona a,
.footer-cat a {
  color: #ffffff;
  text-decoration: none;
  margin: 5px 0;
  text-align: left;
  width: 100%;
}

.footer-pele a:hover,
.footer-maradona a:hover,
.footer-cat a:hover {
  text-decoration: underline;
}

@media #{$mobile} {
  footer {
    margin: 10px 0 0 0;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    grid-template-rows: repeat(2, auto);
    padding: 10px 0 10px 0;
    // height: 350px;
    font-size: 0.9rem;
  }

  .footer-logo {
    margin: 0 20px 0 20px;
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
    justify-self: flex-start;
  }

  .footer-fb {
    grid-column: 4 / span 3;
    grid-row: 1 / span 1;
    justify-self: flex-end;
  }

  .footer-pele {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-maradona {
    grid-column: 3 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-cat {
    grid-column: 5 / span 2;
    grid-row: 2 / span 1;
  }

  .footer-pele,
  .footer-maradona,
  .footer-cat {
    // height: 140px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    /* align-items: center; */
    align-self: flex-start;
    border-left: 1px solid #60666a;
    margin: 10px 0;
    padding: 0px;
  }

  .footer-pele a,
  .footer-maradona a,
  .footer-cat a {
    margin: 3px 0;
    text-align: center;
    font-size: 1rem;
  }

  .footer-logo img,
  .footer-fb img {
    width: 30px;
  }

  .footer-logo img {
    margin: 0px 10px 0 10px;
  }

  .footer-fb img {
    margin: 0px 10px 0 10px;
  }

  .footer-logo,
  .footer-fb {
    margin: 0px;
  }

  .footer-logo a,
  .footer-fb a {
    margin: 0px;
  }

  .no-stand-pele,
  .no-stand-mar {
    padding: 10px;
  }

  .no-stand-pele > img,
  .no-stand-mar > img {
    width: 100%;
  }

  .no-stand-pele a,
  .no-stand-mar a {
    font-size: 1.5rem;
  }

  .no-stand-mar a img,
  .no-stand-pele a img {
    top: 30%;
  }

  .no-stand-pele a img {
    left: 0px;
  }

  .no-stand-mar a img {
    right: 0px;
  }
}
</style>
