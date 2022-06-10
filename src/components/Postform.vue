<script>
  export default{
   data() {
     return {
       content: "",
       selectedImage:null   
     }
   },             
    name:"Postform",
    methods:{

      handleNewFile(e)
      {
        const file = e.target.files[0]
        console.log("file :",file)
        this.selectedImage = file
      },
       handleCklick(){
  
const {VITE_SERVER_ADDRESS,VITE_SERVER_PORT}= import.meta.env 
const url=`http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
console.log("url ",url)

const  formData=new FormData();
formData.append("content",this.content)
formData.append("image",this.selectedImage)

const  options = {
  method:'POST',
   headers:{
                authorization:`Bearer ${localStorage.getItem("token")}`,
                "Accept":"application/json"
                //"Content-Type": "multipart/form-data "
            },
            method: 'POST',
            body:formData
}


this.error ="";
fetch(url,options)
 .then((res) => {
   if(res.ok) 
   {
      console.log( "res",res)
      return res.json()
   }

   throw new Error("failed to fetch post")
       
 })
 .then((res) => { 
   console.log("res----------",res)
    this.$router.go() //reload page
 })
  .catch((err)=>{
   console.log("err: ",err)
   

 })
   
 }
    }
}
</script>

<template>
<!-- <label for="floatingTextarea">Comments</label> -->
    
    <div class="form-floating mt-4"> 
    
    <input class="form-control py-3"  v-model="content"/>
  
    </div>
<!-- <div class="form-floating"> -->
    <!-- <label for="floatingTextarea">Comments</label>
    <div contenteditable  class="form-control"  placeholder = "Leave a comment here"  id="floatingTextarea">
    </div>  -->
    
<!-- </div> -->
<div class="d-flex">
  <label for="file-input" class="btn btn-secondary mt-1">Add Image</label>
  <input id="file-input" type="file" @change="handleNewFile"/>
  <button type="button" @click="handleCklick"  class="btn btn-primary mt-1 ms-auto " >Post</button>
</div>

<hr class="dropdown-divider mt-4" />
</template>

<style scoped>
body{
  background-color:#f5f5f51a
} 

.form-floating > div.form-control
{
  height: auto;
  min-height:5rem;
}

#file-input{
    display: none;
}
</style>