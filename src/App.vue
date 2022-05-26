

<script>

import Login from "./components/pages/Login.vue";
import NavBar from "./components/Navbar.vue";

export default {
  name:"App",
  components:{
    Login,
    NavBar
  }
}

</script>

<template>

<!-- <h1>Welcome to Groupomania</h1> -->

<NavBar></NavBar>
<router-view></router-view>

</template>

<style>
body{
  background-color: darkgrey;
}
</style>


<style>


</style>
