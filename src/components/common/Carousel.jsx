import React, { useState, useEffect, useRef } from "react";
import { Button, IconButton } from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import { useNavigate } from 'react-router';


export default function Carousel({ carouselData }) {
    const [current, setCurrent] = useState(0);
    const [autoPlay, setAutoPlay] = useState(true);
    const navigate = useNavigate();
    const timeOut = useRef(null);

    const slideRight = () => {
        setCurrent(current === carouselData.length - 1 ? 0 : current + 1);
     };

    const slideLeft = () => {
        setCurrent(current === 0 ? carouselData.length - 1 : current - 1);
    };



    useEffect(() => {
        timeOut.current =
            autoPlay &&
            setTimeout(() => {
                slideRight();
            }, 4000);
    });

    return (
        <div
            className="carousel"
            onMouseEnter={() => {
                setAutoPlay(false);
                clearTimeout(timeOut);
            }}
            onMouseLeave={() => {
                setAutoPlay(true);
            }}
        >
            <IconButton
                color="primary"
                aria-label="arrow left"
                className="arrow"
                size="large"
                onClick={() => slideLeft()}
            >
                <ArrowBackRoundedIcon fontSize="inherit" />
            </IconButton>
            <div className="carousel__wrapper">
                {carouselData.map((item, i) => {
                    return (
                        <div
                            className={
                                current === i ? "carousel__card carousel__card--active" : "carousel__card"
                            }
                            key={i}
                            style={{ backgroundColor: item.color }}
                        >
                            <div
                                className="card__image"
                                style={{ backgroundImage: `url(${item.img})` }}
                            ></div>
                            <div className="card__description">
                                <h2>{item.title}</h2>
                                <p>{item.subtitle}</p>
                                <div className="button-wrapper">
                                    <Button
                                        variant="contained"
                                        color="warning"
                                        onClick={() =>
                                            navigate(`categories/${item.category.replace(" ", "_")}`)
                                        }
                                    >
                                        Shop Now
                                    </Button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            <IconButton
                color="primary"
                aria-label="arrow right"
                className="arrow"
                size="large"
                onClick={() => slideRight()}
            >
                <ArrowForwardRoundedIcon fontSize="inherit" />
            </IconButton>

            <div className="carousel__pagination">
                {carouselData.map((_, i) => {
                    return (
                        <div
                            key={i}
                            className={
                                i === current ? "pagination__dot pagination__dot--active" : "pagination__dot"
                            }
                            onClick={() => setCurrent(i)}
                        ></div>
                    );
                })}
            </div>
        </div>
    );
}
