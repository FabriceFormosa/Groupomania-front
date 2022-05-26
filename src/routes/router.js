
import Login from'../components/pages/Login.vue'
import Wall from'../components/pages/Wall.vue'
import Profile from'../components/pages/Profile.vue'
import EditProfile from'../components/pages/EditProfile.vue'

import {createRouter,createWebHistory} from'vue-router'

const routes=[
    {path:"/login",component:Login},
 //   {path:"/signup",component:Login},
    {path:"/home",component:Wall},
    {path:"/profile",component:Profile},
    {path:"/editprofile",component:EditProfile},
    {path:"/",redirect:"home"}
]

const router = createRouter({history:createWebHistory(),routes})


router.beforeEach( (to,from) => {
    
    // pour acceder à une page privée il faut verifier l existence d'un token
    if( isPrivatePage(to) && ( !isTokenPresent() || !isTokenValid() ))
    {
        console.log("re routage ver page login token inexistant ou invalide ")
        return router.push("/login")
    }

    console.log("routage normal")
})

function isPrivatePage(to)
{
    const publicPages=["/login","/signup"];
    return (!publicPages.includes(to.path))
}

function isTokenPresent()
{
    return ( localStorage.getItem("token") != null)
}

function isTokenValid()
{
    return ( localStorage.getItem("token") === "my JWT token")
}

export {router} 
