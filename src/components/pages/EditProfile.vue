<script>
export default {
    name:"EditProfile"
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
									<h6 class="mb-0">Full Name</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="John Doe">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Email</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="john@example.com">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Phone</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="(239) 816-9029">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Mobile</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="(320) 380-4539">
								</div>
							</div>
							<div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Address</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="Bay Area, San Francisco, CA">
								</div>
							</div>
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Position</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="Fullstack developper">
								</div>
							</div>
						    <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Website</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="www.formosafabrice.com">
								</div>
							</div>
						    <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Github</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="MyUrl Github">
								</div>
							</div>     
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Twitter</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="MyUrl Twitter">
								</div>
							</div>     
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Instagram</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="MyUrl Instagram">
								</div>
							</div>       
                            <div class="row mb-3">
								<div class="col-sm-3">
									<h6 class="mb-0">Facebook</h6>
								</div>
								<div class="col-sm-9 text-secondary">
									<input type="text" class="form-control" value="MyUrl Facebook">
								</div>
							</div>                                                                                   
							<div class="row">
								
								<div class="text-center text-secondary">
									<input type="button" class="btn btn-primary px-4" value="Save Changes">
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