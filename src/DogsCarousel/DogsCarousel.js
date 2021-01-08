import React, { Component } from 'react';
import styles from './DogsCarousel.module.css';
import '../../src/App.css';
import SectionDivider from '../UI/SectionDivider/SectionDivider';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {
// 	faArrowCircleLeft,
// 	faArrowCircleRight,
// } from '@fortawesome/free-solid-svg-icons';

// Slider
import Slider from 'react-slick';
import NextImgBtnHandler from '../DogsCarousel/NextImgBtnHandler/NextImgBtnHandler';
import PrevImgBtnHandler from '../DogsCarousel/PrevImgBtnHandler/PrevImgBtnHandler';

class DogsCarousel extends Component {
	state = {
		currentImageIndex: 0,
	};

	// prevImageBtnHandler = () => {
	// 	const current =
	// 		this.state.current === 0
	// 			? this.props.data.length - 1
	// 			: this.state.current - 1;

	// 	this.setState({
	// 		current: current,
	// 	});
	// };

	// nextImageBtnHandler = () => {
	// 	this.setState({
	// 		current:
	// 			this.state.current === this.props.data.length - 1
	// 				? 0
	// 				: this.state.current + 1,
	// 	});
	// };

	render() {
		let dogsImg;
		console.log(this.state.currentImageIndex);
		const settings = {
			className: 'center',
			centerMode: true,
			infinite: true,
			centerPadding: '20px',
			slidesToShow: 3,
			speed: 500,
			nextArrow: <NextImgBtnHandler />,
			prevArrow: <PrevImgBtnHandler />,
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
					<img src={img.image} alt="dog" />
				</div>

				// <div
				// 	key={img.id}
				// 	className={
				// 		index === this.state.current
				// 			? [styles.Img, styles.Active].join(' ')
				// 			: styles.Img
				// 	}
				// >
				// 	{index === this.state.current && (
				// 		<img
				// 			src={img.image}
				// 			alt="dog-img"
				// 			className={styles.ImageCaroussel}
				// 		/>
				// 	)}
				// </div>
			));
		}

		return (
			<section className={styles.CarouselSection}>
				<h2>Some posers here...</h2>
				<div className="Slider-container">
					<Slider {...settings}>{dogsImg}</Slider>
				</div>
				{/* <div className={styles.CarouselContainer}>
					<FontAwesomeIcon
						icon={faArrowCircleLeft}
						className={styles.LeftArrow}
						onClick={this.prevImageBtnHandler}
					/>
					<FontAwesomeIcon
						icon={faArrowCircleRight}
						className={styles.RightArrow}
						onClick={this.nextImageBtnHandler}
					/>
					{dogsImg}
				</div> */}
				<SectionDivider />
			</section>
		);
	}
}

export default DogsCarousel;
