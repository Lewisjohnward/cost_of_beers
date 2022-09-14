import {useState, useEffect} from "react"
import styled from "styled-components"
import Footer from "../components/Footer"
import Graphic from "../components/Map"
import DetailsBar from "../components/DetailsBar"
import Banner from "../components/Banner"

const Main = () => {
    const [country, setCountry] = useState()

    return (
        <>
            <Banner/>
            <Graphic setCountry={setCountry} country={country}/>
            <Footer />
        </>
    )
}

export default Main
