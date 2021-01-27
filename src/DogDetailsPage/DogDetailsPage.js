import React, { Component, Fragment } from 'react';
import styles from './DogDetailsPage.module.css';

import MainFooter from '../MainFooter/MainFooter';
import MainNavbar from '../MainNavbar/MainNavbar';

import { connect } from 'react-redux';
import * as actions from '../store/actions/index';

class DogDetailsPage extends Component {
	componentDidMount() {
		this.props.onFetchDog(1);
	}

	render() {
		let dog;
		if (this.props.dog.length > 0) {
			const [fetchedDog] = this.props.dog;
			const { breeds } = fetchedDog;
			const [dogInfo] = breeds;
			console.log(dogInfo);
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
							heigth:<span>{`${dogInfo.height.metric} cm`}</span>
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
				<MainNavbar />
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		onFetchDog: (id) => dispatch(actions.fetchOneDogFromServer(id)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DogDetailsPage);
