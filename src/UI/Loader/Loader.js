import React, { Component } from 'react';
import styles from './Loader.module.css';
import Spinner from '../Spinner/Spinner';

class Loader extends Component {
	componentDidMount() {
		setTimeout(() => {
			document.getElementById('loader').style.transition = 'opacity 8s';
			document.getElementById('loader').style.opacity = '0';

			setTimeout(() => {
				document.getElementById('loader').style.display = 'none';
			}, 2000);
		}, 100);
	}

	render() {
		return (
			<div className={styles.SpinnerHolder} id="loader">
				<Spinner />
			</div>
		);
	}
}

export default Loader;
