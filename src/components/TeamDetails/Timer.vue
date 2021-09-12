<template>
  <div>
    <h2>{{ endtime }}</h2>
    <h2>
      {{ days }} days, {{ hours }} hrs, {{ minutes }} mins, {{ seconds }} secs.
    </h2>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: ["starttime", "endtime", "trans", "endtimeRaw"],
  data: function () {
    return {
      timer: "",
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
      statusType: "",
      statusText: "",
    };
  },
  computed: {
    // deadlineToShow() {
    //   let a = new Date(this.endtimeRaw).getTime() - 1000 * 60;
    //   return new Date(a);
    // }
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime();
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
  methods: {
    timerCount: function (start, end) {
      // Get todays date and time
      var now = new Date().getTime();
      // Find the distance between now an the count down date
      var distance = start - now;
      var passTime = end - now;
      if (distance < 0 && passTime < 0) {
        this.message = this.trans.expired;
        this.statusType = "expired";
        this.statusText = this.trans.status.expired;
        clearInterval(this.interval);
        // HERE IS THE MOMENT WHERE THE COUNTDOWN CAN DO STH BEFORE EXPIRATION
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
        this.message = this.trans.running;
        this.statusType = "running";
        this.statusText = this.trans.status.running;
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
        this.message = this.trans.upcoming;
        this.statusType = "upcoming";
        this.statusText = this.trans.status.upcoming;
      }
    },
    calcTime: function (dist) {
      // Time calculations for days, hours, minutes and seconds
      this.days = Math.floor(dist / (1000 * 60 * 60 * 24));
      this.hours = Math.floor(
        (dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));
      this.seconds = Math.floor((dist % (1000 * 60)) / 1000);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
div {
  width: 100%;
  padding: 0 0 0 40px;
  h2 {
    width: 100%;
    text-align: left;
    color: lightgrey;
  }
}
</style>
