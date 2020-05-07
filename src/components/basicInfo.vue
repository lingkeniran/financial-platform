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
                        <el-menu-item index="1">
                            <img src="../assets/qiyegaikuang.png" class="icon">
                            <span slot="title">企业概况</span>
                        </el-menu-item>
                        <el-menu-item index="2" @click="gotocompanyInfo()">
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
                        公司名称：{{entname}}
                    </div>
                </div>
                <div class="radarGraph-wrapper">
                    <div id="radarGraph"  style="width: 450px;height:450px;" class="radar-wrapper">
                    </div>
                    <div class="radarGraph-explain">
                        <div class="explain-table">
                            <el-table
                                :data="tableData"
                                stripe
                                style="width: 100%">
                                <el-table-column
                                    prop="label"
                                    width="180"
                                    align="center">
                                </el-table-column>
                                <el-table-column
                                    prop="classes"
                                    width="180"
                                    align="center">
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-html="explainText" class="explain-text">
                            
                        </div>
                    </div>
                </div>
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
        this.getBasicInfo(entname)
        this.raderEcharts(entname)
        // this.relationshipEcharts()
    },
    data(){
        return{
            value:[],
            classes:[],
            entname:'',
            tableData: [],
            explainText:"说明：<br/>各个标签的6个等级分别为A+、A-、B+、B-、C+、C-。<br/>对于企业行业状况、创新能力、活跃程度、稳定性4个正面标签而言，等级A+至C-表示企业该标签的良好状况依次递减，处于A+的企业情况最好、C-的最差；<br/>对于经营风险和信用风险两个负面性标签而言，等级A+至C-表示企业该指标对应的风险性依次递减，处于A+等级的企业风险性最高，C-对应的风险性最低。"
        }
    },
    methods:{
        async getBasicInfo(entname){
            console.log('entname2',entname)
            const {data:res} =await this.$axios.get('get_total',{params:{'entname':entname}})
            console.log('基本信息等级',res)
            var classes=res.value
            console.log('classes',classes)
            this.tableData=[{
                    label: '活跃程度',
                    classes: classes[0],
                }, {
                    label: '员工福利',
                    classes: classes[1],
                }, {
                    label: '稳定程度',
                    classes: classes[2],
                }, {
                    label: '信用风险',
                    classes: classes[3],
                }, {
                    label: '创新能力',
                    classes: classes[4],
                }, {
                    label: '经营风险',
                    classes: classes[5],
                }]
        },
        gotocompanyInfo(){
            let _this=this
            _this.$router.push({
                path:'/companyInfo',
                name:'companyInfo',
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
        async raderEcharts(entname){
            console.log('entname2',entname)
            const {data:res} =await this.$axios.get('get_total_classes',{params:{'entname':entname}})
            console.log('基本信息',res.value)
            var value=res.value;
            // var value_test=[5000, 1400, 2800, 3100, 4200, 2100]
            console.log('value1',value)
		  // 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('radarGraph'));
            // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '企业概况'
                },
                tooltip: {},
                legend: {
                    // data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#fff',
                            backgroundColor: '#999',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '活跃程度', max: 6000},
                        { name: '经营风险', max: 6000},
                        { name: '创新能力', max: 6000},
                        { name: '信用风险', max: 6000},
                        { name: '稳定程度', max: 6000},
                        { name: '员工福利', max: 6000}
                    ]
                },
                series: [{
                    name: '企业基本概况',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        // console.log('value3',value),
                        // console.log('value_test',value_test),
                        {
                            value: value,
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         formatter:function(params) {
                            //             return params.value;
                            //         }
                            //     }
                            // }
                            // name: '预算分配（Allocated Budget）'
                        }
                    ]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
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
.companyName-wrapper{
    margin: 10px 30px;
    width: auto;
    height: 60px;
    border: solid 1px #e6e6e6;
    border-radius: 5px;
    padding-left: 10px;
    background-color: #F0FFFF;
}
.companyName{
    font-size: 22px;
    font-weight: bold;
    line-height: 60px;
}
.radar-wrapper{
    margin-top: 20px;
    margin-left: 30px;
}
.main-wrapper{
    display: flex;
    flex-wrap: nowrap;
}
.radarGraph-wrapper{
    display: flex;
    flex-wrap: nowrap;
}
.radarGraph-explain{
    margin-left: 110px;
    // margin-top: 10px;
    width: 500px;
}
.explain-table{
    width: 360px;
}
.explain-text{
    margin-top: 20px;
    font-size: 14px;
    line-height: 20px;
    font-family: "Microsoft YaHei";
}
</style>