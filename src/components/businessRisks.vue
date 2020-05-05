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
                        <el-menu-item index="2" @click="gotocompanyInfo()">
                            <img src="../assets/jibenxinxi.png" class="icon">
                            <span slot="title">基本信息</span>
                        </el-menu-item>
                        <el-menu-item index="3" @click="gotodevelopmentSituation()">
                            <img src="../assets/fazhan1.png" class="icon">
                            <span slot="title">发展概况</span>
                        </el-menu-item>
                        <el-menu-item index="4">
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
                <!-- <div class="companyName-wrapper">
                    <div class="companyName">
                        企业发展概况
                    </div>
                </div> -->
                <div id="relationshipGraph" style="width: 100%;height:100%;" class="relational-wrapper">
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
        // this.getBasicInfo(entname)
        // this.raderEcharts(entname)
        this.relationshipEcharts(entname)
    },
    data(){
        return{
            value:[],
            entname:''
        }
    },
    methods:{
        async relationshipEcharts(entname){
            const {data:res} =await this.$axios.get('get_entbesinessrisk',{params:{'entname':entname}})
            console.log('经营风险',res)
            var returndata=res.data[0]
            console.log('returndata',returndata)
            var relationshipEchart=this.$echarts.init(document.getElementById('relationshipGraph'));
            var option={
                title: {
                text: ''
                },
                tooltip: {},
                animationDurationUpdate: 1500,
                animationEasingUpdate: 'quinticInOut',
                label: {
                    normal: {
                        show: true,
                        textStyle: {
                            fontSize: 12
                        },
                    }
                },
                // legend: {
                //     x: "center",
                //     show: false,
                //     data: ["夫妻", "战友", '亲戚']
                // },
                series: [
                    {
                        type: 'graph',
                        layout: 'force',
                        symbolSize: 90,
                        focusNodeAdjacency: true,
                        roam: 'scale',
                        legendHoverLink : true,//是否启用图例 hover(悬停) 时的联动高亮。
                        categories: [{
                            itemStyle: {
                                normal: {
                                    color: "#0000CD",
                                }
                            }
                        }, {
                            itemStyle: {
                                normal: {
                                    color: "#6495ED",
                                }
                            }
                        }, ],
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 15
                                },
                            }
                        },
                        force: {
                            repulsion: 1000,
                            edgeLength :150
                        },
                        edgeSymbolSize: [4, 50],
                        edgeLabel: {
                            normal: {
                                show: true,
                                textStyle: {
                                    fontSize: 10
                                },
                                formatter: "{c}"
                            }
                        },
                        data: [{
                            name: '经营风险\n\n'+returndata.value,
                            category: 0,
                            value:returndata.value
                        }, {
                            name: '经营异常\n\n'+returndata.children[0].value,
                            category: 1,
                            value:returndata.children[0].value
                        }, {
                            name: '行政处罚记录\n\n'+returndata.children[1].value,
                            category: 1,
                            value:returndata.children[1].value
                        }, {
                            name: '对外担保\n\n'+returndata.children[2].value,
                            category: 1,
                            value:returndata.children[2].value
                        }, {
                            name: '其他异常记录\n\n'+returndata.children[3].value,
                            category: 1,
                            value:returndata.children[3].value
                        }, {
                            name: '其他处罚记录\n\n'+returndata.children[4].value,
                            category: 1,
                            value:returndata.children[4].value
                        }],
                        links: [{
                            source: 0,
                            target: 1,
                            value:''
                            // category: 0,
                        }, {
                            source: 0,
                            target: 2,
                            value:''
                        }, {
                            source: 0,
                            target: 3,
                            value:''
                        }, {
                            source: 0,
                            target: 4,
                            value:''
                        },{
                            source: 0,
                            target: 5,
                            value:''
                        },],
                        lineStyle: {
                            normal: {
                                opacity: 0.9,
                                width: 1,
                                curveness: 0
                            }
                        }
                    }
                ]
            };
            relationshipEchart.setOption(option)
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
.radar-wrapper{
    margin-top: 20px;
}
.main-wrapper{
    display: flex;
    flex-wrap: nowrap;
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
</style>