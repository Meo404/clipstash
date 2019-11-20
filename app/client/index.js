import React from "react"
import { AuthProvider } from "contexts/AuthContext";
import { SnackbarProvider } from "notistack";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import App from "./App";

export default function index() {
    return (
        <HelmetProvider>
            <MuiThemeProvider theme={theme}>
                <SnackbarProvider 
                    maxSnack={3} 
                    autoHideDuration={3000}
                >
                    <AuthProvider>
                        <Router>
                            <Switch>
                                <Route path="/" component={App} />
                            </Switch>
                        </Router>
                    </AuthProvider>
                </SnackbarProvider>
            </MuiThemeProvider>
        </HelmetProvider>
    )
}

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#b71c1c",
        },
        secondary: {
            main: "#b71c1c",
        },
    },
});
