import {useState, useEffect} from "react"
import styled from "styled-components"
import Footer from "../components/Footer"
import Map from "../components/Map"
import DetailsBar from "../components/DetailsBar"
import Banner from "../components/Banner"

const Main = () => {
    const [country, setCountry] = useState()

    useEffect(() => {
        console.log(country)
    }, [country])

    return (
        <>
            <Banner/>
            <Map setCountry={setCountry} country={country}/>
            <Footer />
        </>
    )
}

export default Main
