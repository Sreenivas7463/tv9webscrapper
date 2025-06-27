const PORT = 8000
const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())

var x = require('x-ray')()



const url = 'https://tv9telugu.com/andhra-pradesh/'
const ent_url= 'https://tv9telugu.com/pagecategory/taxonomies-loadmore?ppp=24&intTermId=15567'
const tech_url = 'https://tv9telugu.com/pagecategory/taxonomies-loadmore?ppp=24&intTermId=23656'



//----------------------------------------------------------------news 18 ----------------------------------------------------------------
const news18m = 'https://telugu.news18.com/news'

const news18 = 'https://telugu.news18.com/news/'
const news18base = 'https://telugu.news18.com'
//----------------------------------------------------------------news 18 ----------------------------------------------------------------

//----------------------------------------------------------------news ABN ----------------------------------------------------------------

const abn = 'http://www.andhrajyothy.com/pages/latest-news'

const abnpg = 'http://www.andhrajyothy.com/pages/latest-news?page='

// ----------------------------------------------------------------end news ABN ----------------------------------------------------------------
const zipcodes1 = [90019, 90020, 90021, 90022, 90023, 90024, 90025, 90026]


zipcodes1.forEach(element => {
  
app.get('/yelp1', function(req, res) {
    var start = +new Date();
    var stream = x('https://www.yelp.com/search?find_desc=Restaurants&find_loc='+element, 'main#main-content').stream()
    stream.pipe(res)
    var end = +new Date();
    console.log("all users saved in " + (end-start) + " milliseconds");
  })
  
});


const zipcodes = [90019, 90020]


zipcodes.forEach(element => {

const yelplist = 'https://www.yelp.com/search?find_desc=Restaurants&find_loc='+element


app.get('/yelplistrestaurants', function (req, res) {
    axios(yelplist)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []
        console.log(html)
        $('.undefined list__09f24__ynIEd', html).each(function () {
            
            const title = $(this).find('div > div > div > div.arrange-unit__09f24__rqHTg.arrange-unit-fill__09f24__CUubG.border-color--default__09f24__NPAKY > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div').text()
       
            const link = 'https://www.yelp.com'+$(this).find('div > div > div > div.arrange-unit__09f24__rqHTg.arrange-unit-fill__09f24__CUubG.border-color--default__09f24__NPAKY > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div > div > h3 > span > a').attr('href')
       

            
            //const url = yelp
             // const img = $(this).find('.recipe-image').attr('style')
            
             if(title !='')
             {
             articles.push({
                 title,
                 link
                 //img
             })
             }
             
        })
        
        res.json(articles)
    }).catch(err => console.log(err))

})

});




const yelp = 'https://www.yelp.com/biz/smashburger-san-francisco-2/'

app.get('/yelp', function (req, res) {
    axios(yelp)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        
         $('.background-color--white__09f24__ulvSM', html).each(function () {
            
            const web = $(this).find('.css-1um3nx').text()
            const mobile =  $(this).find('.css-1p9ibgf').text()
            const addr = $(this).find('.css-qyp8bo').text()
            
            const url = yelp
             // const img = $(this).find('.recipe-image').attr('style')
            
             if(web !='' && mobile!='' && addr !='')
             {
             articles.push({
                 web,
                 mobile,
                 addr,
                 url,
                 //img
             })
             }
             
        })
        var i=0;
        $('.border-color--default__09f24__NPAKY', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('h1').text()
           // const url = $(this).find('a').attr('href')
            // const img = $(this).find('.recipe-image').attr('style')
            
            if(title !='' && i==0)
             {
            articles.push({
                title
                //url,
                //img
            })
            i++;
        }
        })
        res.json(articles)
    }).catch(err => console.log(err))

})


const yelpurl = 'https://www.yelp.com/biz/'

app.get('/yelp/:id', (req, res) => {
    let string = req.params.id
    axios(yelpurl+string)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []


       

        $('.background-color--white__09f24__ulvSM', html).each(function () {
            
            const web = $(this).find('.css-1um3nx').text()
            const mobile =  $(this).find('.css-1p9ibgf').text()
            const addr = $(this).find('.css-qyp8bo').text()
            const ipaddress = req.socket.remoteAddress
            
            const url = yelp
             // const img = $(this).find('.recipe-image').attr('style')
            
             if(web !='' && mobile!='' && addr !='')
             {
             articles.push({
                 web,
                 mobile,
                 addr,
                 ipaddress,
                 url,
                 //img
             })
             }
             
        })

        var j=0
        $('.border-color--default__09f24__NPAKY', html).each(function () {
           
            const timing = $(this).find('table').text()
            if(timing!='' && j==0){
            articles.push({
                timing
            })
            j++;
        }
     
        })


        var i=0;
        $('.border-color--default__09f24__NPAKY', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('h1').text()
           // const url = $(this).find('a').attr('href')
            // const img = $(this).find('.recipe-image').attr('style')
            
            if(title !='' && i==0)
             {
            articles.push({
                title
                //url,
                //img
            })
            i++;
        }
        })
        res.json(articles)
    }).catch(err => console.log(err))

})



const vismai = 'https://vismaifood.com/te'

app.get('/vismai', function (req, res) {
    axios(vismai)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('.recipe-item', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('a').attr('title')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('.recipe-image').attr('style')
            articles.push({
                title,
                url,
                img
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))

})


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

        $('figure', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('alt')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
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
    axios(ent_url+`&pageNumber=${pageNo}`)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('figure', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('alt')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
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

        $('figure', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('alt')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
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

        $('figure', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('alt')
            const url = $(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
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

// ABN article FETCH--

app.get('/abn', function (req, res) {
    axios(abn)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('tr', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('title')
            const url = news18base+$(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
            articles.push({
                title,
                url,
                img
            })
        })
        res.json(articles)
    }).catch(err => console.log(err))

})

app.get('/abnpg/:id', function (req, res) {
    let pageNo = req.params.id
    axios(abnpg+`${pageNo}`)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)
        const articles = []

        $('tr', html).each(function () { //<-- cannot be a function expression
            const title = $(this).find('img').attr('title')
            const url = news18base+$(this).find('a').attr('href')
            const img = $(this).find('img').attr('src')
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

