<script>
import Comment  from "./Comment.vue"
import Avatar from "./Avatar.vue"
export default{
    name:"Card",
    components:{Comment,Avatar},
    props:[
        "name_owner_post",               // name propriétaire du post
        "last_name_owner_post",          // lastName propriétaire du post
        "avatar_owner_post",             // avatar propriétaire du post
        "email_owner_post",              // email propriétaire du post
        "content_owner_post",            // contenu texte du propriétaire du post
        "url_img_owner_post",            // url image propriétaire du post
        "comments_owner_post",           // commentaires associés au propriétaire du post
        "id_owner_post",                 // id proprietaire du post
        "createdAt"                      // date de création du post
        ], 
    data() {
      return {
        currentComment:null,
        current_user_avatar:null,
        current_user_email:null,
        current_user_admin:false,
        modeEditPost:false,
        contentPost:null,
        contentPostModified:null,
        imagePreview: null,
        selectedImage:null,
        post_id:null,
       post_img_hidden:false,
       imageUrlUpdated:null
      }
    },
    beforeCreate()
    {
        //  console.log("this.$props.id_owner_post",this.$props.id_owner_post)
        this.post_id = this.$props.id_owner_post;
        this.selectedImage = null;
       // console.log("this.post_id",this.post_id)
    },
    mounted(){
   
          this.current_user = JSON.parse( localStorage.getItem('current_user') );
          // console.log("email_owner_post",this.$props.email_owner_post)
          //console.log("this.current_user",this.current_user)

		    if( this.current_user!= null)
        {
			       this.current_user_avatar=this.current_user.avatar
             this.current_user_email=this.current_user.email
             this.current_user_admin=this.current_user.admin
        }

        // Init
        this.contentPost = this.$props.content_owner_post
        this.contentPostModified = this.$props.content_owner_post
        this.imageUrlUpdated = this.$props.url_img_owner_post;
       
      

    },
    
    methods:{
      
      viewProfile(){
        console.log("appel methode view profile : this.$props.email_owner_post" ,this.$props.email_owner_post)
        this.$router.push({path:'/viewprofile',query:{user_email: this.$props.email_owner_post}});

       },
      
      addComent(){

        const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        console.log(this.currentComment,this.$props.id_owner_post)
        console.log("url :",url+"/"+this.$props.id_owner_post)

        const  options = {
          method:'POST',
          headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json",
                "Content-Type":"application/json"
                },
          body:JSON.stringify({
               comment:this.currentComment
            })
        }

        fetch(url+"/"+this.$props.id_owner_post,options)
        .then((res) => {
            if( res.status === 200 )
            {
              return res.json()
            }else
            {

            throw new Error("Failed to add comment")
            }

        })
        .then((res) => {
          console.log(res)
          this.$router.go() //reload page
      
        })
       .catch((err) => {  console.log  })
      }
      ,
     
       deletePost(){

        const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        
        console.log("url :",url+"/"+this.$props.id_owner_post)

        const  options = {
          method:'DELETE',
          headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json",
                "Content-Type":"application/json"
                },
          body:JSON.stringify({
               //comment:this.currentComment
            })
        }

        fetch(url+"/"+this.$props.id_owner_post,options)
        .then((res) => {
            if( res.status === 200 )
            {
              return res.json()
            }else
            {

            throw new Error("Failed to delete Post")
            }

        })
        .then((res) => {
          console.log(res)
          this.$router.go() //reload page
      
        })
       .catch((err) => {  console.log  })
      }
      ,
      editPost()
      {
        this.modeEditPost = !this.modeEditPost
      //  console.log( "click editPost",this.modeEditPost)
      // console.log( "this.$props.url_img_owner_post",this.$props.url_img_owner_post)
      
        if( !this.modeEditPost && this.$props.url_img_owner_post != null)
        {
          this.post_img_hidden = false;
        }

        if( !this.modeEditPost)
        {
          this.imagePreview = null;
        }

      // console.log( "this.post_img_hidden",this.post_img_hidden)

      },
      updatePost()
      {
           
         
            const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env;
            const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`;
            console.log("url ", url);
          
            //const val = {'test': 'val_test'}
                  const formData = new FormData();
                  console.log("this.selectedImage ", this.selectedImage);
                  formData.append("image", this.selectedImage);
                  //console.log("this.contentPostModified ", this.contentPostModified);
                  formData.append('contentUpdated', this.contentPostModified);
                  //console.log(formData.get('contentUpdated'))
                  
           // myformData.append("contentUpdated", this.contentPostModified);
            //console.log("-- formData --",formData.)         //   formData.append("image", this.selectedImage);
            const options = {
                method:'PATCH',
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                    //"Content-Type": "multipart/form-data"
                },
                //method:'PATCH',
                body:formData
            };

        
        //     const formData = new FormData();
        //     formData.append("contentUpdated", this.contentPostModified);
        //     console.log( "contentUpdated",this.contentPostModified)
        // //    formData.append("image", this.selectedImage);
        //     const options = {
        //         method:'PATCH',
        //         headers:{
        //             authorization: `Bearer ${localStorage.getItem("token")}`,
        //             "Accept": "application/json",
        //             "Content-Type": "multipart/form-data"
        //         },
        //        // method: "POST",
        //         body: formData
        //     };


        // const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        // const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
        // console.log("url :",url+"/"+this.$props.id_owner_post)
        // if(this.hidePostImage )
        // {
        //   this.imageUrlUpdated = null;
        // }
        // const  options = {
        //   method:'PATCH',
        //   headers:{
        //         authorization:`Bearer ${localStorage.getItem("token")}`,
        //         "Accept":"application/json",
        //         "Content-Type":"application/json"
        //         },
        //   body:JSON.stringify({
        //        contentUpdated:this.contentPostModified,
        //        imageUrlUpdated:this.imageUrlUpdated
        //     })
        // } 

        fetch(url+"/"+this.$props.id_owner_post,options)
        .then((res) => {
                if (res.ok) {
                    console.log("res", res);
                    return res.json();
                }
                throw new Error("failed to fetch post");
            // if( res.status === 200 )
            // {
            //   return res.json()
            // }else
            // {

            // throw new Error("Failed to update Post")
            // }

        })
        .then((res) => { 
          console.log(res)
          this.$router.go() //reload page
      
        })
       .catch((err)=>{
          console.log("err: ",err)
        })
      }
      ,
      DeleteProfile()
      {
        console.log("appel methode view profile : this.$props.email_owner_post" ,this.$props.email_owner_post)
        this.$router.push({path:'/deleteprofile',query:{user_email: this.$props.email_owner_post}});
        
      },
       UpdateProfile()
      {
        console.log("appel methode view profile : this.$props.email_owner_post" ,this.$props.email_owner_post)
        this.$router.push({path:'/updateprofile',query:{user_email: this.$props.email_owner_post}});
        
      }
      ,
      addPostImage() {
            console.log("appel fct addPostImage this.$refs.fileInput:",this.$refs.fileInput)
            
            const input = this.$refs.fileInput;
            console.log("appel fct addPostImage input:",input)
            const files = input.files;
            console.log("appel fct addPostImage files:",files)
            if (files && files[0]) {
                this.selectedImage = files[0];
                console.log("appel fct addPostImage selectedImage",this.selectedImage)

                const reader = new FileReader;
                reader.onload = e => {
                    this.imagePreview = e.target.result;
                    console.log(" appel fct addPostImage this.imagePreview",this.imagePreview)
                };
                reader.readAsDataURL(files[0]);
                //this.$emit("input", files[0]);
            }
        },

      hidePostImage()
      {
          this.selectedImage = null;
          this.post_img_hidden = true;
          
      },
     
    }
     
}
</script>
<template>
<div class="container my-5 py-5">
 <div class="row d-flex justify-content-center">
<div class="col-md-10 col-lg-10 col-xl-8">
<div class="card mb-3 m-auto ">

<div class="card-header d-flex ">
  <div class="d-flex flex-fill justify-content-start align-items-center">
    <div @click="viewProfile" > 
        <Avatar 
            :url="$props.avatar_owner_post"
        ></Avatar>
    </div>
    <div>
      <span><i v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" class="fa-solid fa-pen-to-square ps-2" data-bs-toggle="tooltip" title="Mise à jour du profile" @click="UpdateProfile"></i>
      </span><span><i v-if="current_user_admin =='true'" class="fa-solid fa-user-slash ps-2" data-bs-toggle="tooltip" title="Suppression du profile !" @click="DeleteProfile"></i></span>
    </div>
  </div>

  <div class="d-flex flex-fill justify-content-center">
    <span class="fw-bold">{{$props.last_name_owner_post}} {{$props.name_owner_post}}</span>
  </div>
  <div class="d-flex flex-fill justify-content-end">
    <span><i class="fa-solid fa-trash pe-2" data-bs-toggle="tooltip" title="Suppression du post!" v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" @click="deletePost"></i>
    </span>
    <span><i v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" class="fa-solid fa-pen-to-square pe-2" data-bs-toggle="tooltip" title="Mode édition" @click="editPost"></i>
    <i v-if="modeEditPost && url_img_owner_post && !this.post_img_hidden" class="fa-solid fa-file-circle-minus pe-2" data-bs-toggle="tooltip" title="Suppression image" @click="hidePostImage"></i>
    <label for="this.post_id"><i v-if="modeEditPost" class="fa-solid fa-file-circle-plus pe-2" data-bs-toggle="tooltip" title="Nouvelle image"></i></label>
    <i v-if="modeEditPost" class="fa-solid fa-floppy-disk" data-bs-toggle="tooltip" title="Sauvegarde des modifications" @click="updatePost"></i></span>
  </div>
</div>

<p class="pt-2 fs-6 text-muted ">{{createdAt}}</p>

<img  id="image_post" v-if="url_img_owner_post && !this.post_img_hidden"  :src="url_img_owner_post" class="card-img-top py-2" alt="image du post" />

  
  <div class="card-body">
     
      <div v-if="modeEditPost" class="d-flex flex-start align-items-center border">
            
            <!-- https://levelup.gitconnected.com/how-to-preview-images-before-uploading-them-in-vue-4964803adb64 -->
            <div
              class="image-input m-auto"
              :style="{ 'background-image': `url(${imagePreview})` }"    
            ></div>
            <input
              id="this.post_id"
              class="file-input"
              ref="fileInput"
              type="file"
              @input="addPostImage"
              accept="image/*"
            >
      </div>
      <label  v-if="modeEditPost" class="form-label">Image preview</label>

     <h5 class="card-title"></h5>
     <p v-if="!modeEditPost" class="card-text comment_text p-2">
        {{contentPost}}
     </p>
      
       <textarea v-if="modeEditPost" class="form-control mb-2" id="textAreaExample" rows="4" 
                  style="background: #ffff;" v-model="contentPostModified"></textarea>
     <!-- <tex v-if="modeEditPost" class="form-floating mt-4">
        <input  class="form-control py-3"  v-model="contentPostModified"/>
    </tex> -->
     <!-- <p class="card-text"><small class="text-muted">Last updated3mins ago</small></p> -->

     <div v-for="comment in comments_owner_post" >
       <p></p>
     <Comment 
          :email="comment.user.email" 
          :content="comment.content"
          :urlAvatar="comment.user.avatar" 
          :createdAt="comment.createdAt"
     ></Comment>
      <p></p>
     </div>

    <div class="d-flex gap-1">
      <Avatar 
      :url="this.current_user_avatar"
      ></Avatar>
      
      <input type="text" class="form-control" placeholder="Un petit commentaire..." aria-label="Username" v-model="currentComment"/>
      <span><i  class="fa-solid fa-paper-plane"  data-bs-toggle="tooltip" title="Envoi du commentaire" @click="addComent"></i></span>
      
    </div>


  </div>
</div>
</div>
</div>
</div>
</template>

<style scoped>
/* @media(min-width:768px){
    .card{
      width:70%;
    }
} */
.card-header
{
 
  display: flex;
  align-items: center;
  gap: 1rem;
  background-color: #FFD7D7;
}



.card-header img{
   width:50px;
}

#image_post
{
  object-fit: contain;
  width: 100%;
  height: 250px;
}

i{
  cursor: pointer;
}

.comment_text
{
    background-color:aquamarine;
    border-radius:3px;
    width:100%;
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
</style>
