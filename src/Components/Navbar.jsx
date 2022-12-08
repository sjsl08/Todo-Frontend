import React from 'react'
import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthorizationContext from '../Context/AuthorizationContext'
import ToastContext from '../Context/ToastContext'

export default function Navbar() {
    const navigate = useNavigate()
    const { user, setUser } = useContext(AuthorizationContext)
    const { toast } = useContext(ToastContext)
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container-fluid">
                    <Link to={"/"} className="navbar-brand">Todo</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor02">
                        <ul className="navbar-nav ms-auto">
                            {!user ? <>
                                <li className="nav-item">
                                    <Link to={"login"} className="nav-link" >Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={'/signup'} className="nav-link">Signup</Link>
                                </li>
                            </>
                                :
                                <button className='btn btn-danger'
                                    onClick={() => {
                                        toast.success("logged OUT")
                                        sessionStorage.clear()
                                        setUser(null)
                                        navigate("/login", { replace: true })
                                    }}>
                                    <li className="nav-item">Logout</li>
                                </button>
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}
