const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

const url = 'https://tv9telugu.com/andhra-pradesh/'
const ent_url= 'https://tv9telugu.com/entertainment/'
const tech_url = 'https://tv9telugu.com/technology/'

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

app.get('/entertainment', function (req, res) {
    axios(ent_url)
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

app.get('/entertainment/:id', function (req, res) {
    let pageNo = req.params.id
    axios(ent_url+`/${pageNo}`)
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

app.get('/technology', function (req, res) {
    axios(tech_url)
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

app.get('/technology/:id', function (req, res) {
    let pageNo = req.params.id
    axios(tech_url+`/${pageNo}`)
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

