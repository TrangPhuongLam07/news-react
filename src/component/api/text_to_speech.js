import  {useEffect,useState} from "react";
import React from "react";
import {memo} from "react";

const Text_to_speech = (text = "Không sao mà",setText) => {
    const [data,setData] = useState(null)
     let  myText = (text.text.toString() +"");
    myText = myText.length > 4000 ? myText.substring(0,4000) : myText;
    console.log(typeof myText);
    console.log(myText);
    useEffect(() =>{
         fetch('https://api.fpt.ai/hmi/tts/v5', { method: 'POST',body:myText,headers:{
              'api-key': '0TENgTy3rR2NZbU7jiw5nkNXVPO5Ol10',
              'speed': '',
              'voice': 'banmai'
          } }).then(data => data.json()).then(json => setData(JSON.stringify(json)))
  },[])
     console.log("render");
    if(data !=null){
        console.log(JSON.parse(data).async)
    }
   return (

       <div>
           {data !== null &&
               <div >
                   <audio controls className={"container"}>
                       <source src={JSON.parse(data).async}/>
                   </audio>
               </div>
           }
       </div>
   );

}
export default  memo(Text_to_speech);