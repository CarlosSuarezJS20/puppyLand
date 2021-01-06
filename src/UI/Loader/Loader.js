import React, { Component } from 'react';
import styles from './Loader.module.css';
import Spinner from '../Spinner/Spinner';

class Loader extends Component {
	componentDidMount() {
		setTimeout(() => {
			document.getElementById('loader').remove();
		}, 2000);
	}

	render() {
		let spinnerClass = [styles.SpinnerHolder];

		if (!this.props.remove) {
			spinnerClass = [styles.SpinnerHolder, styles.RemoveSpinner];
		}
		return (
			<div className={spinnerClass.join(' ')} id="loader">
				<Spinner />
			</div>
		);
	}
}

export default Loader;
