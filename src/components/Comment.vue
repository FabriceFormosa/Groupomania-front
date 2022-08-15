<script>
import Avatar from "./Avatar.vue";
export default {
  name: "Comment",
  components: { Avatar },
  props: {
    email: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    urlAvatar: {
      type: String,
    },
    createdAt: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      currentComment: null,
      postName: null,
      postLastName: null,
      fullName: null,
    };
  },
  mounted() {
    const postEmail = this.$props.email;
    this.postName = postEmail.split("@")[0].split(".")[1];
    if (this.postName == null) this.postName = "unknown";

    this.postLastName = postEmail.split("@")[0].split(".")[0];
    if (this.postLastName == null) this.postLastName = "unknown";

    this.fullName = this.postLastName + "  " + this.postName;
  },
  methods: {
    viewProfile() {
      this.$router.push({
        path: "/viewprofile",
        query: { user_email: this.$props.email },
      });
    },
  },
};
</script>
<template>
  <div class="d-flex gap-1">
    <div @click="viewProfile">
      <Avatar :url="this.$props.urlAvatar"></Avatar>
    </div>
    <div class="d-flex flex-column comment_text p-1">
      <p>{{ fullName }}</p>
      <p>{{ content }}</p>
      <br />
      <p class="fs-6 text-muted">{{ createdAt }}</p>
    </div>
  </div>
</template>

<style scoped>
.d-flex p {
  margin-bottom: 0;
}

.comment_text {
  background-color: aquamarine;
  border-radius: 3px;
  width: 100%;
}

.d-flex p:nth-child(1) {
  font-weight: bold;
}
</style>
