import React, { Component } from 'react';
import SingleDogCard from '../SingleDogCard/SingleDogCard';
import styles from './FinderDisplayDogs.module.css';
import Pagination from '../../UI/Pagination/Pagination';

class FinderDisplayDogs extends Component {
	state = {
		currentPage: 1,
		dogsPerPage: 10,
	};

	paginateHandler = (pageNumber) => {
		const page = pageNumber;
		this.setState((prev) => (prev.currentPage = page));
	};

	render() {
		// get post
		let currentDogs;

		console.log(this.state.currentPage);

		if (this.props.data) {
			const indexOfLastDog = this.state.currentPage * this.state.dogsPerPage;
			const indexOfFirstDog = indexOfLastDog - this.state.dogsPerPage;
			currentDogs = this.props.data.slice(indexOfFirstDog, indexOfLastDog);
		}

		return (
			<section className={styles.SearchDogsDisplayList}>
				<div className={styles.SearchDogsDisplayHolder}>
					{currentDogs.map((dog) => (
						<SingleDogCard key={dog.id} item={dog} />
					))}
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
