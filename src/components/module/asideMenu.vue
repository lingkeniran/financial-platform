<template>
    <el-col :span="12">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router>
            <el-menu-item index="1" route="basicInfo">
                <img src="../../assets/qiyegaikuang.png" class="icon">
                <span slot="title">企业概况</span>
            </el-menu-item>
            <el-menu-item index="2" route="companyInfo">
                <img src="../../assets/jibenxinxi.png" class="icon">
                <span slot="title">基本信息</span>
            </el-menu-item>
            <el-menu-item index="3" route="developmentSituation">
                <img src="../../assets/fazhan1.png" class="icon">
                <span slot="title">发展概况</span>
            </el-menu-item>
            <el-menu-item index="4" route="businessRisks">
                <img src="../../assets/jingyingfengxian.png" class="icon">
                <span slot="title">经营风险</span>
            </el-menu-item>
            <el-menu-item index="5" route="creditRisks">
                <img src="../../assets/xinyongfengxian.png" class="icon">
                <span slot="title">信用风险</span>
            </el-menu-item>
        </el-menu>
    </el-col>
</template>

<script>
name:'menu'
export default {
    
}
</script>

<style lang="less" scoped>
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
</style>