import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { lkhsCreate } from '../redux/slices/lkhsActions';
import { regisList } from '../redux/slices/regisActions';
import DataTable from 'react-data-table-component';

function RegisAdm() {
    const [filterText, setFilterText] = useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
    const [jenis_laporan, setJenis_laporan] = useState("");
    const [jenis_kalibrasi, setJenis_kalibrasi] = useState("");
    const [tempat_pelaksana, setTempat_pelaksana] = useState("");
    const [tanggal_pelaksana, setTanggal_pelaksana] = useState("");
    const [suhu_ruang, setSuhu_ruang] = useState("");
    const [kelembaban, setKelembaban] = useState("");
    const [id_alat, setId_alat] = useState();
    const [id_pelanggan, setId_pelanggan] = useState();
    const [id_registrasi, setId_registrasi] = useState();
    const { regis } = useSelector(state => state.regis)
    const { successCreate } = useSelector(state => state.lkhs)
    const { user } = useSelector(state => state.user)
    // console.log(regis);

    const filteredItems = regis.filter(
        item => item.nama_alat && item.nama_alat.toLowerCase().includes(filterText.toLowerCase()),
    );

    const subHeaderComponentMemo = useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };
        return (
            <>
                <input style={{
                    height: "32px",
                    width: "200px",
                    borderRadius: "3px",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                    borderTopRightRadius: "0",
                    borderBottomRightRadius: "0",
                    border: "1px solid #e5e5e5",
                    padding: "0 32px 0 16px",
                }}
                    id="search"
                    type="text"
                    placeholder="Filter By Name"
                    aria-label="Search Input"
                    value={filterText}
                    onChange={e => setFilterText(e.target.value)}
                />
                <button
                    style={{
                        borderTopLeftRadius: "0",
                        borderBottomLeftRadius: "0",
                        borderTopRightRadius: "5px",
                        borderBottomRightRadius: "5px",
                        height: "32px",
                        width: "32px",
                        textAlign: "center",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    onClick={handleClear}>X</button>
            </>
        );
    }, [
        filterText,
        resetPaginationToggle
    ]);

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (user.userType === 1) {
                dispatch(regisList())
            } else {
                navigate("/")
            }
        } else {
            navigate('/login')
        }
        if (successCreate) {
            navigate('/lkhs', { state: { regis: 'mantap' } })
        }
    }, [dispatch, successCreate, navigate, user]);

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
            width: '100px'
        },
        {
            name: 'Action',
            button: true,
            cell: (row) => (
                <div className="App">
                    <div className="openbtn text-center">
                        {row.status === 1 ? (
                            <button type="button"
                                className="btn btn-sm rounded text-primary "
                                data-bs-toggle="modal" data-bs-target="#regisModal"
                                onClick={() => {
                                    setId_pelanggan(row.id_pelanggan);
                                    setId_alat(row.id_alat);
                                    setId_registrasi(row.id_registrasi)
                                }}
                            >
                                <i className="fas fa-edit text-sm-center"></i>
                            </button>
                        ) : (
                            <i className="fas fa-check-circle text-success me-2"></i>

                        )}
                        <div className="modal fade mt-5" id="regisModal" tabIndex="-1" aria-labelledby="regisModalLabel" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title" id="exampleModalLabel">From Registrasi</h5>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body mt-4 ">
                                        <form className="row g-3" onSubmit={saveHandler} >
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Jenis Laporan</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={jenis_laporan} onChange={(e) => setJenis_laporan(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Jenis Kalibrasi</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={jenis_kalibrasi} onChange={(e) => setJenis_kalibrasi(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Tempat Pelaksana</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={tempat_pelaksana} onChange={(e) => setTempat_pelaksana(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Tanggal Pelaksana</label>
                                                <div className="col-sm-8">
                                                    <input type="date" value={tanggal_pelaksana} onChange={(e) => setTanggal_pelaksana(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Suhu Ruang</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={suhu_ruang} onChange={(e) => setSuhu_ruang(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <label className="col-sm-4 col-form-label">Kelembaban</label>
                                                <div className="col-sm-8">
                                                    <input type="text" value={kelembaban} onChange={(e) => setKelembaban(e.target.value)} className="form-control form-control-sm" id="inputEmail3" />
                                                </div>
                                            </div>
                                            <div className="modal-footer">
                                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ),
        }

    ];


    const saveHandler = (e) => {
        e.preventDefault();

        dispatch(lkhsCreate({ jenis_laporan, jenis_kalibrasi, id_alat, id_pelanggan, id_registrasi, tempat_pelaksana, tanggal_pelaksana, suhu_ruang, kelembaban }))

        // document.getElementById("regisModal").classList.remove("show", "d-block");
        // document.querySelectorAll(".modal-backdrop")
        //     .forEach(el => el.classList.remove("modal-backdrop"));

        setJenis_kalibrasi("")
        setJenis_laporan("")
        setId_alat()
        setId_pelanggan()
        setId_registrasi()
        setTempat_pelaksana()
        setTanggal_pelaksana()
        setSuhu_ruang()
        setKelembaban()

    }
    // console.log(regis);
    return (
        <div className="container-fluid">
            <div className="row dashboard" >
                <Sidebar></Sidebar>
                <div className="col-lg-10 col-md-9 col-sm-10 col-10 main-content p-0 ">
                    <Header></Header>
                    <div className="pt-4 p-5">
                        <div>
                            <h3>Registrasi Admin</h3>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        Daftar Registrasi
                                    </div>
                                    <div className="card-body">
                                        <DataTable
                                            columns={columns}
                                            data={filteredItems}
                                            pagination
                                            paginationResetDefaultPage={resetPaginationToggle}
                                            subHeader
                                            subHeaderComponent={subHeaderComponentMemo}
                                            persistTableHead
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

export default RegisAdm;
