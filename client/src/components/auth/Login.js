import React, { useState, useContext, useEffect} from 'react';
import AlerContext from '../../Context/alert/alertContext';
import AuthContext from '../../Context/auth/authContext';

const Login = (props) => {
    const alertContext = useContext(AlerContext);
    const authContext = useContext(AuthContext);

    const { setAlert } = alertContext;
    const { login, error, clearErrors, isAuthentificated } = authContext;

    useEffect(() => {
        if(isAuthentificated){
            props.history.push('/')
        }
        if(error === 'Invalid Credentials.'){
            setAlert(error, 'danger');
            clearErrors()
        }
        // eslint-disable-next-line
    }, [error, isAuthentificated, props.history]);

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { email, password } = user;
    const onChange = e => setUser({...user, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        if(email === '' || password === ''){
            setAlert('Please fill out forms', 'danger')
        } else{
            login({
                email,
                password
            })
        }
        
    }
    return(
        <div className="form-container">
            <h1>Login</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={onChange}
                    name="email" value={email} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" onChange={onChange}
                    name="password" value={password} required minLength="6" />
                </div>
                <input type="submit" value="Login" className="btn btn-primary btn-block" />
            </form>
        </div>
    )
}

export default Login;