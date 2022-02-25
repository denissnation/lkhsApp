import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
    Link, NavLink,

} from "react-router-dom";
import { resetUser } from '../redux/slices/userReducers';

function Sidebar() {
    const { user } = useSelector(state => state.user)
    const dispatch = useDispatch()
    return (
        <>
            <div className="sidebar col-lg-2 col-md-3 col-sm-2 col-2  d-flex flex-column align-items-center ">
                <div className="mt-4 mt-md-3 text-light d-flex justify-content-between align-items-center ">
                    <i className="fas fa-pen-square me-md-2 ms-3 ms-md-0"></i>
                    <h5 className="d-none d-md-flex">Aplikasi LKHS</h5>
                </div>
                <div className="menu ps-0 ps-sm-3 mt-3 me-sm-0 me-1 ">
                    {user && user.userType === 2 && (
                        <NavLink to="/"
                            activeclassname="active"
                            className="row menu-list text-light  d-flex justify-content-between align-items-center ms-sm-2 ms-1  pe-4 py-2 mt-4 mt-md-3 active">
                            <i className="fas fa-pen-square col-2 me-sm-0 me-5"></i>
                            <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                                <span>Registrasi </span>
                                <i className="fas fa-angle-right"></i>
                            </div>
                        </NavLink>
                    )}
                    {user && user.userType === 1 && (
                        <>
                            <NavLink to="/lkhs"
                                activeclassname="active"
                                className="row menu-list text-light d-flex  justify-content-between align-items-center ms-sm-2 ms-1 pe-4 py-2  mt-4 mt-md-3 ">
                                <i className="fas fa-pen-square col-2"></i>
                                <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                                    <span>Lkhs </span>
                                    <i className="fas fa-angle-right "></i>
                                </div>
                            </NavLink>
                            <NavLink to="/regadm"
                                activeclassname="active"
                                className="row menu-list text-light d-flex justify-content-between align-items-center ms-sm-2 ms-1 pe-4 py-2  mt-4 mt-md-3">
                                <i className="fas fa-table  col-2"></i>
                                <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                                    <span>regisAdmin </span>
                                    <i className="fas fa-angle-right "></i>
                                </div>
                            </NavLink>
                            <NavLink to="/alat"
                                activeclassname="active"
                                className="row menu-list text-light d-flex justify-content-between align-items-center ms-sm-2 ms-1 pe-4 py-2  mt-4 mt-md-3">
                                <i className="fas fa-tools col-2"></i>
                                <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                                    <span>Alat </span>
                                    <i className="fas fa-angle-right "></i>
                                </div>
                            </NavLink>
                        </>
                    )}

                    <Link to="/login"
                        className="row menu-list text-light d-flex justify-content-between align-items-center ms-sm-2 ms-1 pe-4 py-2  mt-4 mt-md-3">
                        <i className="fas fa-sign-in-alt col-2"></i>
                        <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                            <span>Login </span>
                            <i className="fas fa-angle-right "></i>
                        </div>
                    </Link>
                    <Link to="/login"
                        onClick={() => { localStorage.removeItem('user'); dispatch(resetUser()) }}
                        className="row menu-list text-light d-flex justify-content-between align-items-center ms-sm-2 ms-1 pe-4 py-2  mt-4 mt-md-3">
                        <i className="fas fa-sign-in-alt col-2"></i>
                        <div className="col-10 d-flex d-none d-md-flex align-items-center justify-content-between ">
                            <span>Logout </span>
                            <i className="fas fa-angle-right "></i>
                        </div>
                    </Link>

                </div>
            </div>
        </>
    );
}

export default Sidebar;
