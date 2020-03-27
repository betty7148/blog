import Vue from 'vue';
import app from './App.vue';
import Vuex from "vuex";
import { apiDomin } from './utils';


Vue.use(Vuex);

import VueResource from 'vue-resource'
Vue.use(VueResource);



import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


import VueRouter from 'vue-router';
Vue.use(VueRouter);
import router from './router.js';


 
var store= new Vuex.Store({
    state:{//this.$store.state.**
        // shopcar:shopcar
        gonggao:"博客项目整体架构分为前端和后端，前端使用vue+element-ui+es6进行页面开发和组件封装。后端采用egg.js+mysql搭建服务器。",
        //commentList:[]
    },
    //存放同步函数方法
	/*mutations: {//this.$store.commit("方法名","按需传递唯一的参数")
		updateStateComment(state,obj){
            state.commentList[obj.id]=obj.comment_num;
		},
		setState(state,payload){
			state.list = payload
        },
        setNotice(state,notice){
            console.log(notice);
            state.gonggao=notice;
        }
	},
	//存放异步函数方法
	actions: {
		//async异步
		async getCommentNum(context,obj) {
            // return new Promise((resolve, reject) => {
                await obj.that.$http.get(apiDomin(`home/comment/getCommentCount/${obj.id}`)).then(result=>{
                    console.log("结果");
                    console.log(result);
                    context.commit('updateStateComment', {id:obj.id,comment_num:result.data[0]['count(1)']});
                    // resolve()
                // })
              })
            },
		
	}, 
    getters:{//this.$store.getters.**
        
       
    }*/
})


const vm=new Vue({
    el:"#app",
    render:c=>c(app),
    router,
    store
})


Vue.filter('dateFormat', function (date) {
    var d = new Date(date);
    let year=d.getFullYear();
    let month=d.getMonth() + 1;
    month=month>=10?month:'0'+month;
    let day=d.getDate()>=10?d.getDate():'0'+d.getDate();
    let hour=d.getHours()>=10?d.getHours():'0'+d.getHours();
    let minute=d.getMinutes()>=10?d.getMinutes():'0'+d.getMinutes();
    let second=d.getSeconds()>=10?d.getSeconds():'0'+d.getSeconds();
    var times=year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;         
    return times;
});

