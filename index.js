var express = require("express");
var app = express();
var bodyParser = require("body-parser");
const TelegramBot = require('node-telegram-bot-api');
// require("dotenv").config();
const axios = require("axios");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

const bot = new TelegramBot( "734939750:AAELho-kg2_yOKy_-RQp8hE931NF9EuRCPo", {polling: true});

bot.on('message', (msg) => {
    console.log("hi in msg", msg.chat.id)
    bot.sendMessage(msg.chat.id, 'Welcome bprusty');
  });
let telegram_url = "https://api.telegram.org/bot" + "734939750:AAELho-kg2_yOKy_-RQp8hE931NF9EuRCPo" +"/sendMessage";

app.post("/start_bot", function(req, res) {
    console.log("inside post");
    const { message } = req.body;
    let reply = "A warm welcome";
    sendMessage(telegram_url,message,reply,res);
});

app.get("/getMe", function(req, res){
    axios.get("https://api.telegram.org/bot" + "734939750:AAELho-kg2_yOKy_-RQp8hE931NF9EuRCPo" +"/getMe").then(response => {
        console.log(response.data);
        res.end("ok");
    }).catch(error =>{
        console.log(error);
    });
});

app.get("/getUpdates", function(req, res){
    axios.get("https://api.telegram.org/bot" + "734939750:AAELho-kg2_yOKy_-RQp8hE931NF9EuRCPo" +"/getUpdates").then(response => {
        console.log(response.data);
        res.end("ok");
    }).catch(error =>{
        console.log(error);
    });
});
function sendMessage(url, message,reply,res){
    console.log(message);
    axios.post(url, { chat_id: "594304120",
    text: reply
    }).then(response => {
        console.log("Message posted");
        res.end("ok");
    }).catch(error =>{
        console.log(error);
    });
}
app.listen(3000, () => console.log("Telegram bot is listening on port 3000!"));