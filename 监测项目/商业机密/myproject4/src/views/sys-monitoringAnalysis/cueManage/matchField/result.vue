<template>
  <div class="matchField_result">
    <el-form>
      <div class="singleBlock" v-if="searchMode=='single'">
        <div>
          <h4>查询条件</h4>
          <el-row :gutter="20">
            <el-col :span="6">
              <el-form-item label="查询类型：" label-width="100px">
                <span>{{searchType==='own'?'公民身份证件信息':'公民出入境证件信息'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="查询方式：" label-width="100px">
                <span>{{searchMode==='single'?'单个查询':'批量查询'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="证件号码：" label-width="100px">
                <span>{{searchCredNo}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="姓名：" label-width="100px">
                <span>{{searchName}}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </div>
        <!-- <div>
          <h4>查询结果搜索</h4>
          <el-row :gutter="20">
            <el-button type="primary" style="marginLeft:20px" @click="dialogVisible=true">高级检索</el-button>
          </el-row>
        </div> -->
      </div>
      <!--批量查询  -->
      <div class="batchBlock" v-if="searchMode=='batch'">
        <div>
          <h4>查询条件</h4>
          <el-row :gutter="20">
            <el-col :span="5" :offset="1">
              <el-form-item label="查询类别：" label-width="100px">
               <span>中心数据</span>
                <!-- <span>{{this.queryCriteria.source==='center'?'中心数据':'外部数据'}}</span> -->
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="查询类型：" label-width="100px">
                <span>{{this.searchType==='own'?'公民身份证件信息':'公民出入境证件信息'}}</span>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="查询方式：" label-width="100px">
                <span>批量查询</span>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6">
              <el-form-item label="证件号码：" label-width="100px">
                <span>{{this.listData.credNo}}</span>
              </el-form-item>
            </el-col> -->
          </el-row>
        </div>
        <div>
          <h4>查询结果搜索</h4>
          <el-row :gutter="20">
            <!-- <el-col :span="6">
              <el-form-item label="查询结果：" label-width="100px">
                <el-select v-model="result" placeholder="请选择">
                  <el-option label="成功" value="1"></el-option>
                  <el-option label="失败" value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-form :model="form" ref="form">
            <el-col :span="8">
              <el-form-item label="时间：" prop="date" label-width="100px">
                <el-date-picker
                  v-model="form.date"
                  type="daterange"
                  range-separator="至"
                  value-format="yyyy-MM-dd"
                  start-placeholder="发起时间"
                  end-placeholder="完成时间"
                  unlink-panels
                ></el-date-picker>
              </el-form-item>
            </el-col>
            </el-form>
            <el-button type="primary" @click="pageInfo.pageNumber = 1;query()" style="marginLeft:20px">查 询</el-button>
            <el-button @click="resetForm('myform')">清 空</el-button>
            <el-button type="primary" style="marginLeft:20px" @click="dialogVisible=true">高级检索</el-button>
          </el-row>
        </div>
      </div>

      <div class="listBlock" v-if="searchType === 'own'">
        <el-table
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)"
          :data="tableData"
          @selection-change="handleSelectionChange"
          tooltip-effect="dark"
        >
          <el-table-column  v-if="searchMode=='batch'" type="selection" fixed="left"></el-table-column>
          <el-table-column label="序号" type="index" width="60" fixed="left"></el-table-column>
          <el-table-column label="姓名" prop="ctnm" min-width="100" :key='2'></el-table-column>
          <el-table-column label="性别" prop="sex" min-width="140" :key='3'></el-table-column>
          <el-table-column label="民族" prop="nation" min-width="100" :key='4'>
            <template slot-scope="scope">
            <el-tooltip effect="dark" placement="top-start">
              <div slot="content" style="margin:4px">{{scope.row.nation}}</div>
                <span class="tableCell">{{scope.row.nation}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="户籍地" prop="origin" min-width="160" :key='5'>
            <template slot-scope="scope">
            <el-tooltip effect="dark" placement="top-start">
              <div slot="content" style="margin:4px">{{scope.row.origin}}</div>
                <span class="tableCell">{{scope.row.origin}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="证件号码" prop="ctid" min-width="100" :key='33'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.ctid}}</div>
                <span class="tableCell">{{scope.row.ctid}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="职业" prop="vocation" min-width="120" show-overflow-tooltip :key='35'>
          </el-table-column>
          <el-table-column label="实际居住地址" prop="ctar" min-width="140" :key='6'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.ctar}}</div>
                <span class="tableCell">{{scope.row.ctar}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="详细地址" prop="addr" min-width="140" :key='34'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.addr}}</div>
                <span class="tableCell">{{scope.row.addr}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="服务处所" prop="engageunit" min-width="120" :key='7'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.engageunit}}</div>
                <span class="tableCell">{{scope.row.engageunit}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="婚姻状况" prop="marriage" min-width="140" :key='8'></el-table-column>
          <el-table-column label="学历" prop="edu" min-width="140" :key='1'></el-table-column>
          <el-table-column label="发起时间" prop="startTime" min-width="160" :key='9'></el-table-column>
          <el-table-column label="完成时间" min-width="140" :key='10'>
            <template slot-scope="scope">
              <span v-if="scope.row.endTime && new Date(scope.row.endTime.replace(/-/g, '/')) >=  new Date(scope.row.startTime.replace(/-/g, '/'))">{{scope.row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="stateCode" min-width="160" :key='28'>
            <template slot-scope="scope">
              {{scope.row.stateCode==="1" ? "正确返回 " : scope.row.stateCode==="200" ? "服务不存在" : scope.row.stateCode==="201" ? "参数个数与服务参数格式不匹配" : scope.row.stateCode==="007" ? "查询内容不存在" : scope.row.stateCode==="888" ? "过期数据" : scope.row.stateCode==="000" ? '': "其他异常" }}
            </template>
          </el-table-column>
          <el-table-column label="过期时间" prop="expireTime" min-width="160" :key='46'></el-table-column>
          <el-table-column label="查询进度" prop="schedule" min-width="120" :key='11'>
            <template slot-scope="scope">
              <span v-if="scope.row.endTime && new Date(scope.row.endTime.replace(/-/g, '/')) >= new Date(scope.row.startTime.replace(/-/g, '/'))">{{"完成"}}</span>
              <span v-else>{{'查询中'}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialog(scope);dialogVisible2=true" >查看</el-button>
              <el-button type="text" @click="Initiate(scope)">导出</el-button>
              <el-button type="text" @click="againSearch(scope)">重查外部委</el-button>
              <el-button v-if="scope.row.expireTime !== null" type="text" @click="openForm(scope)">修改过期时间</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-row>
          <el-col :span="8" style="paddingTop:10px">
            <el-button type="primary" v-if="mode=='batch'">批量导出</el-button>
          </el-col>
          <el-col :span="16">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="100"
              layout="total, sizes, prev, pager, next, jumper"
              :total="400"
              background
            ></el-pagination>
          </el-col>
        </el-row> -->
      </div>

      <div class="listBlock" v-else>
        <el-table 
          v-loading="loading"
          element-loading-text="拼命加载中"
          element-loading-spinner="el-icon-loading"
          element-loading-background="rgba(0, 0, 0, 0.1)" 
          :data="tableData1" 
          @selection-change="handleSelectionChange" 
          tooltip-effect="dark">
          <el-table-column v-if="searchMode=='batch'" type="selection" fixed="left"></el-table-column>
          <el-table-column label="序号" type="index" width="60" fixed="left"></el-table-column>
          <el-table-column label="姓名" prop="name" min-width="100" :key='12'></el-table-column>
          <el-table-column label="出入境证件号码" prop="credNo" min-width="120" :key='13'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.credNo}}</div>
                <span class="tableCell">{{scope.row.credNo}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="身份证号码" prop="IdNum" min-width="120" :key='14'>
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top-start">
                <div slot="content" style="margin:4px">{{scope.row.IdNum}}</div>
                <span class="tableCell">{{scope.row.IdNum}}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column label="签发日期" prop="IssuDate" min-width="100" :key='15'></el-table-column>
          <el-table-column label="有效截止日期" prop="EffectDate" min-width="110" :key='16'></el-table-column>
          <el-table-column label="发起时间" prop="startTime" min-width="160" :key='17'></el-table-column>
          <el-table-column label="完成时间" prop="endTime" min-width="160" :key='18'>
            <template slot-scope="scope">
              <span v-if="scope.row.endTime && new Date(scope.row.endTime.replace(/-/g, '/')) >=  new Date(scope.row.startTime.replace(/-/g, '/'))">{{scope.row.endTime}}</span>
            </template>
          </el-table-column>
          <el-table-column label="状态" prop="stateCode" min-width="160" :key='29'>
            <template slot-scope="scope">
              {{scope.row.stateCode==="1" ? "正确返回 " : scope.row.stateCode==="200" ? "服务不存在" : scope.row.stateCode==="201" ? "参数个数与服务参数格式不匹配" : scope.row.stateCode==="007" ? "查询内容不存在" : scope.row.stateCode==="888" ? "过期数据" : scope.row.stateCode==="000" ? '': "其他异常" }}
            </template>
          </el-table-column>
          <el-table-column label="过期时间" prop="expireTime" min-width="160" :key='45'></el-table-column>
          <el-table-column label="查询进度" prop="schedule" min-width="120" :key='19'>
            <template slot-scope="scope">
              <span v-if="scope.row.endTime && new Date(scope.row.endTime.replace(/-/g, '/')) >= new Date(scope.row.startTime.replace(/-/g, '/'))">{{"完成"}}</span>
              <span v-else>{{'查询中'}}</span>
            </template>
          </el-table-column>
          <!-- <el-table-column label="查询结果" prop="searchResult" min-width="120":key='1'></el-table-column> -->
          <el-table-column label="操作" width="180" fixed="right">
            <template slot-scope="scope">
              <el-button type="text" @click="openDialog(scope);dialogVisible2=true">查看</el-button>
              <el-button type="text" @click="Initiate(scope)">导出 </el-button>
              <el-button type="text" @click="againSearch(scope)">重查外部委</el-button>
              <el-button v-if="scope.row.expireTime !== null" type="text" @click="openForm(scope)">修改过期时间</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- <el-row>
          <el-col :span="8" style="paddingTop:10px">
            <el-button type="primary" v-if="mode=='batch'">批量导出</el-button>
          </el-col>
          <el-col :span="16">
             <el-pagination
               @size-change="handleSizeChange"
               @current-change="handleCurrentChange" 
               :current-page="pageInfo.pageNumber" 
               :page-size="pageInfo.pagesize" 
               layout="total, sizes, prev, pager, next, jumper" 
               :total="pageInfo.total" 
               background>
        </el-pagination>
          </el-col>
        </el-row> -->
      </div>
      <el-row>
        <el-col :span="8" style="paddingTop:10px">
          <el-button type="primary" v-if="mode=='batch'" @click="exportStatistics">批量导出</el-button>
          <el-button type="primary" v-if="mode=='batch'" @click="againSearchAll">批量重查外部委</el-button>
        </el-col>
        <el-col :span="16">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="pageInfo.pageNumber"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            background
          >
          </el-pagination>
        </el-col>
      </el-row>
    </el-form>

    <!-- dialog -->
    <el-dialog title="高级检索" :visible.sync="dialogVisible" width="80%">
      <el-form :model="form" label-width="130px" :rules="rules" ref="myform">
        <el-row :gutter="20">
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="姓名：" prop="ctnm">
              <el-input v-model="form.ctnm" placeholder="请输入姓名，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="性别： " prop="sex">
              <el-select v-model="form.sex" clearable placeholder="请选择" filterable>
                <el-option label="男" value="男"></el-option>
                <el-option label="女" value="女"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="婚姻状况：" prop="marriage">
              <el-select v-model="form.marriage" clearable placeholder="请选择" filterable>
                <el-option label="未婚" value="未婚"></el-option>
                <el-option label="有配偶" value="有配偶"></el-option>
                <el-option label="初婚" value="初婚"></el-option>
                <el-option label="再婚" value="再婚"></el-option>
                <el-option label="复婚" value="复婚"></el-option>
                <el-option label="丧偶" value="丧偶"></el-option>
                <el-option label="离婚" value="离婚"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="民族：" prop="nation">
              <el-input v-model="form.nation" placeholder="请输入民族，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="户籍地：" prop="origin">
              <el-input v-model="form.origin" placeholder="请输入户籍地，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="身份证号码：" prop="ctid">
              <el-input v-model="form.ctid" placeholder="请输入身份证号码，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="实际居住地址：" prop="ctar">
              <el-input v-model="form.ctar" placeholder="请输入实际居住地址，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="服务处所：" prop="engageunit">
              <el-input v-model="form.engageunit" placeholder="请输入服务处所，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="学历：" prop="edu">
              <el-input v-model="form.edu" placeholder="请输入学历，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="姓名：" prop="name">
              <el-input v-model="form.name" placeholder="请输入姓名，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="出入境证件号码：" prop="credNo">
              <el-input v-model="form.credNo" placeholder="请输入出入境证件号码，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="身份证号码：" prop="IdNum">
              <el-input v-model="form.IdNum" placeholder="请输入身份证号码，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="时间：" prop="date">
              <el-date-picker
                v-model="form.date"
                type="daterange"
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="发起时间"
                end-placeholder="完成时间"
                unlink-panels
              ></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="详细地址：" prop="addr">
              <el-input v-model="form.addr" placeholder="请输入详细地址，最长字符为50字符" maxlength="50"></el-input>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'own'" :span="8">
            <el-form-item label="状态：" prop="stateCode">
              <el-select v-model="form.stateCode" clearable placeholder="请选择" filterable>
                <el-option label="正确返回" value="1"></el-option>
                <el-option label="过期数据" value="888"></el-option>
                <el-option label="名称证件不匹配" value="007"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col
            v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="签发日期：" prop="IssuDate">
              <el-date-picker
              style="max-width:100%; min-width:100%"
                value-format="yyyy-MM-dd"
                v-model="form.IssuDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="有效截止日期：" prop="EffectDate">
              <el-date-picker
                 style="max-width:100%; min-width:100%"
                value-format="yyyy-MM-dd"
                v-model="form.EffectDate"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
              <!-- <el-input v-model="form.EffectDate" placeholder="请输入有效截止日期"></el-input> -->
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col v-if="this.searchType === 'other'" :span="8">
            <el-form-item label="状态：" prop="stateCode">
              <el-select v-model="form.stateCode" clearable placeholder="请选择" filterable>
                <el-option label="正确返回" value="1"></el-option>
                <el-option label="过期数据" value="888"></el-option>
                <el-option label="名称证件不匹配" value="007"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="过期时间：" prop="expireTime">
              <el-date-picker
                 style="max-width:100%; min-width:100%"
                value-format="yyyy-MM-dd"
                type="daterange"
                v-model="form.expireTime"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-col :span="8">
            <el-form-item label="查询进度：" >
              <el-input v-model="form.ctnm"></el-input>
            </el-form-item>
          </el-col> -->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="pageInfo.pageNumber = 1;query()">查 询</el-button>
        <el-button @click="resetForm('myform')">清 空</el-button>
        <el-button @click="dialogVisible = false;resetForm('myform')">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="修改过期时间" :visible.sync="dialogVisible3" width="50%">
      <el-form :model="timeForm" label-width="130px" :rules="rules" ref="timeForm">
        <el-row :gutter="20">
          <el-col :offset='2' :span='20'>
            <el-form-item label="过期时间：" prop="expireTime" :rules="[{ required: true, message: '请输入过期时间', trigger: 'change' }]">
              <el-date-picker
                 style="max-width:100%; min-width:100%"
                value-format="yyyy-MM-dd"
                v-model="timeForm.expireTime"
                type="date"
                placeholder="选择日期"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateTime">修改</el-button>
        <el-button @click="dialogVisible3 = false;resetForm('timeForm')">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="查看详情" :visible.sync="dialogVisible2" width="50%">
      <el-form>
        <el-row :gutter="20">
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="姓名：">
              <span>{{detailForm.ctnm}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="性别：">
              <span>{{detailForm.sex}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="民族：">
              <span>{{detailForm.nation}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="户籍地：">
              <span>{{detailForm.origin}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="证件号码：">
              <span>{{detailForm.ctid}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="职业：">
              <span>{{detailForm.vocation}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="实际居住地址：">
              <span>{{detailForm.ctar}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="详细地址：">
              <span>{{detailForm.addr}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="服务处所：">
              <span>{{detailForm.engageunit}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="婚姻状况：">
              <span>{{detailForm.marriage}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'own'" label="学历：">
              <span>{{detailForm.edu}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'other'" label="姓名：">
              <span>{{detailForm.name}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'other'" label="出入境证件号码：">
              <span>{{detailForm.credNo}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'other'" label="身份证号码：">
              <span>{{detailForm.IdNum}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'other'" label="签发日期：">
              <span>{{detailForm.IssuDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item v-if="this.searchType === 'other'" label="有效截止日期：">
              <span>{{detailForm.EffectDate}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item label="发起时间：">
              <span>{{detailForm.startTime}}</span>
            </el-form-item>
          </el-col>
          <el-col :offset='2' :span='20'>
            <el-form-item label="完成时间：">
              <span>{{detailForm.endTime}}</span>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { noSpaceAndTs } from '@/utils/formValidate.js'
import { singleper, singlecuru, batchper, batchcuru, dictionary } from '@/api/sys-monitoringAnalysis/cueManage/matchField/search.js'
import { againSearch, getNoticeData, updateTime } from '@/api/sys-monitoringAnalysis/cueManage/matchField/result.js'

export default {
  props: {
    mode: {
      type: String
    },
    listData: {
      type: Array
    },
    noticeId: {
      type: String
    },
    noticeType: {
      type: String
    },
    queryCriteria: {
      type: Object
    },
    md5ID: {
      type: String
    },
    type: {
      type: String
    },
    searchFlag: {
      type: Boolean
    }
  },
  data() {
    return {
      list: this.listData,
      md5Id: this.md5ID,
      result: '',
      searchMode: '',
      searchType: '',
      searchCredNo: '',
      searchName: '',
      currentPage: 1,
      loading: false,
      dialogVisible: false,
      dialogVisible2: false,
      dialogVisible3: false,
      ctid: '',
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ]
      },
      form: {
        ctnm: '',
        sex: '',
        nation: '',
        origin: '',
        ctar: '',
        engageunit: '',
        ctid: '',
        marriage: '',
        edu: '',
        startTime: '',
        endTime: '',
        name: '',
        credNo: '',
        IdNum: '',
        IssuDate: '',
        EffectDate: '',
        date: '',
        addr: '',
        stateCode: '',
        expireTime: ''
      },
      detailForm: {},
      pageInfo: {
        pageNumber: 1,
        pageSize: 10,
        total: 0
      },
      timeForm: {
        id: '',
        expireTime: ''
      },
      rules: {
        ctnm: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        nation: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        origin: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ctid: [{ validator: noSpaceAndTs, trigger: 'blur' }, { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }],
        vocation: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        ctar: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        addr: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        engageunit: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        edu: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        name: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        credNo: [{ validator: noSpaceAndTs, trigger: 'blur' }],
        IdNum: [{ validator: noSpaceAndTs, trigger: 'blur' }, { pattern: /^[a-zA-Z0-9]{15}$|^[a-zA-Z0-9]{18}$/, message: '请输入正确的身份证号码,15或18位', trigger: 'blur' }]
      },
      tableData: [],
      tableData1: [],
      multipleSelection: [],
      params: ''
    }
  },
  computed: {
    searchParams() {
      const form = this.form
      const obj = Object.assign({}, this.pageInfo)
      for (var key in form) {
        obj[key] = form[key]
      }
      delete obj.total
      if (this.form.date) {
        obj.startTime = obj.date[0] + ' 00:00:00'
        obj.endTime = obj.date[1] + ' 24:00:00'
      }
      if (this.form.expireTime) {
        obj.expireTime1 = obj.expireTime[0] + ' 00:00:00'
        obj.expireTime2 = obj.expireTime[1] + ' 24:00:00'
      }
      delete obj.date
      delete obj.expireTime
      return obj
    }
  },
  methods: {
    // 获取数据字典
    getDictionary(params) {
      dictionary(params).then(res => {
        if (res.code === 200) {
          switch (params) {
            case 'SCDT':
              this.sourceDireArr = res.data
              break
            case 'TOSC':
              this.dialogJudgmentData = res.data
              break
            default:
              break
          }
        }
      })
    },
    activeFn() {
      this.$emit('activeName', '2')
    },
    // 切换分页条数
    handleSizeChange(size) {
      this.pageInfo.pageNumber = 1
      this.pageInfo.pageSize = size
      this.getList()
    },
    // 点击切换分页
    handleCurrentChange(pageNumber) {
      this.pageInfo.pageNumber = pageNumber
      if (this.noticeId) {
        this.getNoticeData()
      } else {
        this.getList()
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.unshift({
        value: '',
        key: Date.now()
      })
    },
    removeDomain(item, index) {
      // var index = this.dynamicValidateForm.domains.indexOf(item)
      if (index > 0) {
        this.dynamicValidateForm.domains.splice(index, 1)
      }
    },
    Initiate(scope) {
      const arr = []
      if (this.searchType === 'own') {
        arr.push(scope.row.ctid)
        location.href = 'monitor/information/result-export?singleOrBatchDmTAPerInfo=' + arr.join(',')
      } else {
        arr.push(scope.row.credNo)
        location.href = 'monitor/information/result-export?singleOrBatchDmTACurujInfo=' + arr.join(',')
      }
    },
    againSearch(scope) {
      const obj = {}
      if (this.searchType === 'own') {
        obj.type = 'sfz'
        obj.ids = scope.row.ctid
      } else {
        obj.type = 'crj'
        obj.ids = scope.row.credNo
      }
      againSearch(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '查询外部委成功',
            type: 'success'
          })
        }
      })
    },
    getNoticeData() {
      this.loading = true
      const obj = {
        id: this.noticeId,
        type: this.noticeType
      }
      // const noticeParams = {}
      this.params = Object.assign({}, this.params, this.pageInfo)
      const fd = new FormData()
      for (var key in this.params) {
        if (this.params[key] !== '' && this.params[key] !== null) {
          fd.append(key, this.params[key])
        }
      }
      this.dialogVisible = false
      getNoticeData(obj, fd).then(res => {
        if (res.code === 200) {
          if (res.data.selectType === '1') {
            this.searchMode = 'single'
            this.searchType = 'own'
            this.searchCredNo = res.data.list[0].ctid
            this.searchName = res.data.list[0].ctnm
            this.tableData = res.data.list
          } else if (res.data.selectType === '2') {
            this.searchMode = 'batch'
            this.searchType = 'own'
            this.tableData = res.data.list
          } else if (res.data.selectType === '3') {
            this.searchMode = 'single'
            this.searchType = 'other'
            this.searchCredNo = res.data.list[0].ctid
            this.searchName = res.data.list[0].ctnm
            this.tableData1 = res.data.list
            this.tableData1.forEach((el, index) => {
              this.tableData1[index].IdNum = el.idNum
              this.tableData1[index].IssuDate = el.issuDate
              this.tableData1[index].EffectDate = el.effectDate
            })
          } else {
            this.searchMode = 'batch'
            this.searchType = 'other'
            this.tableData1 = res.data.list
            this.tableData1.forEach((el, index) => {
              this.tableData1[index].IdNum = el.idNum
              this.tableData1[index].IssuDate = el.issuDate
              this.tableData1[index].EffectDate = el.effectDate
            })
          }
          this.pageInfo.total = res.data.total
          this.loading = false
        } else {
          this.loading = false
        }
      }).catch(() => {
        this.loading = false
      })
    },
    init() {
      // 查询页面过来才进行进一步提示
      if (JSON.stringify(this.queryCriteria) === '{}') {
        this.getNoticeData()
      } else {
        this.searchMode = this.queryCriteria.mode
        this.searchType = this.queryCriteria.type
        if (this.queryCriteria.data.length > 0) {
          if (this.queryCriteria.data.length > 10) {
            this.queryCriteria.data.splice(10, this.queryCriteria.data.length)
          }
          this.initTableData()
        } else {
          this.tableData = []
          this.tableData1 = []
        }
        if (this.searchMode === 'single') {
          this.searchCredNo = this.queryCriteria.credNo
          this.searchName = this.queryCriteria.name
          // 身份证单个查询
          if (this.searchType === 'own') {
            if (this.queryCriteria.status === 'part' && sessionStorage.getItem('searchFlag') === 'true') {
              this.$confirm(this.queryCriteria.message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.loading = true
                const obj = this.queryCriteria.searchObj
                obj.requestFlag = 'yes'
                singleper(obj).then(res => {
                  if (res.code === 200) {
                    if (res.data === 17) {
                      this.loading = false
                      this.$message({
                        message: '已查询外部委',
                        type: 'info'
                      })
                      if (res.data.length !== 0) {
                        this.loading = false
                      } else {
                        this.loading = false
                        this.$message({
                          message: '暂无数据',
                          type: 'info'
                        })
                      }
                    } else {
                      this.queryCriteria.data = res.data.list
                      this.initTableData()
                      this.pageInfo.total = res.data.total
                      this.loading = false
                    }
                  }
                })
              }).catch(() => {
                this.loading = false
              // if (res.data.list.length && res.data.list.length > 0) {
              //   this.listData = res.data.list
              //   this.total = res.data.total
              //   this.activeFn()
              // }
              })
            }
          } else {
            console.log('-----------出入境单个查询--------------')
            // 出入境单个查询
            if (this.queryCriteria.status === 'part' && sessionStorage.getItem('searchFlag') === 'true') {
              this.$confirm(this.queryCriteria.message, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.loading = true
                const obj = this.queryCriteria.searchObj
                obj.requestFlag = 'yes'
                singlecuru(obj).then(res => {
                  if (res.code === 200) {
                    if (res.data === 17) {
                      this.loading = false
                      this.$message({
                        message: '已查询外部委',
                        type: 'info'
                      })
                      if (res.data.length !== 0) {
                        this.loading = false
                      } else {
                        this.loading = false
                        this.$message({
                          message: '暂无数据',
                          type: 'info'
                        })
                      }
                    } else {
                      this.queryCriteria.data = res.data.list
                      this.initTableData()
                      this.pageInfo.total = res.data.total
                      this.loading = false
                    }
                  }
                })
              }).catch(() => {
                this.loading = false
              // if (res.data.list.length && res.data.list.length > 0) {
              //   this.listData = res.data.list
              //   this.total = res.data.total
              //   this.activeFn()
              // }
              })
            }
          }
        } else {
        // 身份证批量查询
          console.log('------------------OWN-ALL---------------------------')
          if (this.queryCriteria.status === 'part' && sessionStorage.getItem('searchFlag') === 'true') {
            this.$confirm(this.queryCriteria.message, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.loading = true
              const obj = this.queryCriteria.searchObj
              const fd2 = new FormData()
              for (var key in obj) {
                if (obj[key] !== '') {
                  fd2.append(key, obj[key])
                }
              }
              fd2.append('requestFlag', 'yes')
              if (this.searchType === 'own') {
                batchper(fd2).then(res => {
                  if (res.code === 200) {
                    if (res.data === 17) {
                      this.loading = false
                      this.$message({
                        message: '已查询外部委',
                        type: 'info'
                      })
                    } else {
                      if (res.data.list.length > 10) {
                        this.queryCriteria.data = res.data.list.splice(0, 10)
                        this.pageInfo.total = res.data.total
                      } else {
                        this.queryCriteria.data = res.data.list
                        this.pageInfo.total = res.data.total
                      }
                      this.initTableData()
                      this.$message({
                        message: '查询成功',
                        type: 'success'
                      })
                      this.loading = false
                    }
                  }
                })
              } else {
              // 出入境批量查询
                batchcuru(fd2).then(res => {
                  if (res.code === 200) {
                    if (res.data === 17) {
                      this.loading = false
                      this.$message({
                        message: '已查询外部委',
                        type: 'info'
                      })
                    } else {
                      if (res.data.list.length > 10) {
                        this.queryCriteria.data = res.data.list.splice(0, 10)
                      } else {
                        this.queryCriteria.data = res.data.list
                        this.pageInfo.total = res.data.total
                      }
                      this.initTableData()
                      this.$message({
                        message: '查询成功',
                        type: 'success'
                      })
                      this.loading = false
                    }
                  }
                })
              }
            }).catch(() => {
              this.loading = false
            })
          }
        }
      }
    },
    initTableData() {
      const arr = []
      const arr1 = []
      this.pageInfo.total = Number(this.queryCriteria.total)
      const other = this.queryCriteria.data
      const own = this.queryCriteria.data
      if (this.searchType === 'own') {
        own.forEach(el => {
          const obj = {}
          obj.addr = el.dmTAPerInfo.addr
          obj.ccei = el.dmTAPerInfo.ccei
          obj.cctl = el.dmTAPerInfo.cctl
          obj.citp = el.dmTAPerInfo.citp
          obj.ctar = el.dmTAPerInfo.ctar
          obj.addr = el.dmTAPerInfo.addr
          obj.ctid = el.dmTAPerInfo.ctid
          obj.ctnm = el.dmTAPerInfo.ctnm
          obj.sex = el.dmTAPerInfo.sex
          obj.nation = el.dmTAPerInfo.nation
          obj.origin = el.dmTAPerInfo.origin
          obj.engageunit = el.dmTAPerInfo.engageunit
          obj.marriage = el.dmTAPerInfo.marriage
          obj.ctnt = el.dmTAPerInfo.ctnt
          obj.ctvc = el.dmTAPerInfo.ctvc
          obj.edu = el.dmTAPerInfo.edu
          obj.startTime = el.dmTAPerInfo.startTime
          obj.endTime = el.dmTAPerInfo.endTime
          obj.vocation = el.dmTAPerInfo.vocation
          obj.stateCode = el.dmTAPerInfo.stateCode
          obj.expireTime = el.dmTAPerInfo.expireTime
          obj.idenId = el.dmTAPerInfo.idenId
          arr.push(obj)
        })
        this.tableData = arr
      } else {
        other.forEach(el => {
          const obj = {}
          obj.name = el.dmTACurujInfo.name
          obj.credNo = el.dmTACurujInfo.credNo
          obj.IdNum = el.dmTACurujInfo.idNum
          obj.IssuDate = el.dmTACurujInfo.issuDate
          obj.EffectDate = el.dmTACurujInfo.effectDate
          obj.startTime = el.dmTACurujInfo.startTime
          obj.endTime = el.dmTACurujInfo.endTime
          obj.stateCode = el.dmTACurujInfo.stateCode
          obj.expireTime = el.dmTACurujInfo.expireTime
          obj.curujId = el.dmTACurujInfo.curujId
          arr1.push(obj)
        })
        this.tableData1 = arr1
      }
    },
    // timeFormat(data) {
    //   data.forEach(res => {
    //     res.timeFlag = '0'
    //     console.log(res.endTime)
    //     if () {
    //       res.timeFlag = '1'
    //     }
    //   })
    //   return data
    // },
    resetForm(formName) {
      this.form.date = ''
      this.$refs[formName].resetFields()
      this.$refs.form.resetFields()
    },
    query() {
      this.pageInfo.pageNumber = 1
      this.params = Object.assign({}, this.searchParams, this.pageInfo)
      if (this.$refs.myform) {
        this.$refs.myform.validate(valid => {
          if (valid) {
            this.pageInfo.pageNumber = 1
            this.params = Object.assign({}, this.searchParams, this.pageInfo)
            if (this.noticeId) {
              this.getNoticeData()
            } else {
              this.getList()
            }
          } else {
            this.$message({
              type: 'warning',
              message: '查询内容需符合校验规则',
              duration: 6000
            })
          }
        })
      } else {
        this.pageInfo.pageNumber = 1
        this.params = Object.assign({}, this.searchParams, this.pageInfo)
        if (this.noticeId) {
          this.getNoticeData()
        } else {
          this.getList()
        }
      }
    },
    getList() {
      this.loading = true
      this.params = Object.assign({}, this.params, this.pageInfo)
      this.params.excelMD5 = this.md5Id
      this.params.mode = this.searchMode
      this.params.type = this.searchType
      const fd = new FormData()
      for (var key in this.params) {
        if (this.params[key] !== '' && this.params[key] !== null) {
          fd.append(key, this.params[key])
        }
      }
      this.dialogVisible = false
      if (this.searchType === 'own') {
        batchper(fd).then(res => {
          if (res.code === 200) {
            this.loading = false
            if (this.searchType === 'own') {
              this.tableData = res.data.list
            } else {
              this.tableData1 = res.data.list
              if (res.data.list) {
                this.tableData1 = res.data.list
              } else {
                this.tableData1 = []
              }
              this.tableData1.forEach((el, index) => {
                this.tableData1[index].IdNum = el.idNum
                this.tableData1[index].IssuDate = el.issuDate
                this.tableData1[index].EffectDate = el.effectDate
              })
            }
            this.pageInfo.total = res.data.total
          } else {
            this.loading = false
          }
        })
      } else {
        batchcuru(fd).then(res => {
          if (res.code === 200) {
            this.loading = false
            if (this.searchType === 'own') {
              this.tableData = res.data.list
            } else {
              this.tableData1 = res.data.list
              if (res.data.list) {
                this.tableData1 = res.data.list
              } else {
                this.tableData1 = []
              }
              this.tableData1.forEach((el, index) => {
                this.tableData1[index].IdNum = el.idNum
                this.tableData1[index].IssuDate = el.issuDate
                this.tableData1[index].EffectDate = el.effectDate
              })
            }
            this.pageInfo.total = res.data.total
          }
        })
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    exportStatistics() {
      const length = this.multipleSelection.length
      if (length === 0) {
        this.$message({
          type: 'info',
          message: '请选择至少一条导出数据'
        })
      } else {
        const arr = []
        if (this.searchType === 'own') {
          this.multipleSelection.forEach(res => {
            arr.push(res.ctid)
          })
          location.href = 'monitor/information/result-export?singleOrBatchDmTAPerInfo=' + arr.join(',')
        } else {
          this.multipleSelection.forEach(res => {
            arr.push(res.credNo)
          })
          location.href = 'monitor/information/result-export?singleOrBatchDmTACurujInfo=' + arr.join(',')
        }
      }
    },
    updateTime() {
      this.$refs.timeForm.validate(valid => {
        if (valid) {
          const obj = {}
          if (this.searchType === 'own') {
            obj.type = '0'
          } else {
            obj.type = '1'
          }
          updateTime(obj, this.timeForm).then(res => {
            if (res.code === 200) {
              this.dialogVisible3 = false
              this.resetForm('timeForm')
              this.$message({
                type: 'success',
                message: '修改成功'
              })
              if (this.noticeId) {
                this.getNoticeData()
              } else {
                this.getList()
              }
            }
          })
        }
      })
    },
    againSearchAll() {
      const obj = {}
      const arr = []
      if (this.searchType === 'own') {
        obj.type = 'sfz'
        this.multipleSelection.forEach(res => {
          arr.push(res.ctid)
        })
      } else {
        obj.type = 'crj'
        this.multipleSelection.forEach(res => {
          arr.push(res.credNo)
        })
      }
      obj.ids = arr.join(',')
      againSearch(obj).then(res => {
        if (res.code === 200) {
          this.$message({
            message: '查询外部委成功',
            type: 'success'
          })
        }
      })
    },
    openDialog(scope) {
      this.detailForm = scope.row
    },
    openForm(scope) {
      console.log(scope)
      if (this.searchType === 'own') {
        this.timeForm.id = scope.row.idenId
      } else {
        this.timeForm.id = scope.row.curujId
      }
      this.dialogVisible3 = true
    }
  },
  watch: {
    tableData() {
      this.$emit('getFlag', !this.queryCriteria)
    },
    tableData1() {
      this.$emit('getFlag', !this.queryCriteria)
    }
  },
  created() {
    this.init()
    // this.getList()
    // }
    // this.getDictionary('NATION')
  }
}
</script>

<style lang="scss">
.matchField_result {
  .el-select {
    width: 100%;
  }
  .tableCell{
    text-align: left; 
    overflow:hidden; 
    white-space: nowrap; 
    text-overflow:ellipsis;
  }
}
</style>
