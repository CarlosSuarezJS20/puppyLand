import React from 'react';
import styles from './HeroWelcomeSection.module.css';

const heroWelcomeSection = () => {
	return (
		<div className={styles.Hero}>
			<div className={styles.HeroBanner}>
				<h1>
					we are experts <br />
					dog matchers
				</h1>
				<p>
					helping people finding <br />
					their perfect companion
				</p>
			</div>
			<div className={styles.HeroLink}>
				<p>
					what are you waiting for? <br />
					get started now!
				</p>
				<a href="/#find">find yours</a>
			</div>
		</div>
	);
};

export default heroWelcomeSection;
