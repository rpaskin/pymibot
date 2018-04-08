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

const keyboard = Markup.inlineKeyboard([
  Markup.urlButton('❤️', 'http://telegraf.js.org'),
  Markup.callbackButton('Delete', 'delete')
])

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

      	inline_kb.push(Markup.callbackButton(el.headline, 'noticia:'+index))

	    	news_keys.push([Markup.callbackButton(el.headline, 'noticia:'+index)])
	    	// console.log(el.headline, 'noticia'+index)
	    	// console.log(news_keys[index])
  	  })


		markup_keyboard = Extra
		  .HTML()
		  .markup((m) => m.inlineKeyboard(inline_kb, {columns: 1}))

      news_keyboard = Markup.inlineKeyboard(news_keys)
    }
})

bot.start((ctx) => {
	ctx.reply('Já sei, um otário está errado!')
	ctx.reply('Sobre o que ele/ela está falando 💩?')
})

bot.help((ctx) => ctx.reply('Help message'))

// bot.command('inline', (ctx) => {
//   return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
//     m.inlineKeyboard([
//       m.callbackButton('Coke', 'Coke'),
//       m.callbackButton('Pepsi', 'Pepsi'),
//       m.callbackButton('Pepsidjfvkjndfvnnjvnjkvnkjfd<br>kjdnvnfdkvndfk', 'Pepsidfnvkdjnvdnfndfkvnkdf')
//     ])))
// })

bot.on('noticia', (ctx) => {
	console.log(77, ctx)
	// return ctx.reply('clicou noticia:', ctx.session.value)
  // ctx.session.value = (ctx.session.value || 0) + ctx.state.amount
  // return editText(ctx)
})

bot.on('message', (ctx) => {
	ctx.reply('Esses são os assuntos do momento:')
	// ctx.reply(Extra.markup(news_keyboard))
	ctx.telegram.sendCopy(ctx.from.id, ctx.message, Extra.markup(news_keyboard))
	console.log(47)
})


bot.command('inline', (ctx) => {
  return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', Extra.HTML().markup((m) =>
    m.inlineKeyboard([
      m.callbackButton('Coke', 'Coke'),
      m.callbackButton('Pepsi', 'Pepsi')
    ])))
})

bot.action('delete', ({ deleteMessage }) => deleteMessage())
bot.startPolling()
