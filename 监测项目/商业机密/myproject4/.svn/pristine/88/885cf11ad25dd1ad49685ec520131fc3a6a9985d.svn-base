<template>
  <div class="cueManage_investigation_archivesList">
    <el-form :model="form" label-width="100px">
      <div class="block">
        <el-row class="title">
          <el-col :span="12">
            <span>来件信息1</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="来件日期：">
              <el-date-picker v-model="form.inp1" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="协查文号：">
              <el-input v-model="form.inp3" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="关联文号：">
              <el-input v-model="form.inp2" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="协查类型：">
              <el-radio-group v-model="form.resource">
                <el-radio label="一键协查"></el-radio>
                <el-radio label="研判分析"></el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="紧急程度：">
              <el-select v-model="form.select" placeholder="请选择">
                <el-option label="加急" value="1"></el-option>
                <el-option label="特急" value="2"></el-option>
                <el-option label="特提" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="涉罪类型：">
              <el-select v-model="form.select2" placeholder="请选择">
                <el-option label="犯罪类型1" value="1"></el-option>
                <el-option label="犯罪类型2" value="2"></el-option>
                <el-option label="犯罪类型3" value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="来文标题：">
              <el-input v-model="form.inp4" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="案情简介：">
              <el-input v-model="form.inp7" type="textarea" placeholder=""></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="案情标签：">
              <el-input v-model="form.inp5" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="来文单位：">
              <el-select  placeholder="请选择">
                <el-option label="公安部" value="1"></el-option>
                <el-option label="海关总署" value="2"></el-option>
                <el-option label="..." value="3"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20" class="request_items" ref="requestItems">
          <el-col :span="24">
            <el-form-item label="请求事项：">
              <el-input v-model="form.inp8" type="textarea" placeholder="" @focus="requestItemsFn()" @blur="clearRequestItemsFn"></el-input>
            </el-form-item>
          </el-col>
          <ul class="oUl" ref="requestItemsUl" :style="{'top':'51px'}">
            <li>当今世界的数据</li>
            <li>地婚纱的黄金时代</li>
            <li>我去看科技网</li>
            <li>当时觉得干啥</li>
            <li>而他也瑞特</li>
            <li>网球降低车内的女生v你</li>
          </ul>
        </el-row>
        <!-- <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label="协查名单：">
              <el-select v-model="form.select3" multiple filterable allow-create default-first-option placeholder="请选择协查名单">
                <el-option v-for="item in options5" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row> -->

      </div>
      <!-- 信息2 -->
      <div class="block" style="margin-top:5px">
        <el-row class="title">
          <el-col :span="24">
            <span>来件信息2</span>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="5">
            <el-form-item label="联系人：">
              <el-input v-model="form.inp10" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="联系人电话：">
              <el-input v-model="form.inp10" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="负责人：">
              <el-input v-model="form.inp10" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="负责人电话：">
              <el-input v-model="form.inp10" placeholder=""></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-button @click="addDomain">+</el-button>
          </el-col>
        </el-row>
        
        <el-row :gutter="20"> 
          <el-col :span="5">       
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm.domains"
              :label="'联系人：'"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
            >
              <el-input v-model="domain.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm1.domains"
              :label="'联系人电话：'"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
            >
              <el-input v-model="domain.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">       
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm2.domains"
              :label="'负责人：'"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
            >
              <el-input v-model="domain.value"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <el-form-item
              v-for="(domain, index) in dynamicValidateForm3.domains"
              :label="'负责人电话：'"
              :key="domain.key"
              :prop="'domains.' + index + '.value'"
            >
              <el-input v-model="domain.value" style="width:60%;"></el-input>
              <el-button @click.prevent="removeDomain(domain)">-</el-button>
            </el-form-item>
          </el-col>
        </el-row>

      </div>

    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicValidateForm: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm1: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm2: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      dynamicValidateForm3: {
        domains: [{
          value: ''
        }],
        email: ''
      },
      form: {
        inp1: '***【001】号',
        inp2: '',
        inp3: '',
        inp4: '',
        inp5: '',
        inp6: '',
        inp7: '',
        inp8: '',
        inp9: '',
        inp10: '',
        resource: '',
        select: '',
        select3: []
      },
      options5: [{
        value: '1',
        label: '协查名单1'
      }, {
        value: '2',
        label: '协查名单2'
      }, {
        value: '3',
        label: '协查名单3'
      }]
    }
  },
  mounted() {
    // this.dropDown()
  },
  methods: {
    requestItemsFn() {
      this.$refs.requestItemsUl.style.display = 'block'
      const liChilds = this.$refs.requestItemsUl.children
      var _this = this
      for (let i = 0; i < liChilds.length; i++) {
        liChilds[i].onclick = function() {
          _this.form.inp8 += liChilds[i].innerHTML + '\n'
          _this.$refs.requestItemsUl.style.display = 'none'
        }
      }
      // document.addEventListener('click', function() {
      //   this.$refs.requestItemsUl.style.display = 'none'
      // }, false)
    },
    clearRequestItemsFn() {
      // this.$refs.requestItemsUl.style.display = 'none'
    },
    dropDown() {
      const liChilds = this.$refs.requestItemsUl.children
      var _this = this
      for (let i = 0; i < liChilds.length; i++) {
        liChilds[i].onclick = function() {
          _this.form.inp8 += liChilds[i].innerHTML + '\n'
        }
      }
      console.log(liChilds)
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm3.domains.indexOf(item)
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1)
        this.dynamicValidateForm1.domains.splice(index, 1)
        this.dynamicValidateForm2.domains.splice(index, 1)
        this.dynamicValidateForm3.domains.splice(index, 1)
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm1.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm2.domains.push({
        value: '',
        key: Date.now()
      })
      this.dynamicValidateForm3.domains.push({
        value: '',
        key: Date.now()
      })
    }
  }
}
</script>

<style lang="scss">
.cueManage_investigation_archivesList {
  .el-date-editor {
    width: 100%;
  }
  .el-select {
    width: 100%;
  }
  .title {
    margin-bottom: 20px;
  }
  .request_items{
    position: relative;
  }
  .oUl{
    width: 80%;
    height: auto;
    border: 1px solid #ccc;
    border-radius: 10px;
    position: absolute;
    left: 112px;
    background: #fff;
    z-index: 10;
    text-indent: 10px;
    display: none;
  }
  .oUl li {
    width: 100%;
    height: 35px;
    border-bottom: 1px solid #ccc;
    line-height: 35px;
    font-size: 14px;
  }
  .oUl li:hover{
    background: #ccc;
  }
}
</style>
