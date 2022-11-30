import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Badge, Box, Divider, Drawer, List, ListItem, ListItemText, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginRoundedIcon from "@mui/icons-material/LoginRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { headerData } from "../../db/headerDb";
import { logout } from "../../features/account/accountSlice";



const StyledBadge = styled(Badge)(({ theme }) => ({
    "& .MuiBadge-badge": {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: "0 4px",
    },
}));


export default function DrawerMenu({ mobileOpen, handleDrawerToggle }) {
    const userStatus = useSelector((state) => state.account.value.status);
    const shoppingCarts = useSelector((state) => state.account.value.shoppingCarts);
    const totalCount = shoppingCarts?.reduce((acc, curr) => acc + curr.count, 0);
    const theme = useSelector((state) => state.theme.mode);
    const dispatch = useDispatch();

    const drawerWidth = 240;

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
                        <Link to={item.path} className={`${theme}-theme-link `}>
                            <ListItemText primary={item.label} />
                        </Link>
                    </ListItem>
                ))}
                <ListItem disablePadding className="header__item" sx={{ justifyContent: "center" }}>
                    <Link to={userStatus ? "shoppinglist" : "/login"} className={`${theme}-theme-link `}>
                        <StyledBadge badgeContent={totalCount} color="primary">
                            <ShoppingCartIcon />
                        </StyledBadge>
                        <ListItemText primary="Shopping Cart" />
                    </Link>
                </ListItem>
                <ListItem disablePadding className="header__item" sx={{ justifyContent: "center" }}>
                    <Link
                        to={userStatus ? "/" : "/login"}
                        className={`${theme}-theme-link `}
                        onClick={() => userStatus && dispatch(logout())}
                    >
                        {userStatus ? <LogoutRoundedIcon /> : <LoginRoundedIcon />}
                        <ListItemText primary={userStatus ? "Logout" : "Login"} />
                    </Link>
                </ListItem>
            </List>
        </Box>
    );

    
    return (
        <>
            <Drawer
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
        </>
    );
}


