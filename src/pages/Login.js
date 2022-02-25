import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../redux/slices/userActions';

function Login() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()

    useEffect(() => {
        if (user) {
            if (!user.verified) {
                navigate('/verifikasi')

            } else if (user.userType === 1) {
                navigate('/regadm')
            } else {
                navigate('/')
            }
        }

    }, [user, navigate, dispatch]);


    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }))
        setEmail("")
        setPassword("")
        // navigate("/")
    }
    return <div className='d-flex' style={{ height: '100vh', width: '100vw', backgroundColor: '#35858b' }}>
        <div className='col-4 m-auto'>
            <div className="card">
                <div className="card-header">
                    Login
                </div>
                <div className="card-body ">
                    <form className="row ">
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="col-md-12 ">
                            <button onClick={submitHandler} className='button btn btn-primary mt-4 w-100'>Login</button>
                        </div>
                    </form>
                    <div className='d-flex  mt-2' >
                        <h6 className='mx-auto'>
                            Sudah punya akun?, <Link to='/login'> Daftar</Link>

                        </h6>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Login;
