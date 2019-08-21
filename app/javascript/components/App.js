import React from "react"
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Navigation from './Navigation/Navigation';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#b71c1c',
        },
        secondary: {
            main: '#b71c1c',
        },
    },
});

class App extends React.Component {
  render () {
    return (
        <MuiThemeProvider theme={theme}>
          <div className="app">
            <Navigation />
          </div>
        </MuiThemeProvider>
    );
  }
}

export default App;
