<script>
export default{
    name:"Avatar",
    props:["url","width","owner_post_email"],
    mounted(){
        // console.log("this.$props.url :",this.$props.url)
        // console.log("this.$props.width :",this.$props.width)
    },
    methods:{
        viewProfile(){

                console.log("click viewProfile owner avatar",this.$props.owner_post_email)
               // this.$router.push("/profile"/?idAvatar='5'")
               // this.$router.push({ name: 'profile', params: { username: 'eduardo' } })
                this.$router.push({path:'/profile',query:{idAvatar: this.$props.owner_post_email}});
        }
    }
}
</script>

<template >
    <i v-if="!this.$props.url" class="fa-solid fa-circle-user " @click="viewProfile"></i>
    <img v-if="this.$props.url"  :src=this.$props.url  class="card-img-top rounded-circle shadow-4 " alt="Avatar" @click="viewProfile"/>
</template>

<style scoped>
i{
    cursor:pointer;
}
img{
    width:30px;
    height: 30px;
    border:1px;
    border-color: black;
    cursor:pointer;
}
</style>