import styled from "styled-components"
import Footer from "../components/Footer"
import Map from "../components/Map"

const Container = styled.div`
    margin: 10px;
    > * {
        margin-bottom: 30px;
    }
`

const Title = styled.h1`
    text-align: center;
`



const Main = () => {
    return (
        <>
            <Container>
                <Title>Cost of Beers</Title>
                <Map />
            </Container>
            <Footer />
        </>
    )
}

export default Main
