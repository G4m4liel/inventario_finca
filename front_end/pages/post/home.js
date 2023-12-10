import React, {useState, useEffect} from 'react';
import NavBar from '../../components/navbar';

export function Home() {

    return(
    <div>
      <NavBar/>
      <section>
      <h2>La putaracha</h2>
      </section>

      <footer className="bg-dark" data-bs-theme="dark">
          <img src="/logo_blanco.png" alt="UNAV" className='logo' />
      </footer>

    </div>
        
    );
}

export default Home;


// const URL="http://localhost:8082/api/reading";
    // const [todos, setTodos]=useState();

    // const fetchApi=async ()=>{
    //     const response=await fetch(URL)
    //     const responseJSON= await response.json()
    //     setTodos(responseJSON)
    //     console.log('Reading..');
    // }


    // useEffect(()=>{
    //     fetchApi()
    // },[])



// <div>
        //     <h1>hola tio</h1>
        //     <table>
        //         <tr>
        //             <td>id_empleado</td>
        //             <td>nombre</td>
        //             <td>apellido</td>
        //             <td>cargo</td>
        //             <td>correo</td>
        //         </tr>
                    
        //         {!todos ? 'Cargando...' : 
        //         todos.map((todo, index)=>{
        //             return <tr>
        //             <td key={index}>{todo.id_empleado}</td>
        //             <td>{todo.nombre}</td>
        //             <td>{todo.apellido}</td>
        //             <td>{todo.cargo}</td>
        //             <td>{todo.correo}</td>
        //             {/* <td><Link href={`/tutorial/${todo.id}`}>Up</Link>---
        //             <button onClick={(() => fetchdelete(todo.id))}>X</button>
        //                 </td> */}
        //         </tr>
        //     })}
        //     </table>
        // </div>