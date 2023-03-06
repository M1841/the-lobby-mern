import { useState } from "react";
import {
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery,
    Slide
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Notifications,
    Menu,
    Close,
    Apartment
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;
    const primary = theme.palette.primary.main;
    const hover = theme.palette.background.hover;

    const fullName = (user === null ? "John Doe" :`${user.firstName} ${user.lastName}`);

    return (
        <FlexBetween>
            <FlexBetween p="0.75rem 1.5rem" width="100vw" zIndex="100" backgroundColor={alt}>
                {/* App Logo */}
                <FlexBetween 
                        onClick={() => navigate("/home")}
                        p="0 0.45rem"
                        gap="1rem"
                        zIndex="100"
                        position="relative"
                        color={dark}
                        sx={{ 
                            "&:hover": {
                                backgroundColor: hover,
                                borderRadius: "0.33rem",
                                cursor: "pointer"
                            }
                        }}
                >
                    <Typography 
                        fontWeight="700"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        fontFamily="Play, sans-serif"
                    >
                        <span 
                            style={{
                                backgroundColor: primary,
                                borderRadius: "0.33rem",
                                padding: "0 0.507rem",
                                marginRight: "0.5rem",
                                color: "#fafafa"
                            }}>
                            <Apartment/>
                        </span>
                        The Lobby
                    </Typography>
                </FlexBetween>
                
                { isNonMobileScreen && (
                    /* Desktop Search Bar */
                    <FlexBetween 
                        p="0rem"
                        gap="0rem"
                        width="33.3%"
                        sx={{
                            borderRadius: "0.33rem",
                            background: background,
                            "&:hover": {
                                background: hover
                            }
                        }}
                    >
                        <InputBase 
                            fullWidth
                            placeholder="Search"
                            sx={{ 
                                p: "0", 
                                pl: "0.5rem",
                                m: "0.25rem", 
                                mr: 0, 
                                color: dark
                            }}
                        />
                        <IconButton
                            disableRipple  
                            sx={{ 
                                borderTopRightRadius:"0.33rem",
                                borderBottomRightRadius:"0.33rem",
                                borderTopLeftRadius: "0",
                                borderBottomLeftRadius: "0",
                                color: dark,
                                "&:hover": {
                                    background: primary,
                                    color: "#fafafa"
                                }
                            }}
                        >
                            <Search sx={{ fontSize: "25px"}}/>
                        </IconButton>
                    </FlexBetween>
                    )
                }
                
                {/* Desktop Nav */}
                { isNonMobileScreen ? (
                    /* Navbar Items */
                    <FlexBetween gap="1rem">
                        {/* Notifications Button */}
                        <IconButton
                            disableRipple 
                            sx={{ 
                                borderRadius:"0.33rem",
                                color: dark,
                                "&:hover": {
                                    background: hover
                                }
                            }}
                        >
                            <Notifications sx={{ fontSize: "25px"}}/>
                        </IconButton>

                        {/* Menu Dropdown */}
                        <FormControl 
                            variant="standard" 
                            value={ fullName }
                            sx={{ 
                                "&:hover":{ 
                                    background: hover 
                                } 
                            }}
                        >
                            <Select
                                value={ fullName }
                                sx={{
                                    fontWeight: "700",
                                    background: alt,
                                    "& .MuiSvgIcon-root": {
                                        color: dark,
                                        position: "relative",
                                        left: "-1.41rem"
                                    },
                                    "& .MuiSelect-select": {
                                        p: "0.6rem",
                                        ml: "1.25rem",
                                        borderRadius: "0.33rem",
                                        "&:hover":{
                                            background: hover
                                        },
                                        "&:focus": {
                                            background: "#00000000",
                                            borderRadius: "0.33rem",
                                            "&:hover":{
                                                background: hover
                                            }
                                        }
                                    }
                                }}
                                inputProps={{
                                    MenuProps: {
                                        MenuListProps: {
                                            sx: {
                                                backgroundColor: background,
                                                "& .MuiMenuItem-root": {
                                                    "&:hover": {
                                                        background: hover
                                                    }
                                                },
                                                "& .MuiMenuItem-root.Mui-selected": {
                                                    background: background,
                                                    "&:hover": {
                                                        background: hover
                                                    },
                                                    "&:focus": {
                                                        background: "#00000000",
                                                        "&:hover":{
                                                            background: hover
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }}
                                input={<InputBase/>}
                            >
                                <MenuItem disableRipple  value={ fullName }>
                                    <Typography>{ fullName }</Typography>
                                </MenuItem>
                                <MenuItem disableRipple >
                                    Settings
                                </MenuItem>
                                <MenuItem disableRipple  onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>

                        {/* Theme Button */}
                        <IconButton 
                            disableRipple 
                            onClick={() => dispatch(setMode())}
                            sx={{ 
                                borderRadius: "0.33rem",
                                color: dark,
                                "&:hover": {
                                    background: hover
                                }
                            }}
                        >
                            { theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px" }}/>
                                ) : (
                                    <LightMode sx={{ fontSize: "25px" }}/>
                                )
                            }
                        </IconButton>
                    </FlexBetween>
                    ) : (
                        /* Menu Toggle Button*/
                        <FlexBetween gap="0.2rem" zIndex="99" position="relative">
                            <IconButton
                                disableRipple
                                onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)} 
                                sx={{
                                    borderRadius: "0.33rem",
                                    color: dark,
                                    "&:hover":{
                                        background: hover
                                    }
                                }}
                            >
                                {!isMobileMenuToggled ? (
                                    <Menu sx={{ fontSize: "25px" }}/>
                                ) : (
                                    <Close sx={{ fontSize: "25px" }}/>
                                )}
                            </IconButton>
                        </FlexBetween>
                    )}
            </FlexBetween>

            {/* Mobile Nav */}
            {!isNonMobileScreen && (
                    <Slide direction="down" in={isMobileMenuToggled}  zIndex="99" position="absolute" width="100%" height="100vh" 
                        timeout={{
                            appear: 333,
                            enter: 333,
                            exit: 333
                        }}
                        sx={{ background: "#00000000" }}
                    >
                        <Box
                            position="fixed"
                            right="0"
                            top="0"
                            width="100%"
                            height="100vh"
                        >

                            {/* Navbar Items */}
                            <FlexBetween 
                                display="flex" 
                                flexDirection="column" 
                                justifyContent="center"
                                alignItems="center"
                                gap="2rem"
                                padding="2.75rem 0rem" 
                                sx={{
                                    background: alt
                                }}
                            >
                                {/* Empty Container*/}
                                <FlexBetween padding="1rem 2rem"></FlexBetween>

                                {/* Mobile Search Bar */}
                                <FlexBetween 
                                    p="0rem"
                                    gap="0rem"
                                    width="66.6%"
                                    sx={{
                                        borderRadius: "0.33rem",
                                        background: background,
                                        "&:hover": {
                                            background: hover
                                        }
                                    }}
                                >
                                    <InputBase 
                                        fullWidth
                                        placeholder="Search"
                                        sx={{ 
                                            p: "0", 
                                            pl: "0.5rem",
                                            m: "0.25rem", 
                                            mr: 0, 
                                            color: dark
                                        }}
                                    />
                                    <IconButton
                                        disableRipple  
                                        sx={{ 
                                            borderTopRightRadius:"0.33rem",
                                            borderBottomRightRadius:"0.33rem",
                                            borderTopLeftRadius: "0",
                                            borderBottomLeftRadius: "0",
                                            color: dark,
                                            "&:hover": {
                                                background: primary,
                                                color: "#fafafa"
                                            }
                                        }}
                                    >
                                        <Search sx={{ fontSize: "25px"}}/>
                                    </IconButton>
                                </FlexBetween>
                                
                                {/* Notifications Button */}
                                <IconButton
                                    disableRipple 
                                    sx={{ 
                                        borderRadius:"0.33rem",
                                        color: dark,
                                        "&:hover": {
                                            background: hover
                                        }
                                    }}
                                >
                                    <Notifications sx={{ fontSize: "25px"}}/>
                                </IconButton>
                                
                                {/* Menu Dropdown */}
                                <FormControl 
                                    variant="standard" 
                                    value={ fullName }
                                    sx={{ 
                                        "&:hover":{ 
                                            background: hover 
                                        } 
                                    }}
                                >
                                    <Select
                                        value={ fullName }
                                        sx={{
                                            fontWeight: "700",
                                            background: alt,
                                            "& .MuiSvgIcon-root": {
                                                color: dark,
                                                position: "relative",
                                                left: "-1.41rem"
                                            },
                                            "& .MuiSelect-select": {
                                                p: "0.6rem",
                                                ml: "1.25rem",
                                                borderRadius: "0.33rem",
                                                "&:hover":{
                                                    background: hover
                                                },
                                                "&:focus": {
                                                    background: "#00000000",
                                                    borderRadius: "0.33rem",
                                                    "&:hover":{
                                                        background: hover
                                                    }
                                                }
                                            }
                                        }}
                                        inputProps={{
                                            MenuProps: {
                                                MenuListProps: {
                                                    sx: {
                                                        backgroundColor: background,
                                                        "& .MuiMenuItem-root": {
                                                            "&:hover": {
                                                                background: hover
                                                            }
                                                        },
                                                        "& .MuiMenuItem-root.Mui-selected": {
                                                            background: background,
                                                            "&:hover": {
                                                                background: hover
                                                            },
                                                            "&:focus": {
                                                                background: "#00000000",
                                                                "&:hover":{
                                                                    background: hover
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }}
                                        input={<InputBase/>}
                                    >
                                        <MenuItem disableRipple  value={ fullName }>
                                            <Typography>{ fullName }</Typography>
                                        </MenuItem>
                                        <MenuItem disableRipple >
                                            Settings
                                        </MenuItem>
                                        <MenuItem disableRipple  onClick={() => dispatch(setLogout())}>
                                            Log Out
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                                
                                {/* Theme Button */}
                                <IconButton 
                                    disableRipple 
                                    onClick={() => dispatch(setMode())}
                                    sx={{ 
                                        borderRadius: "0.33rem",
                                        color: dark,
                                        "&:hover": {
                                            background: hover
                                        }
                                    }}
                                >
                                    { theme.palette.mode === "dark" ? (
                                        <DarkMode sx={{ fontSize: "25px" }}/>
                                        ) : (
                                            <LightMode sx={{ fontSize: "25px" }}/>
                                        )
                                    }
                                </IconButton>
                            </FlexBetween>
                        </Box>
                    </Slide>
            )}

        </FlexBetween>
    );
};


export default Navbar;