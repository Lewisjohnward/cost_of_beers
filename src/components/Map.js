import {useState, useEffect} from "react"
import styled from "styled-components"
import {useData} from "../hooks/useData"
import {priceData} from "../assets/countries_price"

import {geoPath, geoEqualEarth, scaleQuantize, max, min, scaleLinear, schemeBlues} from "d3"



const height = 750
const width = 2 * height

const Container = styled.div`
    position: relative;
    margin: 15px auto;
    width: ${width}px;
`

const Land = styled.path`
    fill: ${({fill}) => fill};
    stroke: white;
    stroke-width: 0.03rem;
`
const Tooltip = styled.div`
    position: absolute;
    width: 125px;
    height: 125px;
    ${({tooltipPos}) => `top: ${tooltipPos.y - 200 - (125 / 2) - 10 - 5}px`};
    ${({tooltipPos}) => `left: ${tooltipPos.x - 300}px`};
    background: ${({theme}) => theme.darkBlue};
    border-radius: 50px;
    display: ${({tooltipVisible}) => tooltipVisible ? "flex" : "none"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Country = styled.div`
    color: whote;
`

const Map = ({setCountry, country}) => {
    const [tooltipVisible, setTooltipVisible] = useState(false)
    const [tooltipPos, setTooltipPos] = useState({})
    const data = useData()

    if (!data) return <pre>Loading...</pre>

    const {land, interiors} = data

    const maxPrice = max(priceData, d => d.price)
    const minPrice = min(priceData, d => d.price)

    const projection = geoEqualEarth()
        .fitSize([width, height], land)

    const path = geoPath(projection)

    var colors = scaleLinear(schemeBlues[9])
        .domain([minPrice,maxPrice])
        .range(["#b4bfcf", "#036bfc"]); 

    const handleMouseMove = (e) => {
        setTooltipPos({x: e.clientX, y: e.clientY})
    }



    return (
        <Container onMouseMove={e => handleMouseMove(e)}>
            <Tooltip 
                tooltipVisible={tooltipVisible}
                tooltipPos={tooltipPos}
            >
                <Country>
                    {country && country.country}
                </Country>
                <Country>
                    {country && country.price}
                </Country>

            </Tooltip>

            <svg height={height} width={width} >
                <g>
                    {land.features.map((feature, i) => {
                        const countryData = priceData.filter(d => d.country === feature.properties.name)

                        return (
                            <Land 
                                fill={countryData[0] && colors(countryData[0].price)}
                                highlight={country === feature.properties.name}
                                d={path(feature)}
                                onClick={() => setCountry({country: feature.properties.name, price: countryData[0].price})}
                                onMouseEnter={() => setTooltipVisible(true)}
                                onMouseLeave={() => setTooltipVisible(false)}
                            /> 
                        )
                    })}
                </g>
            </svg>
        </Container>
    )
}

export default Map
