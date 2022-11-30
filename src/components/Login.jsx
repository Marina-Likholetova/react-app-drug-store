import React, { useState } from 'react'
import {Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../features/account/accountSlice";

export default function Login() {
    const users = useSelector((state) => state.users.value);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [values, setValues] = useState({
        email: "",
        password: "",
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        emailError && setEmailError(false);
        passwordError && setPasswordError(false);
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const isUserExist = users.find((el) => el.email === values.email);
        if (isUserExist) {
            if (isUserExist.password === values.password) {
                dispatch(login(isUserExist));
                navigate("/");
            } else {
                setPasswordError(true)
            }

        } else {
            setEmailError(true);
        }
    };


    return (
        <div className="content-wrapper form-container">
            <Link className="primary-link" to="/">
                Back to Homepage
            </Link>

            <div className="userForm">
                <h2 className="title">Sign In</h2>
                <p className="desription">For current customers</p>

                <Stack onSubmit={handleSubmit} component="form" spacing={2} autoComplete="off">
                    <FormControl error={emailError} variant="outlined">
                        <InputLabel htmlFor={emailError ? "component-error" : "outlined-adornment-email"}>
                            Email
                        </InputLabel>
                        <OutlinedInput
                            type="email"
                            id={emailError ? "component-error" : "outlined-adornment-email"}
                            value={values.email}
                            onChange={handleChange("email")}
                            required
                            //   aria-describedby="component-error-text"
                            label="Email"
                        />
                        {emailError && (
                            <FormHelperText id="component-error-text">Invalid email address</FormHelperText>
                        )}
                    </FormControl>

                    <FormControl fullWidth variant="outlined" error={passwordError}>
                        <InputLabel
                            htmlFor={passwordError ? "component-error" : "outlined-adornment-password"}
                        >
                            Password
                        </InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={values.showPassword ? "text" : "password"}
                            value={values.password}
                            onChange={handleChange("password")}
                            required
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {passwordError && (
                            <FormHelperText id="component-error-text">Invalid password</FormHelperText>
                        )}
                    </FormControl>

                    <Link to="/registration" className="primary-link">
                        Create account
                    </Link>

                    <button className="btn" type="submit">
                        Sign in
                    </button>
                </Stack>
            </div>
        </div>
    );
}
