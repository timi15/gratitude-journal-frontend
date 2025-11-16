import React, {useContext, useState} from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    IconButton,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    Menu
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import {Outlet, useNavigate} from "react-router-dom";
import {AuthContext} from "../context/auth/Auth";

export const Layout = () => {

    const navigate = useNavigate();
    const {userRole, logout} = useContext(AuthContext);

    const pages = [
        {name: 'Home', route: '/home'},
    ];

    const adminPages = [
        {name: 'Home', route: '/home'},
        {name: 'Users', route: '/users'}
    ];

    const settings = [
        {name: 'Logout', route: '/logout'},
    ];

    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleNavRoute = (route) => {
        navigate(route);
        setAnchorElNav(null);
    };

    const handleUserRoute = (route) => {
        navigate(route);
        setAnchorElUser(null);
    };

    return (
        <React.Fragment>
            <AppBar position="static" style={{backgroundColor: '#182929'}}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
                            </IconButton>

                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                open={Boolean(anchorElNav)}
                                onClose={() => setAnchorElNav(null)}
                                sx={{display: {xs: 'block', md: 'none'}}}
                            >
                                {(userRole === "ROLE_ADMIN" ? adminPages : pages).map((page, index) => (
                                    <MenuItem key={index} onClick={() => handleNavRoute(page.route)}>
                                        <Typography sx={{textAlign: 'center', marginRight: '20px'}}>
                                            {page.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>


                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {(userRole === "ROLE_ADMIN" ? adminPages : pages).map((page, index) => (
                                <Button
                                    key={index}
                                    onClick={() => handleNavRoute(page.route)}
                                    sx={{my: 2, color: 'white', display: 'block', marginRight: '20px', width: '10rem'}}
                                >
                                    {page.name}
                                </Button>
                            ))}
                        </Box>


                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="User" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>

                            <Menu
                                sx={{mt: '45px'}}
                                id="user-menu"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                open={Boolean(anchorElUser)}
                                onClose={() => setAnchorElUser(null)}   // <-- FIXED
                            >
                                {settings.map((setting, index) => (
                                    <MenuItem key={index} onClick={() => {
                                        if (setting.route === '/logout') {
                                            logout();
                                            navigate("/login");
                                        } else {
                                            handleUserRoute(setting.route);
                                        }
                                    }}>
                                        <Typography sx={{textAlign: 'center'}}>
                                            {setting.name}
                                        </Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                    </Toolbar>
                </Container>
            </AppBar>

            <Outlet/>

        </React.Fragment>
    );
};
