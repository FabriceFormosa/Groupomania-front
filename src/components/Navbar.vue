
<script>

import Logo from "./Logo.vue"
export default {
    name: "Navbar",
    components: { Logo },
    //props:["name","lastName","admin"],
    data(){
      return {isLoggedIn:false,
              current_user_name:null,
              current_user_last_name:null,
              current_user_admin:null,
              current_user_email:null
              }
  },
   mounted() {

      console.log("-------------- log composant Navbar mounted -------------------")

        var token = localStorage.getItem("token");

         console.log("-------------- log check1 -------------------")


        var current_user = JSON.parse( localStorage.getItem('current_user') );

        console.log("-------------- log check2 -------------------")
        //console.log("current_user.name", current_user.name);
        //const current_user = JSON.parse( localStorage.getItem('current_user') );
        //const current_user = localStorage.getItem("current_user")
        //console.log("current_user name: ",current_user.name)
        //console.log("fct created lecture token", token ," isLoggedIn : ",this.isLoggedIn)
       
        if( current_user!= null)
        {
              this.current_user_name=current_user.name
              this.current_user_last_name=current_user.lastName
              this.current_user_admin=current_user.admin
              this.current_user_email=current_user.email
        }
       
        
        
        this.isLoggedIn=( token != null );
       
      console.log("this.isLoggedIn: ",this.isLoggedIn)
        console.log("token: ",token)
        console.log("this.current_user_name: ",this.current_user_name)
    },
    methods: {
      logOut() {
        localStorage.removeItem("token");
        localStorage.removeItem("current_user");
        this.current_user_last_name="";
        this.current_user_name="";
        this.$router.push("/login");
      }
     

    }
}

</script>

<template>
<!-- <header class="p-3 bg-dark text-white"> -->
<header class="p-3  bg-secondary text-dark  ">
    
    <div class="container">
      <div class="d-flex flex-column">
        <div class="mx-auto mb-2"><Logo height="32" ></Logo></div> 
        <div class="mx-auto "><span>{{current_user_last_name}} {{current_user_name}} <i  v-if="current_user_admin == 'false'" class="fa-solid fa-user ps-2"></i> <i v-if=" current_user_admin == 'true'" class="fa-solid fa-user-gear ps-2"></i>
          <span><i id="i_logout" @click="logOut" v-if="this.isLoggedIn" class="fa-solid fa-arrow-right-from-bracket ps-2"></i></span></span>
        </div>
        <div class="mx-auto">
          <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
      
        <ul v-if="this.isLoggedIn" class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to ="/home" class="nav-link px-2 text-dark">Home</router-link></li>
          <li><router-link to ="/viewprofile" class="nav-link px-2 text-dark">View Profile</router-link></li>
          <li v-if=" current_user_admin =='true' "><router-link to ="/createprofile" class="nav-link px-2 text-dark">Create Profile</router-link></li>
          <li ><router-link to ="/updateprofile" class="nav-link px-2 text-dark">Update Profile</router-link></li>
          <!-- <li v-if=" current_user_admin =='true' "><router-link to ="/deleteprofile" class="nav-link px-2 text-dark">Delete Profile</router-link></li>   -->
        
        </ul>
        </div>

      </div>
 
    </div>
      
  

    </div>
  </header>
</template>

<style scoped>

.mywidth
{
  width:200px;
}
.mytestbg
{
  background-color: aqua;
}

.text-tertiare
{
  color:#4E5166
}
.bg-secondary
{
  background-color: #FFD7D7 !important;
}
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, .1);
  border: solid rgba(0, 0, 0, .15);
  border-width: 1px 0;
  box-shadow: inset 0 .5em 1.5em rgba(0, 0, 0, .1), inset 0 .125em .5em rgba(0, 0, 0, .15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 .25rem rgba(255, 255, 255, .25);
}

.bi {
  vertical-align: -.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}

#i_logout
{
  cursor: pointer;
}
</style>