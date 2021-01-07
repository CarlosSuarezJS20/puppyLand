import React, { Component } from 'react';
import styles from './DogsCarousel.module.css';
import SectionDivider from '../UI/SectionDivider/SectionDivider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faArrowCircleLeft,
	faArrowCircleRight,
} from '@fortawesome/free-solid-svg-icons';

class HomeSearchBreedSection extends Component {
	state = {
		current: 0,
	};

	prevImageBtnHandler = () => {
		const current =
			this.state.current === 0
				? this.props.data.length - 1
				: this.state.current - 1;

		this.setState({
			current: current,
		});
		console.log(this.state.current);
	};

	nextImageBtnHandler = () => {
		this.setState({
			current:
				this.state.current === this.props.data.length - 1
					? 0
					: this.state.current + 1,
		});
		console.log(this.state.current);
	};

	render() {
		let dogsImg;

		if (this.props.data) {
			dogsImg = this.props.data.map((img, index) => (
				<div
					key={img.id}
					className={
						index === this.state.current
							? [styles.Img, styles.Active].join(' ')
							: styles.Img
					}
				>
					{index === this.state.current && (
						<img
							src={img.image}
							alt="dog-img"
							className={styles.ImageCaroussel}
						/>
					)}
				</div>
			));
		}

		return (
			<section className={styles.CarouselSection}>
				<h2>Some posers here...</h2>
				<div className={styles.CarouselContainer}>
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
				</div>
				<SectionDivider />
			</section>
		);
	}
}

export default HomeSearchBreedSection;
