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
                <!-- <div id="relationshipGraph" style="width: 400px;height:400px;" class="relational-wrapper">
                </div> -->
                <el-table
                    :data="tableData"
                    stripe
                    style="width: 100%"
                    :span-method="arraySpanMethod">
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
            </el-main>
        </el-container>
    </el-container>
</template>

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
        // relationshipEcharts(){
        //     var relationshipEchart=this.$echarts.init(document.getElementById('relationshipGraph'));
        //     var option={
        //         title: {
        //         text: ''
        //         },
        //         tooltip: {},
        //         animationDurationUpdate: 1500,
        //         animationEasingUpdate: 'quinticInOut',
        //         label: {
        //             normal: {
        //                 show: true,
        //                 textStyle: {
        //                     fontSize: 12
        //                 },
        //             }
        //         },
        //         legend: {
        //             x: "center",
        //             show: false,
        //             data: ["夫妻", "战友", '亲戚']
        //         },
        //         series: [

        //             {
        //                 type: 'graph',
        //                 layout: 'force',
        //                 symbolSize: 45,
        //                 focusNodeAdjacency: true,
        //                 roam: true,
        //                 categories: [{
        //                     name: '夫妻',
        //                     itemStyle: {
        //                         normal: {
        //                             color: "#009800",
        //                         }
        //                     }
        //                 }, {
        //                     name: '战友',
        //                     itemStyle: {
        //                         normal: {
        //                             color: "#4592FF",
        //                         }
        //                     }
        //                 }, {
        //                     name: '亲戚',
        //                     itemStyle: {
        //                         normal: {
        //                             color: "#3592F",
        //                         }
        //                     }
        //                 }],
        //                 label: {
        //                     normal: {
        //                         show: true,
        //                         textStyle: {
        //                             fontSize: 12
        //                         },
        //                     }
        //                 },
        //                 force: {
        //                     repulsion: 1000
        //                 },
        //                 edgeSymbolSize: [4, 50],
        //                 edgeLabel: {
        //                     normal: {
        //                         show: true,
        //                         textStyle: {
        //                             fontSize: 10
        //                         },
        //                         formatter: "{c}"
        //                     }
        //                 },
        //                 data: [{
        //                     name: '徐贱云',
        //                     draggable: true,
        //                 }, {
        //                     name: '冯可梁',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '邓志荣',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '李荣庆',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '郑志勇',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '赵英杰',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '王承军',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '陈卫东',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '邹劲松',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '赵成',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '陈现忠',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '陶泳',
        //                     category: 1,
        //                     draggable: true,
        //                 }, {
        //                     name: '王德福',
        //                     category: 1,
        //                     draggable: true,
        //                 }],
        //                 links: [{
        //                     source: 0,
        //                     target: 1,
        //                     category: 0,
        //                     value: '夫妻'
        //                 }, {
        //                     source: 0,
        //                     target: 2,
        //                     value: '子女'
        //                 }, {
        //                     source: 0,
        //                     target: 3,
        //                     value: '夫妻'
        //                 }, {
        //                     source: 0,
        //                     target: 4,
        //                     value: '父母'
        //                 }, {
        //                     source: 1,
        //                     target: 2,
        //                     value: '表亲'
        //                 }, {
        //                     source: 0,
        //                     target: 5,
        //                     value: '朋友'
        //                 }, {
        //                     source: 4,
        //                     target: 5,
        //                     value: '朋友'
        //                 }, {
        //                     source: 2,
        //                     target: 8,
        //                     value: '叔叔'
        //                 }, {
        //                     source: 0,
        //                     target: 12,
        //                     value: '朋友'
        //                 }, {
        //                     source: 6,
        //                     target: 11,
        //                     value: '爱人'
        //                 }, {
        //                     source: 6,
        //                     target: 3,
        //                     value: '朋友'
        //                 }, {
        //                     source: 7,
        //                     target: 5,
        //                     value: '朋友'
        //                 }, {
        //                     source: 9,
        //                     target: 10,
        //                     value: '朋友'
        //                 }, {
        //                     source: 3,
        //                     target: 10,
        //                     value: '朋友'
        //                 }, {
        //                     source: 2,
        //                     target: 11,
        //                     value: '同学'
        //                 }],
        //                 lineStyle: {
        //                     normal: {
        //                         opacity: 0.9,
        //                         width: 1,
        //                         curveness: 0
        //                     }
        //                 }
        //             }
        //         ]
        //     };
        //     relationshipEchart.setOption(option)
        // },
    }
}
</script>

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
.graph-container{
    display: flex;
    // flex-wrap: nowrap;
}
.radar-wrapper{
    margin-top: 20px;
}
.main-wrapper{
    display: flex;
    flex-wrap: nowrap;
}
</style>