import React from 'react';
import styles from './Spinner.module.css';

const spinner = (props) => {
	let spinnerClass = styles.Spinner;

	if (props.section === 'searchDog') {
		spinnerClass = styles.SpinnerTwo;
	}

	return <div className={spinnerClass}>loading...</div>;
};

export default spinner;
