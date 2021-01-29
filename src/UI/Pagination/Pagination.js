/* eslint-disable array-callback-return */
import React, { useState } from 'react';
import styles from './Pagination.module.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

import { NavLink } from 'react-router-dom';

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

	const toggleHiddenList = () => {
		if (morePagesRequest && activateHiddenList) {
			setActivateHiddenList(false);
			setMorePagesResquest(false);
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
								<li key={num} id={`page-${num}`}>
									<NavLink
										to="/find-dog"
										className={
											selected === num ? styles.ActivePage : styles.Page
										}
										onClick={() => {
											paginate(num);
											updateSelectedPage(num);
										}}
									>
										{num}
									</NavLink>
								</li>
							);
						}
					})}
					{!morePagesRequest && pageNumbers.length > 10 && (
						<li>
							<button
								className={styles.PagesBreak}
								onClick={() => {
									toggleHiddenList();
								}}
							>
								<FontAwesomeIcon
									className={styles.ListOfPagesIcons}
									icon={faPlus}
								/>
							</button>
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
									<NavLink
										to="/find-dog"
										className={
											selected === num ? styles.ActivePage : styles.Page
										}
										onClick={() => {
											paginate(num);
											updateSelectedPage(num);
										}}
									>
										{num}
									</NavLink>
								</li>
							);
						}
					})}
					{morePagesRequest && pageNumbers.length > 10 && (
						<li>
							<button
								className={styles.PagesBreak}
								onClick={(e) => {
									toggleHiddenList(e);
								}}
							>
								<FontAwesomeIcon
									className={styles.ListOfPagesIcons}
									icon={faMinus}
								/>
							</button>
						</li>
					)}
				</ul>
			</nav>
		</div>
	);
};

export default Pagination;
