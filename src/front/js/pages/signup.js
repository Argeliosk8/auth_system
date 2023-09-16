import React, {useState, useContext, useEffect} from "react";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from "react-router-dom";

export const Signup = ()=>{
    const [show, setShow] = useState(false)
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [pwd, setPwd] = useState()
    const [pwd2, setPwd2] = useState()
    const [is_signedup, setIs_signedup] = useState()
    const {actions} = useContext(Context)
    const navigate = useNavigate()
    
    const openModal = ()=>{setShow(true)}
    const closeModal = ()=>{setShow(false)}

    const signupClick = async (e) => {
        e.preventDefault()
        const new_user = {
            "name": name,
            "email": email,
            "password": pwd
        }
        const resp = await actions.signup(new_user)
        if(resp){
            //alert(`${resp.message}`)
            setIs_signedup(true)
            openModal()
        } else {
            setIs_signedup(false)
            openModal()
        }
    }

    const closeModalClick = ()=>{
        if (is_signedup == true){
            closeModal()
            navigate("/")
        }

        if (is_signedup == false){
            closeModal()
            document.getElementById("inputName").value = ""
            document.getElementById("inputEmail").value = ""
            document.getElementById("inputPwd").value = ""
            document.getElementById("inputPwd2").value = ""
            //navigate("/signup")
        }
    }
    return (
        <div className="container d-flex justify-content-center mt-4">
            {/*El modal empieza aqui */}
            <>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>{is_signedup ? "Success" : "Error"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{is_signedup ? "You have successfully sign up!" : "Something went wrong please try again"}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeModalClick}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
             </>
            {/*El modal termina aqui */}
        <div className="col-3 border rounded p-3">
            <div class="input-group mb-3 justify-content-center">
                <h4>Signup</h4>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-user"></i></span>
                <input onChange={(e)=>{setName(e.target.value)}} id="inputName" type="text" class="form-control" placeholder="John Doe" aria-label="Full_name" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-envelope"></i></span>
                <input onChange={(e)=>{setEmail(e.target.value)}} id="inputEmail" type="text" class="form-control" placeholder="user@email.com" aria-label="email" aria-describedby="basic-addon1"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                <input onChange={(e)=>{setPwd(e.target.value)}} id="inputPwd" type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1" placeholder="Password"/>
            </div>
            <div class="input-group mb-3">
                <span class="input-group-text" id="basic-addon1"><i class="fa-solid fa-key"></i></span>
                <input onChange={(e)=>{setPwd2(e.target.value)}} id="inputPwd2" type="password" class="form-control" aria-label="Password" aria-describedby="basic-addon1" placeholder="Enter password again"/>
            </div>
            <div class="input-group mb-3 justify-content-center">
                {pwd && name && email && pwd == pwd2 ? <button onClick={signupClick} type="button" class="btn btn-primary" >Submit</button> : <button onClick={signupClick} type="button" class="btn btn-primary" disabled >Submit</button>}
            </div>
        </div>
    </div>

    )
}