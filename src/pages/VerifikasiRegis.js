import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
// import { useSelector } from 'react-redux';
import { Link, useSearchParams } from 'react-router-dom';
import { verify } from '../redux/slices/userActions';

function VerifikasiRegis() {
    // const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [searchParams] = useSearchParams();
    // console.log(searchParams);
    const id = searchParams.get('b945dh80');
    const uniquestring = searchParams.get('c875eru9');

    useEffect(() => {
        if (id && uniquestring) {
            dispatch(verify({ id, uniquestring }))
        }
    }, [dispatch, id, uniquestring]);


    return <div className='d-flex' style={{ height: '100vh', width: '100vw', backgroundColor: '#35858b' }}>
        <div className='col-4 m-auto'>
            <h4>Akun Anda Berhasi diAktifasi </h4>
            <Link to="/login" >Silahkan Login</Link>
        </div>
    </div>;
}

export default VerifikasiRegis;
