/* eslint-disable array-callback-return */
import React, { Component } from 'react';
import SingleDogCard from '../SingleDogCard/SingleDogCard';
import styles from './FinderDisplayDogs.module.css';
import Pagination from '../../UI/Pagination/Pagination';

class FinderDisplayDogs extends Component {
	state = {
		currentPage: 1,
		dogsPerPage: 9,
	};

	paginateHandler = (pageNumber) => {
		const page = pageNumber;
		this.setState((prev) => (prev.currentPage = page));
	};

	render() {
		// get post
		let currentDogs;

		// const filteredProducts = productsData.filter((prod) => {
		// 	return prod.productTypes.some((prodType) =>
		// 		updatedFilters.includes(prodType)
		// 	);
		// });

		if (
			this.props.data &&
			this.props.filters.length &&
			this.props.filters.length !== 0
		) {
			const indexOfLastDog = this.state.currentPage * this.state.dogsPerPage;
			const indexOfFirstDog = indexOfLastDog - this.state.dogsPerPage;
			currentDogs = this.props.data.slice(indexOfFirstDog, indexOfLastDog);

			// console.log(this.props.data);
			// console.log(
			// 	this.props.filters
			// 		.filter((filter) => filter.isChecked)
			// 		.map((filter) => filter.name.slice(0, 4))
			// );

			// const filters = this.props.filters
			// 	.filter((filter) => filter.isChecked)
			// 	.map((filter) => filter.name.slice(0, 4));

			// console.log(filters.join(' '));

			// const dogs = this.props.data.filter((dog) => {
			// 	if (!dog.bred_for || !dog.temperament) {
			// 		return;
			// 	} else {
			// 		return (
			// 			dog.bred_for.toLowerCase().includes(filters.join(' ')) ||
			// 			dog.temperament.toLowerCase().includes(filters.join(' '))
			// 		);
			// 	}
			// });

			// console.log(dogs);
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
