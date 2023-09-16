import React, {useState} from "react";

export const Signup = ()=>{
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()
    const [pwd2, setPwd2] = useState()
    return (
        <div className="container d-flex justify-content-center mt-4">
        <div className="col-3 border rounded p-3">
            <div class="input-group mb-3 justify-content-center">
                <h4>Signup</h4>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                <input onChange={(e)=>{setName(e.target.value)}} type="text" class="form-control" placeholder="John Doe" aria-label="Full_name" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"></i></span>
                <input onChange={(e)=>{setEmail(e.target.value)}} type="text" class="form-control" placeholder="user@email.com" aria-label="email" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                <input onChange={(e)=>{setPwd(e.target.value)}}type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1" placeholder="Password"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                <input onChange={(e)=>{setPwd2(e.target.value)}} type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1" placeholder="Enter password again"/>
            </div>
            <div class="input-group mb-3 justify-content-center">
                <button type="button" class="btn btn-primary">Submit</button>
            </div>
            <div class="input-group mb-3 justify-content-center">
                <p>{`${name}`}</p><br/>
                <p>{`${email}`}</p><br/>
                <p>{`${pwd}`}</p><br/>
                <p>{`${pwd2}`}</p>    
            </div>
        </div>
    </div>

    )
}