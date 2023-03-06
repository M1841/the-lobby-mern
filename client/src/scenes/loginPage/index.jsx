import { 
    Box,
    Typography, 
    useTheme, 
    useMediaQuery
} from "@mui/material";
import { Apartment } from "@mui/icons-material";
import Form from "./Form";

const LoginPage = () => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const alt = theme.palette.background.alt;
    const primary = theme.palette.primary.main;

    return (
        <Box pt="3.33rem">
            <Box
                width={ isNonMobileScreen ? "500px" : "80%" }
                minWidth={ isNonMobileScreen ? "500px" : "300px"}
                maxWidth="500px"
                p="2rem"
                m="auto"
                borderRadius="0.33rem"
                backgroundColor={alt}
            >
                
                <Box pb="2rem" textAlign="center">
                    {/* App Logo */}
                    <Typography
                        fontWeight="700"
                        fontSize="clamp(1rem, 2rem, 2.25rem)"
                        fontFamily="Play, sans-serif"
                    >
                        <span
                            style={{
                                backgroundColor: primary,
                                borderRadius: "0.25rem",
                                padding: "0 0.507rem",
                                marginRight: "0.5rem",
                                color: "#fafafa"
                            }}
                        >
                            <Apartment/>
                        </span>
                        The Lobby
                    </Typography>
                </Box>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;