import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useLocation } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { lkhsList } from '../redux/slices/lkhsActions';
import { resetLkhsSuccess } from '../redux/slices/lkhsReducers'
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';



function Lkhs() {
  const dispatch = useDispatch()
  // const { state } = useLocation()
  const { lkhs, successCreate } = useSelector(state => state.lkhs)
  const { user } = useSelector(state => state.user)
  // const clickHandler = (row) => {
  //   console.log(row);
  // }
  const navigate = useNavigate()
  const columns = [
    {
      name: 'Id',
      selector: row => row.id_lkhs,
      sortable: true,
      width: '60px'
    },
    {
      name: 'Jenis Laporan',
      selector: row => row.jenis_laporan,
    },
    {
      name: 'Jenis Kalibrasi',
      selector: row => row.jenis_kalibrasi,
    },
    {
      name: 'Nama Alat',
      selector: row => row.nama_alat,
    },
    {
      name: 'Nama Pelanggan',
      selector: row => row.nama_pelanggan,
    },
    {
      name: 'Suhu Ruang',
      selector: row => row.suhu_ruang,
      width: '100px'
    },
    {
      name: 'Tanggal Pelaksana',
      selector: row => new Date(row.tanggal_pelaksana).toLocaleDateString('en-GB'),
    },
    {
      name: 'Tempat Pelaksana',
      selector: row => row.tempat_pelaksana,
    },
    {
      name: 'Kelembaban',
      selector: row => row.kelembaban,
      width: '100px'
    },

  ];

  useEffect(() => {
    if (user) {
      if (user.userType === 1) {
        dispatch(lkhsList())
      } else {
        navigate("/")
      }
    } else {
      navigate('/login')
    }
    if (successCreate) {
      setTimeout(() => {
        dispatch(resetLkhsSuccess())
      }, 2000);
    }
  }, [dispatch, successCreate, user, navigate]);


  return (
    <div className="container-fluid">
      <div className="row dashboard" >
        <Sidebar></Sidebar>
        <div className="col-lg-10 col-md-9 col-sm-10 col-10 main-content p-0 ">
          <Header></Header>
          <div className="pt-4 p-5">
            <div >
              <h3>LKHS</h3>
            </div>
            {successCreate && (
              <div className="alert alert-success" role="alert">
                lkhs berhasil ditambahkan
              </div>
            )}
            <div className="row">
              <div className="col ">
                <div className="card">
                  <div className="card-header d-flex justify-content-between align-items-center">
                    Daftar LKHS
                  </div>
                  <div className="card-body">
                    <DataTable
                      columns={columns}
                      data={lkhs}
                      pagination
                      striped
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Lkhs;
