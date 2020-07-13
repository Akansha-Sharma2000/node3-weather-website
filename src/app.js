//I by mistake we removed node modules folder we can regain it by typing npm install in the terminal.
const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

const app=express()
const port=process.env.PORT || 3000

//Defining paths for express configuration.
const publicDirectoryPath= path.join(__dirname, '../public')
const viewsPath=path.join(__dirname, '../templates/views')
const partialsPath=path.join(__dirname, '../templates/partials')


//Setting handlebars engine and views location.
app.set('view engine', 'hbs');  //hbs is a express plugin.It is used to create dynamic templates.(hb-handle bars, see in npm modules)
app.set('views' , viewsPath)
hbs.registerPartials(partialsPath)


//Setup for static directories to server.
app.use(express.static(publicDirectoryPath))



app.get('', (req,res) =>{
    res.render('index', {
        title:'Weather', //These object key-value pairs which are passed to hbs and are provided as the second argument in render. 
        name:'Akansha'
    })                   //render allows us to render one of our views.i.e we can render our hbs templates.Express goes into views folder and 
                         //search for the template converts it into html and gets it back to the requester.                                           
})

app.get('/about', (req,res)=> {
    res.render('about', {
        title:'About me',
        name:'Akansha'
    })
})

app.get('/help', (req,res) =>{
    res.render('help', {
        Helptext:'This is some helpful text.',
        title:'Help',
        name:'Akansha'
    })
})

app.get('/weather', (req,res) =>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) =>{ //Here we provided an empty object so that is someone puts 
                                             //something in address that doesn't return a value we will get the same error message as ann object
                                             //otherwise our site will crash.eg if we put address=!.This empty object makes the values of all the
                                             //parameters i.e latitude, longitude and location undefined but it won't matter because in that case 
                                             //only error occurs and it will print the error message.  
        if(error){
            return res.send({error})
        }

        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location,
                address:req.query.address
            })

        })
    })
    // res.send({
    //     forecast:'50 degress',
    //     location:'India',
    //     address:req.query.address
    // })
})

app.get('/products', (req,res) =>{
    if(!req.query.search){      //This query selector selects the key from key=value pair from the url after ? and after a dot we provide a key
                                //that we want to grab.Like here we placed search.It can be anything like address,weather etc. 
       return res.send({
            error:'You must provide a search term.'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) =>{
    res.render('error',{
        title:'404',
        Errortext:'Help article not found',
        name:'Akansha'
    })
})

app.get('*', (req,res) =>{ //This * helps us to catch all the pages except for the above pages defined.
    res.render('error',{
        title:'404',
        Errortext:'My 404 page!',
        name:'Akansha'
    })
})

app.listen(port, ()=>{
    console.log('Server is up on port ' + port)
})