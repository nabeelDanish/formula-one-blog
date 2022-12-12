<template>
  <div class="form-wrap">
    <form
      :class="isLogin ? 'login' : 'register'"
      @submit.prevent="handleFormSubmit"
    >
      <p class="login-register">
        {{ isLogin ? "Don't have an account?" : "Already have an account?" }}
        <router-link class="router-link" to="#" @click="toggleLoginRegister">{{
          isLogin ? "Register" : "Login"
        }}</router-link>
      </p>
      <h2>
        {{
          isLogin
            ? "Login to Formula One Blog"
            : "Create Your Formula One Blog Account"
        }}
      </h2>
      <div class="inputs">
        <div class="input" v-if="!isLogin">
          <input type="text" placeholder="First Name" v-model="firstName" />
          <UserIcon class="icon" />
        </div>
        <div class="input" v-if="!isLogin">
          <input type="text" placeholder="Last Name" v-model="lastName" />
          <UserIcon class="icon" />
        </div>
        <div class="input" v-if="!isLogin">
          <input type="text" placeholder="User Name" v-model="userName" />
          <UserIcon class="icon" />
        </div>
        <div class="input">
          <input type="email" placeholder="Email" v-model="email" />
          <EmailIcon class="icon" />
        </div>
        <div class="input">
          <input type="password" placeholder="Password" v-model="password" />
          <PasswordIcon class="icon" />
        </div>
      </div>
      <router-link
        v-if="isLogin"
        class="forgot-password"
        :to="{ name: 'ForgotPassword' }"
        >Forgot your password?</router-link
      >
      <button type="submit">{{ isLogin ? "Sign In" : "Sign Up" }}</button>
      <p class="error" v-if="error">{{ error }}</p>
      <div class="angle"></div>
    </form>
    <div class="background"></div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import axios from "axios";

import { EmailIcon, PasswordIcon, UserIcon } from "../utils/icons";

// Getting API URL
const VITE_API_URL = import.meta.env.VITE_API_URL;

// Data
const firstName = ref(null);
const lastName = ref(null);
const userName = ref(null);
const email = ref(null);
const password = ref(null);

// Store
const store = useStore();

// Router
const router = useRouter();

// Error
const error = ref(null);

// Toggle Between Login and Register
const isLogin = ref(true);
const toggleLoginRegister = () => {
  isLogin.value = !isLogin.value;
};

// Form Action
const handleFormSubmit = () => {
  error.value = null;

  if (!email.value || email.value.trim() === "") {
    error.value = "Email is Missing";
    return;
  } else if (!password.value || password.value.trim() === "") {
    error.value = "Password is Missing";
    return;
  }

  if (isLogin.value) {
    login();
  } else {
    if (!firstName.value || firstName.value.trim() === "") {
      error.value = "First Name is Missing";
      return;
    } else if (!lastName.value || lastName.value.trim() === "") {
      error.value = "Last Name is Missing";
      return;
    } else if (!userName.value || userName.value.trim() === "") {
      error.value = "User Name is Missing";
      return;
    } else {
      register();
    }
  }
};

// Login Action
const login = () => {
  // Compiling User Data
  const userData = { email: email.value, password: password.value };
  const url = `${VITE_API_URL}/login`;

  // Sending HTTP call
  axios
    .post(url, userData)
    .then((response) => {
      if (response.status === 200) {
        response.data.initial =
          response.data.firstName.match(/(\b\S)?/g).join("") +
          response.data.lastName.match(/(\b\S)?/g).join("");
        store.commit("saveUserData", response.data);
        router.push({ name: "Home" });
      } else {
        error.value = response.data.error;
      }
    })
    .catch((e) => {
      console.log("e :>> ", e);
      error.value = e.response.data;
    });
};

// Register Action
const register = () => {
  // Compiling User Data
  const userData = {
    firstName: firstName.value,
    lastName: lastName.value,
    userName: userName.value,
    email: email.value,
    password: password.value,
  };
  const url = `${VITE_API_URL}/register`;

  // Sending HTTP call
  axios
    .post(url, userData)
    .then((response) => {
      if (response.status === 200) {
        response.data.initial =
          response.data.firstName.match(/(\b\S)?/g).join("") +
          response.data.lastName.match(/(\b\S)?/g).join("");

        store.commit("saveUserData", response.data);
        router.push({ name: "Home" });
      } else {
        error.value = response.data.error;
      }
    })
    .catch((e) => {
      console.log("e :>> ", e);
      error.value = e.response.data;
    });
};
</script>

<style lang="scss">
::-webkit-scrollbar {
  display: none;
}

.form-wrap {
  overflow: hidden;
  display: flex;
  height: 100vh;
  justify-content: center;
  align-self: center;
  margin: 0 auto;
  width: 90%;

  @media (min-width: 900px) {
    width: 100%;
  }

  .register {
    h2 {
      max-width: 350px;
    }
  }

  .login-register {
    margin-bottom: 32px;

    .router-link {
      color: black;
    }
  }

  form {
    padding: 0 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    @media (min-width: 900px) {
      padding: 0, 50px;
    }

    h2 {
      text-align: center;
      font-size: 32px;
      color: #303030;
      margin-bottom: 40px;

      @media (min-width: 900px) {
        font-size: 40px;
      }
    }

    .inputs {
      width: 100%;
      max-width: 350px;

      .input {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 8px;

        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 4px 4px 4px 30px;
          height: 50px;

          &:focus {
            outline: none;
          }
        }
      }

      .icon {
        width: 12px;
        position: absolute;
        left: 10px;
      }
    }

    .forgot-password {
      text-decoration: none;
      color: black;
      cursor: pointer;
      font-size: 14px;
      margin: 16px 0 32px;
      border-bottom: 1px solid transparent;
      transition: 0.5s ease all;

      &:hover {
        border-color: #303030;
      }
    }

    .angle {
      display: none;
      position: absolute;
      background-color: white;
      transform: rotateZ(4deg);
      width: 120px;
      height: 101%;
      right: -60px;

      @media (min-width: 900px) {
        display: initial;
      }
    }
  }

  .background {
    display: none;
    flex: 2;
    background-size: cover;
    background-image: url("../assets/background.jpg");
    width: 100%;
    height: 100%;

    @media (min-width: 900px) {
      display: initial;
    }
  }
}
</style>
