import {useState, useEffect} from "react"
import styled from "styled-components"
import {useData} from "../hooks/useData"
import {priceData} from "../assets/countries_price"

import {geoPath, geoEqualEarth, scaleQuantize, max, min, scaleLinear, schemeBlues} from "d3"



const height = 650
const width = 2 * height

const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

const Land = styled.path`
    //fill: #137B80;
    fill: ${({fill}) => fill};
    stroke: ${({highlight}) => highlight && "black"};
`

const Map = ({setCountry, country}) => {
    const data = useData()

    if (!data) return <pre>Loading...</pre>

    const {land, interiors} = data

    //const test = land.features.filter(country => country.properties.name !== "Norway")
    const test = land.features.filter(country => {
        let bool = false
        priceData.forEach(d => {
            if(d.country === country.properties.name) bool = true
        })
        return !bool
    })

    test.forEach((d,i) => {
        if(i < 10) console.log(d.properties.name)
    })

    const maxPrice = max(priceData, d => d.price)
    const minPrice = min(priceData, d => d.price)

    const projection = geoEqualEarth()
        .fitSize([width, height], land)

    const path = geoPath(projection)

    var colors = scaleLinear(schemeBlues[9])
        .domain([minPrice,maxPrice])
        .range(["#b4bfcf", "#036bfc"]); 
    console.log(colors.range())


    return (
        <Container>
            <svg height={height} width={width}>
                <g>
                    {land.features.map((feature, i) => {
                        const countryData = priceData.filter(d => d.country === feature.properties.name)

                        return (
                            <Land 
                                fill={countryData[0] && colors(countryData[0].price)}
                                highlight={country === feature.properties.name}
                                d={path(feature)}
                                onClick={() => setCountry({country: feature.properties.name, price: countryData[0].price})}
                            /> 
                        )
                    })}
                </g>
            </svg>
        </Container>
    )
}

export default Map
