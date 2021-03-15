var wsCryptokit = (function() {
  function Singleton(arg) {
    // 设置args变量为接收的参数或者为空（如果没有提供的话）
    var _this = this
    // eslint-disable-next-line no-array-constructor
    _this.portArr = new Array()
    _this.portArr[0] = 7792
    _this.portArr[1] = 27702
    _this.portArr[2] = 57668
    _this.arrSize = 3
    _this.preIp = 'wss://127.0.0.1:'
    _this.protocol = 'cryptokit-camlmac20-protocol'
    _this.wslink = null
    _this.serverCallback = function(response) {}
    _this.errorCallback = function(response) {}
    _this.closeCallback = function(response) {}
  }
  Singleton.prototype = {
    constructor: Singleton,
    CreateLink: function(ip, protocol) {
      var self = this
      return new Promise(function(resolve, reject) {
        self.wslink = new WebSocket(ip, protocol)
        self.wslink.onopen = function(event) { resolve() }
        self.wslink.onclose = function(event) {
          // eslint-disable-next-line no-new-object
          var result = new Object()
          result.errorcode = 1
          result.result = event.type
          self.closeCallback(result)
        }
        self.wslink.onerror = function(event) { reject(event) }

        self.wslink.onmessage = function(event) {
          if (event.data !== '') {
            // eslint-disable-next-line no-new-object
            var result = new Object()
            result.errorcode = JSON.parse(event.data).errorcode
            result.result = JSON.parse(event.data).result

            if (result.errorcode === 0) { self.serverCallback(result) } else { self.errorCallback(result) }
          }
        }
      })
    },
    SendMsg: function(wslink, msg) {
      var self = this
      return new Promise(function(resolve, reject) {
        self.serverCallback = resolve
        self.errorCallback = reject
        self.closeCallback = reject
        wslink.onerror = function(event) { reject(event) }
        wslink.send(msg)
      })
    },
    showErrorInfo: function(response) {
      if (response == null) {
        alert('Extension has been remove!')
      } else if (response.errorcode === 1) { // connection error
        alert(response.result)
      } else { // host error
        wsCryptokit.GetLastErrorDescChrome()
          .then(function(response) {
            alert(response.result)
          })
      }
    },
    init: function(resovle) {
      var self = this
      return self.CreateLink(self.preIp + self.portArr[0], self.protocol)
        .then(resovle, function() {
          return self.CreateLink(self.preIp + self.portArr[1], self.protocol)
        })
        .then(resovle, function() {
          return self.CreateLink(self.preIp + self.portArr[2], self.protocol)
        })
    },
    uninit: function() {
      var self = this
      return new Promise(function(resolve, reject) {
        self.wslink.close()
      })
    },

    selectCertificate: function(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo, sm2csplist) {
      var self = this
      // eslint-disable-next-line no-new-object
      var msgJSON = new Object()
      // eslint-disable-next-line no-array-constructor
      var paramArr = new Array()

      // eslint-disable-next-line no-new-object
      var dnFilter = new Object()
      dnFilter.param = bstrSubjectDNFilter
      paramArr.push(dnFilter)

      // eslint-disable-next-line no-new-object
      var issuerDNFilter = new Object()
      issuerDNFilter.param = bstrIssuerDNFilter
      paramArr.push(issuerDNFilter)

      // eslint-disable-next-line no-new-object
      var snFilter = new Object()
      snFilter.param = serialNo
      paramArr.push(snFilter)

      // eslint-disable-next-line no-new-object
      var sm2CSPFilter = new Object()
      sm2CSPFilter.param = sm2csplist
      paramArr.push(sm2CSPFilter)

      msgJSON.function = 'SelectCertificate'
      msgJSON.params = paramArr

      return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
    },

    GetSelectedItemValue: function(itemName) {
      var ele = document.getElementsByName(itemName)
      for (var i = 0; i < ele.length; i++) {
        if (ele[i].checked) {
          return ele[i].value
        }
      }
    },
    getSignCertInfo: function(bstrInfoType) {
      var self = this
      // eslint-disable-next-line no-new-object
      var requestJSON = new Object()
      // eslint-disable-next-line no-new-object
      var msgJSON = new Object()
      // eslint-disable-next-line no-array-constructor
      var paramArr = new Array()

      // eslint-disable-next-line no-new-object
      var InfoType = new Object()
      InfoType.param = bstrInfoType
      paramArr.push(InfoType)

      msgJSON.function = 'getSignCertInfo'
      msgJSON.params = paramArr

      requestJSON.type = 'getSignCertInfo'
      requestJSON.message = msgJSON

      return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
    },

    signMsgPKCS7: function(bstrsource, bstrselectedAlg, bAttached) {
      var self = this
      // eslint-disable-next-line no-new-object
      var msgJSON = new Object()
      // eslint-disable-next-line no-array-constructor
      var paramArr = new Array()

      // eslint-disable-next-line no-new-object
      var source = new Object()
      source.param = bstrsource
      paramArr.push(source)

      // eslint-disable-next-line no-new-object
      var selectedAlg = new Object()
      selectedAlg.param = bstrselectedAlg
      paramArr.push(selectedAlg)

      // eslint-disable-next-line no-new-object
      var IsWithSource = new Object()
      IsWithSource.param = bAttached
      paramArr.push(IsWithSource)

      msgJSON.function = 'SignMsgPKCS7'
      msgJSON.params = paramArr

      return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
    },

    signFilePKCS7Detached: function(bstrsource, bstrselectedAlg) {
      var self = this
      // eslint-disable-next-line no-new-object
      var msgJSON = new Object()
      // eslint-disable-next-line no-array-constructor
      var paramArr = new Array()

      // eslint-disable-next-line no-new-object
      var source = new Object()
      source.param = bstrsource
      paramArr.push(source)

      // eslint-disable-next-line no-new-object
      var selectedAlg = new Object()
      selectedAlg.param = bstrselectedAlg
      paramArr.push(selectedAlg)

      msgJSON.function = 'SignFilePKCS7Detached'
      msgJSON.params = paramArr

      return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
    },

    GetLastErrorDescChrome: function() {
      var self = this
      // eslint-disable-next-line no-new-object
      var requestJSON = new Object()
      // eslint-disable-next-line no-new-object
      var msgJSON = new Object()
      // eslint-disable-next-line no-array-constructor
      var paramArr = new Array()

      msgJSON.function = 'GetLastErrorDescChrome'
      msgJSON.params = paramArr

      requestJSON.type = 'GetLastErrorDescChrome'
      requestJSON.message = msgJSON

      return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
    }
  }

  // 实例容器
  // var instance

  // var _static = {
  //   // 获取实例的方法
  //   // 返回Singleton的实例
  //   getInstance: function(args) {
  //     if (instance === undefined) {
  //       instance = new Singleton(args)
  //     }
  //     return instance
  //   }
  // }
  return new Singleton()
})()
export default wsCryptokit

// export function wsCryptokit() {
//   var _this = this
//   // eslint-disable-next-line no-array-constructor
//   _this.portArr = new Array()
//   _this.portArr[0] = 7792
//   _this.portArr[1] = 27702
//   _this.portArr[2] = 57668
//   _this.arrSize = 3
//   _this.preIp = 'wss://127.0.0.1:'
//   _this.protocol = 'cryptokit-camlmac20-protocol'
//   _this.wslink = null
//   var serverCallback = function(response) {}
//   var errorCallback = function(response) {}
//   var closeCallback = function(response) {}

//   _this.CreateLink = function(ip, protocol) {
//     var self = this
//     return new Promise(function(resolve, reject) {
//       self.wslink = new WebSocket(ip, protocol)
//       self.wslink.onopen = function(event) { resolve() }
//       self.wslink.onclose = function(event) {
//         // eslint-disable-next-line no-new-object
//         var result = new Object()
//         result.errorcode = 1
//         result.result = event.type
//         closeCallback(result)
//       }
//       self.wslink.onerror = function(event) { reject(event) }

//       self.wslink.onmessage = function(event) {
//         if (event.data !== '') {
//           // eslint-disable-next-line no-new-object
//           var result = new Object()
//           result.errorcode = JSON.parse(event.data).errorcode
//           result.result = JSON.parse(event.data).result

//           if (result.errorcode === 0) { serverCallback(result) } else { errorCallback(result) }
//         }
//       }
//     })
//   }

//   _this.SendMsg = function(wslink, msg) {
//     return new Promise(function(resolve, reject) {
//       serverCallback = resolve
//       errorCallback = reject
//       closeCallback = reject
//       wslink.onerror = function(event) { reject(event) }
//       wslink.send(msg)
//     })
//   }

//   _this.init = function(resovle) {
//     var self = this
//     return self.CreateLink(self.preIp + self.portArr[0], self.protocol)
//       .then(resovle, function() {
//         return self.CreateLink(self.preIp + self.portArr[1], self.protocol)
//       })
//       .then(resovle, function() {
//         return self.CreateLink(self.preIp + self.portArr[2], self.protocol)
//       })
//   }

//   _this.uninit = function() {
//     var self = this
//     return new Promise(function(resolve, reject) {
//       self.wslink.close()
//     })
//   }

//   _this.selectCertificate = function(bstrSubjectDNFilter, bstrIssuerDNFilter, serialNo, sm2csplist) {
//     var self = this
//     // eslint-disable-next-line no-new-object
//     var msgJSON = new Object()
//     // eslint-disable-next-line no-array-constructor
//     var paramArr = new Array()

//     // eslint-disable-next-line no-new-object
//     var dnFilter = new Object()
//     dnFilter.param = bstrSubjectDNFilter
//     paramArr.push(dnFilter)

//     // eslint-disable-next-line no-new-object
//     var issuerDNFilter = new Object()
//     issuerDNFilter.param = bstrIssuerDNFilter
//     paramArr.push(issuerDNFilter)

//     // eslint-disable-next-line no-new-object
//     var snFilter = new Object()
//     snFilter.param = serialNo
//     paramArr.push(snFilter)

//     // eslint-disable-next-line no-new-object
//     var sm2CSPFilter = new Object()
//     sm2CSPFilter.param = sm2csplist
//     paramArr.push(sm2CSPFilter)

//     msgJSON.function = 'SelectCertificate'
//     msgJSON.params = paramArr

//     return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
//   }

//   _this.getSignCertInfo = function(bstrInfoType) {
//     var self = this
//     // eslint-disable-next-line no-new-object
//     var requestJSON = new Object()
//     // eslint-disable-next-line no-new-object
//     var msgJSON = new Object()
//     // eslint-disable-next-line no-array-constructor
//     var paramArr = new Array()

//     // eslint-disable-next-line no-new-object
//     var InfoType = new Object()
//     InfoType.param = bstrInfoType
//     paramArr.push(InfoType)

//     msgJSON.function = 'getSignCertInfo'
//     msgJSON.params = paramArr

//     requestJSON.type = 'getSignCertInfo'
//     requestJSON.message = msgJSON

//     return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
//   }

//   _this.signMsgPKCS7 = function(bstrsource, bstrselectedAlg, bAttached) {
//     var self = this
//     // eslint-disable-next-line no-new-object
//     var msgJSON = new Object()
//     // eslint-disable-next-line no-array-constructor
//     var paramArr = new Array()

//     // eslint-disable-next-line no-new-object
//     var source = new Object()
//     source.param = bstrsource
//     paramArr.push(source)

//     // eslint-disable-next-line no-new-object
//     var selectedAlg = new Object()
//     selectedAlg.param = bstrselectedAlg
//     paramArr.push(selectedAlg)

//     // eslint-disable-next-line no-new-object
//     var IsWithSource = new Object()
//     IsWithSource.param = bAttached
//     paramArr.push(IsWithSource)

//     msgJSON.function = 'SignMsgPKCS7'
//     msgJSON.params = paramArr

//     return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
//   }

//   _this.signFilePKCS7Detached = function(bstrsource, bstrselectedAlg) {
//     var self = this
//     // eslint-disable-next-line no-new-object
//     var msgJSON = new Object()
//     // eslint-disable-next-line no-array-constructor
//     var paramArr = new Array()

//     // eslint-disable-next-line no-new-object
//     var source = new Object()
//     source.param = bstrsource
//     paramArr.push(source)

//     // eslint-disable-next-line no-new-object
//     var selectedAlg = new Object()
//     selectedAlg.param = bstrselectedAlg
//     paramArr.push(selectedAlg)

//     msgJSON.function = 'SignFilePKCS7Detached'
//     msgJSON.params = paramArr

//     return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
//   }

//   _this.GetLastErrorDescChrome = function() {
//     var self = this
//     // eslint-disable-next-line no-new-object
//     var requestJSON = new Object()
//     // eslint-disable-next-line no-new-object
//     var msgJSON = new Object()
//     // eslint-disable-next-line no-array-constructor
//     var paramArr = new Array()

//     msgJSON.function = 'GetLastErrorDescChrome'
//     msgJSON.params = paramArr

//     requestJSON.type = 'GetLastErrorDescChrome'
//     requestJSON.message = msgJSON

//     return self.SendMsg(self.wslink, JSON.stringify(msgJSON))
//   }
// }
