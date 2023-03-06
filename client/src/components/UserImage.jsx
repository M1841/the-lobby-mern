import { Avatar, Box } from "@mui/material";

const UserImage = ({ image, size="60px" }) => {
    return (
        <Box 
            width={size} 
            height={size}
        >
            <Avatar 
                alt="userImage" 
                src={`http://localhost:3001/assets/${image}`} 
                sx={{ 
                    width: size, 
                    height: size,
                    borderRadius: "50%",
                    "&:hover": {
                        cursor: "pointer",
                        borderRadius: "0.33rem"
                    }
                }}
            />
        </Box>
    )
};

export default UserImage;