<template>
  <div class="container">
    <h1>Latest Posts</h1>
    <!-- CREATE POST HERE -->
    <div class="create-post">
      <label for="create-post">Say Something.....</label>
      <input type="text" class="search-bar" v-model="text" placeholder="Create a Post" />
      <br>
      <button v-on:click="createPost">Post</button>
    </div>
    <br>
    <br>
    <br>
    <p class="error" v-if="error">{{error}}</p>
    <div class="posts-container">
      <div class="post" v-for="(post,index) in posts" v-bind:item="post" v-bind:index="index" v-bind:key="post._id" v-on:dblclick="deletePost(post._id)">
        {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}}
        <p class="text">{{post.text}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
export default {
  name: "PostComponent",
  data() {
    return {
      posts: [],
      error: "",
      text: ""
    };
  },
  async created() {
    try {
      this.posts = await PostService.getPosts();
    } catch (err) {
      this.error = err.message;
    }
  },
  methods: {
    async createPost() {
      await PostService.insertPost(this.text);
      this.posts = await PostService.getPosts();
    },
    async deletePost(id) {
      await PostService.deletePost(id);
      this.posts = await PostService.getPosts();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
div.container {
  background-color:dimgray;
  background-size: cover;
  background-position: bottom;
  transition: 0.4s;
  
}
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}
div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}
p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}

.search-bar{
  display: block;
  width: 100%;
  padding: 15px;

  color: #313131;
  font-size: 20px;

  appearance: none;
  border:  none;
  outline: none;
  background: none;

  box-shadow: 0px 0px 8px rgba(0,0,0,0.25);
  background-color: rgba(255,255,255,0.5);
  border-radius: 0px 19px 0px 19px;
  transition: 0.4s;

}
.search-bar:focus{
  box-shadow: 0px 0px 16px rgba(0,0,0,0.25);
  background-color:rgba(255,255,255,0.75);
  border-radius: 19px 0px 19px 0px ;
}
</style>
