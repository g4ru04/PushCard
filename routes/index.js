var express = require('express');
var request = require('request');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	request.post({
		url: "https://workflow.pershing.com.tw/WFMobileWeb/Service/eHRFlowMobileService.asmx/InsertCardData",
		headers: {
			//"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			//"X-Requested-With": "XMLHttpRequest"
			//"Content-Type": "application/x-www-form-urlencoded",
			"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
			"X-Requested-With": "XMLHttpRequest"
		},
		body: encodeURI(GetUrlEncodeJson({
			"key": "%06PSLKGIPF%0a%05%5cT%1bH_YU%40TEISUDXF%5dV2",
			"groupUBINo": "20939790",
			"companyID": "1",
			"account": "10506002",
			"language": "zh-tw",
		// 	"longitude": 121.56542681,
		// 	"latitude": 25.0329636,
		// 	"address": "台灣臺北市信義區西村里8鄰信義路五段7號",
			"longitude": 121.5607264,
			"latitude": 25.0847327,
			"address": "台灣臺北市內湖區內湖路一段77-3號",
			"memo": "",
			"mobile_info": ""
		}))
	},function(error, response, body){
		console.log("1");
		if(error){ 
			res.render('index', { ans: JSON.stringify(error) });
			return;
		}
		try{
			console.log("2");
			console.log(response);
			console.log(body);
			console.log(error);
			res.render('index', { ans: JSON.stringify(body) });
			return ;
			/*var data = parser.xml2json(body);
			if(data.FunctionExecResult.IsSuccess){
				card.key = data.FunctionExecResult.ReturnObject["_@ttribute"];
				card.account = person.Account;
				card.latitude = position.lat_base + Math.floor((Math.random() * position.lat_offset + position.lat_more));
				card.longitude = position.long_base + Math.floor((Math.random() * position.long_offset) + position.long_more);
			}
			resolve({
				IsSuccess: true,
				msg: ''
			});*/
		}catch(e){
			console.log("3");
			res.render('index', { ans: JSON.stringify(e) });
			return ;
			/*console.log('打卡失敗(登入)->', person.Name, e.toString());
			resolve({
				IsSuccess: false,
				msg: person.Name + ' -> 打卡失敗(登入)'
			});*/
		}
	});

  
});

module.exports = router;

function GetUrlEncodeJson(data) {
    var str = '';
    if (data != "" && typeof data != "undefined") {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            var dataName = keys[i];
            if (data.hasOwnProperty(dataName)) {
                str += (i == 0) ? "" : "&";
                str += dataName + "=" + data[dataName];
            }
        }
    }
	console.log(data);
    return str;
}