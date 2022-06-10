<script>
import Comment  from "./Comment.vue"
import Avatar from "./Avatar.vue"
export default{
    name:"Card",
    components:{Comment,Avatar},
    props:["name","lastName","avatar","owner_post_email","content","url","comments","id","admin"],
    data() {
      return {
        currentComment:null,
        currentUserAvatar:null,
        current_user_email:null,
        modeEditPost:false,
        contentPost:null
       
      }
    },
    mounted(){
   
          this.current_user = JSON.parse( localStorage.getItem('current_user') );
          // console.log("owner_post_email",this.$props.owner_post_email)
          // console.log("this.current_user",this.current_user.email)

		    if( this.current_user!= null)
        {
			       this.currentUserAvatar=this.current_user.avatar
             this.current_user_email=this.current_user.email
        }

        //
        this.contentPost = this.$props.content

       

    },
    
    methods:{
      addComent(){

        const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

        console.log(this.currentComment,this.$props.id)
        console.log("url :",url+"/"+this.$props.id)

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

        fetch(url+"/"+this.$props.id,options)
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

        
        console.log("url :",url+"/"+this.$props.id)

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

        fetch(url+"/"+this.$props.id,options)
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

      }
     


    }
     
}
</script>
<template>
<div class="card mb-3 m-auto">

    <div class="card-header">

  <!-- <img src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp" class="rounded-circle" alt="Avatar" /> -->
  <Avatar
  
  :url="this.$props.avatar"
  :owner_post_email="this.$props.owner_post_email"
  
  ></Avatar>
  <span>{{this.$props.lastName}} {{this.$props.name}}</span><span><i class="fa-solid fa-trash" v-if="current_user_email === this.$props.owner_post_email || this.$props.admin =='true'" @click="deletePost"></i></span><span><i v-if="current_user_email === this.$props.owner_post_email || this.$props.admin =='true'" class="fa-solid fa-pen-to-square"  @click="editPost"></i> <i v-if="modeEditPost" class="fa-solid fa-floppy-disk"></i></span>
  <!-- <span><button type="button" v-if="currentUser === email || admin =='true' " class="btn btn-primary s-auto rounded-pill" @click="deletePost">Delete</button></span> 
  -->
</div>
<img  id="image_post" v-if="url"  :src="url" class="card-img-top" alt="..." />

  
  <div class="card-body">
     <h5 class="card-title"></h5>
     <p class="card-text">
        {{contentPost}}
     </p>
     <!-- <p class="card-text"><small class="text-muted">Last updated3mins ago</small></p> -->

     <div v-for="comment in comments" >
       <p></p>
     <Comment 
          :email="comment.user.email" 
          :content="comment.content"
          :urlAvatar="comment.user.avatar" 
     ></Comment>
      <p></p>
     </div>

    <div class="d-flex gap-1">
      <Avatar 
      :url="this.currentUserAvatar"
      ></Avatar>
      
      <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="currentComment"/>
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
</style>
