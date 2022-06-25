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
        "is_admin_owner_post",           // proprietaire du post admin ?
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
        contentPostModified:null
       
      }
    },
    mounted(){
   
          this.current_user = JSON.parse( localStorage.getItem('current_user') );
          // console.log("email_owner_post",this.$props.email_owner_post)
          // console.log("this.current_user",this.current_user.email)

		    if( this.current_user!= null)
        {
			       this.current_user_avatar=this.current_user.avatar
             this.current_user_email=this.current_user.email
             this.current_user_admin=this.current_user.admin
        }

        // Init
        this.contentPost = this.$props.content_owner_post
        this.contentPostModified = this.$props.content_owner_post
       

       

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
        console.log( "click editPost",this.modeEditPost)

      },
      updatePost()
      {
          const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        
        console.log("url :",url+"/"+this.$props.id_owner_post)

        const  options = {
          method:'PATCH',
          headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json",
                "Content-Type":"application/json"
                },
          body:JSON.stringify({
               contentUpdated:this.contentPostModified
            })
        }

        fetch(url+"/"+this.$props.id_owner_post,options)
        .then((res) => {
            if( res.status === 200 )
            {
              return res.json()
            }else
            {

            throw new Error("Failed to update Post")
            }

        })
        .then((res) => {
          console.log(res)
          this.$router.go() //reload page
      
        })
       .catch((err) => {  console.log  })
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
      
     


    }
     
}
</script>
<template>
<div class="card mb-3 m-auto">

    <div class="card-header d-flex justify-content-between">

  <!-- <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" class="rounded-circle" alt="Avatar" /> -->


 <div @click="viewProfile" > 
    <Avatar 
        :url="$props.avatar_owner_post"
    ></Avatar>
    <span><i v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" class="fa-solid fa-pen-to-square ps-2"  @click="UpdateProfile"></i></span><span><i v-if="current_user_admin =='true'" class="fa-solid fa-user-slash ps-2" @click="DeleteProfile"></i></span>
  </div>
  <div>
  <span class="fw-bold">{{$props.last_name_owner_post}} {{$props.name_owner_post}}</span>
  </div>
  <div>
  <span><i class="fa-solid fa-trash pe-2" v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" @click="deletePost"></i></span><span><i v-if="current_user_email === this.$props.email_owner_post || current_user_admin =='true'" class="fa-solid fa-pen-to-square"  @click="editPost"></i> <i v-if="modeEditPost" class="fa-solid fa-floppy-disk" @click="updatePost"></i></span>
  </div>
</div>
<p class="pt-2 fs-6 text-muted ">{{createdAt}}</p>
<img  id="image_post" v-if="url_img_owner_post"  :src="url_img_owner_post" class="card-img-top py-2" alt="image du post" />

  
  <div class="card-body">
     

     <h5 class="card-title"></h5>
     <p v-if="modeEditPost == false" class="card-text comment_text p-2">
        {{contentPost}}
     </p>
      
     <div v-if="modeEditPost == true" class="form-floating mt-4">
        <input  class="form-control py-3"  v-model="contentPostModified"/>
    </div>
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
      <span><i  class="fa-solid fa-paper-plane"   @click="addComent"></i></span>
      
    </div>


  </div>
</div>

</template>

<style scoped>
@media(min-width:768px){
    .card{
      width:70%;
    }
}
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
</style>
