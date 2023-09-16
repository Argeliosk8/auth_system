import React, {useState} from "react";



export const Login = ()=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    return (
        <div className="container d-flex justify-content-center mt-4">
            <div className="col-3 border rounded p-3">
                <div class="input-group mb-3 justify-content-center">
                    <h4>Login</h4>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                    <input onChange={(e)=>{setEmail(e.target.value)}} type="text" class="form-control" placeholder="user@email.com" aria-label="Username" aria-describedby="basic-addon1"/>
                </div>
                <div class="input-group mb-3">
                    <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                    <input onChange={(e)=>{setPassword(e.target.value)}} type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1" placeholder="Password"/>
                </div>
                <div class="input-group mb-3 justify-content-center">
                    <button type="button" class="btn btn-primary">Login</button>
                </div>
                <div class="input-group mb-3 justify-content-center">
                    <p>{`${email}`}</p>
                    <p>{`${password}`}</p>
                </div>
            </div>
        </div>
    )
}