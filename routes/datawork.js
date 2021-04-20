var assert = require('assert');
var { v4: uuidv4 } = require('uuid');

var express = require('express');
var router = express.Router();

//DB 조작
var MongoClient = require('mongodb').MongoClient;
// url 형식 --> mongodb://(아이디:비밀번호@)도메인주소:포트번호(27017)/데이터베이스이름
var url = 'mongodb://localhost:27017/';
var dbName = 'GoldenDice';
var collectionName = 'events'
var database;
var collection;

//--connect--
MongoClient.connect(url, function(err, client) {
  console.log("MongoDB 연결 성공");
  database = client.db(dbName);
  collection = database.collection(collectionName);
  if (err) {
    console.log("MongoClient connection error : " + err);
  }
});

router.post('/ajax_save', function(req, res, next) {
  const dicecode = uuidv4(); //dicecode
  const url = req.body.url;
  const winners = JSON.parse(req.body.winners);
  const data = JSON.parse(req.body.data);
  
  const doc = { dicecode:dicecode, url:url, winners:winners, data:data };

  collection.insertOne(doc, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
  });
  res.json({"dicecode":dicecode});
});

router.post('/ajax_search', function(req, res, next) {
  const dicecode = req.body.dicecode;
  console.log("dicecode: " + dicecode);

  collection.find({dicecode:dicecode},{projection:{_id:0}}).toArray(function(err, docs) {
    //console.log(docs[0]);
    res.json(docs[0]);
  });
  
});

router.post('/ajax_file', function(req, res, next) {
  var data = {};
  if (req.body.type === "csv") {
    console.log("- server csv file process -");
    data = CSVparse(req.body.data);
  } else if (req.body.type === "json") {
    console.log("- server json file process -");
    data = JSON.parse(req.body.data); // JSON.parse >> json 형태의 String을 객체화 시켜준다!
  }
  res.json({ data : data}); //json 통신방법으로 데이터를 클라이언트로 보낸다.
});

function CSVparse(csvText) {
  var rows = csvText.split("\n");
  var result = [];
  for (var rowIndex in rows) {
      var row = rows[rowIndex].split(",");
      if (rowIndex === "0") { var columns = row; } 
      else {
          var data = {}; // 빈 객체를 생성하고 여기에 데이터를 추가한다.
          for (var columnIndex in columns) { // 칼럼 갯수만큼 돌면서 적절한 데이터 추가하기.
              var column = columns[columnIndex];
              data[column] = row[columnIndex];
          }
          result.push(data);
      }
  }
  return result;
}


module.exports = router;
