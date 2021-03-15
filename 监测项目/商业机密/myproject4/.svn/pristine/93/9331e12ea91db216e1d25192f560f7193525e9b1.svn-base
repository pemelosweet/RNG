import {
  Message
} from 'element-ui'
var Certificate = (function() {
  function Singleton(arg) {
    // 设置args变量为接收的参数或者为空（如果没有提供的话）
    var args = arg || {}
    this.CryptoAgent = '' // dom 元素
    this.bSelectCertResult = ''
    this.selectedAlg = 'SHA-256' || args.selectedAlg
    this.CertID = 'SubjectCN' // 证书ID
  }
  Singleton.prototype = {
    constructor: Singleton,
    init: function() {
      this.onLoad()
      this.selectCertificate()
    },
    // 初始化加载插件
    onLoad: function() {
      try {
        var eDiv = document.createElement('div')
        if (navigator.appName.indexOf('Internet') >= 0 || navigator.appVersion.indexOf('Trident') >= 0) {
          if (window.navigator.cpuClass === 'x86') {
            eDiv.innerHTML = '<object id="CryptoAgent" codebase="CryptoKit.CAMLMAC20.x86.cab" classid="clsid:2F398B7F-242A-4FD4-8484-B93D5E667CB9" ></object>'
          } else {
            eDiv.innerHTML = '<object id="CryptoAgent" codebase="CryptoKit.CAMLMAC20.x64.cab" classid="clsid:4E098FB8-55AF-43F1-BFCC-CFE54C4E7F25" ></object>'
          }
        } else {
          Message.warning({
            message: '请使用IE10及以上版本浏览器',
            showClose: true
          })

          // alert('')
        }
        document.body.appendChild(eDiv)
      } catch (e) {
        alert(e)
        return
      }
      this.CryptoAgent = document.getElementById('CryptoAgent')
    },
    // 选择证书
    selectCertificate() {
      this.subjectDNFilter = ''
      this.issuerDNFilter = ''
      this.serialNumFilter = ''
      this.cspNameList = 'CFCA FOR CAMLMAC CSP v1.1.0'
      try {
        this.bSelectCertResult = this.CryptoAgent.SelectCertificate(this.subjectDNFilter, this.issuerDNFilter, this.serialNumFilter, this.cspNameList)
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!this.bSelectCertResult) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc()
          alert(errorDesc)
          return
        }
      } catch (e) {
        errorDesc = this.CryptoAgent.GetLastErrorDesc()
        alert(errorDesc)
      }
    },
    // 获取证书信息
    GetCertInfo: function() {
      try {
        // certificate information identifier
        this.certInfo = this.CryptoAgent.GetSignCertInfo(this.CertID)
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!this.certInfo) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc()
          alert(errorDesc)
          return
        }
      } catch (e) {
        errorDesc = this.CryptoAgent.GetLastErrorDesc()
        alert(errorDesc)
      }
      return this.certInfo
    },
    // 到期日期
    expireDate: function() {
      try {
        // certificate information identifier
        this.CertTimeOut = this.CryptoAgent.GetSignCertInfo('CertTimeOut')
        // Opera浏览器，NPAPI函数执行结果为false时，不能触发异常，需要自己判断返回值。
        if (!this.certInfo) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc()
          alert(errorDesc)
          return
        }
      } catch (e) {
        errorDesc = this.CryptoAgent.GetLastErrorDesc()
        alert(errorDesc)
      }
      return this.CertTimeOut
    },
    // 进行签名操作
    getSingature(InfoContent, signType) {
      this.InfoContent = InfoContent
      this.signType = signType || 'MsgSign'
      try {
        // certificate information identifier
        if (this.signType === 'MsgSign') {
          // source

          this.signature = this.CryptoAgent.SignMsgPKCS7(this.InfoContent, this.selectedAlg, false)
        } else {
          this.signature = this.CryptoAgent.SignFilePKCS7Detached(this.InfoContent, this.selectedAlg)
        }

        if (!this.signature) {
          var errorDesc = this.CryptoAgent.GetLastErrorDesc()
          alert(errorDesc)
          return
        }
      } catch (e) {
        errorDesc = this.CryptoAgent.GetLastErrorDesc()
        alert(errorDesc)
      }
      return this.signature
    }
  }

  // 实例容器
  var instance

  var _static = {
    // 获取实例的方法
    // 返回Singleton的实例
    getInstance: function(args) {
      if (instance === undefined) {
        instance = new Singleton(args)
        console.log(instance, 'CFCA实例初始化')
      }
      return instance
    }
  }
  return _static
})()
export default Certificate.getInstance()
/* eslint-disable */
// ------------------------------------------------以下只支持IE登录的旧程序-----------------------------------------------------------------------

