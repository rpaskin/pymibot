require('dotenv').config();

if (!process.env.BOT_TOKEN) {
	process.env.BOT_TOKEN = "MYTOKEN"
}

var request = require("request")

var url = "https://tocerto.herokuapp.com/news.json"
var news = []
var news_keys = []
var news_keyboard
var markup_keyboard

const Telegraf = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')

// const keyboard = Markup.inlineKeyboard([
//   Markup.urlButton('❤️', 'http://telegraf.js.org'),
//   Markup.callbackButton('Delete', 'delete')
// ])

const bot = new Telegraf(process.env.BOT_TOKEN)

request({
    url: url,
    json: true
}, function (error, response, body) {

    if (!error && response.statusCode === 200) {
      // console.log(body) // Print the json response
      news = body
      console.log('Count of news items retrieved:', news.length)

      var inline_kb = []
      news.forEach(function(el, index) {

      	inline_kb.push(Markup.callbackButton(el.headline, 'noticia'))

	    	news_keys.push([Markup.callbackButton(el.headline, 'noticia')])
	    	// console.log(el.headline, 'noticia'+index)
	    	// console.log(news_keys[index])
  	  })


		markup_keyboard = Extra
		  .HTML()
		  .markup((m) => m.inlineKeyboard(inline_kb, {columns: 1}))

      news_keyboard = Markup.inlineKeyboard(news_keys)
    }
})

// const invoice = {
//   provider_token: process.env.PROVIDER_TOKEN,
//   start_parameter: 'Aposta $5',
//   title: 'Aposta',
//   description: 'Se você estiver certo vai doar...',
//   currency: 'usd',
//   photo_url: 'https://img.clipartfest.com/5a7f4b14461d1ab2caaa656bcee42aeb_future-me-fredo-and-pidjin-the-webcomic-time-travel-cartoon_390-240.png',
//   is_flexible: true,
//   prices: [
//     { label: 'Aposta de $5', amount: 5 }
//   ],
//   payload: {
//     coupon: 'NONE'
//   }
// }

// const shippingOptions = [
//   {
//     id: 'unicorn',
//     title: 'Unicorn express',
//     prices: [{ label: 'Unicorn', amount: 1 }]
//   },
//   {
//     id: 'slowpoke',
//     title: 'Slowpoke mail',
//     prices: [{ label: 'Slowpoke', amount: 0 }]
//   }
// ]

// const replyOptions = Markup.inlineKeyboard([
//   Markup.payButton('💸 Buy'),
//   Markup.urlButton('❤️', 'http://telegraf.js.org')
// ]).extra()

bot.start((ctx) => {
	ctx.reply('Já sei, um mané está errado!')
	ctx.reply('Sobre o que ele/ela está falando 💩?')
})

// bot.command('/buy', ({ replyWithInvoice }) => replyWithInvoice(invoice, replyOptions))

bot.help((ctx) => ctx.reply('Help message'))

bot.on('message', (ctx) => {

	if (ctx.message.text.toLowerCase() == "apostar"){
		ctx.reply('Então convide para um grupo comigo que a gente resolve! 😎')
		ctx.reply('Quanto você quer apostar que ele/ ela está errado/a?')
	}
	else if (parseInt(ctx.message.text) > 0){
		ctx.reply('Ok, vamos apostar R$'+ctx.message.text)
	}
	else if (ctx.message.text.toLowerCase() == "ok") {
		ctx.reply('Vamos reservar esse dinheiro agora... 💵')
	}
	else {
		// ctx.reply('Esses são os assuntos do momento:')
		// ctx.reply(Extra.markup(news_keyboard))
		ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(news_keyboard))
	}
})


// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi')
//     ])))
// })

// bot.action('delete', ({ deleteMessage }) => deleteMessage())

bot.startPolling()
