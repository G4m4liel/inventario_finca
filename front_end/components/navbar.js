import React from "react";


export const navbar= () => {
    return (
<nav className="navbar navbar-expand-lg bg-dark" data-bs-theme="dark">
  <div className="container-fluid"> 
    <a className="navbar-brand" href="/post/home">
      <img src="/logo_blanco.png" alt="UNAV" className='logo'/>
    </a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 justify-content-betweeny">
        <li className="nav-item">
          <a className="nav-link" href="./inventory/inventory">Inventory</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./tools/tools">Tools</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./machinery/machinery">Machinery</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./implements/implements">Implements</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./graficas/graficas">Reports</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="./employees/employees">Employees</a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">Exit</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    );
}

export default navbar