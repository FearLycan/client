import React from "react";
import axios from "axios";

interface SignupProps {
    renderLogin: () => void;
}

const Signup = ({renderLogin}: SignupProps) => {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [disabled, setDisabled] = React.useState(false);

    const onSubmit = async () => {
        console.log(username, password);
        axios.post('http://localhost:5000/signup', {
            username: username,
            password: password,
        }).then(response => console.log(response));
    };

    React.useEffect(() => {
        if (password == confirmPassword) {
            setDisabled(false);
        } else {
            setDisabled(true);
        }
    })

    return (
        <div style={{height: '300px'}}>
            <h1 className={'text-center text-gray-400 font-bold'}>singup</h1>
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

            <div className={'mb-4'}>
                <label className={'mb-2'} htmlFor={'confirm-password'}>Confirm password</label>
                <input className={'w-full px-3 py-2 border border-gray-400 rounded-md'} type={'password'}
                       placeholder={'confirm password'} onChange={(event => setConfirmPassword(event.target.value))}
                       name={'confirm-password'} id={'confirm-password'}/>
            </div>

            <div className={'flex justify-between items-center'}>
                <div>
                    <p>
                        Already a member? <span className={'text-green-400 cursor-pointer'}
                                                onClick={renderLogin}>Login</span>
                    </p>
                </div>
                <button
                    className={`rounded-lg px-6 py-3 font-bold text-white ${disabled ? "bg-gray-400" : 'bg-green-400'}`}
                    disabled={disabled} onClick={() => onSubmit()}>
                    Signup
                </button>
            </div>
        </div>
    )
}

export default Signup;