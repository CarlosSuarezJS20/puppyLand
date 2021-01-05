import React from 'react';
import styles from './MainInfoSection.module.css';
import dogImage from '../Assets/Images/whypicture.jpg';
import SectionDivider from '../UI/SectionDivider/SectionDivider';

const mainSection = () => {
	return (
		<section className={styles.MainHolder}>
			<div className={styles.ArticlesHolder}>
				<article className={styles.ImageHolder}>
					<img src={dogImage} alt="img" className={styles.Image} />
				</article>
				<article className={styles.Info}>
					<h1>why a puppy?</h1>
					<p>
						Nothing beats a long walk with your four-legged friend on a fresh,
						spring morning. Or seeing the joy on their faces when you pick up a
						ball and they know it’s playtime in the local park! Even relaxing at
						home feels better in each other’s company.
					</p>
					<p>
						One of the key benefits of having a dog is that they significantly
						increase the amount of exercise you do on a regular basis – and you
						might not even notice it! While it can be difficult to motivate
						ourselves to go for a walk alone, when we know our puppy needs
						exercise, we often don’t think twice. All those strolls through the
						park and adventures in the wood add up.
					</p>
					<p>
						One of the most noticeable benefits of owning a dog is that it’s
						almost impossible to feel lonely when your dog is by your side, and
						for good reason. Most dogs are highly sociable, and they love
						company, whether it’s canine or human. When your puppy
						enthusiastically greets you after a day at work, or looks forward to
						being taken on their favourite walk, you know you always have a
						friend by your side.
					</p>
				</article>
			</div>
			<SectionDivider />
		</section>
	);
};

export default mainSection;
