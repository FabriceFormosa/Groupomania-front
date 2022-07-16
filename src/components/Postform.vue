<script>
import Avatar from './Avatar.vue'
  export default{
    data() {
        return {
            content:null,
            selectedImage: null,
            imageData: null,
            urlAvatar:null,
            userName:null,
            userLastName:null
        };
    },
    name: "Postform",
    methods: {
      
       viewProfile(){
        console.log("appel methode view profile : this.$props.email_owner_post" ,this.$props.email_owner_post)
        this.$router.push({path:'/viewprofile',query:{user_email: this.$props.email_owner_post}});

       },
        onSelectFile() {
            const input = this.$refs.fileInput;
            const files = input.files;
            if (files && files[0]) {
                this.selectedImage = files[0];
                const reader = new FileReader;
                reader.onload = e => {
                    this.imageData = e.target.result;
                };
                reader.readAsDataURL(files[0]);
                this.$emit("input", files[0]);
            }
        },
        clearPicture()
        {
            this.imageData = null;
        },
        clearContent(){
            this.content = null;
        },
        handleCklick() {
            const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
            const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;
            console.log("url ", url);
            const formData = new FormData();
            formData.append("content", this.content);
            formData.append("image", this.selectedImage);
            const options = {
                method: "POST",
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                    //"Content-Type": "multipart/form-data "
                },
                method: "POST",
                body: formData
            };
            this.error = "";
            fetch(url, options)
                .then((res) => {
                if (res.ok) {
                    console.log("res", res);
                    return res.json();
                }
                throw new Error("failed to fetch post");
            })
                .then((res) => {
                console.log("res----------", res);
                this.$router.go(); //reload page
            })
                .catch((err) => {
                console.log("err: ", err);
            });
        }
    },
   
    components: { Avatar },
     created() {
		  var current_user = JSON.parse( localStorage.getItem('current_user') );
      console.log("current_user",current_user)
      this.urlAvatar =  current_user.avatar;
      this.userName  = current_user.name;
      this.userLastName = current_user.lastName;
      console.log("this.urlAvatar",this.urlAvatar)
      
    },
  

}
</script>

<template>

<section >
  <div class="container my-5 py-5">
    <div class="row d-flex justify-content-center">
      <div class="col-md-10 col-lg-10 col-xl-8">
        <div class="card">
            <div class="card-header d-flex flex-start align-items-center gap-2">
            <div @click="viewProfile" >
                <Avatar	
                      :url="this.urlAvatar"
                ></Avatar>
             </div>
                  <div>
                    <h6 class="fw-bold  mb-1 text-dark ">
                     {{userLastName}} {{userName}} 
                    </h6>
                  </div>
            </div>
            <div class="card-body">
            
                <div class="d-flex flex-start align-items-center border">
                      
                      <!-- https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64 -->
                      <div
                        class="image-input m-auto"
                        :style="{ 'background-image': `url(${imageData})` }"    
                      ></div>
                      <input
                        id="file-input-test"
                        class="file-input"
                        ref="fileInput"
                        type="file"
                        @input="onSelectFile"
                        accept="image/*"
                      >
                </div>
                <label class="form-label">Image preview</label>
            </div>   
            <div class="card-footer py-3 border-0" style="background-color: #FFFFFF;">
              <div class="d-flex flex-start w-100">
              <div class="form-outline w-100">
                <textarea class="form-control" id="textAreaExample" rows="4" 
                  style="background: #ffff;" v-model="content"></textarea>
                <label class="form-label" for="textAreaExample">Message</label>
              </div>
            </div>
            <div class="d-flex justify-content-between align-items-center">
                <div>
                  <label for="file-input-test" ><i class="fa-solid fa-file-circle-plus pe-2" data-bs-toggle="tooltip" title="Ajout image"></i></label> 
                  <i v-if="content" @click="clearContent" class="fa-solid fa-comment-slash pe-2" data-bs-toggle="tooltip" title="Suppression du message"></i>
                  <i v-if="imageData" @click="clearPicture" class="fa-solid fa-file-circle-minus" data-bs-toggle="tooltip" title="Suppression image"></i>
                </div>

                <div>
                  <i v-if="content || imageData" @click="handleCklick" class="fa-solid fa-paper-plane mt-1 ms-auto " data-bs-toggle="tooltip" title="Envoi du post"></i>
                </div>
            </div>
          </div>       
          </div>
        </div>
      </div>
    </div>
  
</section>


<hr class="dropdown-divider mt-4 color-secondary" />
</template>

<style scoped>

.card-header
{
 
  display: flex;
  align-items: center;
  background-color: #FFD7D7;
}
.color-secondary
{
  color:#FFD7D7
}

i{
    cursor:pointer;
    font-size: 20px;
    color:black
}

body{
  background-color:#f5f5f51a
} 

.file-input
{
   display :none;
}
 

.image-input
{
  display: block;
  width: 150px;
  height: 150px;
  background-size :cover;
  background-position: center ;
}

.placeholder
{
  background: #F0F0F0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #333;
  font-size: 18px;
  font-family :Helvetica;
}

/* .placeholder:hover
{
  background: #E0E0E0;
} */


</style>