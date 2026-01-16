var _i18n = require("LanguageData");
cc.Class({
    extends: cc.Component,

    properties: {
        label: {
            default: null,
            type: cc.Label
        },
        btn: {
            default: null,
            type: cc.Node
        },

        payBtn: {
            default: null,
            type: cc.Node
        },
    },

    // use this for initialization111111120202020363636366  000000000 22222  201601160907
    onLoad: function () {
        var thisNode = this;
        //this.label.string = this.text;
        //判断是否有合进SDK
        _i18n.init("en");
        if (typeof (anysdk) == "undefined") {
            thisNode.label.string = "anysdk undefined";
            return;
        } else {
            thisNode.label.string = "anysdk";
        }

        var ads_plugin = anysdk.agentManager;
        if (typeof (ads_plugin) == "undefined") {
            thisNode.label.string = "letads_plugin undefined";
            return;
        } else {
            thisNode.label.string = "ads_plugin";
        }

        //广告
        this.btn.on('touchend', function (event) {
            var ads = ads_plugin.getAdsPlugin();
            if (typeof (ads) == 'undefined') {
                thisNode.label.string = 'ads underfined';
                return;
            } else {
                thisNode.label.string = 'ads';
            }
            //这里是进行广告显示，ts会没有定义这个函数而报错，忽略即可
            if (ads && ads.isAdTypeSupported(anysdk.AdsType.AD_TYPE_FULLSCREEN)) {
                ads.showAds(anysdk.AdsType.AD_TYPE_FULLSCREEN);
            }
            //广告事件注册
            ads.setListener(this.onAdsResult, this);
        });

        //支付
        this.payBtn.on('touchend', function (event) {
            var pay = ads_plugin.getIAPPlugin();
            if (typeof (pay) == 'undefined') {
                thisNode.label.string = 'pay underfined';
                return;
            } else {
                thisNode.label.string = 'pay';
            }

            pay.setListener(this.onPayResult,this);
        });
    },

    onPayResult(code,msg,info){
         if(code == anysdk.PayResultCode.kPaySuccess){

         }
    },

    onAdsResult(code, msg) {
        thisNode.label.string = 'onAdsResult';
        thisNode.label.string = 'ads result, resultcode:' + code + ',msg:' + msg;
        console.log("kkfkkkkk");
    },

    // called every frame
    update: function (dt) {
         _i18n.updateSceneRenderers();
    },
});
