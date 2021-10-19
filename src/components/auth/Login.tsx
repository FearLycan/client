import React from "react";
import axios from "axios";

interface LoginProps {
    renderSignup: () => void;
}

interface APILoginResponse {
    readonly title: string;
    readonly token: string;
}

const Login = ({renderSignup}: LoginProps) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");

    const onSubmit = async () => {
        const response = await axios.post<APILoginResponse>('http://localhost:5000/login', { username, password });
        
        if (response.status === 200) {
            const token = response.data.token;
            localStorage.setItem('token', token);
        }

        // ALBO - nie mieszaj, async/await i Promise.then().catch() - bo po co.

        axios.post<APILoginResponse>('http://localhost:5000/login', { username, password })
            .then(response => {

                if (response.status === 200) {
                    console.log(response.data);
                    console.log(response.data.token);

                    const token = response.data.token;
                    localStorage.setItem('token', token);
                } else {

                }
            })
            .catch(() => console.log('error'));
    };

    return (
        <div style={{height: '300px'}}>
            <h1 className={'text-center text-gray-400 font-bold'}>login</h1>
            <div className={'mb-4'}>
                <label className={'mb-2'} htmlFor={'username'}>Username</label>
                <input className={'w-full px-3 py-2 border border-gray-400 rounded-md'} type={'text'}
                       placeholder={'username'} onChange={(event => setUsername(event.target.value))}
                       name={'username'} id={'username'}/>
            </div>

            <div className={'mb-4'}>
                <label className={'mb-2'} htmlFor={'password'}>Password</label>
                <input className={'w-full px-3 py-2 border border-gray-400 rounded-md'} type={'password'}
                       placeholder={'password'} onChange={(event => setPassword(event.target.value))}
                       name={'password'} id={'password'}/>
            </div>

            <div className={'flex justify-between items-center'}>
                <div>
                    <p>
                        No Account? <span className={'text-green-400 cursor-pointer'}
                                          onClick={renderSignup}>Signup</span>
                    </p>
                </div>
                <button className={'rounded-lg px-6 py-3 font-bold bg-green-400 text-white'}
                        onClick={() => onSubmit()}>Login
                </button>
            </div>
        </div>
    )
}

export default Login;