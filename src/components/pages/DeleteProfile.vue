<script>
export default {
    name:"DeleteProfile"
}
</script>


<!-- https://www.bootdey.com/snippets/view/profile-edit-data-and-skills#html -->
<template>

	<div class="col-lg-8 mx-auto mt-3">
		<div class="card">
						<div class="card-body">
                            <!-- <i class="fa-solid fa-circle-camera"></i> -->
                            <div class="mb-3 d-flex flex-column">
                            <!-- <div class="d-flex flex-column align-items-center text-center"> -->
                                <label for="file-input" >
                                 <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" alt="Admin" class="rounded-circle d-block shadow-4 mx-auto" width="150px"/>
                                </label>
                                <input id="file-input" type="file"/>
                            <!-- </div> -->
                           <!-- <i class="fa-solid fa-circle-camera"></i> -->
                            <!-- <label for="file-input" ></label> -->
                            <!-- <input id="file-input" type="file"/> -->
                               <!-- <i class="bi bi-camera-fill"  ></i> -->
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

</style>