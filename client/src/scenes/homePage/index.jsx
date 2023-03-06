import { Box, useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import Navbar from "scenes/navbar";
import UserWidget from "scenes/widgets/UserWidget";
import AddPostWidget from "scenes/widgets/AddPostWidget";

const HomePage = () => {
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    const { _id, picturePath } = useSelector((state) => state.user);

    return (
        <Box>
            <Navbar />
            <Box
                width="100%"
                p="2rem"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="2rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "29.4vw" : undefined}>
                    <UserWidget userId={_id} picturePath={picturePath} />
                </Box>
                <Box 
                    flexBasis={isNonMobileScreen ? "70.6vw" : undefined}
                >
                    <AddPostWidget
                        picturePath={picturePath}
                    />
                </Box>
            </Box>
        </Box>
    );
};

export default HomePage;