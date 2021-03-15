<template>
    <div class="ruleModel">
        <el-card>
            <div slot="header">
                <span>规则列表</span>
                <div style="float:right;">
                <el-button type="text" icon="el-icon-plus" @click="dialogVisible = true">定义规则</el-button><span class="itemline">|</span>
                <el-button type="text" @click="centerDialogVisible = true">审批</el-button><span class="itemline">|</span>
                <el-button type="text" @click="dialogVisible2 = true">修改</el-button><span class="itemline">|</span>
                <el-button type="text" @click="centerDialogVisible2 = true">删除</el-button><span class="itemline">|</span>
                <el-button type="text" @click="centerDialogVisible3 = true">失效与否</el-button>
                </div>
            </div>

            <div class="tableContanier">
                <el-table :data="tableData">
                <el-table-column label="全选" type="selection"></el-table-column>
                <el-table-column label="序号" type="index"></el-table-column>
                <el-table-column label="规则标识ID" prop="code" min-width="100px"></el-table-column>
                <el-table-column label="规则名称" prop="name" min-width="250px"></el-table-column>
                <el-table-column label="规则描述" prop="rule" min-width="300px"></el-table-column>
                <el-table-column label="创建人" prop="person" min-width="120px"></el-table-column>
                <el-table-column label="创建时间" prop="date" min-width="100px"></el-table-column>
                <el-table-column label="修改时间" prop="update" min-width="110px"></el-table-column>
                <el-table-column label="审批状态" prop="state" ></el-table-column>
                <el-table-column label="操作" min-width="140px" fixed="right">
                    <template slot-scope="scope">
                    <el-button type="text" @click="dialogVisible3= true">设置调度</el-button>
                    <el-button type="text" @click="dialogVisible4= true">执行规则</el-button>
                    </template>
                </el-table-column>
                </el-table>  
            </div>
        </el-card>

        <!--定义规则弹出框-->
        <el-dialog :visible.sync="dialogVisible" width="50%">
            <el-form :model="dialogForm" label-width="140px">
                <el-row>
                    <el-col :span="20">
                     新建规则
                    </el-col>
                </el-row>  
                <div class="divider-horizontal"></div>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="规则名称：">
                    <el-input v-model="dialogForm.title" placeholder="规则001-主体网银交易总金额排名规则"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="规则描述：">
                    <el-input v-model="dialogForm.content" type="textarea" placeholder="本规则针对主体名下所有账户网银交易金额加总，（区分机构和个人）（区分本外币），创建时间2019年1月8日。"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="系统内存：">
                            <el-input v-model="dialogForm.system" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" style="margin-left:10px;margin-top:5px">
                        GB
                    </el-col>
                </el-row>
                
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </div>
        </el-dialog>

        <!--审批弹出框-->
        <el-dialog
            title="请为当前选中的规则设置审批状态："
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <div style="text-align: center;">
                <span >
                <el-radio v-model="radio" label="1">待审批</el-radio>
                <el-radio v-model="radio" label="2">审批中</el-radio>
                <el-radio v-model="radio" label="3">已审批</el-radio>
            </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--修改规则弹出框-->
        <el-dialog :visible.sync="dialogVisible2" width="50%">
            <el-form :model="dialogForm2" label-width="140px">
                <el-row>
                    <el-col :span="20">
                     修改规则
                    </el-col>
                </el-row>  
                <div class="divider-horizontal"></div>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="规则名称：">
                    <el-input v-model="dialogForm2.title" placeholder="规则001-主体网银交易总金额排名规则"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="规则描述：">
                    <el-input v-model="dialogForm2.content" type="textarea" placeholder="本规则针对主体名下所有账户网银交易金额加总，（区分机构和个人）（区分本外币），创建时间2019年1月8日。"></el-input>
                    </el-form-item>
                </el-col>
                </el-row>
                <el-row>
                    <el-col :span="10">
                        <el-form-item label="系统内存：">
                            <el-input v-model="dialogForm2.system" placeholder=""></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" style="margin-left:10px;margin-top:5px">
                        GB
                    </el-col>
                </el-row>
                
                
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible2 = false">确 定</el-button>
            </div>
        </el-dialog>

        <!--确认删除弹出框-->
        <el-dialog
            title="请确认是否删除当前选中的规则？"
            :visible.sync="centerDialogVisible2"
            width="30%"
            center>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible2 = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible2 = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--失效与否弹出框-->
        <el-dialog
            title="请为当前选中的规则设置可用状态："
            :visible.sync="centerDialogVisible3"
            width="30%"
            center>
            <div style="text-align: center;">
                <span >
                <el-radio v-model="radio2" label="1">生效</el-radio>
                <el-radio v-model="radio2" label="2">失效</el-radio>
            </span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible3 = false">确 定</el-button>
            </span>
        </el-dialog>

        <!--设置调度弹出框-->
        <el-dialog :visible.sync="dialogVisible3" width="75%">
            <el-form :model="dialogForm2" label-width="160px">
                <el-row>
                    <el-col :span="20">
                     设置规则运行周期
                    </el-col>
                </el-row>  
                <div class="divider-horizontal"></div>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="选择规则运行方式：">
                        <el-radio v-model="radio3" label="1" @change="confirm">一键运行</el-radio>
                        <el-radio v-model="radio3" label="2" @change="confirm">定期自动运行</el-radio>
                    </el-form-item>
                </el-col>
                </el-row>
                
                <div v-show="one">
                     <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择特征指标：">
                                <el-radio v-model="radio4" label="1">主体属性指标库</el-radio>
                                <el-radio v-model="radio4" label="2">其他属性指标库</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择指标的时间范围：">
                                <el-date-picker
                                v-model="value6"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                unlink-panels
                                
                                >
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
               
                <div v-show="two" class="two">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择规则运行周期：">
                               <el-input v-model="runDate" placeholder="星期一； 八月份 ；；2020年，2021年"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按星期： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="星期一"></el-checkbox>
                                    <el-checkbox label="星期二"></el-checkbox>
                                    <el-checkbox label="星期三"></el-checkbox>
                                    <el-checkbox label="星期四"></el-checkbox>
                                    <el-checkbox label="星期五"></el-checkbox>
                                    <el-checkbox label="星期六"></el-checkbox>
                                    <el-checkbox label="星期日"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按月份： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="一月份"></el-checkbox>
                                    <el-checkbox label="二月份"></el-checkbox>
                                    <el-checkbox label="三月份"></el-checkbox>
                                    <el-checkbox label="四月份"></el-checkbox>
                                    <el-checkbox label="五月份"></el-checkbox>
                                    <el-checkbox label="六月份"></el-checkbox>
                                    <el-checkbox label="七月份"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item>
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="八月份"></el-checkbox>
                                    <el-checkbox label="九月份"></el-checkbox>
                                    <el-checkbox label="十月份"></el-checkbox>
                                    <el-checkbox label="十一月份"></el-checkbox>
                                    <el-checkbox label="十二月份"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按季度： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="第一季度"></el-checkbox>
                                    <el-checkbox label="第二季度"></el-checkbox>
                                    <el-checkbox label="第三季度"></el-checkbox>
                                    <el-checkbox label="第四季度"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="20">
                            <el-form-item label="按年份： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="2015年"></el-checkbox>
                                    <el-checkbox label="2016年"></el-checkbox>
                                    <el-checkbox label="2017年"></el-checkbox>
                                    <el-checkbox label="2018年"></el-checkbox>
                                    <el-checkbox label="2019年"></el-checkbox>
                                    <el-checkbox label="2020年"></el-checkbox>
                                    <el-checkbox label="2021年"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <el-row>
                    <el-col :span="24" style="textAlign:right">
                        <el-button type="primary">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible3 = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible3 = false">确 定</el-button>
            </div>
        </el-dialog>

        <!--执行规则弹出框-->
        <el-dialog :visible.sync="dialogVisible4" width="75%">
            <el-dialog 
                title="当前规则提交成功，执行ID为101"
                :visible.sync="centerDialogVisible4"
                width="30%"
                center append-to-body>
                <span slot="footer" class="dialog-footer">
                    <router-link to="executionRule"><el-button type="primary">继续</el-button></router-link>
                </span>
            </el-dialog>
            <el-form :model="dialogForm2" label-width="160px">
                <el-row>
                    <el-col :span="20">
                      运行规则
                    </el-col>
                </el-row>  
                <div class="divider-horizontal"></div>
                <el-row>
                <el-col :span="20">
                    <el-form-item label="选择规则运行方式：">
                        <el-radio v-model="radio3" label="1" @change="confirm">一键运行</el-radio>
                        <el-radio v-model="radio3" label="2" @change="confirm">定期自动运行</el-radio>
                    </el-form-item>
                </el-col>
                </el-row>
                
                <div v-show="one">
                     <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择特征指标：">
                                <el-radio v-model="radio4" label="1">主体属性指标库</el-radio>
                                <el-radio v-model="radio4" label="2">其他属性指标库</el-radio>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择指标的时间范围：">
                                <el-date-picker
                                    v-model="value6"
                                    type="daterange"
                                    range-separator="至"
                                    start-placeholder="开始日期"
                                    end-placeholder="结束日期"
                                    unlink-panels>
                                </el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>
               
                <div v-show="two" class="two">
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="选择规则运行周期：">
                               <el-input v-model="runDate" placeholder="星期一； 八月份 ；；2020年，2021年"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按星期： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="星期一"></el-checkbox>
                                    <el-checkbox label="星期二"></el-checkbox>
                                    <el-checkbox label="星期三"></el-checkbox>
                                    <el-checkbox label="星期四"></el-checkbox>
                                    <el-checkbox label="星期五"></el-checkbox>
                                    <el-checkbox label="星期六"></el-checkbox>
                                    <el-checkbox label="星期日"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按月份： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="一月份"></el-checkbox>
                                    <el-checkbox label="二月份"></el-checkbox>
                                    <el-checkbox label="三月份"></el-checkbox>
                                    <el-checkbox label="四月份"></el-checkbox>
                                    <el-checkbox label="五月份"></el-checkbox>
                                    <el-checkbox label="六月份"></el-checkbox>
                                    <el-checkbox label="七月份"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item>
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="八月份"></el-checkbox>
                                    <el-checkbox label="九月份"></el-checkbox>
                                    <el-checkbox label="十月份"></el-checkbox>
                                    <el-checkbox label="十一月份"></el-checkbox>
                                    <el-checkbox label="十二月份"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="20">
                            <el-form-item label="按季度： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="第一季度"></el-checkbox>
                                    <el-checkbox label="第二季度"></el-checkbox>
                                    <el-checkbox label="第三季度"></el-checkbox>
                                    <el-checkbox label="第四季度"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                     <el-row>
                        <el-col :span="20">
                            <el-form-item label="按年份： ">
                               <el-checkbox-group v-model="checkList">
                                    <el-checkbox label="2015年"></el-checkbox>
                                    <el-checkbox label="2016年"></el-checkbox>
                                    <el-checkbox label="2017年"></el-checkbox>
                                    <el-checkbox label="2018年"></el-checkbox>
                                    <el-checkbox label="2019年"></el-checkbox>
                                    <el-checkbox label="2020年"></el-checkbox>
                                    <el-checkbox label="2021年"></el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </div>

                <el-row>
                    <el-col :span="24" style="textAlign:right">
                        <el-button type="primary">重置</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible4 = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible4 = true">执行</el-button>
            </div>
        </el-dialog>
   
    </div>
</template>

<script>
    export default {
      data() {
        return {
          tableData: [
            {
              code: '10000001',
              name: '规则001-主体网银交易总金额排名规则',
              rule: '本规则针对主体名下所有账户网银交易金额加总...',
              person: '规则创建者001',
              date: '2019年1月8日',
              update: '2019年1月8日',
              state: '已审批'
            }, {
              code: '10000002',
              name: '规则002-交易发生地数量排名规则',
              rule: '本规则针对主体名下所有账户交易发生地数量...',
              person: '规则创建者002',
              date: '2019年1月8日',
              update: '2019年1月13日',
              state: '待审批'
            }, {
              code: '10000003',
              name: '规则003-个人POS消费金额排名规则',
              rule: '本规则针对个人主体POS消费金额...',
              person: '规则创建者003',
              date: '2019年1月8日',
              update: '2019年1月13日',
              state: '审批中'
            }
          ],
          dialogForm: {
            type: '',
            content: '',
            title: '',
            system: ''
          },
          dialogForm2: {
            type: '',
            content: '',
            title: '',
            system: ''
          },
          dialogVisible: false,
          dialogVisible2: false,
          dialogVisible3: false,
          dialogVisible4: false,
          centerDialogVisible: false,
          centerDialogVisible2: false,
          centerDialogVisible3: false,
          centerDialogVisible4: false,
          radio: '1',
          radio2: '1',
          radio3: '1',
          radio4: '1',
          value6: '',
          one: true,
          two: false,
          runDate: '',
          checkList: []
        }
      },
      methods: {
        confirm(radio3) {
          if (this.radio3 === '1') {
            this.one = !this.one
            this.two = !this.two
          } else if (this.radio3 === '2') {
            this.one = !this.one
            this.two = !this.two
          }
        }
      }
    }
</script>

<style lang="scss">
.ruleModel {
    .divider-horizontal{
        margin:10px 0 30px;
    }
    .two{
        .el-checkbox+.el-checkbox{
            margin-left: 15px;
        }
    }
    .itemline {
        font-size: 16px;
        color: #409EFF;
        padding:0 4px 0 8px;
    }
}
</style>