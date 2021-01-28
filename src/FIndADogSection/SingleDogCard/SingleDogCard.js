import React, { Component } from 'react';
import styles from './SingleDogCard.module.css';
import { Link } from 'react-router-dom';

import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class SingleDogCard extends Component {
	render() {
		return (
			<Link
				to={{ pathname: `/dog-details/${this.props.item.name}` }}
				className={styles.ImageContainer}
				onClick={() => {
					this.props.onGetIdForDetails(this.props.item.id);
				}}
			>
				<div className={styles.ItemsContainer}>
					<img
						src={this.props.item.image.url}
						alt="dog"
						className={styles.Image}
					/>
					<div className={styles.InfoContainer}>
						<h3>{this.props.item.name}</h3>
					</div>
				</div>
			</Link>
		);
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		onGetIdForDetails: (id) => dispatch(actions.getIdForDetailsPage(id)),
	};
};

export default connect(null, mapDispatchToProps)(SingleDogCard);
