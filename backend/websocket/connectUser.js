 
 const cookie=require('cookie');
 const jwt=require('jsonwebtoken')
 const key=require('../router/secretkey')
 async function ConnectUser({ connection, request, rooms }) {
    console.log('writing headers');
   /* try{
        const cookies=cookie.parse(request.headers.cookie);
        try{
            const identity=jwt.verify(cookies.auth_token,key).username;
            console.log(identity);
            if(!rooms.has(identity)){
                rooms.set(identity,[connection]);
            }
            

            connection.on('message',handlemessage(message))

            connection.on('close',handleclose());

            
        }
        catch(err){
            console.log('error verfying user');
        }
        
    }
    catch(err){
        console.log(err);
    }*/


  }

module.exports={ConnectUser}