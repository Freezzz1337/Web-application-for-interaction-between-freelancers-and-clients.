import {Container} from "react-bootstrap";
import "./start.css";
import MyCarousel from "./my-carousel";
import AboutUs from "./about-us";
import GetStart from "./get-start";
import Testimonials from "./testimonials";
import OurServices from "./our-services";

const Start = () => {
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