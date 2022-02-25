import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { alatAction } from '../redux/slices/alatActions';
import { regisCreate, regisList } from '../redux/slices/regisActions';
import { resetRegisSuccess } from '../redux/slices/regisReducers';
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

function Regis() {

  const [id_alat, setId_alat] = useState();
  const [jumlah, setJumlah] = useState("");
  const [Status_alat, setStatus_alat] = useState("");
  const [jasa, setJasa] = useState("");

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { regis, successCreate } = useSelector(state => state.regis)
  const { alats } = useSelector(state => state.alat)
  const { user } = useSelector(state => state.user)
  // console.log(typeof (user));
  // const { userInfo } = useSelector(state => state.userInfo)
  // console.log(userInfo);

  useEffect(() => {
    if (user) {
      if (user.userType === 1) {
        navigate('/regadm')
      } else {
        dispatch(regisList())
        dispatch(alatAction())
      }
    } else {
      navigate('/login')
    }

    if (successCreate) {
      setTimeout(() => {
        dispatch(resetRegisSuccess())
      }, 2000);

    }
  }, [dispatch, successCreate, user, navigate]);

  const columns = [
    {
      name: 'No Regis',
      selector: row => row.id_registrasi,
      sortable: true,
      width: '100px'
    },
    {
      name: 'Alat',
      selector: row => row.nama_alat,
    },
    {
      name: 'Jumlah',
      selector: row => row.jumlah,
      width: '80px'
    },
    {
      name: 'Status Alat',
      selector: row => row.Status_alat,
    },
    {
      name: 'Jasa',
      selector: row => row.Jasa,
    },
    {
      name: 'Tanggal',
      selector: row => new Date(row.Date_upload).toLocaleDateString('en-GB'),
    },
    {
      name: 'Status',
      button: true,
      sortable: true,
      width: '50px',
      cell: (row) => (
        <div className="App">
          <div className="openbtn text-center">
            {row.status === 2 ? (
              <i className="fas fa-check-circle text-success me-2"></i>
            ) : (
              <i className="fas fa-clock text-warning"></i>
            )}

          </div>
        </div>
      ),
    }
  ];



  const submitHandler = () => {
    dispatch(regisCreate({ id_alat, jumlah, Status_alat, jasa }))

    // document.getElementById("regisModal").classList.remove("show", "d-block");
    // document.querySelectorAll(".modal-backdrop")
    //   .forEach(el => el.classList.remove("modal-backdrop"));

    setId_alat()
    setJumlah("")
    setStatus_alat("")
    setJasa("")
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
            {successCreate && (
              <div className="alert alert-success" role="alert">
                Registrasi berhasil ditambahkan
              </div>
            )}
            <div className="row">
              <div className="col ">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    Daftar Registrasi
                    <button type="button" className="btn btn-sm btn-primary rounded" data-bs-toggle="modal"
                      data-bs-target="#regisModal">
                      + Registrasi
                    </button>
                  </div>
                  <div className="card-body">
                    <DataTable
                      columns={columns}
                      data={regis}
                      pagination
                      striped
                    />
                    {/* <div className="table-responsive">
                      <table className="table table-striped ">
                        <thead>
                          <tr>
                            <th scope="col">No Regis</th>
                            <th scope="col">Alat</th>
                            <th scope="col">Jumlah</th>
                            <th scope="col">Status Alat</th>
                            <th scope="col">Jasa</th>
                            <th scope="col">Tanggal</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {regis && regis.map(regis => (
                            <tr key={regis.id_registrasi}>
                              <td>{regis.id_registrasi}</td>
                              <td>{regis.nama_alat}</td>
                              <td>{regis.jumlah}</td>
                              <td>{regis.Status_alat}</td>
                              <td>{regis.Jasa}</td>
                              <td>{new Date(regis.Date_upload).toLocaleDateString('en-GB')}</td>
                              <td>
                                {regis.status === 2 ? (
                                  <i className="fas fa-check-circle text-success me-2"></i>
                                ) : (
                                  <i className="fas fa-clock text-warning"></i>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div> */}
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
      <div className="modal fade mt-5" id="regisModal" tabIndex="-1" aria-labelledby="regisModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">From Registrasi</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body mt-4" >
              <form className="row g-3">
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Alat</label>
                  <div className="col-sm-9">
                    <select className="form-select form-select-sm" aria-label="Default select example" value={id_alat} onChange={(e) => setId_alat(e.target.value)}>
                      <option value="">--Pilih Alat--</option>
                      {alats && alats.map(alat => (
                        <option key={alat.id_alat} value={alat.id_alat}>{alat.nama_alat}</option>
                      ))}

                    </select>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Jumlah</label>
                  <div className="col-sm-9">
                    <input type="number" value={jumlah} onChange={(e) => setJumlah(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-3 col-form-label">Status Alat</label>
                  <div className="col-sm-9">
                    <input type="text" value={Status_alat} onChange={(e) => setStatus_alat(e.target.value)} className="form-control form-control-sm" id="inputEmail3" required />
                  </div>
                </div>
                <div className="row ">
                  <label className="col-sm-3 col-form-label">Jasa</label>
                  <div className="col-sm-9">
                    <input type="text" value={jasa} onChange={(e) => setJasa(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                  <button type="button" onClick={submitHandler} data-bs-dismiss="modal" className="btn btn-primary">Save changes</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div >
  );
}

export default Regis;
