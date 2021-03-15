<template>
  <div class="dreceiptwrap">

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>回执查询</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button> -->
      </div>
      <div class="content">
        <el-form :model="form" ref="form" label-width="140px" class="demo-form-inline">
          <el-row>
            <el-col :span="7" class="firstrow">
              <el-form-item label="金融机构编码：" prop="num">
                <el-input v-model="form.num" placeholder="金融机构编码"></el-input>
              </el-form-item>
              <el-form-item label="原报文报送方式：" prop="submitway">
                <el-select v-model="form.submitway" placeholder="原报文报送方式">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="在线填报" value="fill"></el-option>
                  <el-option label="页面加载" value="pageload"></el-option>
                  <el-option label="消息中间键" value="infobond"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="回执标识：" prop="receiptid">
                <el-select v-model="form.receiptid" placeholder="回执标识：">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="正确回执" value="okreceipt"></el-option>
                  <el-option label="错误回执" value="ereceipt"></el-option>
                  <el-option label="系统补正回执" value="sreceipt"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原报文名：" prop="name">
                <el-input v-model="form.name" placeholder="原报文名"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="原报文类型：" prop="type">
                <el-select v-model="form.type" placeholder="回执标识：">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="新增" value="add"></el-option>
                  <el-option label="删除" value="delect"></el-option>
                  <el-option label="修改" value="update"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原报文包名：" prop="packname">
                <el-input v-model="form.packname" placeholder="原报文包名："></el-input>
              </el-form-item>

              <el-form-item label="系统补正处理状态：" prop="handlestate">
                <el-select v-model="form.handlestate" placeholder="系统补正处理状态">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="待处理" value="unhandle"></el-option>
                  <el-option label="已处理" value="handle"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="原报文ID：" prop="id">
                <el-input v-model="form.id" placeholder="原报文ID"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="原报文交易类型：" prop="tradetype">
                <el-select v-model="form.tradetype" placeholder="原报文交易类型">
                  <el-option label="全部" value="all"></el-option>
                  <el-option label="大额" value="big"></el-option>
                  <el-option label="可疑" value="sup"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="回执生成日期：" prop="generateDate">
                <el-date-picker v-model="form.generateDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
                </el-date-picker>
              </el-form-item>
              <el-form-item label="原报文报送日期：" prop="submitDate">
                <el-date-picker v-model="form.submitDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
                </el-date-picker>
              </el-form-item>
              <el-form-item label="原报文落地日期：" prop="floorDate">
                <el-date-picker v-model="form.floorDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" unlink-panels>
                </el-date-picker>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="12">
              <el-button type="primary">批量下载</el-button>
            </el-col>
            <el-col :span="12" class="btnalign">
              <el-form-item label-width="100">
                <el-button type="primary" @click="onSubmit">查询</el-button>
                <el-button type="default" @click="resetForm('form')">重 置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <!-- <div class="imptchbtn"></div> -->
        <el-table style="width: 100%" :data="list.slice((currentPage-1)*pagesize,currentPage*pagesize)">
          <el-table-column type="index" label="序号" width="80" fixed></el-table-column>
          <el-table-column prop="organid" label="金融机构编码" min-width="120"></el-table-column>
          <el-table-column prop="organname" label="报告机构名称" min-width="120"></el-table-column>
          <el-table-column prop="ompageback" label="原报文包" min-width="220"></el-table-column>
          <el-table-column prop="om" label="原报文" min-width="220"></el-table-column>
          <el-table-column prop="omway" label="原报文报送方式" min-width="120"></el-table-column>
          <el-table-column prop="omdate" label="原报文报送时间" min-width="140"></el-table-column>
          <el-table-column prop="receiptdate" label="回执生成时间" min-width="120"></el-table-column>
          <el-table-column prop="receiptfile" label="回执文件" min-width="180"></el-table-column>
          <el-table-column prop="receiptflag" label="回执标志" min-width="120"></el-table-column>
          <el-table-column prop="error" label="错误总数" min-width="120"></el-table-column>
          <el-table-column prop="sall" label="系统补正总数" min-width="120"></el-table-column>
          <el-table-column prop="shandle" label="系统补正处理状态" min-width="120"></el-table-column>
          <el-table-column prop="handleday" label="补正处理天数" min-width="120"></el-table-column>
          <el-table-column prop="finishdate" label="补正完成日期" min-width="120"></el-table-column>
          <el-table-column prop="option" fixed="right" label="操作" width="140">
            <template slot-scope="scope">
              <el-button type="text" @click="dialogVisible = true">查看回执</el-button>
              <el-button type="text">下载回执</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 20, 30, 40]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" background></el-pagination>

      </div>

      <!-- 查看和反馈 -->
      <!-- 查看和反馈 -->
      <el-dialog title="回执详情" :visible.sync="dialogVisible" width="60%">
        <div class="artificialCorrection_info_detail">
          <el-row>
            <el-col>
              <!-- <h3>回执详情</h3> -->
              <div v-html="yqtzContent" class="yqtz"></div>
            </el-col>
          </el-row>
        </div>

        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogVisible = false">返 回</el-button>
        </span>
      </el-dialog>

    </el-card>
  </div>
</template>

<script>
import { getReceipt } from '@/api/dataQuery'
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        num: '',
        submitway: '',
        receiptid: '',
        name: '',
        type: '',
        tradetype: '',
        packname: '',
        handlestate: '',
        id: '',
        generateDate: '',
        submitDate: '',
        floorDate: ''
      },
      yqtzContent:
        '<xmp><?xml version="1.0" encoding="utf‐8"?>\n<MCVR>\n<BSIF>\n<RICD>报告机构编码</RICD>\n<TMLM>更正完成时限</TMLM>\n<RQDS>更正填报要求</RQDS>\n<RQNM>待更正大额交易总数</RQNM>\n</BSIF>\n<TSDTs>\n<TSDT seqno="1">\n<OCNM>原客户号</OCNM>\n<OTDT>原大额交易发生日期</OTDT>\n<OTCD>原大额交易特征代码</OTCD>\n<OTIC>原业务标识号</OTIC>\n<ITEMS>\n<ITEM seqno="1">待更正字段1</ITEM>\n<ITEM seqno="2">待更正字段2</ITEM>\n........\n</ITEMS>\n</TSDT>\n</TSDTs>\n</MCVR></xmp>',
      dialogForm: {
        region: ''
      },
      list: [],
      // listLoading: true,
      // 默认开始页码
      currentPage: 1,
      // 每页显示条数
      pagesize: 10
    }
  },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  created() {
    var listQuery = { currentPage: this.currentPage, pageSize: this.pageSize }
    this.fetchData(listQuery)
  },
  methods: {
    fetchData(listQuery) {
      // this.listLoading = true
      getReceipt(this.listQuery).then(response => {
        this.list = response.data.projects
        //  this.listLoading = false
      })
    },
    onSubmit() {
      console.log('submit!')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    resetForm(formName) { // 重置清空操作
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss">
.dreceiptwrap {
  .btnalign {
    text-align: right;
  }
  // .imptchbtn {
  //   padding-bottom:10px;
  // }
  .yqtz {
    height: 300px;
    overflow-y: auto;
    border: 1px solid #ccc;
    padding-left: 16px;
  }

  .el-card .el-card__body {
    padding-top: 16px;
    padding-left: 16px;
    padding-right: 16px;
  }
  .firstrow .el-form-item__content {
    width: 54%;
  }
}
</style>
