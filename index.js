const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://tv9telugu.com/andhra-pradesh/'

app.get('/', function (req, res) {
    axios(url)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.imgCont', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('alt')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('data-src')
            articles.push({
                title,
                url,
                img
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))

})

app.get('/results/:id', (req, res) => {
    let pageNo = req.params.id
    axios(url+`/${pageNo}`)
        .then(response => {
            const html = response.data
            const $ = cheerio.load(html)
            const articles = []

            $('.imgCont', html).each(function () { //<-- cannot be a function expression
                const title = $(this).find('img').attr('alt')
                const url = $(this).find('a').attr('href')
                const img = $(this).find('img').attr('data-src')
                articles.push({
                    title,
                    url,
                    img
                })
            })
            res.json(articles)
        }).catch(err => console.log(err))

})


app.listen(PORT, () => console.log(`server running on PORT ${PORT}`))

