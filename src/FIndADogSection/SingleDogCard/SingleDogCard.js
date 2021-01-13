import React from 'react';
import styles from './SingleDogCard.module.css';

const SingleDogCard = (props) => {
	return (
		<a href="/#dog" className={styles.ImageContainer}>
			<div className={styles.ItemsContainer}>
				<img src={props.item.image.url} alt="dog" className={styles.Image} />
				<div className={styles.InfoContainer}>
					<h3>{props.item.name}</h3>
				</div>
			</div>
		</a>
	);
};

export default SingleDogCard;
