import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

const Signin = (props) => {
    const navigate = useNavigate()
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');
    let [errors, setErrors] = useState(null);

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        props.login(email, password).then(data => {
            if(data) {
                navigate('/packages');
            }
        }).catch(err => setErrors(err.errors))
    }

    let errorsArr = [];
    for (const key in errors) {
        errorsArr.push(<div className="alert alert-danger text-center">{errors[key][0]}</div>)
    }

    return (
        <section>
            <div className="row mt-5">
                <div className="col-12 col-lg-4 mx-auto">
                    <h4 className="text-center mb-5">Member Login</h4>
                    <form onSubmit={handleSubmit}>
                        {
                            errorsArr.length ? errorsArr : null
                        }
                        <div className="form-floating mb-3">
                            <input type="email" id="email" className="form-control input" placeholder="Email" onChange={handleEmail} value={email} />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" id="password" className="form-control input" placeholder="Password" onChange={handlePassword} value={password} />
                            <label htmlFor="password">Password</label>

                        </div>
                        <div className="text-center">
                            <button type="submit" className="py-2 px-3 text-white btn rounded auth-btn">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
const mapDispatchToProps = (dispatch) => {
    return {
        login: (email, password) => dispatch(actions.signin(email, password))
    }
}
export default connect(null, mapDispatchToProps)(Signin);