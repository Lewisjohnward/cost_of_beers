import {useState, useEffect} from "react"
import styled from "styled-components"
import Footer from "../components/Footer"
import Map from "../components/Map"
import DetailsBar from "../components/DetailsBar"

const Container = styled.div`
    width: 1400px;
    margin: 100px auto 0px;
    > * {
        margin-bottom: 30px;
    }
`

const FlexContainer = styled.div`
    display: flex;
`



//<DetailsBar country={country}/>
const Main = () => {
    const [country, setCountry] = useState()

    useEffect(() => {
    }, [country])

    return (
        <>
            <Container>
                <FlexContainer>
                    <Map setCountry={setCountry} country={country}/>
                </FlexContainer>
            </Container>
            <Footer />
        </>
    )
}

export default Main
