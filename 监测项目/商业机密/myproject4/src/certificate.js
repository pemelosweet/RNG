import {
  Message
} from 'element-ui'
import wsCryptokit from '@/wsCryptokit.js'
var CertificateChrome = (function() {
  function SingletonChrome(arg) {
    // 设置args变量为接收的参数或者为空（如果没有提供的话）
    var args = arg || {}
    this.CryptoAgent = '' // dom 元素
    this.bSelectCertResult = ''
    this.selectedAlg = 'SHA-256' || args.selectedAlg
    this.CertID = 'SubjectDN' // 证书ID
    this.w = ''
  }
  SingletonChrome.prototype = {
    constructor: SingletonChrome,
    BrowserInfo: function() {
      var res = {
        name: '',
        version: ''
      }
      var reg
      var userAgent = self.navigator.userAgent

      if (reg === /edge\/([\d\.]+)/i.exec(userAgent)) {
        res.name = 'Edge'
        res.version = reg[1]
      } else if (/msie/i.test(userAgent)) {
        res.name = 'Internet Explorer'
        res.version = /msie ([\d\.]+)/i.exec(userAgent)[1]
      } else if (/Trident/i.test(userAgent)) {
        res.name = 'Internet Explorer'
        res.version = /rv:([\d\.]+)/i.exec(userAgent)[1]
      } else if (/chrome/i.test(userAgent)) {
        res.name = 'Chrome'
        res.version = /chrome\/([\d\.]+)/i.exec(userAgent)[1]
      } else if (/safari/i.test(userAgent)) {
        res.name = 'Safari'
        res.version = /version\/([\d\.]+)/i.exec(userAgent)[1]
      } else if (/firefox/i.test(userAgent)) {
        res.name = 'Firefox'
        res.version = /firefox\/([\d\.]+)/i.exec(userAgent)[1]
      }
      return res
    },
    // 初始化加载插件
    onLoad: function() {
      try {
        var browser = this.BrowserInfo()
        if ((browser.name === 'Chrome' && parseInt(browser.version) > 41) ||
              (browser.name === 'Firefox' && parseInt(browser.version) > 52) ||
              (browser.name === 'Internet Explorer' && parseInt(browser.version) >= 10)) {
          if ('WebSocket' in window) {
            wsCryptokit.init()
              .then((response) => {
                console.log(response, 123)
                this.selectCertificate()
              })
              .catch(function(response) {
                console.log(response, 222)
                Message.warning({
                  message: '请使用IE10及以上版本浏览器',
                  showClose: true
                })
              })
          } else {
            Message.warning({
              message: '请使用IE10及以上版本浏览器',
              showClose: true
            })
          }
        } else {
          alert('This demo only support Edge')
        }
      } catch (e) {
        alert(e)
        return
      }
    },
    // 选择证书
    selectCertificate() {
      var subjectDNFilter = ''
      var issuerDNFilter = ''
      var serialNumFilter = ''
      var cspNameList = 'CFCA FOR CAMLMAC CSP v1.1.0'
      console.log('wsCryptokit---', wsCryptokit.selectCertificate)
      wsCryptokit.selectCertificate(subjectDNFilter, issuerDNFilter, serialNumFilter, cspNameList)
        .then(function(response) {
          console.log(response)
        })
        .catch(function(response) {
          wsCryptokit.showErrorInfo(response)
        })
    },
    // 获取证书信息
    GetCertInfo: function() {
      this.getInfoDataCert = wsCryptokit.getSignCertInfo('SubjectCN')
        .then(function(response) {
          return response.result
        })
        .catch(function(response) {
          wsCryptokit.ShowErrorInfo(response)
        })
      return this.getInfoDataCert
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
    getSingature(InfoContent) {
      var source = InfoContent
      var signType = 'Attach'
      var selectedAlg = 'SHA-1'
      var IsWithSource = false
      if (signType === 'Attach') {
        // PKCS#7 Attach
        IsWithSource = true
      } else if (signType === 'Detach') {
        // PKCS#7 Detach
        IsWithSource = false
      }

      this.signature = wsCryptokit.signMsgPKCS7(source, selectedAlg, IsWithSource)
        .then(function(response) {
          console.log(response.result, 2222)
          return response.result
        })
        .catch(function(response) {
          wsCryptokit.ShowErrorInfo(response)
        })
      return this.signature
    }
  }

  // 实例容器
  var instanceChrome

  var _staticChrome = {
    // 获取实例的方法
    // 返回Singleton的实例
    getInstanceChrome: function(args) {
      if (instanceChrome === undefined) {
        instanceChrome = new SingletonChrome(args)
      }
      return instanceChrome
    }
  }
  return _staticChrome
})()
export default CertificateChrome.getInstanceChrome()
/* eslint-disable */

