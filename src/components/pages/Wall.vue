<script>
import Card from "../../components/Card.vue"
import Postform from "../../components/Postform.vue"
export default{
    name:"Wall",
    components: { Card,Postform },
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
              const {posts,email} = res
              
              this.posts = posts
              this.currentUser = email

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

<div v-if="currentUser" class="container-sm mt-5">
    <Postform></Postform>

    <div v-for="post in posts" >
    <Card 
        :currentUser="currentUser"
        :email="post.user.email"
        :content="post.content" 
        :url="post.imageUrl" 
        :comments="post.comments"
        :id="post.id"
        
        >
    </Card></div>

</div>




</template>
<style module>

.card{
width: 20rem;
}
</style>