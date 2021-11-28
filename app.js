//使用require載入express
const express = require('express')
const app = express()
const port = 3000

//透過變數將資料載入
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurants.json')

//建立樣板引擎
app.engine('handlebars', exphbs({defaultLayout:'main'}))
app.set('view engine', 'handlebars')

//設定靜態檔案
app.use(express.static('public'))

//設定路由
app.get('/', (req, res) => {
  res.render('index',{restaurants:restaurantList.results});
})

app.get('/restaurants/:restaurant_id', (req,res) => {
  const restaurant = restaurantList.results.find(restaurant => restaurant.id.toString()===req.params.restaurant_id)
  res.render('show',{restaurant:restaurant})
})

app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  //依據關鍵字，形成新陣列回傳
  const searchRestaurants = restaurantList.results.filter((restaurant) =>{
    return restaurant.name.toLowerCase().includes(keyword.toLowerCase()) || restaurant.category.includes(keyword)
  }) 
  res.render('index', {restaurants:searchRestaurants})
})


//啟動並監聽伺服器
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})
