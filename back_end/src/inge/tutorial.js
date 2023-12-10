import React, {useState, useEffect} from 'react';
import styles from '/styles/Home.module.css';
import Link from 'next/link';



    function App() {
        const URL="http://localhost:8082/api/reading";
        const [todos, setTodos]=useState();

        const fetchApi=async ()=>{
            const response=await fetch(URL)
            const responseJSON= await response.json()
            setTodos(responseJSON)
            console.log('Reading..');
        }

        useEffect(()=>{
            fetchApi()
        },[])

        //// delete
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({
        //"id": id
        });
        var requestOptions = {
        method: 'delete',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };
        const fetchdelete=async (id)=>{
             const URLd=`http://localhost:8082/api/delete/${id}`;
            try {
                const response = await fetch(URLd, requestOptions);
                const result = await response.text();
                console.log(result);
                alert('¡La borro con éxito!');
                fetchApi()  
            } catch (error) {
                console.log('error', error);
                alert('¡Hubo un error al realizar la operación!');
            } 
        }


        return(
                <div>
                    <h3 className={styles.title}>
                    Agregar <Link href="/tutorial/tinsertar">tuto!</Link>
                    </h3>
                        <table>
                            <tr>
                                <td>id</td>
                                <td>Title</td>
                                <td>Description</td>
                                <td>Accion</td>
                            </tr>
                            
                            {!todos ? 'Cargando...' : 
                            todos.map((todo, index)=>{
                                return <tr>
                                <td key={index}>{todo.id}</td>
                                <td>{todo.title}</td>
                                <td>{todo.description}</td>
                                <td><Link href={`/tutorial/${todo.id}`}>Up</Link>---
                                <button onClick={(() => fetchdelete(todo.id))}>X</button>
                                    </td>
                            </tr>
                            })}
                            
                        </table>

                </div>
            )
}

export default App;