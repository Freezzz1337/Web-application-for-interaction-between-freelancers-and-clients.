import {Container} from "react-bootstrap";
import "./start.css";
import MyCarousel from "./my-carousel";
import AboutUs from "./about-us";
import GetStart from "./get-start";
import Testimonials from "./testimonials";
import OurServices from "./our-services";
import React, {useEffect, useState} from "react";
import Spinner from "../spinner";

const Start = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div style={{height: "100%"}} className="d-flex justify-content-center align-items-center">
                <Spinner size="10rem"/>
            </div>
        );
    }
    return (
        <>
            <MyCarousel/>
            <Container className="mb-3">
                <OurServices/>
                <AboutUs/>
                <Testimonials/>
                <GetStart/>
            </Container>
        </>
    );
}

export default Start;