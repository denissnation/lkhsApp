import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { resetUser } from '../redux/slices/userReducers';
import { verify } from '../redux/slices/userActions';
// import { login } from '../redux/slices/userActions';

function Verifikasi() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [searchParams] = useSearchParams();
    const id = searchParams.get('b945dh80');
    const uniquestring = searchParams.get('c875eru9');

    console.log(id, uniquestring);
    const backButton = (e) => {
        e.preventDefault();
        dispatch(resetUser())
        localStorage.removeItem('user')
        navigate('/')
    }
    useEffect(() => {
        window.onpopstate = backButton
        if (id && uniquestring) {
            dispatch(verify({ id, uniquestring }))
        }
        if (!user) {
            navigate('/login')
        }
    }, [dispatch, id, uniquestring, user, navigate]);

    return <div className='d-flex' style={{ height: '100vh', width: '100vw', backgroundColor: '#35858b' }}>
        <div className='col-4 m-auto h-50 w-50 border-0 d-flex flex-column justify-content-center' style={{ backgroundColor: '#a3c0c4', borderRadius: '30px' }}>
            <div className="d-flex flex-column justify-content-center  " >
                <h4 className='mx-auto'>{user && user.message}</h4>
                <i className="fas fa-check btn btn-sm btn-outline-success rounded-circle text-success mx-auto py-2 my-4 fs-1"></i>
                <Link className='mx-auto' to="/login" onClick={() => { dispatch(resetUser()); localStorage.removeItem('user') }}
                >
                    <h5 >Kembali ke halaman Login</h5></Link>
            </div>
        </div>
    </div >;
}

export default Verifikasi;
