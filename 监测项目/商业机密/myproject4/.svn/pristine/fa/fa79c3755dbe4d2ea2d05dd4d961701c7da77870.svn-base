## 工作流组件

>说明：
```
1.工作流相关以下称为工作流 

2.业务相关称为 业务
```

## 使用说明

1.准备工作
```
1.写入全局组件<flow-dialog ></flow-dialog>

2.import { mapGetters } from 'vuex'
```

2.开启工作流

```
1.传入参数并开启工作流

this.$store.dispatch('workFlow', { configCode: '每个form都有唯一的工作流名称，可询问对应的后台人员' })

this.$store.dispatch('openWorkFlow', true)


```

3.监听工作流 调取本地业务接口

```
1.获取是调用业务标识 及 工作流参数

...mapGetters([
      'businessFlag'， //  调用业务标识
      'workFlow2business'， //  工作流参数

    ])


2.监听标识 执行本地方法

 watch: {
    businessFlag(val) {
      if (val){

        // 执行本地方法 （加上工作流参数）
        
        // 本地方法执行完了

      }
    }
  },


```



   