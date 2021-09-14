<template>
  <div class="timer">
    <span class="timer__deadline">Monday {{ endtime | prettyDate }}</span>
    <span class="timer__time-remaining">
      {{ days }} days, {{ hours }} hrs, {{ minutes }} mins, {{ seconds }} secs.
    </span>
  </div>
</template>

<script>
export default {
  name: "Timer",
  props: {
    starttime: {
      type: String,
      required: true,
    },
    endtime: {
      type: String,
      required: true,
    },
  },
  data: function () {
    return {
      start: "",
      end: "",
      interval: "",
      days: "",
      minutes: "",
      hours: "",
      seconds: "",
      message: "",
      oneDayInMilliseconds: 86400000,
    };
  },
  computed: {},
  methods: {
    timerCount: function (start, end) {
      // Get todays date and time
      const now = new Date().getTime();
      // Find the distance between now an the count down date
      const distance = start - now;
      const passTime = end - now;
      if (distance < 0 && passTime < 0) {
        clearInterval(this.interval);
        // HERE IS THE MOMENT WHERE THE COUNTDOWN CAN DO STH BEFORE EXPIRATION
        return;
      } else if (distance < 0 && passTime > 0) {
        this.calcTime(passTime);
      } else if (distance > 0 && passTime > 0) {
        this.calcTime(distance);
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
  filters: {
    prettyDate(date) {
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const [year, month, day] = date.split("-");
      const monthName = monthNames[+month - 1];
      return `${day} ${monthName} ${year}`;
    },
  },
  mounted() {
    this.start = new Date(this.starttime).getTime();
    this.end = new Date(this.endtime).getTime() + this.oneDayInMilliseconds;
    // Update the count down every 1 second
    this.timerCount(this.start, this.end);
    this.interval = setInterval(() => {
      this.timerCount(this.start, this.end);
    }, 1000);
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.timer {
  width: 100%;
  padding: 0 0 0 40px;
  .timer__deadline,
  .timer__time-remaining {
    display: inline-block;
    font-weight: bold;
    font-size: 1.15rem;
    width: 100%;
    text-align: left;
    color: lightgrey;
  }
}
</style>
