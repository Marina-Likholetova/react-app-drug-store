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



import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';



const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));


export default function Header(props) {
    const userStatus = useSelector((state) => state.account.value.status);
    const shoppingCarts = useSelector((state) => state.account.value.shoppingCarts);
    const userName = useSelector((state) => state.account.value.name);
    const totalCount = shoppingCarts?.reduce((acc, curr) => acc + curr.count, 0);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const drawerWidth = 240;

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const drawer = (
        <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
            <Typography variant="h6" sx={{ my: 2 }}>
                Menu
            </Typography>
            <Divider />
            <List>
                {headerData.labels.map((item) => (
                    <ListItem
                        key={item.label}
                        disablePadding
                        className="header__item"
                        sx={{ justifyContent: "center" }}
                    >
                        <Link to={item.path}>
                            <ListItemText primary={item.label} />
                        </Link>
                    </ListItem>
                ))}
                <ListItem disablePadding className="header__item" sx={{ justifyContent: "center" }}>
                    <Link to={userStatus ? "shoppinglist" : "/login"}>
                        <StyledBadge badgeContent={totalCount} color="primary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <ListItemText primary="Shopping Cart" />
                    </Link>
                </ListItem>
                <ListItem disablePadding className="header__item" sx={{ justifyContent: "center" }}>
                    <Link to={userStatus ? "/" : "/login"} onClick={() => userStatus && dispatch(logout())}>
                        {userStatus ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
                        <ListItemText primary={userStatus ? "Logout" : "Login"} />
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <>
            <header className="header">
                <AppBar component="nav" color="inherit">
                    <div className="container">
                        <Toolbar
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                width: "100%",
                                padding: { xs: "0", sm: "0" },
                            }}
                        >
                            <div className="logo image-wrapper">
                                <Link to="/">
                                    <img src={headerData.logoImage} alt="logo" />
                                </Link>
                            </div>
                            <IconButton
                                color="primary"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ display: { sm: "none" } }}
                            >
                                <MenuIcon />
                            </IconButton>

                            <Box sx={{ display: { xs: "none", sm: "flex", columnGap: "30px" } }}>
                                <ul className="header__list">
                                    {headerData.labels.map((item) => (
                                        <li className="header__item">
                                            <NavLink to={item.path}>{item.label}</NavLink>
                                        </li>
                                    ))}
                                    {userName && <li>Hi, {userName}</li>}
                                </ul>
                                <ul className="header__list" style={{ columnGap: "10px" }}>
                                    <IconButton
                                        aria-label="shoppingcart"
                                        onClick={() =>
                                            userStatus ? navigate("shoppinglist") : navigate("/login")
                                        }
                                    >
                                        <StyledBadge badgeContent={totalCount} color="primary">
                                            <ShoppingCartIcon />
                                        </StyledBadge>
                                    </IconButton>

                                    <IconButton
                                        aria-label={"account"}
                                        onClick={() =>
                                            userStatus
                                                ? dispatch(logout(), navigate("/"))
                                                : navigate("/login")
                                        }
                                    >
                                        {userStatus ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
                                    </IconButton>
                                </ul>
                            </Box>
                        </Toolbar>
                    </div>
                </AppBar>
                <Box component="nav">
                    <Drawer
                        container={container}
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        anchor="right"
                        ModalProps={{
                            keepMounted: true,
                        }}
                        sx={{
                            display: { xs: "block", sm: "none" },
                            "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Box>
            </header>
        </>
    );
}


Header.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
}