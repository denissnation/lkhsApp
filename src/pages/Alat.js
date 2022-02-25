import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import { alatAction, alatCreate, alatDelete, alatUpdate } from '../redux/slices/alatActions'
import { resetAlatSuccess } from '../redux/slices/alatReducers'

function Alat() {
    const [namaAlat, setNamaAlat] = useState("");
    const [idAlat, setIdAlat] = useState();
    const [isEdit, setIsEdit] = useState(false);
    const dispatch = useDispatch()
    const alat = useSelector(state => state.alat)
    const { user } = useSelector(state => state.user)

    const navigate = useNavigate()

    useEffect(() => {
        if (user) {
            if (user.userType === 1) {
                dispatch(alatAction())
            } else {
                navigate("/")
            }
        } else {
            navigate('/login')
        }
        if (alat.successDelete || alat.successCreate || alat.successUpdate) {
            setNamaAlat("")
            setIdAlat()
            setIsEdit(false)
            setTimeout(() => {
                dispatch(resetAlatSuccess())
            }, 1000);
        }
    }, [dispatch, alat.successDelete, alat.successCreate, alat.successUpdate, user, navigate]);

    const saveHandler = (e) => {
        e.preventDefault();
        if (namaAlat) {
            if (isEdit) {
                document.getElementById("alatModal").classList.remove("show", "d-block");
                document.querySelectorAll(".modal-backdrop")
                    .forEach(el => el.classList.remove("modal-backdrop"));

                dispatch(alatUpdate({ idAlat, namaAlat }))

            } else {
                document.getElementById("alatModal").classList.remove("show", "d-block");
                document.querySelectorAll(".modal-backdrop")
                    .forEach(el => el.classList.remove("modal-backdrop"));

                dispatch(alatCreate({ namaAlat }))
            }
        }
        // else {
        //     alert("Nama Alat Tidak Boleh Kosong");
        // }
    }

    const deleteHandler = (id) => {
        dispatch(alatDelete(id))
    }

    const cancelHandler = () => {
        document.getElementById("alatModal").classList.remove("show", "d-block");
        document.querySelectorAll(".modal-backdrop")
            .forEach(el => el.classList.remove("modal-backdrop"));
        setNamaAlat("")
        setIdAlat()
        setIsEdit(false)
    }

    return (
        <div className="container-fluid">
            <div className="row dashboard" >
                <Sidebar></Sidebar>
                <div className="col-lg-10 col-md-9 col-sm-10 col-10 main-content p-0 ">
                    <Header></Header>
                    <div className="pt-4 p-5">
                        <div >
                            <h3>Alat</h3>
                        </div>
                        {alat.successCreate && (
                            <div className="alert alert-success" role="alert">
                                Alat berhasil ditambahkan
                            </div>
                        )}
                        {alat.successDelete && (
                            <div className="alert alert-danger" role="alert">
                                Data berhasil dihapus
                            </div>
                        )}
                        <div className="row">
                            <div className="col ">
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        Daftar Alat
                                        <button type="button" className="btn btn-sm btn-primary rounded" data-bs-toggle="modal"
                                            data-bs-target="#alatModal">
                                            + Alat
                                        </button>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <table className="table table-striped">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">No</th>
                                                        <th scope="col">Nama Alat</th>
                                                        <th scope="col">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {alat.alats && alat.alats.map(alat => (
                                                        <tr key={alat.id_alat}>
                                                            <td>{alat.id_alat}</td>
                                                            <td>{alat.nama_alat}</td>
                                                            <td>
                                                                <button className="btn btn-sm btn-primary me-1" data-bs-toggle="modal" data-bs-target="#alatModal"
                                                                    onClick={() => {
                                                                        setNamaAlat(alat.nama_alat);
                                                                        setIdAlat(alat.id_alat);
                                                                        setIsEdit(true)
                                                                    }}
                                                                >
                                                                    <i className="fas fa-edit text-sm-center "></i>
                                                                </button>
                                                                <button className="btn btn-sm btn-danger"
                                                                    onClick={() => deleteHandler(alat.id_alat)}
                                                                >
                                                                    <i className="fas fa-trash text-sm-center "></i>
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade mt-5" id="alatModal" tabIndex="-1" aria-labelledby="alatModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Form Alat</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body mt-4">
                            <form className="row g-3" id="myForm">
                                <div className="row mb-3">
                                    <label className="col-sm-3 col-form-label">Nama Alat</label>
                                    <div className="col-sm-9">
                                        <input type="text" required className="form-control form-control-sm" id="inputEmail3"
                                            value={namaAlat} onChange={(e) => setNamaAlat(e.target.value)} />
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => cancelHandler()}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        onClick={saveHandler}
                                        className="btn btn-primary"
                                    >
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Alat;
