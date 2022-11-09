import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { headerData } from "../db/headerDb";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/account/accountSlice";

import Badge from "@mui/material/Badge";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";


const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));


export default function Header() {
    const userStatus = useSelector((state) => state.account.value.status);
    const shoppingCarts = useSelector((state) => state.account.value.shoppingCarts);
    const userName = useSelector((state) => state.account.value.name);
    const totalCount = shoppingCarts?.reduce((acc, curr) => acc + curr.count, 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="logo image-wrapper">
                        <Link to="/">
                            <img src={headerData.logoImage} alt="logo" />
                        </Link>
                    </div>
                    <nav>
                        <ul className="header__list">
                            {headerData.labels.map((item) => (
                                <li className="header__item">
                                    <NavLink to={item.path}>{item.label}</NavLink>
                                </li>
                            ))}
                            {userName && <li>Hi, {userName}</li>}
                        </ul>
                        <ul className="header__list" style={{ columnGap: "5px" }}>
                            <IconButton
                                aria-label="shoppingcart"
                                onClick={() => (userStatus ? navigate("shoppinglist") : navigate("/login"))}
                            >
                                <StyledBadge badgeContent={totalCount} color="primary">
                                    <ShoppingCartIcon />
                                </StyledBadge>
                            </IconButton>

                            <IconButton
                                aria-label={"account"}
                                onClick={() => (userStatus ? dispatch(logout()) : navigate("/login"))}
                            >
                                {userStatus ? (
                                    <LogoutRoundedIcon onClick={() => navigate("/")} />
                                ) : (
                                    <LoginRoundedIcon />
                                )}
                            </IconButton>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
}
