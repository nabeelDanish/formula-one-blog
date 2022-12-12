<template>
  <div class="profile">
    <Modal
      v-show="modalActive"
      :modalMessage="modalMessage"
      @close-modal="closeModal"
    />
    <div class="container">
      <h2>Account Settings</h2>
      <div class="profile-info">
        <div class="initials">{{ store.state.user.initial }}</div>
        <div class="admin-badge">
          <AdminIcon class="icon" />
          <span>admin</span>
        </div>
        <div class="input">
          <label for="firstName">First Name</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Last Name</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="userName">User Name</label>
          <input type="text" id="userName" v-model="userName" />
        </div>
        <div class="input">
          <label for="email">Email</label>
          <input type="email" id="email" v-model="email" />
        </div>
        <div class="input">
          <label for="password">Password</label>
          <input type="password" id="password" v-model="password" />
        </div>
        <button @click="updateProfile">Save Changes</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

import { Modal } from "../components";
import { AdminIcon } from "../utils/icons";

// Getting Store
const store = useStore();

// Modal Handling
const modalActive = ref(false);
const modalMessage = ref("");

const closeModal = () => {
  modalActive.value = false;
};

// User Data Handling
const { firstName, lastName, userName, email, password } = store.state.user;

const updateProfile = () => {
  modalActive.value = true;
  modalMessage.value = "Changes were saved!";
};
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icon {
          width: 14px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>
