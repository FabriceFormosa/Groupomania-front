<script>
export default{
    name:"Postform"
}
</script>

<template>
<!-- <div class="form-floating"> -->
    <label for="floatingTextarea">Comments</label>
    <div contenteditable  class="form-control"  placeholder = "Leave a comment here"  id="floatingTextarea">
    </div> 
    
<!-- </div> -->
<div class="d-flex">
  <label for="file-input" class="btn btn-secondary mt-1">Add Image</label>
  <input id="file-input" type="file"/>
  <button type="button" class="btn btn-primary mt-1 ms-auto ">Post</button>
</div>
<hr class="dropdown-divider mt-4" />
</template>

<style scoped>
body{
  background-color:#f5f5f51a
} 
input{
    display: none;
}
</style>