require('dotenv').config();
const fs = require('fs');

var request = require("request")
const Slimbot = require('slimbot');
const slimbot = new Slimbot(process.env['BOT_TOKEN']);

var url = "https://tocerto.herokuapp.com/news.json"
var news_kb = []

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      news = body
      console.log('Count of news items retrieved:', news.length)

      var inline_kb = []
      news.forEach(function(el, index) {
	    	// console.log(el.headline, 'noticia'+index)
	    	// console.log(news_keys[index])

	    	item = {
	    		text: el.headline,
	    		callback_data: 'news_item_'+index
	    	}

	    	news_kb.push(item);
  	  })
    }
})

// Register listener
slimbot.on('message', message => {
  slimbot.sendMessage(message.chat.id, 'Já sei, tem um mané falando 💩!');

  var keyboard = []
  news_kb.forEach(function(el, index) {
  	keyboard.push([el]);
  });
	keyboard.push([
    { text: 'Outra Coisa...', callback_data: 'outra' }
  ]);

  // define inline keyboard to send to user
  let optionalParams = {
    parse_mode: 'Markdown',
    reply_markup: JSON.stringify({
      inline_keyboard: keyboard
    })
  };
  // reply when user sends a message, and send him our inline keyboard as well
  slimbot.sendMessage(message.chat.id, 'É uma dessas?', optionalParams);
});

// Because each inline keyboard button has callback data, you can listen for the callback data and do something with them

slimbot.on('callback_query', query => {
	index = query.data.match(/\d+/g); 

	if (index){
		news_item = news[index]
		headline = news_item.headline;
		// console.log(news_item);
	}
	verdicts = ["true", "false", "opinion", "uncheckable"]

	checkAnswer = function(index, selection){
		if (selection === news[index].verdict_id){
			slimbot.sendMessage(query.message.chat.id, "É, dessa vez você sabia o que estava falando, "+query.from.first_name, { parse_mode: "HTML" });

			// let fileUpload = fs.createReadStream(__dirname + '/victory.gif');
			//  slimbot.sendDocument(query.message.chat.id, fileUpload).then(message => {
			//     console.log(message.result);
			//  });	

		  slimbot.sendDocument(query.message.chat.id, 'CgADAQADKAADE7RhRtv0HT7eUf0nAg').then(message => {});	
		}
		else {
			slimbot.sendMessage(query.message.chat.id, "Errou feio! Você é um 💩. Ainda bem que vc não repassou esse 🤢, né?", { parse_mode: "HTML" });
	
			// let fileUpload = fs.createReadStream(__dirname + '/loser.gif');
		  slimbot.sendDocument(query.message.chat.id, 'CgADAQADKQADE7RhRoBKy0qTeKwLAg').then(message => {});	
		}
	}

  if (query.data.includes("news_item_")){

		let optionalParams = {
	    parse_mode: 'Markdown',
	    reply_markup: JSON.stringify({
	      inline_keyboard: [
	      	[
		        { text: 'É verdade! ✅', callback_data: 'verdict_true_'+index },
		        { text: 'É Mentira! ❌', callback_data: 'verdict_false_'+index }
		      ],	      	
		      [
		        { text: 'Isso é apenas uma opinião 🗣', callback_data: 'verdict_opinion_'+index }
		      ],
		      [
		        { text: 'Isso não é verificável 📵', callback_data: 'verdict_uncheckable_'+index }
		      ],
	      	[
		        { text: 'Não é essa notícia!', callback_data: 'wrong_news' },
	      	]
    	]})
	  };

  	slimbot.sendMessage(query.message.chat.id, `Sobre a notícia "${headline}", o que vc acha?`, optionalParams);
	}
	else if (query.data === "wrong_news"){
  	slimbot.sendMessage(query.message.chat.id, "Cara, vc que deve ter errado! Eu <i>sempre</i> acerto! 😝", { parse_mode: "HTML" }).then(message => {
  		slimbot.sendMessage(query.message.chat.id, "Recomeçe com /start");
  	});
	}
	else if (query.data.includes("verdict_")){
		var selection;

		if (query.data.includes("_true_")){
	    slimbot.sendMessage(query.message.chat.id, query.from.first_name+', você acha que isso é ✅verdade então... Vamos ver! 🕵').then(message => checkAnswer(index, 1));
		}
		else if (query.data.includes("_false_")){
	    slimbot.sendMessage(query.message.chat.id, query.from.first_name+', você acha que isso é ❌mentira 😱... será?!').then(message => checkAnswer(index, 2));
		}
		else if (query.data.includes("_opinion_")){
	    slimbot.sendMessage(query.message.chat.id, query.from.first_name+', você acha que isso é só uma opinião 🗣... hmmm...').then(message => checkAnswer(index, 3));
		}
		else if (query.data.includes("_uncheckable_")){
	    slimbot.sendMessage(query.message.chat.id, query.from.first_name+', você acha que isso é não-verificável 📵... Nos dias de hoje? Será?').then(message => checkAnswer(index, 4));
		}
	}
});

// Call API
slimbot.startPolling();
