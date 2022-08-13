<script>
import Avatar from "../Avatar.vue";

export default {
  name: "DeleteProfile",
  components: { Avatar },
  data() {
    return {
      email: null,
      name: null,
      lastName: null,
      service: null,
      admin: null,
      urlAvatar: null,
      idUser: null,
    };
  },
  created() {
    if (this.$route.query.user_email != null) {
      this.email = this.$route.query.user_email;


      const options = {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/getUser/${this.email}`;



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

        .catch((err) => {
        console.log("err :",err)
        });
    }
  },
  methods: {
    deleteProfile() {
   

      const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users`;

     

      const options = {
        method: "DELETE",
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      };

      fetch(url + "/" + this.idUser, options)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw new Error("Failed to delete User");
          }
        })
        .then((res) => {
     

          this.$router.push({ path: "/home" });
        })
        .catch((err) => {
   			console.log("err :",err)
        });
    },
  },
};
</script>

<!-- https://www.bootdey.com/snippets/view/profile-edit-data-and-skills#html -->
<template>
  <div class="col-lg-8 mx-auto mt-3">
    <div class="card">
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Avatar</h6>
          </div>
          <div class="col-sm-9">
            <Avatar :url="this.urlAvatar"></Avatar>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Email</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary mb-1">{{ email }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Name</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary mb-1">{{ name }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">Last Name</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary mb-1">{{ lastName }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">service</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary mb-1">{{ service }}</p>
          </div>
        </div>

        <div class="row mb-3">
          <div class="col-sm-3">
            <h6 class="mb-0">admin</h6>
          </div>
          <div class="col-sm-9 text-secondary">
            <p class="text-secondary mb-1">{{ admin }}</p>
          </div>
        </div>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <div class="row">
          <div class="text-center text-secondary">
            <input
              type="submit"
              class="btn btn-primary px-4"
              value="Delete Profile"
              @click="deleteProfile"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
body {
  background: #f7f7ff;
  margin-top: 20px;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 0 solid transparent;
  border-radius: 0.25rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}

.me-2 {
  margin-right: 0.5rem !important;
}

i.fa-solid {
  height: 20px;
  width: 20px;
  font-size: medium;
  font-weight: 100;

  margin-top: -50px;

  align-self: center;
  margin-right: -80px;
  cursor: pointer;
}

img {
  cursor: pointer;
}

img:hover {
  opacity: 0.5;
}

.card .card-body .row:last-child {
  margin-top: 3rem;
}

#file-input {
  display: none;
}
</style>
