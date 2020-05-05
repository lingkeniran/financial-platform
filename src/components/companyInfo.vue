<template>
    <el-container>
        <!-- <el-header class="elheader"> -->
        <my-header class="header"></my-header>
        <!-- </el-header> -->
        <el-container class="main-wrapper">
            <div class="el-aside">
                <el-col :span="12">
                    <el-menu
                    class="el-menu-vertical-demo"
                    @open="handleOpen"
                    @close="handleClose"
                    background-color="#545c64"
                    text-color="#fff"
                    active-text-color="#ffd04b">
                        <el-menu-item index="1" @click="gotobasicInfo()">
                            <img src="../assets/qiyegaikuang.png" class="icon">
                            <span slot="title">企业概况</span>
                        </el-menu-item>
                        <el-menu-item index="2">
                            <img src="../assets/jibenxinxi.png" class="icon">
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="gotodevelopmentSituation()">
                            <img src="../assets/fazhan1.png" class="icon">
                            <span slot="title">发展概况</span>
                        </el-menu-item>
                        <el-menu-item index="4" @click="gotobusinessRisks()">
                            <img src="../assets/jingyingfengxian.png" class="icon">
                            <span slot="title">经营风险</span>
                        </el-menu-item>
                        <el-menu-item index="5" @click="gotocreditRisks()">
                            <img src="../assets/xinyongfengxian.png" class="icon">
                            <span slot="title">信用风险</span>
                        </el-menu-item>
                    </el-menu>
                </el-col>
            </div>
            <el-main class="graph-container">
                <div class="companyName-wrapper">
                    <div class="companyName">
                        企业基本信息
                    </div>
                </div>
                <!-- <div id="relationshipGraph" style="width: 400px;height:400px;" class="relational-wrapper">
                </div> -->
                <div class="infoTable">
                    <el-table
                        :data="tableData"
                        style="width: 100%"
                        :span-method="arraySpanMethod"
                        :cell-style="cellStyle">
                        <el-table-column
                            prop="label1"
                            width="180"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="content1"
                            width="180"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="label2"
                            width="180"
                            align="center">
                        </el-table-column>
                        <el-table-column
                            prop="content2"
                            width="180"
                            align="center">
                        </el-table-column>
                    </el-table>
                </div>
            </el-main>
        </el-container>
    </el-container>
</template>
<style lang="less" scoped>
.el-container{
    width: 100%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    // justify-content:center;
}
.elheader{
    height: auto;
}
.header{
    width: 100%;
    height: auto;
}
.el-main{
    padding: 0;
}
.el-aside{
    width: auto;
    // height: 100px;
    // background-color: #fff;
    margin: 0 auto;
}
.el-menu{
    width: auto;
}
.icon{
    width: 20px;
    height: 20px;
    margin-right: 5px;
}
.el-col{
    height: 100%;
    width: auto;
}
.el-menu-vertical-demo{
    height: 100%;
}
.infoTable{
    margin-left: 30px;
    margin-top: 10px;
    width: 720px;
}
.companyName-wrapper{
    margin: 10px 30px;
    width: auto;
    height: 50px;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    padding-left: 10px;
    background-color: #F0FFFF;
}
.companyName{
    font-size: 18px;
    font-weight: bold;
    line-height: 50px;
}
.radar-wrapper{
    margin-top: 20px;
}
.main-wrapper{
    display: flex;
    flex-wrap: nowrap;
}
.el-table .bold-column{
    font-weight: 700px;
    background-color: #87CEFA;
}
.el-table .warning-row {
    background: oldlace;
  }

.el-table .success-row {
    background: #f0f9eb;
  }
</style>

<script>
import Qs from 'qs'
import myHeader from '../components/module/header.vue'
export default {
    components: {
        myHeader,
    },
    created(){
    },
    mounted(){
        let entname=this.$route.query.entname
        this.entname=entname
        console.log('entname1',entname)
        // this.getBasicInfo(entname)
        this.getCompanyInfo(entname)
        // this.relationshipEcharts()
    },
    data(){
        return{
            value:[],
            entname:'',
            tableData:[]
        }
    },
    methods:{
        cellStyle({row, column, rowIndex, columnIndex}){
            if (columnIndex == 0||columnIndex == 2) {
                return 'font-weight:bold;background-color:	#F0FFFF';
            }
            // return '';
        },
        gotobasicInfo(){
            let _this=this
            _this.$router.push({
                path:'/basicInfo',
                name:'basicInfo',
                //参数
                query:{
                    entname:_this.entname,
                    // dataObj:{}
                }
            })
        },
        gotodevelopmentSituation(){
            let _this=this
            _this.$router.push({
                path:'/developmentSituation',
                name:'developmentSituation',
                //参数
                query:{
                    entname:_this.entname,
                    // dataObj:{}
                }
            })
        },
        gotobusinessRisks(){
            let _this=this
            _this.$router.push({
                path:'/businessRisks',
                name:'businessRisks',
                //参数
                query:{
                    entname:_this.entname,
                    // dataObj:{}
                }
            })
        },
        gotocreditRisks(){
            let _this=this
            _this.$router.push({
                path:'/creditRisks',
                name:'creditRisks',
                //参数
                query:{
                    entname:_this.entname,
                    // dataObj:{}
                }
            })
        },
        async getCompanyInfo(entname){
            console.log('entname2',entname)
            const {data:res} =await this.$axios.get('get_baseinfo',{params:{'entname':entname}})
            console.log('公司基本信息',res)
            var returndata=res
            this.tableData=[{
                    label1: '企业名称',
                    content1: returndata.entname,
                    label2:'',
                    content2:'',
                }, {
                    label1: '企业状态',
                    content1: returndata.entstatus,
                    label2:'企业类型',
                    content2:returndata.enttype,
                }, {
                    label1: '行业门类',
                    content1: returndata.industryphy,
                    label2:'注册资本',
                    content2:returndata.regcap+"万元",
                }, ]
        },
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            if(rowIndex ==0){
                if(columnIndex==1){
                    return[1,3]
                }
            }
        }
    }
}
</script>

