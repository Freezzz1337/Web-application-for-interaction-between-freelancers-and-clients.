import React from "react";
import {Carousel, Image} from "react-bootstrap";
import "./my-carousel.css";
const MyCarousel = () => {
    return (
        <Carousel>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/first.jpg')}
                    alt="First slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>Conquer the market with ease</h3>
                    <p>Your path to success starts here.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/second.jpg')}
                    alt="Second slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>Unlock new opportunities with our app</h3>
                    <p>Enhance the efficiency of your business.</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/third.jpg')}
                    alt="Third slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>Turn ideas into results</h3>
                    <p>Our app is the key to your success.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
export default MyCarousel;