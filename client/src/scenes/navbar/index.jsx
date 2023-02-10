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
    useMediaQuery
} from "@mui/material";
import {
    Search,
    DarkMode,
    LightMode,
    Notifications,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch,useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";

const Navbar = () => {
    const [isMobileMenuToggle, setIsMobileMenuToggle] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const user = useSelector((state) => state.user);
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const alt = theme.palette.background.alt;

    //const fullName = `${user.firstName} ${user.lastName}`;
    const fullName = "Mihai Muresan";

    return (
        <FlexBetween padding="1rem 2rem" backgroundColor={alt}>
            <FlexBetween gap="1.75rem">
                <Typography
                    fontWeight="700"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    fontFamily="Play, sans-serif"
                    color="dark"
                    onClick={() => navigate("/home")}
                    sx={{
                        "&:hover": {
                            color: dark,
                            cursor: "pointer",
                        }
                    }}
                    
                >
                    The Lobby
                </Typography>
            </FlexBetween>
            
            { isNonMobileScreens && (
                    <FlexBetween 
                        backgroundColor={ background } 
                        borderRadius="9px" 
                        gap="0rem" 
                        padding="0.1rem"
                        width="33.3vw"
                    >
                        <InputBase 
                        placeholder="Search"
                        sx={{
                            p: "0rem 0rem 0rem 0.75rem"
                        }}
                        fullWidth={true}
                        />
                        <IconButton>
                            <Search />
                        </IconButton>
                    </FlexBetween>
                )
            }
            
            {/* Desktop Nav */}
            { isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton sx={{ fontSize: "25px" }}>
                        <Notifications sx={{ fontSize: "25px"}}/>
                    </IconButton>
                    <FormControl variant="standard" value={ fullName }>
                        <Select
                            value={ fullName }
                            sx={{
                                backgroundColor: alt,
                                p: "0.25rem 1rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem"
                                },
                                "& .MuiSelect-select:focus": {
                                    backgroundColor: alt
                                },
                            }}
                            input={<InputBase/>}
                        >
                            <MenuItem value={ fullName }>
                                <Typography>{ fullName }</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>
                                Log Out
                            </MenuItem>
                        </Select>
                    </FormControl>
                    <IconButton onClick={() => dispatch(setMode())}>
                        { theme.palette.mode === "dark" ? (
                            <DarkMode sx={{ fontSize: "25px"}}/>
                            ) : (
                                <LightMode sx={{ fontSize: "25px"}}/>
                            )
                        }
                    </IconButton>
                </FlexBetween>
                ) : (
                    <IconButton
                        onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
                    >
                        <Menu />
                    </IconButton>
                )}

            {/* Mobile Nav */}
            {!isNonMobileScreens && isMobileMenuToggle && (
                <Box
                    position="fixed"
                    right="0"
                    bottom="0"
                    height="100%"
                    width="100%"
                    zIndex="10"
                    backgroundColor={ alt }
                >
                    {/* Close Icon */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton
                            onClick={() => setIsMobileMenuToggle(!isMobileMenuToggle)}
                        >
                            <Close />
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    
                    <FlexBetween 
                            display="flex" 
                            flexDirection="column" 
                            justifyContent="center"
                            alignItems="center"
                            gap="3rem"
                        >
                        <FlexBetween 
                            backgroundColor={ background } 
                            borderRadius="9px" 
                            gap="0rem" 
                            padding="0.1rem"
                            width="66.6vw"
                        >
                            <InputBase 
                            placeholder="Search"
                            sx={{
                                p: "0rem 0rem 0rem 0.75rem"
                            }}
                            fullWidth={true}
                            />
                            <IconButton>
                                <Search />
                            </IconButton>
                        </FlexBetween>
                        <IconButton sx={{ fontSize: "25px" }}>
                            <Notifications sx={{ fontSize: "25px"}}/>
                        </IconButton>
                        <FormControl variant="standard" value={ fullName }>
                            <Select
                                value={ fullName }
                                sx={{
                                    backgroundColor: alt,
                                    p: "0.25rem 1rem",
                                    "& .MuiSvgIcon-root": {
                                        pr: "0.25rem"
                                    },
                                    "& .MuiSelect-select:focus": {
                                        backgroundColor: alt
                                    },
                                }}
                                input={<InputBase/>}
                            >
                                <MenuItem value={ fullName }>
                                    <Typography>{ fullName }</Typography>
                                </MenuItem>
                                <MenuItem onClick={() => dispatch(setLogout())}>
                                    Log Out
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <IconButton 
                            sx={{ fontSize: "25px" }}
                            onClick={() => dispatch(setMode())}
                        >
                            { theme.palette.mode === "dark" ? (
                                <DarkMode sx={{ fontSize: "25px"}}/>
                                ) : (
                                    <LightMode sx={{ fontSize: "25px"}}/>
                                )
                            }
                        </IconButton>
                    </FlexBetween>
                </Box>
            )}

        </FlexBetween>
    );
};

export default Navbar;