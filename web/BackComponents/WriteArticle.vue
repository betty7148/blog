<template>
    <div id="editor">
        <el-input type="text"   maxlength="30" show-word-limit v-model="input_title" placeholder="请输入文章标题"></el-input>
        <br><br>
        <el-input type="textarea" :rows="2"  maxlength="100" show-word-limit v-model="input_zhaiyao" placeholder="请输入文章摘要"></el-input>
        <br><br>
        <div>
            <editor-bar v-model='editor.info' :isClear='isClear' ref="child"></editor-bar>
        </div>
        <br>
        <el-autocomplete
            popper-class="my-autocomplete"
            v-model="state"
            :fetch-suggestions="querySearch"
            placeholder="请选择分类"
            @select="handleSelect">
            <i
                class="el-icon-edit el-input__icon"
                slot="suffix"
                @click="handleIconClick">
            </i>
            <template slot-scope="{ item }">
                <div class="name">{{ item.value }}</div>
                <!-- <span class="addr">{{ item.address }}</span> -->
            </template>
        </el-autocomplete>
        <br>
        <br>
        <p style="color:red">温馨提示：请勿发布涉及政治、广告、营销、翻墙、违反国家法律法规等内容</p>
        <br>
        <el-button type="primary" @click='saveHtml'>发布文章</el-button>
        <div id="cover">
        </div>
    </div>
    
</template>

<!-- 注意， 只需要引用 JS，无需引用任何 CSS ！！！-->

<script>
import EditorBar from "../commonComponents/wangEditor.vue"
import { apiDomin } from '../utils';
export default {
    data(){
        return{
            editor:{
                info:''
            },
            isClear:false,
            category: [],
            state: '',
            input_title:'',
            input_zhaiyao:'',
            input_category:''
        }
    },
    created(){

    },
    mounted() {
      this.category = this.loadAll();
    },
    methods:{
        saveHtml(){
            sessionStorage.setItem('username','sy');
            alert(this.input_title+" "+this.input_zhaiyao+" "+this.editor.info);
            let comment_time=this.articleDate();
            let imgsrcArr= this.$refs.child.getSrc(this.editor.info);

            this.$http.post(apiDomin('back/article/postArticle'),
                {
                    art_category:this.input_category.value,
                    art_title:this.input_title,
                    art_author:sessionStorage.getItem('username'),
                    art_zhaiyao:this.input_zhaiyao,
                    art_content:this.editor.info,
                    art_time:comment_time,
                    art_img:imgsrcArr[0]
                },
                     //解决跨域问题，不加无法跨域
                // {emulateJSON:true}
                ).then(
                    function (res) {
                        const { body } = res;
                        const { data } = body;
                        const { status } = body;
                        const { message } = body;
                        if(status==0){
                        console.log(data);
                        }else{
                            alert(message);
                        }
                    }
                );
            document.getElementById("cover").innerHTML=this.editor.info;
        },
        querySearch(queryString, cb) {
            var category = this.category;
            var results = queryString ? category.filter(this.createFilter(queryString)) : category;
            // 调用 callback 返回建议列表的数据
            cb(results);
        },
        createFilter(queryString) {
            return (category) => {
            return (category.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
            };
        },
        loadAll() {
            var list=[];
            this.$http.get(apiDomin('home/getCategoryList')).then(result=>{
                    // console.log(result.data);
                    const { body } = result;
                    const { data } = body;

                    const { status } = body;
                    if(status==0){
                      
                    
                        data.forEach(item=>{
                            list.push({'value':item.name});
                        });
                    }
                    // console.log(list);
                })
                return list;
        },
        handleSelect(item) {
            this.input_category=item;
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        articleDate(){
            var d = new Date();
            let year=d.getFullYear();
            let month=d.getMonth() + 1;
            month=month>10?month:'0'+month;
            let day=d.getDate()>10?d.getDate():'0'+d.getDate();
            let hour=d.getHours()>10?d.getHours():'0'+d.getHours();
            let minute=d.getMinutes()>10?d.getMinutes():'0'+d.getMinutes();
            let second=d.getSeconds()>10?d.getSeconds():'0'+d.getSeconds();
            var times=year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;         
            return times;
        }
    },
    components:{
        EditorBar
    }
}
</script>
<style>
.my-autocomplete {
    li{
        line-height: normal;
        padding: 7px;

        .name {
        text-overflow: ellipsis;
        overflow: hidden;
        }
        .addr {
        font-size: 12px;
        color: #b4b4b4;
        }

        .highlighted .addr {
        color: #ddd;
        }
  }
}
#editor{
    background-color: white;
    width:100%;
    padding:30px;
}
#editor input::-webkit-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}
input::-moz-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}
input::-ms-input-placeholder {
    color: rgb(92, 91, 91);
    font-size:17px;
}

</style>
