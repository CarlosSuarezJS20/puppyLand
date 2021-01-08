import React, { Component } from 'react';
import styles from './DogsCarousel.module.css';
import '../../src/App.css';
import SectionDivider from '../UI/SectionDivider/SectionDivider';

// Slider
import Slider from 'react-slick';
import NextImgBtnHandler from './PrevImgBtnHandler/PrevImgBtnHandler';
import PrevImgBtnHandler from './NextImgBtnHandler/NextImgBtnHandler';

class DogsCarousel extends Component {
	state = {
		currentImageIndex: 0,
	};

	render() {
		let dogsImg;
		console.log(this.state.currentImageIndex);
		const settings = {
			className: 'center',
			centerMode: true,
			infinite: true,
			centerPadding: '0px',
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
							? [styles.Img, styles.Active].join(' ')
							: styles.Img
					}
				>
					<img src={img.image} alt="dog" className={styles.ImageCaroussel} />
				</div>
			));
		}

		return (
			<section className={styles.CarouselSection}>
				<h2>Some posers here...</h2>
				<div className="Slider-container">
					<Slider {...settings}>{dogsImg}</Slider>
				</div>
				<SectionDivider />
			</section>
		);
	}
}

export default DogsCarousel;
