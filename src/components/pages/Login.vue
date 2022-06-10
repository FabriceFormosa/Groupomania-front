<script>
//console.log(import.meta.env)
import NavBar from "../Navbar.vue";

function data() // function data renvoie un objet
{
  return{
    email:"prenom.nom@groupomania.fr",
     password:"password",
     isFieldInvalid:false,
     error:""
     } 
}

// objet methods

function submitForm(email,password){
  console.log(email,password)
  //console.log(import.meta.env)
const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
//console.log("VITE_SERVER_ADDRESS :",import.meta.env.VITE_SERVER_ADDRESS)
//console.log("VITE_SERVER_PORT :",import.meta.env.VITE_SERVER_PORT)
const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/login`

console.log("url ",url)
const  options = {
  method:'POST',
  headers:{'Content-Type':'application/json'},
  body:JSON.stringify({email,password})
}


this.error ="";
fetch(url,options)
 .then((res) => {
   if(res.ok) 
   {
      console.log( "res",res)
      return res.json()
   }
  
   res.text().then((err) => {
     console.log("error",err)
     const {error} = JSON.parse(err)
     console.log("message",error)
      this.error = error
     throw new Error(error) })
     
 })
 .then((res) => { 
   console.log("suite res: ",res)
   const token= res.token
   const current_user = res.user
   const users = res.users
   
  //console.log("token: ",res.token)
   localStorage.setItem("token",token)
   localStorage.setItem("current_user",JSON.stringify(res.user))

   this.$router.push("/home")
 })
  .catch((err)=>{
   console.log("err: ",err)
   

 })
   
 }
 

 function invalidField(bool){
    console.log("invalidField call")
   this.isFieldInvalid = bool
 }

export default {
    name:"Login",
    data , //function data 
    methods:{
    submitForm, // function submitForm
    invalidField
    },
    components:{
      NavBar
    }
    
      //  watch:{
      // email(value){
      // console.log("email:",value)
      // this.invalidField((value===""))
      // },
      // password (value){
      // console.log("password:",value)
      //  this.invalidField((value===""))
      // }
      // }


    }





</script>



<template>

<div >
    <!-- <NavBar></NavBar> -->
  <!-- <form :class="this.isFieldInvalid ? 'hasErrors':''"> -->
    <form class="form-signin">

    <img class="mb-4 d-block mx-auto" src="./../../../public/favicon.ico" alt="" width="72" height="57">
    <h1 class="h3 mb-3 fw-normal">Please sign in</h1>

    <div class="form-floating">
      <input
       type="email" 
       class="form-control" 
       id="floatingInput" 
       placeholder="name@example.com" 
       v-model="email"
       required
       invalid
       >
      <label for="floatingInput">Email address</label>
    </div>
    <div class="form-floating">
      <input 
      type="password" 
      class="form-control" 
      id="floatingPassword" 
      placeholder="Password" 
      v-model="password"
      required
      invalid
      >
      <label for="floatingPassword">Password</label>
    </div>
    <span v-if ="error" class="error-msg">{{error}}</span>

    <!-- <div class="checkbox mb-3">
      <label>
        <input type="checkbox" value="remember-me"> Remember me
      </label>
    </div> -->
    <button class="w-100 btn btn-lg btn-primary" type="submit"  @click.prevent="() => submitForm(this.email,this.password)">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
   
  </form>
</div>

</template>

<style scoped>
.form-floating input:invalid{
  border: 1px solid red;
}

html,
body {
  
  align-items: center;
  /* padding-top: 40px; */
  padding-bottom: 40px;
  /* background-color: #f5f5f5; */
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

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }

    .error-msg
    {
      color: red;
    }

</style>