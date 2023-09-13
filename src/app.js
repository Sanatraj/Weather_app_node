const express=require('express')
const path=require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const dirPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(dirPath))

app.get('',(req,res)=>{ 
    res.render('index',{
        title:'Weather',
        name:"Sanat",
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:"About Page",
        name:"Sanat"
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title:"Help Page",
        name:"Sanat"
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"No address was provided"
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:'Sanat',
        errorMessage:'Help Page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:"404",
        name:'Sanat',
        errorMessage:'Page Not Found'
    })
})

app.listen('3000',()=>{
    console.log('Application launched!!')
})
