import React from "react";
import {Carousel, Image} from "react-bootstrap";
import "./my-carousel.css";
import {useTranslation} from "react-i18next";
const MyCarousel = () => {
    const {t} = useTranslation();
    return (
        <Carousel>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/first.jpg')}
                    alt="First slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>{t("carousel.slide1.title")}</h3>
                    <p>{t("carousel.slide1.text")}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/second.jpg')}
                    alt="Second slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>{t("carousel.slide2.title")}</h3>
                    <p>{t("carousel.slide2.text")}</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <Image
                    className="d-block w-100 my-carousel-img"
                    src={require('../../../assets/img/carousel-img/third.jpg')}
                    alt="Third slide"
                />
                <Carousel.Caption className="my-carousel-carousel-caption">
                    <h3>{t("carousel.slide3.title")}</h3>
                    <p>{t("carousel.slide3.text")}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
export default MyCarousel;