import React, { useEffect } from 'react'
import './middle.css'
import { useState, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Middle() {
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    const passwordRef = useRef()

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    const showPassword = () => {
        passwordRef.current.type = "text"
    }

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const savePassword = (e) => {
        console.log("savePassword called");

        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const newPasswords = [...passwordArray, { ...form, id: uuidv4() }]
            setPasswordArray(newPasswords);
            localStorage.setItem("passwords", JSON.stringify(newPasswords))
            console.log(...passwordArray)
            setForm({ site: "", username: "", password: "" })
            toast('Password saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            toast('Error: Password not saved!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you want to really delete this password!!")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
            toast('Password Deleted!', {
                position: "top-right",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }

    return (
        <>
            <ToastContainer />
            <div className='middle'>
                <h1> &lt;Pass<span>OP/&gt;</span></h1>
                <p>Your own Password manager</p>
                <ul className='input'>
                    <li className='url'>
                        <input value={form.site} onChange={handleChange} type="text" name="site" placeholder='Enter URL' />
                    </li>
                    <li className='userpass'>
                        <input value={form.username} onChange={handleChange} type="text" name="username" className="username" placeholder='Enter Username' />
                        <input ref={passwordRef} value={form.password} onChange={handleChange} type="text" name="password" className="password" placeholder='Enter Password' />
                    </li>
                    <li><button onClick={savePassword}>Save Password</button></li>
                </ul>
                <div className="tablehead">
                    <h2>Your Passwords</h2>
                    <div className="table">
                        <table>
                            <thead>
                                <tr>
                                    <th>Site</th>
                                    <th>Username</th>
                                    <th>Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td>
                                            <a className='deco' href={item.site} target='_blank'>{item.site}</a>
                                        </td>
                                        <td>
                                            <span>{item.username}</span>
                                        </td>
                                        <td>
                                            <span onClick={() => { deletePassword(item.id) }} style={{ display: "flex", justifyContent: "center", gap: "15px", cursor: "pointer" }}>{item.password} <img src="./delete.svg" alt="delete" /></span>


                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Middle