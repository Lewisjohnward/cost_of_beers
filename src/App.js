import {ThemeProvider} from "styled-components"
import GlobalStyle from "./styles/GlobalStyle"
import Main from "./pages/Main"


const theme = {
    darkBlue: "#4266f5"
}

const App = () => {
    return(
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <Main />
        </ThemeProvider>
    )
}

export default App
