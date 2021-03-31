/**
 * 
 * @params rule, value, callback 校验规则默认参数
 * @params regName校验字段中文说明
 *
 * */
const regFnc = opts => {
    if (opts.rule.required) {
        if (!opts.value) {
            opts.callback(new Error(opts.regName + '不能为空'));
        } else if (!opts.rules(opts.value)) {
            opts.callback(new Error(opts.regName + ''));
        } else {
            opts.callback();
        }
    } else {
        if (!opts.value) {
            opts.callback();
        } else if (!opts.rules(opts.value)) {
            opts.callback(new Error(opts.regName + ''));
        } else {
            opts.callback();
        }
    }
};
// 校验回调函数
// @params regExpName 校验规则名称
const regExpFunc = (regExpName) => {
    return (rule, value, callback, regName) => {
        const defOpts = { rule, value, callback };
        const cusOpts = { regName: regName || '', rules: Reg[regExpName]};
        regFnc({
            ...defOpts,
            ...cusOpts
        });
    };
};

/**
 * 校验提示信息
 * */

const Reg = {
    // 密码
    pwd: val => {
        const reg = /^[a-zA-Z][a-zA-Z0-9_-~!@#$%^&*]{5,15}$/;
        return reg.test(val);
    },
    // 手机号码
    phone: val => {
        const reg = /^1[3456789]\d{9}$/;
        return reg.test(val);
    },
    // allPhone
    phones: val =>{
        const reg = /^(^(1[3456789]\d{9}$)$|^((\d{7,8})$|^(\d{4}|\d{3})-?(\d{7,8}))$)$/
        return reg.test(val);
    },
    // 邮箱正则
    email: val => {
        const reg = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
        return reg.test(val);
    },
    // 域名
    domain: val => {
        const reg = /^(((http|ftp|https):\/\/)?[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?)$/;
        return reg.test(val);
    },
    // 数字
    number: val => {
        const reg = /^[0-9]*$/;
        return reg.test(val);
    },
    // 正整数
    pInteger: val => {
        const reg = /(^[1-9]\d*$)/;
        return reg.test(val);
    },
    pIntegers: val => {
        const reg = /(^[0-9]\d*$)/;
        return reg.test(val);
    },
    //金额校验 保留两位小数
    money: val => {
        const reg = /^([1-9]\d*|0)(\.\d{1,2})?$/;
        return reg.test(val)
    },
    // 金额校验 保留两位小数，不能为0
    moneyR: val => {
        const reg = /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/;
        return reg.test(val)
    },
    // 百分比
    percent: val =>{
        const reg =/^\d\.([1-9]{1,2}|[0-9][1-9])$|^[1-9]\d{0,1}(\.\d{1,2}){0,1}$|^100(\.0{1,2}){0,1}$/
        return reg.test(val)
    },
    // 字符串
    char: val => {
        const reg = /^[a-zA-Z0-9]([a-zA-Z0-9_]+)$/;
        return reg.test(val);
    },
    // 汉字
    ZHCN: val => {
        const reg = /^[\u4e00-\u9fa5]+$/g;
        return reg.test(val);
    },
    // 400 电话正则
    phone400: val => {
        const reg = /^400\d{7}$/g;
        return reg.test(val);
    }
};

const regExp = {
    vPwd: regExpFunc('pwd'),
    vEmail: regExpFunc('email'),
    vPhone: regExpFunc('phone'),
    vPhones: regExpFunc('phones'),
    vPhone400: regExpFunc('phone400'),
    vDomain: regExpFunc('domain'),
    vPInteger: regExpFunc('pInteger'),
    vPIntegers: regExpFunc('pIntegers'),
    vChar: regExpFunc('char'),
    vZHCN: regExpFunc('ZHCN'),
    vNum: regExpFunc('number'),
    vMoney: regExpFunc('money'),
    vMoneyR: regExpFunc('moneyR'),
    vPercent: regExpFunc('percent')
};

export default regExp;
