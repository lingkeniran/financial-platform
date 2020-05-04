<template>
    <el-container>
        <my-header class="header"></my-header>
        <div class="el-main">
            <div class="overlay"></div>
            <div class="wrapper">
                <div class="searchWrapper">
                    <div class="compantText">请输入企业名称：</div>
                    <div class="searchContent" >
                        <el-input v-model="searchContent" placeholder="请输入企业名称：">
                            <i slot="suffix" class="el-input__icon el-icon-search"></i>
                        </el-input>
                        <el-button type="primary" @click="gotoBasicInfo()">搜索</el-button>
                    </div>
                </div>
            </div>
        </div>
    </el-container>
</template>

<script>
import myHeader from '../components/module/header.vue'
export default {
    components: {
        myHeader,
    },
    data(){
        return{
            searchContent:'',
        }
    }, 
    methods:{
        gotoBasicInfo(){
            let _this=this
            _this.$router.push({
                path:'/basicInfo',
                name:'basicInfo',
                //参数
                query:{
                    entname:_this.searchContent,
                    // dataObj:{}
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.el-container{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content:center;
}
.header{
    width: 100%;
}
.el-main{
    // width: 1060px;
    min-height: 550px;
    margin: 0 auto;
    padding: 0;
    // background-color: rgba(50, 114, 146, 0.92);
    background-image: url('../assets/background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    // display: flex;
    // background: rgba(99, 156, 185, 0.92);
}
.overlay{
    position: absolute;
    top: 60px;
    display: block;
    // width: 100%;
    width: 100%;
    height: 550px;
    background: rgba(15, 97, 138, 0.877);
}
.wrapper{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: nowrap;
    height: 100%;
}
.searchWrapper{
    width: 800px;
    height: 150px;
    // border: solid 1px #e6e6e6;
    z-index: 10;
    margin: 0 auto;
    background-color: rgba(34, 57, 68, 0.288); ;
    border-radius: 5px;
}
.compantText{
    font-size: 22px;
    // font-weight: bold;
    margin-left: 30px;
    margin-top: 30px;
    color: white;
}
.el-input{
    // height: 60px;
    // margin: 5px 30px;
    margin-left: 30px;
    margin-top: 20px;
    width: 640px;
}
.searchContent{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
.el-button{
    margin-top: 20px;
    margin-left: 20px;
    width: 80px;
}
</style>