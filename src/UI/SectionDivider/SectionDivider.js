import React from 'react';
import style from './SectionDivider.module.css';

const sectionDivider = () => (
	<div className={style.DividerHolder}>
		<hr className={style.SectionDivider}></hr>
	</div>
);

export default sectionDivider;
