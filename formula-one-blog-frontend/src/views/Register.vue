<template>
  <div class="form-wrap">
    <form class="register">
      <p class="login-register">
        Don't have an account?
        <router-link class="router-link" to="#">Register</router-link>
      </p>
      <h2>Login to Formula One Blogs</h2>
      <div class="inputs">
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <EmailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <PasswordIcon class="icon" />
        </div>
      </div>
      <router-link class="forgot-password" :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link
      >
      <button>Sign In</button>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { EmailIcon, PasswordIcon } from "../utils/icons";

// Data
const email = ref(null);
const password = ref(null);
</script>

<style></style>
