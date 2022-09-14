import {useState, useEffect} from "react"
import styled from "styled-components"
import {useData} from "../hooks/useData"
import {priceData} from "../assets/countries_price"
import useScreenSize from "../hooks/useScreenSize"

import {geoPath, geoEqualEarth, scaleQuantize, max, min, scaleLinear, schemeBlues} from "d3"


const Container = styled.div`
    position: relative;
    margin: 15px auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const Button = styled.button``

const Graphic = ({setCountry, country}) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [tooltipPos, setTooltipPos] = useState({})
    const [selectHome, setSelectHome] = useState()
    const [home, setHome] = useState("uk")
    const [homeCompareMode, setHomeCompareMode] = useState(false)
    const screenSize = useScreenSize()



    const handleMouseMove = (e) => {
        setTooltipPos({x: e.clientX, y: e.clientY})
    }

    const handleMouseOver = (feature, countryData) => {
        setCountry({country: feature.properties.name, price: countryData[0].price})
        setTooltipVisible(true)
    }

    const handleSelectHome = (country, price) => {
        if(selectHome) {
            setHome({country, price})
            setSelectHome(false)
            setHomeCompareMode(true)
        }
    }

    useEffect(() => {
        console.log(home)
    }, [home])


    return (
        <Container onMouseMove={e => handleMouseMove(e)}>
            {home.country}
            <Tooltip 
                country={country} 
                tooltipVisible={false} 
                tooltipPos={tooltipPos}
            />
            <Button
                onClick={() => setSelectHome(true)}
            >
                Select home
            </Button>
            <Button
                onClick={() => setHomeCompareMode(false)}
            >
                cancel home mode
            </Button>
            <Map 
                homeCompareMode={homeCompareMode}
                home={home}
                screenSize={screenSize}
                handleSelectHome={handleSelectHome} 
                handleMouseOver={handleMouseOver} 
                setTooltipVisible={setTooltipVisible}
            />

        </Container>
    )
}


const Country = styled.div`
`

const Land = styled.path`
    fill: ${({fill}) => fill};
    stroke: white;
    stroke-width: 0.03rem;
`

const Map = ({screenSize, homeCompareMode, handleSelectHome, home, handleMouseOver, setTooltipVisible}) => {
    const width = screenSize.width
    const height = width / 2.5 

    const data = useData()
    if (!data) return <pre>Loading...</pre>

        const {land, interiors} = data

    const maxPrice = max(priceData, d => d.price)
    const minPrice = min(priceData, d => d.price)

    const projection = geoEqualEarth()
        .fitSize([width, height], land)

    const path = geoPath(projection)

    var colors = scaleLinear()
        .domain([minPrice,maxPrice])
        .range(["#b4bfcf", "#036bfc"]); 

    var comparitiveColorNeg = scaleLinear()
        .domain([0, maxPrice])
        .range(["#ffc2c2","#f54242"]); 

    var comparitiveColorPos = scaleLinear()
        .domain([0, maxPrice])
        .range(["#b5ffb3", "#6bff66"]); 
    
    const comparePrices = (home, country) => {
        if(!country) return "black"
        if(home.price < country.price)
        {
            const difference = country.price - home.price 
            return comparitiveColorNeg(difference)
        }
        else {
            const difference = home.price - country.price 
            return comparitiveColorPos(difference)
        }
    }

    return (
        <svg height={height} width={width} >
            <g>
                {land.features.map((feature, i) => {
                    const countryData = priceData.filter(d => d.country === feature.properties.name)
                    const isHome = feature.properties.name === home.country
                    const fill = !homeCompareMode ?
                        countryData[0] && colors(countryData[0].price)
                        :
                        isHome ? 
                        "red" 
                        : 
                        homeCompareMode ?
                        comparePrices(home, countryData[0])
                        :
                        countryData[0] && colors(countryData[0].price)


                    let country, price
                    if(countryData.length != 0){
                        country = countryData[0].country
                        price = countryData[0].price
                    }

                    return (
                        <Land 
                            fill={fill}
                            d={path(feature)}
                            onClick={() => handleSelectHome(country, price)}
                            onMouseEnter={() => handleMouseOver(feature, countryData)}
                            onMouseLeave={() => setTooltipVisible(false)}
                        /> 
                    )
                })}
            </g>
        </svg>
    )
}


const StyledTooltip = styled.div`
    position: absolute;
    width: 125px;
    height: 125px;
    ${({tooltipPos}) => `top: ${tooltipPos.y - 200}px`};
    ${({tooltipPos}) => `left: ${tooltipPos.x}px`};
    background: ${({theme}) => theme.darkBlue};
    border-radius: 50px;
    display: ${({tooltipVisible}) => tooltipVisible ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Tooltip = ({country, tooltipVisible, tooltipPos}) => {
    return (
        <StyledTooltip 
            tooltipVisible={tooltipVisible}
            tooltipPos={tooltipPos}
        >
            <Country>
                {country && country.country}
            </Country>
            <Country>
                {country && country.price}
            </Country>
        </StyledTooltip>

    )

}

export default Graphic
