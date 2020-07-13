const request=require('request')

// const geocode= (address,callback) =>{
//     const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?types=address&access_token=pk.eyJ1IjoibWVldGhpMjUiLCJhIjoiY2tjNXYxMTA0MGlqdzJ3cXN6b3dsOGdieSJ9.cvPLkZwi_T3sFmycIo1xhg&limit=1'
    
//     request({url:url , json:true}, (error,response)=>{
//       if(error){
//        callback('Unable to connect to weather service.',undefined)
//       }
//       else if(response.body.features.length===0){
//        callback('Unable to find information.',undefined)
//       }
//       else{
//         callback(undefined,{
//           latitude:response.body.features[0].center[1],
//           longitude:response.body.features[0].center[0],
//           place:response.body.features[0].place_name
//         })
//       }
//     })
//    }

//COMMENT->****Changing the above geocode using short hand syntax and object destructuring.

const geocode= (address,callback) =>{
      const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoibWVldGhpMjUiLCJhIjoiY2tjNXYxMTA0MGlqdzJ3cXN6b3dsOGdieSJ9.cvPLkZwi_T3sFmycIo1xhg&limit=1'
      
      request({url , json:true}, (error,{body})=>{
        if(error){
         callback('Unable to connect to weather service.',undefined)
        }
        else if(body.features.length===0){
         callback('Unable to find information.',undefined)
        }
        else{
          callback(undefined,{
            latitude:body.features[0].center[1],
            longitude:body.features[0].center[0],
            location:body.features[0].place_name
          })
        }
      })
     }



   module.exports=geocode