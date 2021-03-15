<template>
    <div class="inputwrap">
        <div class="modeltitle">反馈信息</div>
        <div class="flex-modelmain">
            <div class="flex-col-1 table-title">线索基本信息</div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">*来文编号：</div>
                    <div class="flex-input" style="">
                        <span>XXXX00021</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">*来文部门：</div>
                    <div class="flex-input">
                        <span>XXXXX分支机构</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">*来文日期时间：</div>
                    <div class="flex-input">
                        <span>2017年11月10日</span>
                    </div>
                </div>
            </div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">*中心函号：</div>
                    <div class="flex-input" style="">
                        <span>XXXX00021</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">*中心移送线索编号：</div>
                    <div class="flex-input">
                        <span>XXXX线索001</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">*中心移送线索名称：</div>
                    <div class="flex-input">
                        <span>XXX线索</span>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <div class="flex-col-1">
                    <div class="flex-label">*中心移动线索初步判断：</div>
                    <div class="flex-input">
                        <span>XXXXXXX</span>
                    </div>
                </div>
            </div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">*办理处室：</div>
                    <div class="flex-input" style="">
                        <span>分析处</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">*分析员：</div>
                    <div class="flex-input">
                        <span>张三</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">线索涉及可疑报告编号：</div>
                    <div class="flex-input">
                        <span>12345</span>
                    </div>
                </div>
            </div>
            <div class="flex-col-1 table-title">案件基本信息</div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">主体名称：</div>
                    <div class="flex-input" style="">
                        <span>张三</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">主体证件号码：</div>
                    <div class="flex-input">
                        <span>1101XXXXXXXXXXXXXX</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">主体原工作单位职务/职级：</div>
                    <div class="flex-input">
                        <span>XXX</span>
                    </div>
                </div>
            </div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">立案时间：</div>
                    <div class="flex-input" style="">
                        <span>2017年6月21日</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">侦结时间：</div>
                    <div class="flex-input">
                        <span>2017年6月21日</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">起诉时间：</div>
                    <div class="flex-input">
                        <span>2017年6月21日</span>
                    </div>
                </div>
            </div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">判决时间：</div>
                    <div class="flex-input" style="">
                        <span>2017年6月21日</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">判决罪名：</div>
                    <div class="flex-input">
                        <span>XXX</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">判决金额：</div>
                    <div class="flex-input">
                        <span>300万</span>
                    </div>
                </div>
            </div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">判决刑罚：</div>
                    <div class="flex-input" style="">
                        <span>XXX</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">挽回经济损失：</div>
                    <div class="flex-input">
                        <span>XXX万</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">抓获嫌疑人数量：</div>
                    <div class="flex-input">
                        <span>2人</span>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <div class="flex-col-1">
                    <div class="flex-label">案情简介：</div>
                    <div class="flex-input">
                        <el-input type="textarea"></el-input>
                       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                        <el-button size="small" type="primary" style="margin-top:10px;">点击上传</el-button>
                      </el-upload>
                    </div>
                </div>
            </div>
            <div class="flex-col-1 table-title">线索使用评价</div>
            <div class="flex-row txt-row">
                <div class="flex-col-1">
                    <div class="flex-label">是否有助于侦查方向：</div>
                    <div class="flex-input">
                        <span>是</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">是否有助于发现新证据：</div>
                    <div class="flex-input">
                        <span>是</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">是否有助于确定赃款去向：</div>
                    <div class="flex-input">
                        <span>是</span>
                    </div>
                </div>
                <div class="flex-col-1">
                    <div class="flex-label">发现新线索的数量：</div>
                    <div class="flex-input">
                        <span>2</span>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <div class="flex-col-1">
                    <div class="flex-label">对线索数据质量的整体评价：</div>
                    <div class="flex-input">
                         <el-input type="textarea"></el-input>
                       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                        <el-button size="small" type="primary" style="margin-top:10px;">点击上传</el-button>
                      </el-upload>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <div class="flex-col-1">
                    <div class="flex-label">对可疑报告的评价：</div>
                    <div class="flex-input">
                         <el-input type="textarea"></el-input>
                       <el-upload class="upload-demo" action="https://jsonplaceholder.typicode.com/posts/" multiple :limit="3">
                        <el-button size="small" type="primary" style="margin-top:10px;">点击上传</el-button>
                      </el-upload>
                    </div>
                </div>
            </div>
            <div class="flex-row">
                <div class="flex-col-1">
                    <div class="flex-label">备注：</div>
                    <div class="flex-input">
                        <span>无</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.inputwrap {
  .flex-modelmain {
    border-left: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .flex-row {
    width: 100%;
    display: flex;
    justify-content: center; /*x轴对齐方式*/
  }
  .row-header-column {
    display: flex;
    flex: 0 0 30%;
    margin-bottom: 10px;

    span {
      flex: 0 0 120px;
      text-align: right;
      align-self: center;
    }
    .el-input {
      flex: 1;
    }
  }
  .flex-col-1 {
    flex: 1;
    display: flex;
    border-top: 1px solid #ccc;
    border-right: 1px solid #ccc;
  }
  .flex-label {
    flex: 0 0 150px;
    padding: 10px 20px;
    text-align: right;
    border-right: 1px solid #ccc;
    // flex垂直居中的方法
    display: flex;
    align-items: center;
  }
  .flex-input {
    flex: 1;
    padding: 10px 20px;
    font-size: 14px;
    align-self: center;
  }
  .txt-row .flex-input {
    align-self: center;
  }
  .table-title {
    padding: 10px 20px;
    font-weight: bold;
  }
  .modeltitle {
    text-align: center;
    font-weight: bold;
    margin-bottom: 10px;
  }
}
</style>
