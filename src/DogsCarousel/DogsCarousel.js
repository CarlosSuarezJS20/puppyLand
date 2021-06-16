import React, { Component } from "react";
import styles from "./DogsCarousel.module.css";
import "../DogsCarousel/Carousel.css";

// Slider
import Slider from "react-slick";
import NextImgBtnHandler from "./PrevImgBtnHandler/PrevImgBtnHandler";
import PrevImgBtnHandler from "./NextImgBtnHandler/NextImgBtnHandler";

class DogsCarousel extends Component {
  state = {
    currentImageIndex: 0,
  };

  render() {
    let dogsImg;
    const settings = {
      className: "center",
      centerMode: true,
      infinite: true,
      centerPadding: "0px",
      slidesToShow: 3,
      speed: 500,
      nextArrow: <PrevImgBtnHandler />,
      prevArrow: <NextImgBtnHandler />,
      beforeChange: (current, next) =>
        this.setState({ currentImageIndex: next }),
    };

    if (this.props.data) {
      dogsImg = this.props.data.map((img, index) => (
        <div
          key={img.id}
          className={
            index === this.state.currentImageIndex
              ? [styles.Img, styles.Active].join(" ")
              : styles.Img
          }
        >
          <img src={img.image} alt="dog" className={styles.ImageCaroussel} />
        </div>
      ));
    }

    return (
      <section className={styles.CarouselSection}>
        <p>
          We urge anyone thinking about getting a dog to do their research
          before welcoming a puppy into their life. Having a bouncy, happy,
          playful puppy is a very enjoyable experience and dog ownership can be
          very rewarding, but it is a lot of hard work, and a lifetime
          commitment which can sometimes be forgotten in all the excitement! The
          key things to think about when you first decide you want a pup are
          which breed would best suit your lifestyle, the financial costs of dog
          ownership, who will care for your dog if you go to work or have
          holidays booked and training classes.
        </p>
        <h2>Some posers here...</h2>
        <div className={styles.SliderContainer}>
          <Slider {...settings}>{dogsImg}</Slider>
        </div>
      </section>
    );
  }
}

export default DogsCarousel;
