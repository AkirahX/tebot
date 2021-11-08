const { Telegraf } = require('telegraf')
const axios = require('axios')
const reverseImageSearch = require('reverse-image-search-google')
const uploadImage = require('./lib/uploadImage')

const bot = new Telegraf('2128809887:AAFYQL8ePNvPObWDYiSr4_Ar-YTHIM4DpJ0')

const doSomething = (results) => {
    console.log(results)
}

bot.start((ctx) => ctx.reply('Olá, sou conhecida como Loli Sovietic, tenho muitas útilidades, confira nosso /menu.'))


bot.command('anime', (ctx) => {
    let anime = ctx.message.text.split(' ')
    axios.get('https://api.jikan.moe/v3/search/anime?q=' + anime[1])
    .then(function (res) {
        // handle success
        let info = res.data.results[0]

        let msg = `
Nome: ${info.title}\n
Episódios: ${info.episodes}\n
Lançamento: ${info.start_date}\n
Encerramento: ${info.end_date}\n
Exibição: ${info.type}\n
Score: ${info.score}\n
Avaliação: ${info.rated}\n
Membros: ${info.members}\n
Link: ${info.url}\n
Sinopse: ${info.synopsis}\n
        `
        ctx.replyWithPhoto({
            url: info.image_url,
            filename: 'anime.jpg',
        }, {caption: msg})
    })
    .catch(function (error) {
        // handle error
        console.log(error);
    })
    .then(function () {
        
    });

})
bot.command('menu', (ctx) => {
    ctx.reply('Nosso humilde menu, um dia nos chega lá: \n /anime')
})


bot.launch()