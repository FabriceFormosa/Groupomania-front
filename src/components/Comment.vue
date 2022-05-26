<script>
import Avatar from "./Avatar.vue"
export default {
    name:"Comment",
    components:{Avatar}
}

</script>
<template>
 <div class="d-flex gap-1" >
      <Avatar></Avatar>
 <div class="d-flex flex-column comment_text p-1">
    
    <p>sylvie du marketing</p>
    <p>ouah c'est super génial cette histoire </p>
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