<script>
import Avatar from "../Avatar.vue";
import NavBar from "../NavBar.vue";

export default {
  name: "Profile",
  components: { Avatar, NavBar },
  data() {
    return {
      current_user: null,
      email: null,
      name: null,
      lastName: null,
      admin: null,
      service: null,
      urlAvatar: null,
      idUser: null,
    };
  },
  created() {
    var current_user = JSON.parse(localStorage.getItem("current_user"));

    if (this.$route.query.user_email != null) {
      this.email = this.$route.query.user_email;

      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      // const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/getUser/${this.email}`;
      const url = `https://groupomaniak-back.herokuapp.com/users/getUser/${this.email}`;
      fetch(url, options)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Failed to fetch get");
          }
        })
        .then((res) => {
          const { user } = res;

          this.email = user.email;
          this.name = user.name;
          this.lastName = user.lastName;
          this.admin = user.admin == "true" ? "compte modérateur" : "compte utilisateur";
          this.service = user.service;
          this.urlAvatar = user.avatar;
          this.idUser = user.id;
        })

        .catch((err) => {console.log("err :",err)});
    } else {
      if (current_user != null) {
        this.idUser = current_user.id;
        this.email = current_user.email;
        this.name = current_user.name;
        this.lastName = current_user.lastName;
        this.admin =
          current_user.admin == "false" ? "Compte Utilisateur" : "Compte Modérateur";
        this.service = current_user.service;
        this.urlAvatar = current_user.avatar;
      }
    }
  },
};
</script>
<template>
  <NavBar></NavBar>
  <div class="container">
    <div class="main-body">
      <div class="row gutters-sm center-sm">
        <div class="card col-md-8 mb-3 mx-auto">
          <div class="card-body">
            <div class="d-flex flex-column align-items-center text-center">
              <Avatar v-if="this.urlAvatar" :url="this.urlAvatar"></Avatar>

              <div class="mt-3">
                <h4>{{ lastName }} {{ name }}</h4>
                <p class="text-secondary mb-1">{{ service }}</p>
                <p class="text-secondary mb-1">{{ email }}</p>
                <p class="text-secondary mb-1">{{ admin }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.row > * {
  flex-shrink: 0;
  /* width: 100%; */
  max-width: 100%;
  padding-right: 0;
  padding-left: 0;
  margin-top: var(--bs-gutter-y);
}

body {
  margin-top: 20px;
  color: #1a202c;
  text-align: left;
  background-color: #e2e8f0;
}

.main-body {
  padding: 15px;
}

.card {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  min-height: 1px;
  padding: 1rem;
}

.gutters-sm {
  margin-right: -8px;
  margin-left: -8px;
}

.gutters-sm > .col,
.gutters-sm > [class*="col-"] {
  padding-right: 8px;
  padding-left: 8px;
}

.mb-3,
.my-3 {
  margin-bottom: 1rem !important;
}

.bg-gray-300 {
  background-color: #e2e8f0;
}

.h-100 {
  height: 100% !important;
}

.shadow-none {
  box-shadow: none !important;
}
</style>
