import VueRouter from 'vue-router';
import FrontendHome from './FrontComponents/FrontendHome.vue'
import FrontendHomeBody from './FrontComponents/FrontendHomeFirst.vue'
import article from './FrontComponents/Article.vue'
import login from './FrontComponents/Login.vue'
import backendhome from './BackComponents/BackendHome.vue'
import backendhomeBody from './BackComponents/BackendHomeBody.vue'
import writeArticle from './BackComponents/WriteArticle.vue'
import categoryArticle from './FrontComponents/CategoryArticle.vue'
import editArticle from './BackComponents/EditArticle.vue'
import editNotice from './BackComponents/EditNotice.vue'
import commentMgs from './BackComponents/commentMgs.vue'
var vue_router = new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {
            path:'/home',
            component:FrontendHome,
            children:[
                {
                    path:'/',
                    // 单个router-view用：component
                    component: FrontendHomeBody
                },
                {
                    path:'article/:id',
                    component:article
                },
                {
                    path:'article/category/:categoryName',
                    component:categoryArticle
                }
            ]
        },
        // {path:'/',component:home},
        // {path:'/home/article/:id',component:article},
        {
            path:'/backend',
            component:backendhome,
            children:[
                // {
                //     path:'/',
                //     component: commonHomeBody
                // },
                {
                    path:'home',
                    component:backendhomeBody
                },
                {
                    path:'article/editarticle/:id',
                    component:editArticle
                },
                {
                    path:'writeArticle',
                    component:writeArticle
                },
                {
                    path:'commentMgs',
                    component:commentMgs
                },
                {
                    path:'editNotice',
                    component:editNotice
                }
            ]
        },
        {path:'/backend/login',component:login},
        // {path:'/backend/home',component:backendhome}
    ]
})
export default vue_router;