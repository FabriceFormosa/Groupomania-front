<script>
import Comment  from "./Comment.vue"
import Avatar from "./Avatar.vue"
export default{
    name:"Card",
    components:{Comment,Avatar},
    props:["email","content","url","comments","id"],
    data() {
      return {
        currentComment:null,
        commentList:null
      }
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
          //this.$router.go() //reload page
      
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
     


    }
     
}
</script>
<template>
<div class="card mb-3 m-auto">

    <div class="card-header">
  <img
    src="https://mdbcdn.b-cdn.net/img/new/avatars/1.webp"
    class="rounded-circle"
    
    alt="Avatar"
  />
  <span>{{email}}</span>
  <span><button type="button" class="btn btn-primary s-auto rounded-pill" @click="deletePost">Delete</button></span> 
 
  <!-- <div >{{email}}</div>
  <div >{{url}}</div> -->

</div>
<img  v-if="url"  :src="url" class="card-img-top" alt="..." />

  
  <div class="card-body">
     <h5 class="card-title">{{title}}</h5>
     <p class="card-text">
        {{content}}
     </p>
     <!-- <p class="card-text"><small class="text-muted">Last updated3mins ago</small></p> -->

     <div v-for="comment in comments" >
     <Comment :email="comment.user.email" :content="comment.content"></Comment>
     </div>
     <!-- <Comment></Comment>
     <Comment></Comment>
     <Comment></Comment> -->

    <div class="d-flex gap-1">
      <Avatar></Avatar>
      <input type="text" class="form-control" placeholder="Username" aria-label="Username" v-model="currentComment"/>
      <button type="button" class="btn btn-primary s-auto rounded-pill" @click="addComent">Post</button>
    </div>


  </div>
</div>

</template>

<style>
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
</style>
