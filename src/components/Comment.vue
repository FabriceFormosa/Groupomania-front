<script>
import Avatar from "./Avatar.vue"
export default {
    name:"Comment",
    components:{Avatar},
    props:{
         email:{
        type:String,
        required:true},
          content:{
        type:String,
        required:true
        },
        urlAvatar:{
          type:String
        }
    },
     data() {
      return {
        currentComment:null,
        postName:null,
        postLastName:null,
        fullName:null
       
      }
    },
    mounted(){
     
        const postEmail = this.$props.email
        this.postName = postEmail.split('@')[0].split('.')[1]
        if( this.postName ==null) this.postName = "unknown"
     //   console.log("this.postName",this.postName)
        this.postLastName = postEmail.split('@')[0].split('.')[0]
        if( this.postLastName ==null) this.postLastName = "unknown"
       // console.log("this.postName",this.postLastName)
        this.fullName=this.postLastName +  "  "+this.postName

    },
}

</script>
<template>
 <div class="d-flex gap-1" >
      <Avatar
        :url="this.$props.urlAvatar"
      ></Avatar>
 <div class="d-flex flex-column comment_text p-1">
    
    <p>{{fullName}}</p>
    <p>{{content}}</p>
 </div>
 </div>
   
</template>

<style scoped>

.d-flex p
{
    margin-bottom: 0;
}



.comment_text
{
    background-color: aquamarine;
    border-radius:3px;
    width:100%;
}

.d-flex p:nth-child(1){
   font-weight:bold;
}
</style>