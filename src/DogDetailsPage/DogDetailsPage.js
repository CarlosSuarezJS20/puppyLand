import React, { Component } from 'react';
import styles from './DogDetailsPage.module.css';

import MainFooter from '../MainFooter/MainFooter';
import MainNavbar from '../MainNavbar/MainNavbar';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';
import Loader from '../UI/Loader/Loader';

class DogDetailsPage extends Component {
	componentDidMount() {
		this.props.onFetchDog(this.props.selectedDog);
		window.scrollTo(0, 0);
	}

	render() {
		let dog;
		if (this.props.dog.length > 0) {
			const [fetchedDog] = this.props.dog;
			const { breeds } = fetchedDog;
			const [dogInfo] = breeds;

			dog = (
				<div className={styles.DogDetailsHolder}>
					<div className={styles.imageHolder}>
						<img
							src={fetchedDog.url}
							alt="requested-dog"
							className={styles.DogImage}
						/>
					</div>
					<div className={styles.InformationHolder}>
						<h2>
							name:<span>{dogInfo.name}</span>
						</h2>
						<h2>
							bred for:<span>{dogInfo.bred_for}</span>
						</h2>
						<h2>
							heigth:
							<span
								className={styles.MeasurementFigure}
							>{`${dogInfo.height.metric} cm`}</span>
						</h2>
						<h2>
							temperaments:<span>{dogInfo.temperament}</span>
						</h2>
						<h2>
							life Span:<span>{dogInfo.life_span}</span>
						</h2>
						<div className={styles.ShareBarSection}>
							<div className="item-details-header-info-share-buttons item-details-header-info-share-buttons__hide">
								<a href="/eee">
									<img
										src="https://simplesharebuttons.com/images/somacro/facebook.png"
										alt="Facebook"
									/>
								</a>
								<a href="/eee">
									<img
										src="https://simplesharebuttons.com/images/somacro/pinterest.png"
										alt="pinterest"
									/>
								</a>

								<a href="/eee">
									<img
										src="https://simplesharebuttons.com/images/somacro/twitter.png"
										alt="Twitter"
									/>
								</a>
							</div>
						</div>
					</div>
				</div>
			);
		}

		return (
			<div>
				<Loader />
				<MainNavbar />
				<div className={styles.GobackArrowHolder}>
					<svg
						className={styles.GobackArrow}
						onClick={() => this.props.history.goBack()}
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
					>
						<path d="M217.9 256L345 129c9.4-9.4 9.4-24.6 0-33.9-9.4-9.4-24.6-9.3-34 0L167 239c-9.1 9.1-9.3 23.7-.7 33.1L310.9 417c4.7 4.7 10.9 7 17 7s12.3-2.3 17-7c9.4-9.4 9.4-24.6 0-33.9L217.9 256z" />
					</svg>
				</div>
				{dog}
				<MainFooter />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		dog: state.oneDog,
		loading: state.loading,
		selectedDog: state.selectedDogId,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDog: (id) => dispatch(actions.fetchOneDogFromServer(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DogDetailsPage);
