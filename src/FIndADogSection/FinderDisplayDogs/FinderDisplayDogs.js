/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import SingleDogCard from '../SingleDogCard/SingleDogCard';
import styles from './FinderDisplayDogs.module.css';
import Pagination from '../../UI/Pagination/Pagination';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDog } from '@fortawesome/free-solid-svg-icons';

class FinderDisplayDogs extends Component {
	state = {
		currentPage: 1,
		dogsPerPage: 9,
	};

	componentDidMount() {
		//selects first page upon loading
		setTimeout(() => {
			document.getElementById('page-1').firstChild.click();
		}, 1000);
	}

	paginateHandler = (pageNumber) => {
		const page = pageNumber;
		this.setState((prev) => (prev.currentPage = page));
	};

	render() {
		// For Pagination
		let currentDogs;

		if (this.props.data) {
			const indexOfLastDog = this.state.currentPage * this.state.dogsPerPage;
			const indexOfFirstDog = indexOfLastDog - this.state.dogsPerPage;

			currentDogs = this.props.data.slice(indexOfFirstDog, indexOfLastDog);
		}

		return (
			<section className={styles.SearchDogsDisplayList}>
				<div className={styles.SearchDogsDisplayHolder}>
					{currentDogs.length > 0 ? (
						currentDogs.map((dog) => <SingleDogCard key={dog.id} item={dog} />)
					) : (
						<div className={styles.NoFoundMessage}>
							<span>
								<FontAwesomeIcon className={styles.DogIcon} icon={faDog} />
							</span>
							Wuffy no puppies found!
						</div>
					)}
				</div>
				<Pagination
					dogsPerPage={this.state.dogsPerPage}
					totalDogs={this.props.data.length}
					paginate={(num) => {
						this.paginateHandler(num);
					}}
				/>
			</section>
		);
	}
}

export default FinderDisplayDogs;
