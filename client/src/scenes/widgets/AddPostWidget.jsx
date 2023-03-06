import {
    EditOutlined,
    Delete,
    AttachFile,
    GifBox,
    Image,
    Mic,
    MoreHoriz,
} from "@mui/icons-material";
import {
    Box,
    Divider,
    Typography,
    InputBase,
    useTheme,
    Button,
    IconButton,
    useMediaQuery,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Dropzone from "react-dropzone";
import UserImage from "components/UserImage";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import WidgetWrapper from "components/WidgetWrapper";

const AddPostWidget = ({ picturePath }) => {
    const dispatch = useDispatch();
    const [isImage, setIsImage] = useState(false);
    const [image, setImage] = useState(null);
    const [text, setText] = useState("");
    const { _id } = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const mediumDark = theme.palette.neutral.mediumDark;
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const hover = theme.palette.background.hover;
    const alt = theme.palette.background.alt;

    const handlePost = async () => {
        const formData = new FormData();
        formData.append("userId", _id);
        formData.append("description", text);
        if(image) {
            formData.append("picture", image);
            formData.append("picturePath", image.name);
        }
        const response = await fetch("http://localhost:3001/posts", {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData
        });
        const posts = await response.json();
        dispatch(setPosts({ posts }));
        setImage(null);
        setText("")
    };
    return (
        <WidgetWrapper>
            <FlexBetween gap="1.5rem">
                <UserImage picturePath={picturePath} />
                <InputBase 
                    placeholder="What's on your mind?"
                    onChange={(e) => setText(e.target.value)}
                    value={text}
                    sx={{
                        width: "100%",
                        backgroundColor: background,
                        borderRadius: "0.33rem",
                        padding: "0.5rem 1rem"
                    }}
                />
            </FlexBetween>
            {isImage && (
                <Box
                    gridColumn="span 4"
                    borderRadius="0.33rem"
                    backgroundColor={background}
                    p="0.5rem"
                >
                    <Dropzone
                        acceptedFiles=".jpg,.jpeg,.png"
                        multiple={false}
                        onDrop={(acceptedFiles) => 
                            setImage(acceptedFiles[0])
                        }
                    >
                        {({ getRootProps, getInputProps}) => (
                            <FlexBetween>
                                <Box
                                    {...getRootProps()}
                                    p="1rem"
                                    borderRadius="0.25rem"
                                    sx={{
                                        border:"2px dashed grey",
                                        "&:hover": {
                                            cursor: "pointer",
                                            background: hover,
                                            borderColor: secondary
                                        }
                                    }}
                                >
                                    <input {...getInputProps()}/>
                                    { !image ? (
                                        <p style={{margin: 0, color:mediumDark}}>Add Image</p>
                                    ) : (
                                        <FlexBetween>
                                            <Typography>
                                                { 
                                                    image.name.slice(0, window.innerWidth / 36) + ( 
                                                        image.name.length <= window.innerWidth / 36 ? 
                                                            "" : 
                                                            " [...] " + (
                                                                image.name.slice(-4) === "jpeg" ?
                                                                    ".jpeg" :
                                                                    image.name.slice(-4)
                                                            )
                                                    ) 
                                                }
                                            </Typography>
                                            <EditOutlined/>
                                        </FlexBetween>
                                    )}
                                </Box>
                                {image && (
                                    <IconButton
                                        onClick={() => setImage(null)}
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
                                        <Delete sx={{ fontSize: "25px"}}/>
                                    </IconButton>
                                )}
                            </FlexBetween>
                        )}
                    </Dropzone>
                </Box>  
            )}
        </WidgetWrapper>
    );
}

export default AddPostWidget;