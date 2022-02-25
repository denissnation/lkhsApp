import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { jsonAdd, jsonDel, jsonGet, jsonMin } from '../redux/slices/jsonActions';
import { addJson, minJson, resetJson } from '../redux/slices/jsonReducers';

function Json() {

  const dispatch = useDispatch()

  const { cartItems, success } = useSelector(state => state.json)
  // console.log("cartItems", cartItems)

  useEffect(() => {
    if (success) {
      dispatch(resetJson())
    }
    dispatch(jsonGet())
  }, [dispatch, success]);

  const tambahBaru = (e) => {
    e.preventDefault();
    dispatch(jsonAdd({ name: { pid: 2, name: 'k', jumlah: 3 } }))
  }
  const tambahHandler = (e) => {
    e.preventDefault();
    dispatch(jsonAdd({ id: 41, name: { pid: 3, name: 'k', jumlah: 2 } }))
  }
  const tambahHandler1 = (e) => {
    e.preventDefault();
    dispatch(addJson({ pid: 2, name: 'k', jumlah: 3 }))
  }
  const kurangHandler1 = (e) => {
    e.preventDefault();
    dispatch(jsonMin({ id: 41, name: { pid: 2, name: 'k', jumlah: 2 } }))
  }
  const HapusHandler2 = (e) => {
    e.preventDefault();
    dispatch(jsonDel({ id: 41, name: { pid: 3 } }))
  }

  return (
    <div className="container-fluid">
      <div className="row dashboard" >
        <Sidebar></Sidebar>
        <div className="col-lg-10 col-md-9 col-sm-10 col-10 main-content p-0 ">
          <Header></Header>
          <div className="pt-4 p-5">
            <div >
              <h3>Registrasi</h3>
            </div>

            <div className="row">
              <div className="col d-flex flex-column ">
                <button style={{ marginBottom: 5 }} onClick={tambahBaru}>Tambah Baru</button>
                <button style={{ marginBottom: 5 }} onClick={tambahHandler}>Tambah</button>
                <button style={{ marginBottom: 5 }} onClick={tambahHandler1}>Tambah1</button>
                <button style={{ marginBottom: 5 }} onClick={kurangHandler1}>Kurang1</button>
                <button onClick={HapusHandler2}>Hapus</button>
              </div>
              <div className="col ">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Json;
