import React from 'react';
import './Header.css';
import KMSIMG from '../../../assets/kms.jpg';
import { Link, useNavigate } from 'react-router-dom';
import axiosObj from '../../../axiosObj';
import { connect } from 'react-redux'
import * as actionTypes from '../../../store/actions/index';

const Header = (props) => {
    const navigate = useNavigate();

    const logout = (e) => {
        e.preventDefault();
        props.signout(props.token).then(res => {
            navigate('/signin');
        })
            .catch(err => console.log(err))
    }
    return (
        <header>
            <div className="">
                <nav
                    className="main-nav bg-secondary d-flex pe-2"
                >
                    <div className="ms-2">
                        <a
                            href="#"
                            role="button"
                            className="d-lg-none js-menu-toggle text-white"
                            data-bs-toggle="collapse"
                            data-bs-target="#main-navbar"
                        >
                            <span><i className="fas fa-bars"></i></span>
                        </a>

                        <Link to="/" className="navbar-brand ms-2 text-white bold">
                            <b>Codigo</b>
                        </Link>
                    </div>
                    {props.authenticated ?
                        <ul className="nav py-1">
                            <li className="nav-item dropdown">
                                <a
                                    id="navbarDropdown"
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        src={KMSIMG}
                                        alt="Hlaine Hlaine"
                                        className="img-fluid"
                                    />
                                    <span
                                        className="username text-white px-2 py-2 d-none d-lg-inline-block"
                                    >{props.user.name}</span
                                    >
                                </a>

                                <div
                                    className="dropdown-menu dropdown-menu-right bg-main"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <a href="#" onClick={logout} role="button" className="dropdown-item" role="button">
                                        Sign out
              </a>
                                </div>
                            </li>
                        </ul>
                        :
                        <ul className="nav py-2">
                            <li className="nav-item dropdown me-1">
                                <Link to="/signin"

                                    className="nav-link text-white btn-primary"
                                >Signin</Link
                                >
                            </li>
                        </ul>
                    }
                </nav>
            </div>
        </header>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.auth.authenticated,
        user: state.auth.user,
        token: state.auth.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(actionTypes.signout()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);