import React from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalDogs, dogsPerPage, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<div className={styles.PaginationContainer}>
			<nav>
				<ul className={styles.PageListHolder}>
					{pageNumbers.map((num) => (
						<li key={num}>
							<a
								href="!#"
								className={styles.Page}
								onClick={() => {
									paginate(num);
								}}
							>
								{num}
							</a>
						</li>
					))}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
