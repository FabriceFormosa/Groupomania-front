<script>
export default{
    name:"Avatar",
    props:["url","width"],
      data(){
        return { 
            
            imageDataAvatar:null
        
        }
    },
     methods: {

     }
   
  
}
</script>

<template >
    <i v-if="!this.$props.url" class="fa-solid fa-circle-user "></i>
    <img  v-if="$props.url"  :src=$props.url  class="card-img-top rounded-circle shadow-4 " alt="Avatar"/>
    <label v-if="$props.updateAvatar" class="form-label">New Avatar</label>
</template>

<style scoped>
i{
    cursor:pointer;
}
img{
    width:35px;
    height: 35px;
    border:1px;
    border-color: black;
    cursor:pointer;
}

/* .file-input
{
   display :none;
} */
</style>