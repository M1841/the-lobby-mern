import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage";
import LoginPage from "./scenes/loginPage";
import ProfilePage from "./scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider, useTheme } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
    const mode = useSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    const background = theme.palette.background.background;
    const isAuth = Boolean(useSelector((state) => state.token))

    return (
        <div className="app"
            style={{
                background: background,
                transition: "0s background",
                transitionDuration: "200ms",
            }}
        >
            <BrowserRouter>
                <ThemeProvider theme={ theme }>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />}></Route>
                        <Route path="/home" 
                            element={
                                isAuth ? <HomePage /> : <Navigate to="/"/>
                            }>
                        </Route>
                        <Route path="/profile/:userId" 
                            element={
                                isAuth ? <ProfilePage /> : <Navigate to="/"/>
                            }>
                        </Route>
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
  );
}

export default App;