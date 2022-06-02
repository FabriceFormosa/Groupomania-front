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
              this.email = email
              //console.log(  "this.posts",this.posts )
              })
             
            .catch(error => {
                console.log(  "error", error )
            });
    },
    data(){
        return { posts:[],
        email:null}
    }
}
</script>
<template>

<div v-if="email" class="container-sm mt-5">
<Postform></Postform>

<div v-for="post in posts" >
<Card 
    :email="post.user" 
    :title="post.title"
    :content="post.content" 
    :url="post.imageUrl" 
    :comments="post.comments"
    :id="post.id">
</Card>
</div>

</div>

</template>
<style module>

.card{
width: 20rem;
}
</style>