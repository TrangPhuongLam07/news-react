import  {useEffect,useState} from "react";
import React from "react";
import {memo} from "react";

const Text_to_speech = (text = "Không sao mà",setText) => {
    const [data,setData] = useState(null)
     let  myText = (text.text.toString() +"");

    //Kiểm tra props text vào nếu hơn 1000 kí tu thì chỉ lấy 1000 kí tự vì API k convert được nhiều hơn
    myText = myText.length > 1000 ? myText.substring(0,1000) : myText;
    console.log(typeof myText);
    console.log(myText);

    //Call API để lấy file mp3
    useEffect(() =>{
         fetch('https://api.fpt.ai/hmi/tts/v5', { method: 'POST',body:myText,headers:{
              'api-key': 'uyoA95zktIsavzZYPsg7T4v1nVTCKswC',
              'speed': '',
              'voice': 'banmai'
          } }).then(data => data.json()).then(json => setData(JSON.stringify(json)))
  },[])

     console.log("render-api");
    if(data !=null){
        console.log(JSON.parse(data).async)
    }
    //Return về 1 componenet
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