import styled from "styled-components"
import beerIco from "../assets/beerIco.png"

const Wrapper = styled.div`
    background: ${({theme}) => theme.darkBlue};
    margin-bottom: 25px;
`

const Container = styled.div`
    color: white;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 5px 100px;

    > * {margin-right: 40px;}
`
const Title = styled.h1`
    
`

const Updated = styled.div`
    background: white;
    color: rgba(0, 0, 0, 0.7);
    margin-top: 5px;
    font-size: 0.8rem;
    padding: 5px 200px;

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
