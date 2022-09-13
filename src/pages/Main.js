import styled from "styled-components"
import Footer from "../components/Footer"
import Map from "../components/Map"
import DetailsBar from "../components/DetailsBar"

const Container = styled.div`
    margin: 0 200px;
    > * {
        margin-bottom: 30px;
    }
`

const Title = styled.h1`
    text-align: center;
`
const FlexContainer = styled.div`
    display: flex;
    background: yellow;
`



const Main = () => {
    return (
        <>
            <Container>
                <Title>Cost of Beers</Title>
                <FlexContainer>
                    <Map />
                    <DetailsBar />
                </FlexContainer>
            </Container>
            <Footer />
        </>
    )
}

export default Main
