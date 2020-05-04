<template>
    <div>
        <div class="el-header">
            <div class="logo">
                <router-link to="index"><img src="../../assets/logo.png" height="40px" alt="金融科技服务平台"></router-link>
            </div>
            <div class="search">
                <el-input placeholder="搜索企业" v-model="searchContent" >
                    <!-- <img src="../assets/sousuo.png" slot="suffix"> -->
                        <i slot="suffix" class="el-input__icon el-icon-search"></i>
                </el-input>
                <el-button  @click="searchQues()">搜索</el-button>
            </div>
            <div v-if="isLogin">
                <el-dropdown>
                    <span v-html="portrait">
                        <img class="img_portrait" src="portrait" alt="头像">
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="gotoUserPage()">
                                <img class="littleIcon" src="../../assets/yonghu.png">
                                个人主页
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="gotoSetting()">
                                <img class="littleIcon" src="../../assets/shezhi.png">
                                设置
                            </div>
                        </el-dropdown-item>
                        <el-dropdown-item>
                            <div class="dropdownItem" @click="logout()">
                                <img class="littleIcon" src="../../assets/tuichu.png">
                                退出
                            </div>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
            <div v-else>
                <el-link type="primary" class="text"><router-link to="login">登录</router-link></el-link>
                <span class="text">/</span>
                <el-link type="primary" class="text"><router-link to="register">注册</router-link></el-link>
            </div>
        </div>
        <div class="line"></div>
    </div>
</template>

<script>
import Qs from 'qs'
export default {
    data(){
        return{
            searchContent:'',
            isLogin:''
        }
    },
    created(){
        this.isUserLogin()
    },
    methods:{
        isUserLogin(){
            // console.log(window.sessionStorage.getItem('token'))
            // var token=window.sessionStorage.getItem('token')
            // console.log('token',token)
            // if(token==null||token==undefined||token==""){
            //     this.nonLogin=true
            // }else{
            //     this.isLogin=true
            // }
            this.isLogin=false
            console.log(this.isLogin)
        },
        searchQues(){
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
.el-header{
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around;
    margin: 0 auto;
    padding: 0 16px;
}
.logo{
    width: auto;
    // margin-right: 60px;
    display: flex;
    align-items: center;
}
.littleIcon{
    height: 20px;
    width: 20px;
    margin-right: 5px;
}
.el-input{
    margin-left: 50px;
    width: 400px;
    height: 60px;
    display: flex;
    align-items: center;
    margin-right: 10px;
}
.el-menu.el-menu--horizontal{
     border-bottom:white;
}
.item {
  margin-top: 10px;
  margin-right: 40px;
}
.line{
    border-bottom:solid 1px #e6e6e6;
}
.text{
    font-size: 16px;
    margin-right: 10px;
    color: #229ad1;
}
.search{
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
}
</style>