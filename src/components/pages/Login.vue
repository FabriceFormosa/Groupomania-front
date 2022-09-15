<script>
import Avatar from "../Avatar.vue";
import NavBar from "../Navbar.vue";

function data() {
  // function data renvoie un objet
  return {
    isFieldInvalid: false,
    error: null,
    selectedAvatar: null,
    msg: null,
    dspFormSignUp: true,
    dspFormSignIn: false,
    password: null,
    confirmPassword: null,
    email: null,
    service: null,
    name: null,
    lastName: null,
    urlAvatar: null,
    isTokenValid: false,
    imageDataAvatar: null,
  };
}

function signUp(email, password, confirmPassword, name, lastName, service) {

  const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
  const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/signUp`;
  url = `http://${VITE_SERVER_ADDRESS}/users/signUp`;

  const admin = "false";
  this.imageDataAvatar = null;
  const formData = new FormData();
  formData.append("image", this.selectedAvatar);
  const user_datas = { email, password, confirmPassword, admin, name, lastName, service };
  formData.append("user_datas", JSON.stringify(user_datas));

  const options = {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: formData,
  };

  this.error = null;
  this.msg = null;

  if (!email || !password || !confirmPassword || !name || !lastName || !service) {
    this.error = " invalid field !";
  } else {
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
       
          return res.json();
        }

        res.text().then((err) => {
       
          const { error } = JSON.parse(err);
       
          this.error = error;
          throw new Error(error);
        });
      })
      .then((res) => {
        
        this.msg = res.msg;
      })
      .catch((err) => {
        console.log("err :",err)
      });
  }
}
// objet methods

function signIn(email, password) {
  const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;

  const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/login`;
  url = `http://${VITE_SERVER_ADDRESS}/users/login`;
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  };

 
  if (!email || !password) {
    this.error = " invalid field !";
  } else {
    fetch(url, options)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        res.text().then((err) => {
       
          const { error } = JSON.parse(err);
        
          this.error = error;
          throw new Error(error);
        });
      })
      .then((res) => {
     
        const token = res.token;
        const current_user = res.user;
 
        localStorage.setItem("token", token);
        localStorage.setItem("current_user", JSON.stringify(res.user));

        this.$router.push("/home");
      })
      .catch((err) => {
        console.log("err :",err)
      });
  }
}

function invalidField(bool) {

  this.isFieldInvalid = bool;
}

function showFormSignIn() {
  this.email = null;
  this.password = null;
  this.msg = null;
  this.dspFormSignIn = true;
  this.dspFormSignUp = false;
}

function showFormSignUp() {
  this.email = null;
  this.password = null;
  this.confirmPassword = null;
  this.name = null;
  this.lastName = null;
  this.service = null;
  this.msg = null;
  this.dspFormSignIn = false;
  this.dspFormSignUp = true;
}

export default {
  name: "Login",
  data, //function data
  methods: {
    signIn, // function signIn
    signUp,
    invalidField,
    showFormSignIn,
    showFormSignUp,
    onSelectFileAvatar() {
      const input = this.$refs.fileInput;
   
      const files = input.files;
 

      if (files && files[0]) {
        this.selectedAvatar = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imageDataAvatar = e.target.result;
          
        };
        reader.readAsDataURL(files[0]);
      }
    },
  },
  components: {
    NavBar,
    Avatar,
  },
  mounted() {
    var token = localStorage.getItem("token");

    if (token) {
      this.dspFormSignIn = true;
      this.dspFormSignUp = false;
    } else {
      this.dspFormSignIn = false;
      this.dspFormSignUp = true;
    }
  },
};
</script>

<template>
  <div>
    <NavBar></NavBar>
    <section
      class="vh-100 bg-image"
      style="background-image: url(../../../public/Background_Groupomania.jpg)"
    >
      <div class="mask d-flex align-items-center h-100 gradient-custom-3">
        <div class="container h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-9 col-lg-7 col-xl-6" style="padding: 15px">
              <div class="card" style="border-radius: 15px">
                <div class="card-body p-5">
                  <h3 v-if="dspFormSignUp" class="text-uppercase text-center mb-5">
                    Create an account
                  </h3>
                  <h3 v-if="dspFormSignIn" class="text-uppercase text-center mb-5">
                    Sign In
                  </h3>

                  <form>
                    <div v-if="dspFormSignUp" class="form-outline mb-4">
                      <label for="file-input-avatar">
                        <Avatar :url="this.urlAvatar"></Avatar>
                      </label>

                      <div
                        v-if="imageDataAvatar"
                        class="image-input"
                        :style="{ 'background-image': `url(${imageDataAvatar})` }"
                      ></div>
                      <input
                        id="file-input-avatar"
                        class="file-input"
                        ref="fileInput"
                        type="file"
                        @input="onSelectFileAvatar"
                        accept="image/*"
                      />
                      <p class="form-label">Your Avatar</p>
                    </div>

                    <div v-if="dspFormSignUp" class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example1cg"
                        class="form-control form-control-lg"
                        v-model="name"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example1cg">Your Name</label>
                    </div>

                    <div v-if="dspFormSignUp" class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example2cg"
                        class="form-control form-control-lg"
                        v-model="lastName"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example2cg"
                        >Your Last Name</label
                      >
                    </div>

                    <div v-if="dspFormSignUp || dspFormSignIn" class="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3cg"
                        class="form-control form-control-lg"
                        placeholder="name.lastName@groupomania.fr"
                        v-model="email"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example3cg">Your Email</label>
                    </div>

                    <div v-if="dspFormSignUp" class="form-outline mb-4">
                      <input
                        type="text"
                        id="form3Example5cg"
                        class="form-control form-control-lg"
                        v-model="service"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example5cg">Your Service</label>
                    </div>

                    <div v-if="dspFormSignUp || dspFormSignIn" class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cg"
                        class="form-control form-control-lg"
                        v-model="password"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example4cg">Password</label>
                    </div>

                    <div v-if="dspFormSignUp" class="form-outline mb-4">
                      <input
                        type="password"
                        id="form3Example4cdg"
                        class="form-control form-control-lg"
                        v-model="confirmPassword"
                        required
                        invalid
                      />
                      <label class="form-label" for="form3Example4cdg"
                        >Confirm your password</label
                      >
                    </div>

                    <div v-if="dspFormSignUp" class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        @click.prevent="
                          () =>
                            signUp(
                              email,
                              password,
                              confirmPassword,
                              name,
                              lastName,
                              service
                            )
                        "
                      >
                        Sign Up
                      </button>
                    </div>

                    <div v-if="dspFormSignIn" class="d-flex justify-content-center">
                      <button
                        type="button"
                        class="btn btn-success btn-block btn-lg gradient-custom-4 text-body"
                        @click.prevent="() => signIn(email, password)"
                      >
                        Sign In
                      </button>
                    </div>

                    <p class="text-center error-msg mt-2 mb-2" v-if="error">
                      {{ error }}
                    </p>
                    <p class="text-center create-msg mt-2 mb-2" v-if="msg">{{ msg }}</p>

                    <p v-if="dspFormSignUp" class="text-center text-muted">
                      Have already an account?
                      <a
                        href="#!"
                        class="fw-bold text-body"
                        @click.prevent="() => showFormSignIn()"
                        ><u>Sign In</u></a
                      >
                    </p>
                    <p v-if="dspFormSignIn" class="text-center text-muted">
                      No account?
                      <a
                        href="#!"
                        class="fw-bold text-body"
                        @click.prevent="() => showFormSignUp()"
                        ><u>Sign Up</u></a
                      >
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.form-floating input:invalid {
  border: 1px solid red;
}

.form-outline input:invalid {
  border: 1px solid red;
}

html,
body {
  align-items: center;

  padding-bottom: 40px;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.error-msg {
  color: red;
}

.create-msg {
  color: rgb(48, 235, 48);
}

#file-input-avatar {
  display: none;
}

.image-input {
  display: block;
  width: 35px;
  height: 35px;
  background-size: cover;
  background-position: center;
}

/*********************************************************************/
.gradient-custom-3-not-used {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(
    to right,
    rgba(132, 250, 176, 0.5),
    rgba(143, 211, 244, 0.5)
  );
}

.gradient-custom-4-not-used {
  /* fallback for old browsers */
  background: #84fab0;

  /* Chrome 10-25, Safari 5.1-6 */
  background: -webkit-linear-gradient(
    to right,
    rgba(132, 250, 176, 1),
    rgba(143, 211, 244, 1)
  );

  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));
}
</style>
