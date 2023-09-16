import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Navbar = () => {
	const { store, actions} = useContext(Context)
	const [show, setShow] = useState()
	const openModal = ()=>{setShow(true)}
    const closeModal = ()=>{setShow(false)}
	const handleLogout = ()=>{
		actions.logout()
		openModal()
	}	
	return (
		<nav className="navbar navbar-light bg-light">
			{/*El modal empieza aqui */}
            <>
                <Modal show={show} onHide={closeModal}>
                    <Modal.Header closeButton>
                    <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>You have successfully logged out</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={closeModal}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
             </>
            {/*El modal termina aqui */}
			<div className="container">
				<Link to="/">
					<span className="navbar-brand mb-0 h1">React Boilerplate</span>
				</Link>
				<div className="ml-auto">
					{store.user ? <p>{`Welcome, ${store.user.name}`}</p>:<></> }
					<Link to="/protected">
						<button className="btn btn-primary">Protected</button>
					</Link>
					<Link to="/signup">
						<button className="btn btn-primary ms-2">signup</button>
					</Link>
					<button onClick={handleLogout} className="btn btn-primary ms-2">logout</button>
				</div>
			</div>
		</nav>
	);
};
