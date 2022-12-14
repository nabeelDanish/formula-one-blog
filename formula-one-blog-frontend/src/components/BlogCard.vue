<template>
  <div class="blog-card">
    <div v-show="editPost" class="icons">
      <div class="icon">
        <EditIcon class="edit" />
      </div>
      <div class="icon">
        <DeleteIcon class="delete" />
      </div>
    </div>
    <img :src="getImageUrl(post.blogCoverPhoto)" :alt="post.blogTitle" />
    <div class="info">
      <h4 class="">{{ post.blogTitle }}</h4>
      <h6>{{ post.blogDate }}</h6>
      <router-link class="link" to="#">
        View The Post <ArrowIcon class="arrow" />
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ArrowIcon, EditIcon, DeleteIcon } from "../utils/icons";
import { computed } from "vue";
import { useStore } from "vuex";

// Defining Props
const props = defineProps({
  post: Object,
});

// Defining Store
const store = useStore();

const getImageUrl = (name) => {
  return new URL(`../assets/blogCards/${name}.jpg`, import.meta.url).href;
};

const editPost = computed({
  get() {
    return store.state.editPost;
  },
});
</script>

<style lang="scss" scoped>
.blog-card {
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  background-color: white;
  min-height: 420px;
  transition: 0.5s ease all;

  &:hover {
    transform: rotateZ(-1deg) scale(1.02);
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  .icons {
    display: flex;
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 99;

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: white;
      transition: 0.5s ease all;

      &:hover {
        background-color: #303030;

        .edit,
        .delete {
          color: white;
        }
      }

      &:nth-child(1) {
        margin-right: 8px;
      }

      .edit,
      .delete {
        pointer-events: none;
        height: 15px;
        width: auto;

        &:hover {
          svg path {
            filter: invert(100%);
          }
        }
      }
    }
  }

  img {
    display: block;
    border-radius: 8px;
    z-index: 1;
    width: 100%;
    min-height: 200px;
    object-fit: cover;
  }

  .info {
    display: flex;
    flex-direction: column;
    height: 100%;
    z-index: 3;
    padding: 32px;
    color: black;

    h4 {
      padding-bottom: 8px;
      font-size: 20px;
      font-weight: 300;
    }

    h6 {
      font-weight: 400;
      font-size: 12px;
      padding-bottom: 16px;
    }

    .link {
      display: inline-flex;
      align-items: center;
      margin-top: auto;
      font-weight: 500;
      padding-top: 20px;
      font-size: 12px;
      padding-bottom: 4px;
      transition: 0.5s ease-in all;

      &:hover {
        color: rgba(48, 48, 48, 0.8);
      }

      .arrow {
        width: 10px;
      }
    }
  }
}
</style>
