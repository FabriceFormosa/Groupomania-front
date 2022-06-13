<script>
            function isJSON(data) {
    var isJson = false
    try {
        //this works with JSON string and JSON object, not sure about others
       var json = $.parseJSON(data);
       isJson = typeof json === 'object' ;
    } catch (ex) {
        console.error('data is not JSON');
    }
    return isJson;
}
              

import NavBar from "../Navbar.vue";
import Card from "../Card.vue"
import Postform from "../Postform.vue"
export default{
    name:"Wall",
    components: { Card,Postform,NavBar },
    computed:{
        isJSON
    },
    beforecreated() {
        const token = localStorage.getItem("token")
        if( token == null )
        {
            this.$router.push("/login")
        }
    },
    mounted(){
        const options={
            headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`
            }
        }
        const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
        const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
        
        fetch(url,options)
           .then((res) => {
            if(res.ok) 
            {
                //console.log( "res",res)
                return res.json()
            }else
            {
                throw new Error("Failed to fetch posts" )

            }})
            .then(res => {
              const {posts,email,user} = res
            // Array.isArray(posts)
            //   console.log("res",res)
            //   console.log("---------------------Array.isArray(posts):",Array.isArray(posts))

            //   console.log("user",user)
  
              this.posts = posts 
              this.currentUser = email

             console.log("this.posts.user :",this.posts)


        this.posts.forEach(post => {
               // console.log("post user name",this.post.user.name)
            });
            // this.posts.forEach(post => {

            // let card ={
            //     id:post.id,
            //     content:post.content,
            //     imageUrl:post.imageUrl,
            //     userId:post.userId,
            //     createdAt:post.createdAt,
            //     comments:post.comments,
            //     user:post.user
            //   }
                
            //      console.log("---------------------Array.isArray(post):",Array.isArray(post))
            //    // console.log("post",post)
            //     console.log("---------------------isJSON(post):",isJSON(post))
            //     console.log("Object.getPrototypeOf(post)",Object.getPrototypeOf(post))
            //   const keys = Object.keys(post)
            //     console.log("post keys",keys)

                
                // this.cards.push(JSON.parse(post))
            //   console.log("-----------------card :",card)

            //   });

            //   console.log("-----------------test :",test)
            //   this.name = user.name
            //   this.lastName = user.lastName
            //   this.admin = user.admin

              })
             
            .catch(error => {
                console.log(  "error", error )
            });
    },
    data(){
        return { posts:[],
        currentUser:null
        }
    }
}
</script>
<template>
<!-- <NavBar>  </NavBar>  -->


<div v-if="currentUser" class="container-sm mt-5">
    <Postform></Postform>

    <div v-for="post in posts" >

    <Card 
        :name_owner_post="post.user.name"
        :last_name_owner_post="post.user.lastName"
        :avatar_owner_post="post.user.avatar"
        :email_owner_post="post.user.email"
        :content_owner_post="post.content" 
        :url_img_owner_post="post.imageUrl" 
        :comments_owner_post="post.comments"
        :id_owner_post="post.id"
        :is_admin_owner_post="post.admin"
        >
    </Card></div>

</div>




</template>
<style scoped>

.card{
width: 20rem;
}
</style>