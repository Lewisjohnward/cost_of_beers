import styled from "styled-components"

const Wrapper = styled.div`
    margin-bottom: 25px;
`

const Container = styled.div`
    background: ${({theme}) => theme.darkBlue};
    font-size: 2rem;
    margin-top: 25px;
    padding: 25px 450px;
    color: white;
`
const Updated = styled.div`
    padding: 0px 500px;
    margin-top: 5px;
`

const Banner = () => {
    return (
        <Wrapper>
            <Container>
                The cost of a pint of beer around the world
            </Container>
            <Updated>
                Updated 13th September 2022
            </Updated>
        </Wrapper>
    )
}

export default Banner
