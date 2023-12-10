import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

    function App() {
                const router=useRouter()
                const idupdate=router.query;
                console.log(idupdate);
                
                const [published2,setPublished] = useState("");
                const [title2,setTitle] = useState("");
                const [description2,setdescription] = useState("");
                const [id2,setid] = useState("");

                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");

                var raw = JSON.stringify({
                "id": id2,
                "title": title2,
                "description": description2
                });

               
                var requestOptions = {
                method: 'PUT',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

        const URL="http://localhost:3002/api/update";
        const fetchApi=async ()=>{
            try {
                const response = await fetch(URL, requestOptions);
                const result = await response.text();
                if(response){
                    alert('¡Se actualizo con éxito!');
                    router.push("/tutorial/tutorial");
                    }
            } catch (error) {
                console.log('error', error);
                alert('¡Hubo un error al realizar la operación!');
            }
           
        }

        const URL2=`http://localhost:3002/api/reading/${idupdate.update}`;
        const fetchApi2=async ()=>{
            const response=await fetch(URL2)
           const responseJSON= await response.json()
            setid(responseJSON[0].id)
            setTitle(responseJSON[0].title)
            setdescription(responseJSON[0].description)
            setPublished(responseJSON[0].published)
            console.log(responseJSON);
            console.log('Reading one..');
        }
        useEffect(()=>{
            fetchApi2()
        },[])
        return(
            <div className="CreatePost">
            <div className="uploadPost">
                <label>Title: {id2} </label>
                <input type="text" value={title2} onChange={(e)=>{setTitle(e.target.value)}}/>
                <label>Descripcion</label>
                <textarea  value={ description2} onChange={(e)=>{setdescription(e.target.value)}}></textarea>    
                <button onClick={fetchApi}>Submit Post</button>
            </div>
        </div>
            )
}

export default App;