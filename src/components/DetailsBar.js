import styled from "styled-components"

const Container = styled.div`
    width: 50%;
    background: red;
    padding: 25px;
    line-height: 25px;
`
const Country = styled.h2`
`

const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > * {
        margin-right: 20px;
    }
`

const Flag = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background: black;
    width: 50px;
    height: 50px;
    color: white;
`

const CostContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 150px;
`

const Cost = styled.p`
`

const DetailsBar = ({country}) => {
    return (
        <Container>
            <TitleContainer>
                <Country>{country}</Country>
                <Flag>
                    Flag
                </Flag>
            </TitleContainer>
            This is my details bar container how
            This is my details bar container how
            This is my details bar container how
            This is my details bar container how
            This is my details bar container how
            This is my details bar container how
            <CostContainer>
                <Cost>
                    £10.00
                </Cost>
            </CostContainer>
        </Container>
    )
}

export default DetailsBar
