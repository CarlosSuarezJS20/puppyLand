/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styles from './Pagination.module.css';

const Pagination = ({ totalDogs, dogsPerPage, paginate }) => {
	const [selected, setSelected] = useState('');
	const [activateHiddenList, setactivateHiddenList] = useState(false);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	const updateSelectedPage = (num) => {
		setSelected(num);
	};

	const toggleHiddenList = (e) => {
		e.preventDefault();
		if (activateHiddenList) {
			setactivateHiddenList(false);
		} else {
			setactivateHiddenList(true);
		}
	};

	return (
		<div className={styles.PaginationContainer}>
			<nav>
				<ul className={styles.PageListHolder}>
					{pageNumbers.map((num) => {
						if (num < 10) {
							return (
								<li key={num}>
									<a
										href="!#"
										className={
											selected === num ? styles.ActivePage : styles.Page
										}
										onClick={() => {
											paginate(num);
											updateSelectedPage(num);
										}}
									>
										{num}
									</a>
								</li>
							);
						}
					})}
					<li>
						<a
							href="!#"
							className={styles.PagesBreak}
							onClick={(e) => {
								toggleHiddenList(e);
							}}
						>
							{pageNumbers.length > 9 && '...'}
						</a>
					</li>
					{pageNumbers.map((num) => {
						if (num >= 10) {
							return (
								<li
									key={num}
									className={
										activateHiddenList ? styles.ShowPages : styles.HidePages
									}
								>
									<a
										href="!#"
										className={
											selected === num ? styles.ActivePage : styles.Page
										}
										onClick={() => {
											paginate(num);
											updateSelectedPage(num);
										}}
									>
										{num}
									</a>
								</li>
							);
						}
					})}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
