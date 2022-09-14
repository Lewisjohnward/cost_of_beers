import styled from "styled-components"
import beerIco from "../assets/beerIco.png"

const Wrapper = styled.div`
    margin-bottom: 25px;
`

const Container = styled.div`
    background: ${({theme}) => theme.darkBlue};
    padding: 25px 450px;
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;

    > * {margin-right: 40px;}
`
const Title = styled.h1`
    
`

const Updated = styled.div`
    padding: 0px 500px;
    margin-top: 5px;
    font-size: 0.8rem;
    opacity: 0.8;
`

const Ico = styled.img`
`

const Banner = () => {
    return (
        <Wrapper>
            <Container>
                <Title>
                    The cost of a pint of beer around the world
                </Title>
                <Ico src={beerIco} />
            </Container>
            <Updated>
                Updated 13th September 2022
            </Updated>
        </Wrapper>
    )
}

export default Banner
