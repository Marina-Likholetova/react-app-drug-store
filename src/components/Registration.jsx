import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addNewUser } from "../features/users/usersSlice";

import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import Alert from '@mui/material/Alert';
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";


const inputs = {
    name: {
        type: "text",
        value: "",
        label: "Name",
        prop: "name",
        error: false,
    },
    fullname: {
        type: "text",
        value: "",
        label: "Full Name",
        prop: "fullname",
        error: false,
    },
    email: {
        type: "email",
        value: "",
        label: "Email",
        prop: "email",
        error: false,
    },
    password: {
        type: "password",
        value: "",
        label: "Password",
        prop: "password",
        error: false,
        showPassword: false,
    },
    passwordVerify: {
        type: "password",
        value: "",
        label: "Password",
        prop: "passwordVerify",
        error: false,
        showPassword: false,
    },
};

export default function Registration() {
    const users = useSelector((state) => state.users.value);
    const [values, setValues] = useState(inputs);
    const [isUserExist, setUserExist] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (prop, payload) => (e) => {
        isUserExist && setUserExist(false);
        setValues({ ...values, [prop]: { ...payload, value: e.target.value, error: false } });
    };

    const handleClickShowPassword = (prop, payload) => (e) => {
        setValues({ ...values, [prop]: payload });
    };

    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (values.password.value === values.passwordVerify.value) {
            const isUserExist = users.find((el) => el.email === values.email.value);

            if (isUserExist) {
                setUserExist(true);
            } else {
                setIsSuccess(true);
                dispatch(
                    addNewUser({
                        name: values.name.value,
                        email: values.email.value,
                        password: values.password.value,
                    })
                );
                setTimeout(() => navigate("/login"), 800);
            }
        } else {
            setValues({ ...values, passwordVerify: { ...values.passwordVerify, error: true } });
        }
    };

    return (
        <div className="content-wrapper form-container">
            <Link className="primary-link" to="/">
                Back to Homepage
            </Link>
            <div className="userForm" onSubmit={handleSubmit}>
                <h2 className="title">Quick Registration</h2>
                <p className="desription">For new customers</p>
                <Stack onSubmit={handleSubmit} component="form" spacing={2} autoComplete="off">
                    {isUserExist && <Alert severity="error">User exists already!</Alert>}
                    {isSuccess && <Alert severity="success">Your registration is successful!</Alert>}
                    {Object.values(values).map((item, i) => (
                        <FormControl fullWidth variant="outlined" error={item.error} key={i}>
                            <InputLabel
                                htmlFor={
                                    item.error
                                        ? "component-error"
                                        : `outlined-adornment-${item.prop.toLocaleLowerCase()}`
                                }
                            >
                                {item.label}
                            </InputLabel>
                            <OutlinedInput
                                id={`outlined-adornment-${item.prop.toLocaleLowerCase()}`}
                                type={item.type === "password" && item.showPassword ? "text" : item.type}
                                value={item.value}
                                onChange={handleChange(`${item.prop}`, item)}
                                required
                                endAdornment={
                                    item.type === "password" && (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword(item.prop, {
                                                    ...item,
                                                    showPassword: !item.showPassword,
                                                })}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {item.showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }
                                label={item.label}
                            />
                            {item.error && (
                                <FormHelperText id="component-error-text">
                                    {item.prop === "passwordVerify"
                                        ? `Passwords do not match`
                                        : `Invalid ${item.label.toLowerCase()}`}
                                </FormHelperText>
                            )}
                        </FormControl>
                    ))}

                    <Link className="primary-link" to="/login">
                        Login
                    </Link>
                    <button className="btn" type="submit">
                        Create Account
                    </button>
                </Stack>
            </div>
        </div>
    );
}
