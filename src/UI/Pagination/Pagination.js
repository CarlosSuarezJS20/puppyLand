/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styles from './Pagination.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const Pagination = ({ totalDogs, dogsPerPage, paginate }) => {
	const [selected, setSelected] = useState('');
	const [activateHiddenList, setActivateHiddenList] = useState(false);
	const [morePagesRequest, setMorePagesResquest] = useState(false);

	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
		pageNumbers.push(i);
	}

	const updateSelectedPage = (num) => {
		setSelected(num);
	};

	const toggleHiddenList = (e) => {
		e.preventDefault();
		if (morePagesRequest && activateHiddenList) {
			console.log('here');
			setActivateHiddenList(false);
			setMorePagesResquest(false);
			console.log(activateHiddenList, morePagesRequest);
		} else {
			setActivateHiddenList(true);
			setMorePagesResquest(true);
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
					{!morePagesRequest && pageNumbers.length > 10 && (
						<li>
							<a
								href="!#"
								className={styles.PagesBreak}
								onClick={(e) => {
									toggleHiddenList(e);
								}}
							>
								<FontAwesomeIcon
									className={styles.ListOfPagesIcons}
									icon={faPlus}
								/>
							</a>
						</li>
					)}
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
					{morePagesRequest && pageNumbers.length > 10 && (
						<li>
							<a
								href="!#"
								className={styles.PagesBreak}
								onClick={(e) => {
									toggleHiddenList(e);
								}}
							>
								<FontAwesomeIcon
									className={styles.ListOfPagesIcons}
									icon={faMinus}
								/>
							</a>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
