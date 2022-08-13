<script>
function isJSON(data) {
  var isJson = false;
  try {
    var json = $.parseJSON(data);
    isJson = typeof json === "object";
  } catch (err) {
    console.log("err :",err)
  }
  return isJson;
}

import NavBar from "../Navbar.vue";
import Card from "../Card.vue";
import Postform from "../Postform.vue";
export default {
  name: "Wall",
  components: { Card, Postform, NavBar },
  computed: {
    isJSON,
  },
  beforecreated() {
    const token = localStorage.getItem("token");
    if (token == null) {
      this.$router.push("/login");
    }
  },
  mounted() {
    const options = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
    const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;

    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to fetch posts");
        }
      })
      .then((res) => {
        const { posts, email, user } = res;

        this.posts = posts;
        this.currentUser = email;
      })

      .catch((error) => {console.log("err :",err)});
  },
  data() {
    return {
      posts: [],
      currentUser: null,
    };
  },
};
</script>
<template>
  <NavBar> </NavBar>

  <div v-if="currentUser" class="container-sm mt-5">
    <Postform> </Postform>

    <div v-for="post in posts">
      <Card
        :name_owner_post="post.user.name"
        :last_name_owner_post="post.user.lastName"
        :avatar_owner_post="post.user.avatar"
        :email_owner_post="post.user.email"
        :content_owner_post="post.content"
        :url_img_owner_post="post.imageUrl"
        :comments_owner_post="post.comments"
        :id_owner_post="post.id"
        :createdAt="post.createdAt"
      >
      </Card>
    </div>
  </div>
</template>
<style scoped></style>
