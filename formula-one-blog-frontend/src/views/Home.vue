<script setup>
import { ref, computed } from "vue";
import { BlogPost, BlogCard } from "../components";
import { ArrowIcon } from "../utils/icons";
import { useStore } from "vuex";

const welcomeScreen = ref({
  title: "Welcome",
  blogPost:
    "Weekly blog articles with all things Formula One including Races, Drivers, Teams, and more. Register today to never miss a post!",
  welcomeScreen: true,
  photo: "formulaOne",
});

const sampleBlogPost = ref([
  {
    title: "Why Williams and Alex are sticking together",
    blogHTML:
      "Amidst the drama of Alpine and Oscar Piastri’s driver market dance, on Wednesday Williams revealed they are retaining Alex Albon for next season and beyond. Lawrence Barretto explains why the news makes sense for both sides, but also gives options for the future…",
    blogCoverPhoto: "williams",
  },
  {
    title: "Double Podium for Mercedes in Hungary",
    blogHTML:
      "Mercedes trackside engineering director Andrew Shovlin called the team’s double podium finish in Budapest ‘particularly satisfying’ – and warned the team’s rivals the Silver Arrows have more upgrades coming as they chase their first win of the season.",
    blogCoverPhoto: "mercedes",
  },
]);

// Getting State Vars
const store = useStore();
const sampleBlogCards = store.state.sampleBlogCards;

// Getting User
const isUser = computed({
  get() {
    return store.state.user !== null;
  },
});
</script>

<template>
  <div class="home">
    <BlogPost v-if="!isUser" :post="welcomeScreen" />
    <BlogPost
      v-for="(post, index) in sampleBlogPost"
      :key="index"
      :post="post"
    />
    <div class="blog-card-wrap">
      <div class="container">
        <h3>View More Recent Blogs</h3>
        <div class="blog-cards">
          <BlogCard
            v-for="(post, index) in sampleBlogCards"
            :key="index"
            :post="post"
          />
        </div>
      </div>
    </div>
    <div class="updates" v-if="!isUser">
      <div class="container">
        <h2>Never Miss a Post. Register for your free account today!</h2>
        <router-link class="router-button" :to="{ name: 'LoginRegister' }">
          Register for Formula One Blogs <ArrowIcon class="arrow arrow-light" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.blog-card-wrap {
  h3 {
    font-weight: 300;
    font-size: 28px;
    margin-bottom: 32px;
  }
}

.updates {
  .container {
    padding: 100px 25px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (min-width: 800px) {
      padding: 125px 25px;
      flex-direction: row;
    }

    .router-button {
      display: flex;
      font-size: 14px;
      text-decoration: none;

      @media (min-width: 800px) {
        margin-left: auto;
      }
    }

    h2 {
      font-weight: 300;
      font-size: 32px;
      max-width: 425px;
      text-align: center;
      text-transform: uppercase;

      @media (min-width: 800px) {
        text-align: initial;
        font-size: 40px;
      }
    }
  }
}
</style>
