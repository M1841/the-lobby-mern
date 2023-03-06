import { useEffect, useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme
} from "@mui/material";
import {EditOutlined } from "@mui/icons-material";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setLogin } from "state";
import Dropzone from "react-dropzone";
import FlexBetween from "components/FlexBetween";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});

const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    picture: ""
};

const initialValuesLogin = {
    email: "",
    password: ""
};

const Form = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const [pageType, setPageType] = useState("login");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isNonMobileScreen = useMediaQuery("(min-width:750px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const theme = useTheme();
    const background = theme.palette.background.default;
    const dark = theme.palette.neutral.dark;
    const mediumDark = theme.palette.neutral.mediumDark;
    const primary = theme.palette.primary.main;
    const secondary = theme.palette.secondary.main;
    const hover = theme.palette.background.hover;

    const login = async(values, onSubmitProps) => {
        const loggedInResponse = await fetch(
            "http://localhost:3001/auth/login",
            {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(values)
            }
        );
        const loggedIn = await loggedInResponse.json();
        onSubmitProps.resetForm();

        if(loggedIn.error) {
            setErrorMessage(loggedIn.error);
        }
        else {
            dispatch(
                setLogin({
                    user: loggedIn.user,
                    token: loggedIn.token
                })
            );
            navigate("/home");
        }
    }

    const register = async(values, onSubmitProps) => {
        const formData = new FormData();
        for(let index in values) {
            formData.append(index, values[index])
        }

        formData.append("pictureType", values.picture.type.split("/")[1]);
        formData.append("tempPath", "public/assets/" + values.picture.path);

        const savedUserResponse = await fetch(
            "http://localhost:3001/auth/register",
            {
                method: "POST",
                body: formData
            }
        );
        const savedUser = await savedUserResponse.json();
        onSubmitProps.resetForm();

        if(savedUser.error) {
            if(savedUser.error.includes("duplicate key")) {
                setErrorMessage("Email already in use.");
            }
            else {
                setErrorMessage("A server error occured. Please try again later.");
            }
        }
        else{
            await login(values, onSubmitProps);
        }
    };

    const handleFormSubmit = async(values, onSubmitProps) => {
        if(isLogin) {
            await login(values, onSubmitProps);
        }
        if(isRegister) {
            await register(values, onSubmitProps);
        }
    };

    return (
        <Formik
            onSubmit={handleFormSubmit}
            initialValues={isLogin ? initialValuesLogin : initialValuesRegister}
            validationSchema={isLogin ? loginSchema : registerSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="1.5rem"
                        gridTemplateColumns="repeat(4, minmax(0, 1ft)"
                        sx={{
                            "& > div": { gridColumn: isNonMobileScreen ? undefined : "span 4" }
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    variant="filled"
                                    color="secondary"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={Boolean(touched.firstName) && Boolean(errors.firstName)}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ 
                                        gridColumn: (isNonMobileScreen ? "span 2" : "span 4"),
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: background,
                                            color: dark,
                                            "&:hover": {
                                                backgroundColor: hover
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: background,
                                            color: dark,
                                            "&:hover": {
                                                backgroundColor: hover
                                            }
                                        }
                                    }}
                                />
                                <TextField
                                    variant="filled"
                                    color="secondary"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ 
                                        gridColumn: (isNonMobileScreen ? "span 2" : "span 4"),
                                        "& .MuiFilledInput-root": {
                                            backgroundColor: background,
                                            color: dark,
                                            "&:hover": {
                                                backgroundColor: hover
                                            }
                                        },
                                        "& .MuiFilledInput-root.Mui-focused": {
                                            backgroundColor: background,
                                            color: dark,
                                            "&:hover": {
                                                backgroundColor: hover
                                            }
                                        }
                                    }}
                                />
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
                                            setFieldValue("picture", acceptedFiles[0])
                                        }
                                    >
                                        {({ getRootProps, getInputProps}) => (
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
                                                { !values.picture ? (
                                                    <p style={{margin: 0, color:mediumDark}}>Profile Picture</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            { 
                                                                values.picture.name.slice(0, window.innerWidth / 36) + ( 
                                                                    values.picture.name.length <= window.innerWidth / 36 ? 
                                                                        "" : 
                                                                        " [...] " + (
                                                                            values.picture.name.slice(-4) === "jpeg" ?
                                                                                ".jpeg" :
                                                                                values.picture.name.slice(-4)
                                                                        )
                                                                ) 
                                                            }
                                                        </Typography>
                                                        <EditOutlined/>
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}
                        
                        <TextField
                            variant="filled"
                            color="secondary"
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={Boolean(touched.email) && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{ 
                                gridColumn: "span 4",
                                "& .MuiFilledInput-root": {
                                    backgroundColor: background,
                                    color: dark,
                                    "&:hover": {
                                        backgroundColor: hover
                                    }
                                },
                                "& .MuiFilledInput-root.Mui-focused": {
                                    backgroundColor: background,
                                    color: dark,
                                    "&:hover": {
                                        backgroundColor: hover
                                    }
                                }
                            }}
                        />
                        <TextField
                            variant="filled"
                            color="secondary"
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={Boolean(touched.password) && Boolean(errors.password)}
                            helperText={touched.password && errors.password}
                            sx={{
                                gridColumn: "span 4",
                                "& .MuiFilledInput-root": {
                                    backgroundColor: background,
                                    color: dark,
                                    "&:hover": {
                                        backgroundColor: hover
                                    }
                                },
                                "& .MuiFilledInput-root.Mui-focused": {
                                    backgroundColor: background,
                                    color: dark,
                                    "&:hover": {
                                        backgroundColor: hover
                                    }
                                }
                            }}
                        />
                    </Box>
                    
                    <Box>
                        { errorMessage && (
                            <Typography
                                width="max-content"
                                marginX="auto"
                                padding="1rem"
                                color="error"
                                sx={{
                                    borderRadius: "0.25rem",
                                    textAlign: "center",
                                }}
                            >
                                { errorMessage }
                            </Typography>
                        )}
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                mt: errorMessage ? "0rem" : "2rem",
                                mb: "1rem",
                                p: "0.8rem",
                                backgroundColor: primary,
                                borderRadius: "0.33rem",
                                border: "2px solid #00000000",
                                color: "#fafafa",
                                fontWeight: "600",
                                fontSize: "0.85rem",
                                "&:hover": {
                                    backgroundColor: background,
                                    borderColor: secondary,
                                    color: secondary
                                }
                            }}
                        >
                            {isLogin ? "Login" : "Register"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                                setErrorMessage(null)
                            }}
                            width="max-content"
                            marginX="auto"
                            padding="0.5rem"
                            sx={{
                                color: mediumDark,
                                borderRadius: "0.25rem",
                                textAlign: "center",
                                "&:hover": {
                                    background: hover,
                                    cursor: "pointer"
                                }
                            }}
                        >
                            {(isLogin ? "Don't have an account?" : "Already have an account?")}
                        </Typography>
                    </Box>
                </form>
            )}
        </Formik>
    );
};

export default Form;