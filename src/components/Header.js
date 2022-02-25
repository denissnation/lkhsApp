import React from 'react';
import { useSelector } from 'react-redux';

function Header() {
    const { user } = useSelector(state => state.user)
    return (
        <>
            <div className="header text-light d-flex align-items-center ps-4 justify-content-between ">
                <div className="col-md-4 col-lg-4 col-sm-6">
                    <span className="fw-bold text-light ms-2">Dashboard</span>
                </div>
                <div className="col-md-4 col-lg-4 d-none d-md-block justify-content-center ">
                    <div className="col-md-10 col-lg-8 d-flex justify-content-lg-between align-items-center rounded-pill bg-light p-3"
                        style={{ height: '3rem' }}>
                        <i className="fas fa-search text-dark"></i>
                        <input type="text" className="search form-control form-control-sm border-0 bg-transparent " placeholder="search here" />
                    </div>
                </div>
                <div className="d-flex justify-content-lg-between align-items-center me-4 ">
                    <div className="rounded-circle bg-primary me-2">
                        <img className="rounded-circle bg-primary"
                            src="https://www.w3schools.com/images/w3schools_green.jpg" height="35" width="35"
                            alt="" />
                    </div>
                    <div className="d-flex flex-column ">
                        <span className="userName fw-bold" >{user && user.username}</span>
                        <span className="userType opacity-75" >{user && user.userType === 1 ? 'Pegawai' : "Pelanggan"}</span>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Header;
