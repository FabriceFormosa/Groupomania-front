<script>
import NavBar from "../Navbar.vue";
import Avatar from "../Avatar.vue";

function data() // function data renvoie un objet
{
  return{
    email:null,
	password:null,
	name:null,
	lastName:null,
	service:null,
	admin:null,
	error:"",
	urlAvatar:null,
	selectedAvatar:null,
 	inhibitViewProfile:true

	
	} 
}


function submitForm(email,password,name,lastName,service,admin){
  console.log("submitForm",email,password,name,lastName,service,admin)
  //console.log(import.meta.env)
const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
//console.log("VITE_SERVER_ADDRESS :",import.meta.env.VITE_SERVER_ADDRESS)
//console.log("VITE_SERVER_PORT :",import.meta.env.VITE_SERVER_PORT)

const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/create`
//const  url="http://localhost:3000/auth/login"
console.log("url ",url)

const  formData=new FormData();
formData.append("image",this.selectedAvatar)
const user_datas ={email,password,name,lastName,service,admin}
formData.append("user_datas",JSON.stringify(user_datas))

const  options = {
  method:'POST',
  headers:{
	  authorization:`Bearer ${localStorage.getItem("token")}`,
	  "Accept":"application/json"
	  },
  
  //body:JSON.stringify({email,password,name,lastName,service,admin})
  body:formData
}
//console.log( "body",body)

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
   console.log("create user res: ",res)
//    const token= res.token
   
//   //console.log("token: ",res.token)
//    localStorage.setItem("token",token)
//    this.$router.push("/home")
 })
  .catch((err)=>{
   console.log("err: ",err)
   

 })
   
 }

export default {
	
    name:"CreateProfile",
	components: { NavBar,Avatar },
	data , //function data 
methods:{
   	submitForm,
	 handleNewFile(e)
      {
        const file = e.target.files[0]
        console.log("file :",file)
        this.selectedAvatar = file
      }

},
created(){
	this.urlAvatar=null;

}
 
 

}
</script>


<!-- https://www.bootdey.com/snippets/view/profile-edit-data-and-skills#html -->
<template>
	


	
	<!-- <NavBar></NavBar> -->
	
	<div class="col-lg-8 mx-auto mt-3">
		<div class="card">
             
						<form class="card-body">
                            
                       <div class="row mb-3 ">
								<div class="col-sm-3 ">
									<h6 class="mb-0">Avatar</h6>
								</div>
								<div class="col-sm-9">
									<label for="file-input" >
									<input id="file-input" type="file" @change="handleNewFile"/>
									<!-- <i v-if="!this.urlAvatar" class="fa-solid fa-circle-user "></i> -->
									<!-- <Avatar v-if="this.urlAvatar" :url="this.urlAvatar" > -->
									<Avatar	
										:url="this.urlAvatar" 
										:inhibitViewProfile="inhibitViewProfile"
									></Avatar>
									

									<!-- <img  id="image_post" v-if="urlAvatar"  :src="urlAvatar" class="card-img-top" alt="..." /> -->
									</label>
									
								</div>
							</div>

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="email" 
									class="form-control" 
									placeholder="lastname.name@groupomania.fr" 
									v-model="email"
									required
       								invalid
									>
								</div>
							</div>

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Password</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="password" 
									class="form-control" 
									placeholder="type a new password" 
									v-model="password"
									required
       								invalid
									>
								</div>
							</div>

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="name" 
									class="form-control" 
									placeholder="type a new name" 
									v-model="name"
									required
       								invalid
									>
								</div>
							</div>

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Last Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="lastName" 
									class="form-control" 
									placeholder="type a new last name" 
									v-model="lastName"
									required
       								invalid
									>
								</div>
							</div>

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">service</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="service" 
									class="form-control" 
									placeholder="which service" 
									v-model="service"
									required
       								invalid
									>
								</div>
							</div>							
							
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">admin</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="admin" 
									class="form-control" 
									placeholder="false" 
									v-model="admin"
									required
       								invalid
									>
								</div>
							</div>




							<!-- <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Password</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="password" class="form-control" placeholder="123456" v-model="password">
								</div>
							</div>						

							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="name" class="form-control" placeholder="new name" v-model="name">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Last Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="lastName" class="form-control" placeholder="new last name" v-model="lastName">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Service</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="service" class="form-control" placeholder="ex service informatique" v-model="service">
								</div>
							</div>      -->
							<div v-if ="error" class="error-msg">{{error}}</div>
                                         
							<div class="row">
								
								<div class="text-center text-secondary">
									<input type="submit" class="btn btn-primary px-4" value="Create Profile"   @click.prevent="() => submitForm(this.email,this.password,this.name,this.lastName,this.service,this.admin)">
								</div>
							</div>
						</form>
	
        </div>
    </div>
	
</template>
<style scoped>



body{
    background: #f7f7ff;
    margin-top:20px;
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
    border-radius: .25rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 2px 6px 0 rgb(218 218 253 / 65%), 0 2px 6px 0 rgb(206 206 238 / 54%);
}
.me-2 {
    margin-right: .5rem!important;
}
i.fa-solid
{
    height: 20px;
    width: 20px;
    font-size: medium;
    font-weight: 100;
    
  
    margin-top: -50px;
    
    align-self: center;
    margin-right: -80px;
    cursor: pointer;
}

img{
    cursor:pointer;
}

img:hover
{
   opacity:0.5;

}

.card .card-body .row:last-child
{
    margin-top: 3rem;
}
   
   #file-input{
       display: none;
   }


.test_avatar
{
	height:80px;
	background-color: aqua !important;;
}
</style>