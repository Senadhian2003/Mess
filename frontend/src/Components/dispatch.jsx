import React from 'react'
import './styles.css'

export default function Dispatch() {
  return (
    <div>

<nav class="navbar navbar-expand-lg bg-light">
    <div class="container-fluid">
        <a class="navbar-brand" href="#">EMART</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"  routerLink="register">Register</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page" routerLink="login" >Login</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"  routerLink="home">Home</a>
                </li>
                
                <li class="nav-item">
                    <a class="nav-link active" aria-current="page"  routerLink="interpolation">Interpolation</a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<div class="noti">

<h1 style={{marginTop : '80px'}}> NOTIFICATION</h1>
<div class="box1 container" style={{marginTop : '80px'}} >

  

</div>
</div>


    </div>
  )
}
