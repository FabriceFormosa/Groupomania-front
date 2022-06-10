<script>
import NavBar from "../Navbar.vue";
import Avatar from "../Avatar.vue";

function data() // function data renvoie un objet
{
  return{
	id:null,
    email:null,
	password:null,
	name:null,
	lastName:null,
	service:null,
	admin:null,
	error:"",
	selectedAvatar:null,
	urlAvatar:null
	
	} 
}


function submitForm(id,email,password,name,lastName,service,admin){
  console.log("submitForm",id,email,password,name,lastName,service,admin)
  //console.log(import.meta.env)
const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
//console.log("VITE_SERVER_ADDRESS :",import.meta.env.VITE_SERVER_ADDRESS)
//console.log("VITE_SERVER_PORT :",import.meta.env.VITE_SERVER_PORT)

const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/users/update`
//const  url="http://localhost:3000/auth/login"
console.log("url ",url)

//const profile = ({id,email,password,name,lastName,service,admin})
const  formData=new FormData();
formData.append("image",this.selectedAvatar)
const user_datas ={id,email,password,name,lastName,service,admin}
formData.append("user_datas",JSON.stringify(user_datas))

const  options = {
  method:'POST',
   headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json"
                //"Content-Type": "multipart/form-data "
            },
            method: 'POST',
            body:formData
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
   console.log("update user res: ",res)
    const {updateUser} =res
   this.urlAvatar = updateUser.avatar
    console.log("urlAvatar :",this.urlAvatar)

	var current_user = JSON.parse( localStorage.getItem('current_user') );

	if(current_user != null && (current_user.id == updateUser.id)) /// mise à jour du current_user
	{
		localStorage.removeItem('current_user')
		localStorage.setItem('current_user',JSON.stringify(updateUser))

	}


 })
  .catch((err)=>{
   console.log("err: ",err)
 })
   
 }

export default {
	
    name:"UpdateProfile",
	components: { NavBar ,Avatar},

	created() {

		  var current_user = JSON.parse( localStorage.getItem('current_user') );

		    if( current_user!= null)
        {
			  this.id	 = current_user.id
              this.email = current_user.email
              this.name=current_user.name
              this.lastName=current_user.lastName
              this.admin=current_user.admin
			  this.service=current_user.service
			  this.urlAvatar=current_user.avatar
			  console.log("this.urlAvatar",this.urlAvatar)
			  this.widthAvatar = "30px"
        }
	},

	
	data , //function data 
methods:{
	
	  handleNewFile(e)
      {
        const file = e.target.files[0]
        console.log("file :",file)
        this.selectedAvatar = file
      },
   	submitForm

}
 

}
</script>


<!-- https://www.bootdey.com/snippets/view/profile-edit-data-and-skills#html -->
<template>	

	<div class="col-lg-8 mx-auto mt-3">
		<div class="card">
						<div class="card-body">
							<div class="row mb-3 ">
								<div class="col-sm-3 ">
									<h6 class="mb-0">Avatar</h6>
								</div>
								<div class="col-sm-9">
									<label for="file-input" >
									<input id="file-input" type="file" @change="handleNewFile"/>
									<!-- <i v-if="!this.urlAvatar" class="fa-solid fa-circle-user "></i> -->
									<!-- <Avatar v-if="this.urlAvatar" :url="this.urlAvatar" > -->
									<Avatar	:url="this.urlAvatar" ></Avatar>
									
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


							<div v-if ="error" class="error-msg">{{error}}</div>
                                         
							<div class="row">
								
								<div class="text-center text-secondary">
									<input type="submit" class="btn btn-primary px-4" value="Update Profile"   @click.prevent="() => submitForm(this.id,this.email,this.password,this.name,this.lastName,this.service,this.admin)">
								</div>
							</div>
						</div>
	
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
	
	background-color: transparent;
	color: black;
	font-size:60px;
	cursor: pointer;
	

    /* height: 40px;
    width: 40px;
    font-size: medium;
    font-weight: 100; */
/*     
  
    margin-top: -50px;
    
    align-self: center;
    margin-right: -80px;
    cursor: pointer; */
}
/* 
i.fa-solid:hover
{
	
} */

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




</style>