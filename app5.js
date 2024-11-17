const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});


const path = require('path');
// 静的ファイルを提供する（janken.htmlを含む）
app.use(express.static(path.join(__dirname, 'public')));
// 最初のルートでjanken.htmlを返す
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'janken.html'));
});
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win )||0;
  let total = Number( req.query.total )||0;
  console.log( {hand, win, total});  
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';

  // ここに勝敗の判定を入れる
  let judgement = '';
  if(hand==cpu){
  judgement='引き分け';
  }else if(
  (hand=='グー'&&cpu=='チョキ')||
  (hand=='チョキ'&&cpu=='パー')||
  (hand=='パー'&&cpu=='グー')
  ) {
  judgement='勝ち';
  win += 1;
  } else {
  judgement='負け';
  }
  total += 1;

  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

//
//


let targetNumber = Math.floor(Math.random() * 100 + 1); // 1から100までのランダム数字
let guesscount = 0;
let history = [];
// 数当てゲームのルート
app.get('/guess', (req, res) => {
  const guess = Number(req.query.guess); 
  guesscount += 1; 
  history.push(guess);
  console.log( {guesscount, history}); 
  let message = '';
  if (guess < targetNumber) {
    message = 'もっと大きいです';
  } else if (guess > targetNumber) {
    message = 'もっと小さいです';
  } else {
    message = `正解です！${guesscount}回目で当たりました！`;
    // ゲームをリセット
    targetNumber = Math.floor(Math.random() * 100 + 1);
    guesscount = 0;
    history = [];
  }
  res.render('number_guess', { guess, message, guesscount, history });
});

//
//


app.get("/highlow", (req, res) => {
  let choice = req.query.choice;  
  let win = Number(req.query.win) || 0;
  let total = Number(req.query.total) || 0;
  let total2 = total > 0 ? total - 1 : 0;
  console.log({ choice, win, total ,total2});
  // ランダムな数値（1～13）を生成
  const cpuNum = Math.floor(Math.random() * 13) + 1;
  const playerNum = Math.floor(Math.random() * 13) + 1;
  // 判定ロジック
  let judgement = '';
  if ((choice === 'High' && playerNum > cpuNum) || 
      (choice === 'Low' && playerNum < cpuNum)) {
    judgement = '勝ち';
    win += 1;
  } else if (playerNum === cpuNum) {
    judgement = '引き分け';
  } else {
    judgement = '負け';
  }
  total += 1;
  total2 += 1;
  // 表示データ
  const display = {
    yourNum: playerNum,
    cpuNum: cpuNum,
    choice: choice,
    judgement: judgement,
    win: win,
    total: total,
    total2 : total2
  };
  res.render('highlow', display);
});


app.listen(8080, () => console.log("Example app listening on port 8080!"));
