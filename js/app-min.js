function onConnect(){console.log("onConnect"),client.subscribe("World");var e=new Paho.MQTT.Message("Hello");e.destinationName="World",client.send(e)}function onConnectionLost(e){0!==e.errorCode&&console.log("onConnectionLost:"+e.errorMessage)}function onMessageArrived(e){console.log("onMessageArrived:"+e.payloadString)}const MQTT_URI="http://192.168.1.30/",BASE_URL="https://www.iqi1.com/",URL_LOGIN_WEIXIN="api/auth/AuthWith?RefSource=wechat",URL_TOKEN_UPDATE="api/auth/updatetoken",URL_HOME_LIST="api/app/doll/room",URL_HOME_INFO="api/app/doll/room",URL_ROOM_ENTER="api/app/doll/room/enter",URL_ROOM_LEAVE="api/app/doll/room/leave",URL_ROOM_QUEUE="api/app/doll/room/queue",URL_ROOM_RANK_INFO="api/app/doll/room/caughtInfo",URL_ROOM_LEAVE_QUEUE="api/app/doll/room/leaveQueue",URL_USER_GIFT="api/gift",URL_USER_BALANCE="api/balance",URL_USER_BILLLIST="api/balance/log",URL_USER_RECHARGE="api/balance/recharge",URL_RECHARGING_LIST="api/balance/rechargingList",URL_WECHAT_PAY="api/wechatpay/pay",URL_IMPORT_GIFT="api/receipt/importgift",URL_APP_UPDATE="uploads/yqzzz.json",URL_ADDRESS_LIST="api/addr",URL_ADD_ADDRESS="api/addr/append",URL_UPDATE_ADDRESS="api/addr/update",URL_REMOVE_ADDRESS="api/addr/remove",URL_DEF_ADDRESS="api/addr/def";var client=new Paho.MQTT.Client("q.emqtt.com",Number(8083),"clientId");client.onConnectionLost=onConnectionLost,client.onMessageArrived=onMessageArrived,client.connect({onSuccess:onConnect});var canvas=document.getElementById("video-canvas"),url="ws://47.97.25.165:8084/",player=new JSMpeg.Player(url,{canvas:canvas});