<script>
import Card from "../../components/Card.vue"
import Postform from "../../components/Postform.vue"
export default{
    name:"Wall",
    components: { Card,Postform }
}
</script>
<template>

<div class="container-sm mt-5">
<Postform></Postform>

<Card></Card>
<Card></Card>
<Card></Card>

</div>

</template>
<style module>

.card{
width: 20rem;
}
</style>