var client = require('cheerio-httpcli');
var parse = require('csv-parse'); // csvパーサ

// スクレイピング対象
var stockArray = [""];

var coopCode = stockArray[0];

// スクレイピングURL
var url = `http://k-db.com/stocks/${coopCode}`;

// downloadクエリcsv形式で取得
client.fetch(url, { download: 'csv' }, function (err, $, res) {
  if(err) console.log('${err}');

  parse(res.body, {}, function(err, output){

    // 結果のcsv配列からデータを取り出す
    for (var value of output) {
      let dateStr = value[0]; // 日時
      let startVal = value[1];// 始値
      let highVal = value[2]; // 高値
      let lowestVal = value[3]; // 安値
      let endVal = value[4];  // 終値
      let volume = value[6];  // 出来高

      let explain = `${dateStr}における始値は${startVal}、また終値は${endVal}となりました。
      ${lowestVal}円まで売られ、${highVal}円まで買われました。出来高は${volume}です。`

      console.log(explain);
    }
  });
});
