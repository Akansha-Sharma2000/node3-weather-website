const request=require('request')

// const forecast=(latitude,longitude,callback)=>{

//     url='https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude+ '&lon='+ longitude+ '&exclude=hourly,daily&appid=a3b67c34b0fb30d6b3375821a9b5e194&units=metric'
//     request({url:url , json:true} , (error,response)=>{
//       if(error){
//         callback('Unable to connect to weather service.',undefined)
//       }
//       else if(response.body.message){
//         callback('Unable to find information.', undefined)
//       }
//       else{
//         callback(undefined,{
//           Description:response.body.current.weather[0].description,
//           Temp:response.body.current.temp,
//           Clouds:response.body.current.clouds
//         })
//       }
//     })
//   }
 
//COMMENT->****Changing the above forecast using short hand syntax and object destructuring.

const forecast=(latitude,longitude,callback)=>{

      url='https://api.openweathermap.org/data/2.5/onecall?lat='+ latitude+ '&lon='+ longitude+ '&exclude=hourly,daily&appid=a3b67c34b0fb30d6b3375821a9b5e194&units=metric'
      request({url , json:true} , (error,{body})=>{
        if(error){
          callback('Unable to connect to weather service.',undefined)
        }
        else if(body.message){
          callback('Unable to find information.', undefined)
        }
        else{
          callback(undefined, body.current.weather[0].main + ', ' + body.current.weather[0].description + '. It is currently ' + body.current.temp + ' degrees out. There is a ' + body.current.clouds + "% chance of rain.")
        }
      })
    }


  module.exports=forecast