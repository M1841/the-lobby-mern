import {
    ManageAccounts,
    EditOutlined,
    InfoOutlined,
    Logout
} from "@mui/icons-material";
import { 
    Box, 
    Typography, 
    Divider, 
    useTheme,
    IconButton,
    Badge
} from "@mui/material";
import UserImage from "components/UserImage";
import FlexBetween from "components/FlexBetween";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import "flag-icon-css/css/flag-icons.min.css";
import { setLogout } from "state";

const UserWidget = ({ userId, picturePath }) => {
    const currentUser = useSelector((state) => state.user);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);

    const theme = useTheme();
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const mediumDark = theme.palette.neutral.mediumDark;
    const alt = theme.palette.background.alt;
    const primary = theme.palette.primary.main;
    const hover = theme.palette.background.hover;

    const getUser = async () => {
        const response = await fetch(`http://localhost:3001/users/${userId}`, 
            {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        const data = await response.json();
        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if(!user) {
        return null;
    }

    const {
        firstName,
        lastName,
        email,
        username,
        description,
        location,
        followers,
        followees
    } = user;

    const flagIconClass = (location !== "" ? `flag-icon flag-icon-${location.toLowerCase()}` : "");

    const flagIcon = (
        location !== "" ? ( 
            <span className={flagIconClass} style={{borderRadius: "0.15rem"}}></span> 
        ) : (
                <></> 
            )
    )

    return (
        <WidgetWrapper>
            <FlexBetween>
                <FlexBetween gap="1rem">
                    <Badge 
                        badgeContent={flagIcon} 
                        overlap="circular" 
                        sx={{
                            "& .MuiBadge-bagde": {
                                background: "#00000000",
                            }
                        }}
                    >
                        <Box onClick={() => navigate(`/profile/${userId}`)} >
                            <UserImage image={picturePath} size="5rem"/>
                        </Box>
                    </Badge>
                    <Box>
                        <FlexBetween>
                            <Typography 
                                variant="h4"
                                color={dark}
                                p="0.2rem 0.4rem"
                                fontWeight="600"
                                sx={{
                                    borderRadius: "0.33rem",
                                    "&:hover": {
                                        background: hover,
                                        cursor: "pointer"
                                    }
                                }}
                                onClick={() => navigate(`/profile/${userId}`)}
                            >
                                {firstName} {lastName}
                            </Typography>
                        </FlexBetween>
                        <Typography color={mediumDark} p="0 0.4rem">
                            {followers.length} Followers
                        </Typography>
                        <Typography color={mediumDark} p="0 0.4rem">
                            {followees.length} Following
                        </Typography>
                    </Box>
                </FlexBetween>

                {currentUser._id === userId ? (
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
                        <ManageAccounts sx={{ fontSize: "25px"}}/>
                    </IconButton>
                ) : (
                    <></>
                )}


            </FlexBetween>

            {/*
            { description === "" ? ( <></> ) : (
                    <>
                    <Divider />
                    <Box 
                        display="flex"
                        alignItems="center"
                        gap="1rem"
                        mb="0.5rem"
                    >
                        <InfoOutlined
                            sx={{
                                fontSize: "25px",
                                color: dark
                            }}
                        />
                        <Typography color={dark}> {description} </Typography>
                    </Box>

                    </>
                )
            }
            */}

        </WidgetWrapper>
    );
};

export default UserWidget;
