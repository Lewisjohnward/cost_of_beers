import {useState, useEffect} from "react"
import styled from "styled-components"
import {useData} from "../hooks/useData"

import {geoNaturalEarth1, geoPath, geoMercator} from "d3"

const height = 500 * 1.5
const width = 960  * 1.5
const margin = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
}

const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const Svg = styled.svg`
    width: ${innerWidth}px;
    height: ${innerHeight}px;
`
const Container = styled.div`
    display: flex;
    justify-content: center;
`


const Map = () => {
    const data = useData()

    if (!data) return <pre>Loading...</pre>


        return (
            <Container>
                <Svg innerHeight={innerHeight}  innerWidth={innerWidth}>
                    <Marks data={data} />
                </Svg>
            </Container>
        )
}

export default Map


const Border = styled.path`
    stroke: #454568;
    fill: none;
`


const Marks = ({data}) => {

    const projection = geoMercator()
        .scale(innerWidth / 3.0 / Math.PI)
        .center([0, 20])
        .translate([innerWidth / 2 , innerHeight/ 2])

    console.log(data)

    const path = geoPath(projection)

    return (
        <g
        >
            {data.land.features.map(feature => (
                <Land feature={feature} path={path}/>
            ))}
            <Border className="interiors" d={path(data.interiors)} />
        </g>
    )
}

const StyledLand = styled.path`
    fill: #137B80;
`

const Land = ({feature, path}) => {
    const [highlight, setHighlight] = useState(false)
    return (
        <StyledLand highlight={highlight} d={path(feature)} onMouseEnter={() => setHighlight(true)} onMouseLeave={() => setHighlight(false)}/> 
    )
}
