import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';


    function App() {

        const router = useRouter()
        const [userName,setUserName] = useState("");
        const [title,setTitle] = useState("");
        const [text,setText] = useState("");

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "title": title,
                "description": text
                });

               
                var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

        const URL="http://localhost:3002/api/insert";
        const fetchApi=async ()=>{
            try {
                const response = await fetch(URL, requestOptions);
                const result = await response.text();
                console.log(result);
                if(response){
                    alert('¡La insercion se completó con éxito!');
                    router.push("/tutorial/tutorial");
                    }  
            } catch (error) {
                console.log('error', error);
                alert('¡Hubo un error al realizar la operación!');
            }
           
        }

        return(
            <div className="CreatePost">
            <div className="uploadPost">
            
                <label>Title: </label>
                <input type="text" onChange={(e)=>{setTitle(e.target.value)}}/>
                <label>Description</label>
                <textarea onChange={(e)=>{setText(e.target.value)}}
                ></textarea>    
                <button onClick={fetchApi}>Submit Post</button>
            </div>
        </div>
            )
}

export default App;