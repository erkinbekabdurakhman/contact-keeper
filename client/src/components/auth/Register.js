import React, { useState, useContext, useEffect } from 'react';
import AlerContext from '../../Context/alert/alertContext';
import AuthContext from '../../Context/auth/authContext';

const Register = (props) => {
    const alertContext = useContext(AlerContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { register, error, clearErrors, isAuthentificated } = authContext;

    useEffect(() => {
        if(isAuthentificated){
           props.history.push('/');
        }
        if(error === 'User already exists'){
            setAlert(error, 'danger');
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthentificated, props.history])
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    })

    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();
        
        if(name === '' || email === '' || password === ''){
            setAlert('Please enter all fields', 'danger')
        } else if(password !== password2){
            setAlert('Password do not match', 'danger');
            clearErrors();
        } else {
            register({
                name,
                email,
                password,
                password2
            })
        }
        
    }
    return(
        <div className="form-container">
            <h1>
                Account <span className="text-primary"> Register</span>
            </h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={name}
                    onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" value={email}
                    onChange={onChange} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" value={password}
                    onChange={onChange} minLength="6" required />
                </div>
                <div className="form-group">
                    <label htmlFor="password2">Repeat Password</label>
                    <input type="password" name="password2" value={password2}
                    onChange={onChange} minLength="6" required />
                </div>
                <input type="submit" value="Register" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Register;