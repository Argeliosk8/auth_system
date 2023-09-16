import React, {useState, useContext} from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const Login = ()=>{
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [show, setShow] = useState()
    const [is_loggedin, setIs_loggedin] = useState()
    const {store, actions} = useContext(Context)
    const navigate = useNavigate()
    const openModal = ()=>{setShow(true)}
    const closeModal = ()=>{setShow(false)}
    
    const handleSubmit = async (e)=>{
        e.preventDefault()
        const resp = await actions.login(email, password)
        if(resp){
            setIs_loggedin(true)
            openModal()
        } else {
            setIs_loggedin(false)
            openModal()
        }
    }

    const closeModalClick = ()=>{
        if (is_loggedin){
            closeModal()
            navigate("/protected")
        } else {
            closeModal()
        }
    }

    return (
        <div className="container d-flex justify-content-center mt-4">
            {/*El modal empieza aqui */}
            <>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>{is_loggedin ? "Success" : "Error"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{is_loggedin ? "You logged in as " + store.user.name : "Something went wrong please try again"}</Modal.Body>
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
                    <button onClick={handleSubmit} type="button" class="btn btn-primary">Login</button>
                </div>
                <div class="input-group mb-3 justify-content-center">
                    <p>{`${email}`}</p>
                    <p>{`${password}`}</p>
                </div>
            </div>
        </div>
    )
}