<template>
  <div class="login sha">
    <p class="login-heading">Login</p>

    <v-form color="white" ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="[rules.required, rules.email]"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="showPassword ? 'fas fa-eye' : 'fas fa-eye-slash'"
        :rules="[rules.required]"
        :type="showPassword ? 'text' : 'password'"
        name="input-10-1"
        label="Password"
        counter
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        :disabled="!valid || empty"
        color="#59A95D"
        elevation="4"
        class="white--text"
        @click.prevent="loginHandler"
      >
        Login
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "Login",
  validations: {
    email: {},
    password: {},
  },
  data() {
    return {
      email: "",
      password: "",
      valid: false,
      showPassword: false,
      rules: {
        required: (v) => !!v || "Required.",
        email: (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      },
    };
  },
  methods: {
    ...mapActions("auth", ["login"]),

    async loginHandler() {
      if (!this.valid || this.empty) {
        return;
      }
      await this.login({
        email: this.email,
        password: this.password,
      });
    },
  },
  computed: {
    empty() {
      return !this.email || !this.password;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../common/breakpoints.scss";
$error-clr: #ff7175;
.login {
  margin: 20px 0 0 0;
  border-radius: 5px;
  padding: 1.5rem;
  width: 30%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  overflow: hidden;
  transition: all 0.5s;
  @media #{$mobile} {
    width: 90%;
  }
  .login-heading {
    margin: 0 0 10px 0;
    font-size: 1.5rem;
    background: #3d474d;
    color: white;
    border-bottom: 4px solid #934345;
    text-align: center;
  }
  .error-msg {
    color: $error-clr;
    margin: 0 0 10px 0;
  }
  .container-loading {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    img {
      width: 2rem;
      height: 2rem;
    }
  }
  form {
    display: flex;
    flex-flow: column;
    *:not(:last-child) {
      margin-bottom: 1rem;
    }
    input {
      padding: 0.5rem;
      transition: all 0.2s;
      &:focus {
        border: 3px solid #924243;
      }
    }
    button {
      font-size: 1.5rem;
      color: #4e585e;
      padding: 0.5rem;
      background-color: lightgray;
      border: 1px solid gray;
      border-radius: 3px;
      cursor: pointer;
      transition: all 0.3s;
      &:hover {
        background-color: #893f40;
        color: lightgray;
        border: none;
      }
    }
  }
}
</style>
