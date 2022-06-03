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

//----------------------------------------------------------------news 18 ----------------------------------------------------------------
const news18m = 'https://telugu.news18.com/news'

const news18 = 'https://telugu.news18.com/news/'
const news18base = 'https://telugu.news18.com'
//----------------------------------------------------------------news 18 ----------------------------------------------------------------

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

// news18 fetch articles

app.get('/news18home', function (req, res) {
    axios(news18m)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.blog-list-blog', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('title')
            const url = news18base+$(this).find('a').attr('href')
            const img = $(this).find('img').attr('data-original')
            articles.push({
                title,
                url,
                img
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))

})

app.get('/news18', function (req, res) {
    axios(news18)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.blog_list_row', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('title')
            const url = news18base+$(this).find('a').attr('href')
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

