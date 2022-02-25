import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../redux/slices/userActions';
import { resetUser } from '../redux/slices/userReducers';

function Signup() {
    let navigate = useNavigate()
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
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
        dispatch(signup({ email, username, password }))
        setEmail("")
        setUsername("")
        setPassword("")
        // navigate("/verifikasiReg")
    }
    return <div className='d-flex' style={{ height: '100vh', width: '100vw', backgroundColor: '#35858b' }}>
        <div className='col-4 m-auto'>
            <div className="card">
                <div className="card-header">
                    Signup
                </div>
                <div className="card-body ">
                    <form className="row ">
                        <div className="col-md-12">
                            <label className="form-label">Email</label>
                            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Username</label>
                            <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="col-md-12">
                            <label className="form-label">Password</label>
                            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="col-md-12 ">
                            <button onClick={submitHandler} className='button btn btn-primary mt-4 w-100'>SignUp</button>
                        </div>
                    </form>
                    <div className='d-flex mt-3' >
                        <h7 className='mx-auto'>
                            Sudah punya akun?, <Link to='/login'> Login</Link>

                        </h7>
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

export default Signup;
