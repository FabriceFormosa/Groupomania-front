<script>
//console.log(import.meta.env)
import Avatar from "../Avatar.vue";
import NavBar from "../Navbar.vue";


function data() // function data renvoie un objet
{
  return{
    //email:"prenom.nom@groupomania.fr",
    // password:"password",
     isFieldInvalid:false,
     error:"",
     selectedAvatar:null,
     msg:null,
     dspFormSignUp:true,
     dspFormSignIn:false,
     password:null,
     confirmPassword:null,
     email:null,
     service:null,
     name:null,
     lastName:null,
     urlAvatar:null

     } 
}

function signUp(email,password,confirmPassword,name,lastName,service){
  console.log("signUp",email,password,confirmPassword,name,lastName,service)
  const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
  const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/signUp`

  const admin = "false";
  const  formData=new FormData();
  formData.append("image",this.selectedAvatar)
  const user_datas ={email,password,confirmPassword,admin,name,lastName,service}
  formData.append("user_datas",JSON.stringify(user_datas))

const  options = {
  method:'POST',
  headers:{
	    "Accept":"application/json"
	  },
  body:formData
}

this.error =null;
this.msg =null;

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
   console.log("create user res: ",res)
   this.msg = res.msg

 })
  .catch((err)=>{
   console.log("err: ",err)
 })
   
 }
// objet methods

function signIn(email,password){
 // console.log(email,password)
  //console.log(import.meta.env)
const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
//console.log("VITE_SERVER_ADDRESS :",import.meta.env.VITE_SERVER_ADDRESS)
//console.log("VITE_SERVER_PORT :",import.meta.env.VITE_SERVER_PORT)
const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/login`

//console.log("url ",url)
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
     // console.log( "res",res)
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

 function showFormSignIn()
 {
    this.dspFormSignIn=true;
    this.dspFormSignUp=false;
 }

 function showFormSignUp()
 {
    this.dspFormSignIn=false;
    this.dspFormSignUp=true;
 }

export default {
    name:"Login",
    data , //function data 
    methods:{
    signIn, // function signIn
    signUp,
    invalidField,
    showFormSignIn,
    showFormSignUp,
	  handleNewFile(e)
      {
        
        const file = e.target.files[0]
        console.log("----------- Avatar file SignUp ------------------------:",file)
       
         console.log("----------- Avatar file SignUp Path ------------------------:",path)
         this.selectedAvatar = file;
        const  formData=new FormData();
        formData.append("image",this.selectedAvatar)
        console.log("------------------+. - formdata ----------:",formData)

       var path = (window.URL || window.webkitURL).createObjectURL(file);
    console.log('path', path);
         
      }
    },
    components:{
      NavBar,
      Avatar
    },
    mounted(){
      
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
    <NavBar></NavBar>
  <!-- <form :class="this.isFieldInvalid ? 'hasErrors':''"> -->

  
    <form  v-if="false"   class="form-signin">

    <img class="mb-4 d-block mx-auto" src="./../../../public/icon.ico" alt="" width="72" height="57">
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
    <button class="w-100 btn btn-lg btn-primary" type="submit"  @click.prevent="() => signIn(this.email,this.password)">Sign in</button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017–2021</p>
   
  </form>


<!-- https://mdbootstrap.com/docs/standard/extended/registration/ -->
  <section class="vh-100 bg-image"
  style="background-image: url(../../../public/Background_Groupomania.jpg);">
  <div class="mask d-flex align-items-center h-100 gradient-custom-3">
    <div class="container h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col-12 col-md-9 col-lg-7 col-xl-6">
          <div class="card" style="border-radius: 15px;">
            <div class="card-body p-5">
              <h3 v-if="dspFormSignUp" class="text-uppercase text-center mb-5">Create an account</h3>
              <h3 v-if="dspFormSignIn" class="text-uppercase text-center mb-5">Sign In</h3>

              <form>

              <div v-if="dspFormSignUp" class="form-outline mb-4">
              <label for="file-input" >
                  <input id="file-input" type="file" @change="handleNewFile"/>
                  <Avatar :url="this.urlAvatar"></Avatar>
              </label>
              <p class="form-label" >Your Avatar</p>
                  <!-- <label class="form-label" for="form3Example1cg">Your Avatar</label> -->

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
                  <label class="form-label" for="form3Example2cg">Your Last Name</label>
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
                  <label  class="form-label" for="form3Example3cg">Your Email</label>
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
                  <label class="form-label" for="form3Example4cdg">Confirm your password</label>
                </div>

                <!-- <div class="form-check d-flex justify-content-center mb-5">
                  <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3cg" />
                  <label class="form-check-label" for="form2Example3g">
                    I agree all statements in <a href="#!" class="text-body"><u>Terms of service</u></a>
                  </label>
                </div> -->

                <div v-if="dspFormSignUp" class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click.prevent="() => signUp(email,password,confirmPassword,name,lastName,service)">Sign Up</button>
                </div>

                <div v-if="dspFormSignIn" class="d-flex justify-content-center">
                  <button type="button"
                    class="btn btn-success btn-block btn-lg gradient-custom-4 text-body" @click.prevent="() => signIn(email,password)">Sign In</button>
                </div>

                <p class="text-center error-msg mt-2 mb-2" v-if ="error" >{{error}}</p>
                <p class="text-center create-msg mt-2 mb-2" v-if ="msg" >{{msg}}</p>

                <p v-if="dspFormSignUp" class="text-center text-muted ">Have already an account? <a href="#!"
                    class="fw-bold text-body" @click.prevent="() => showFormSignIn()"><u>Sign In</u></a></p>
                <p v-if="dspFormSignIn" class="text-center text-muted ">No account? <a href="#!"
                    class="fw-bold text-body" @click.prevent="() => showFormSignUp()"><u>Sign Up</u></a></p>

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
.form-floating input:invalid{
  border: 1px solid red;
}



.form-outline input:invalid{
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
    .create-msg
    {
      color:rgb(48, 235, 48)
    }

      #file-input{
       display: none;
   }


    /*********************************************************************/
    .gradient-custom-3-not-used {
/* fallback for old browsers */
background: #84fab0;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(132, 250, 176, 0.5), rgba(143, 211, 244, 0.5))
}
.gradient-custom-4-not-used {
/* fallback for old browsers */
background: #84fab0;

/* Chrome 10-25, Safari 5.1-6 */
background: -webkit-linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1));

/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
background: linear-gradient(to right, rgba(132, 250, 176, 1), rgba(143, 211, 244, 1))
}

</style>