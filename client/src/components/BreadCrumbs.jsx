import React from 'react';
import styles from "./Breadcrumbs.module.css"
const BreadCrumbs = () => {
    return (
        <nav className={styles.Breadcrumbs}>
            <ul>
                <li><a href="/">Главная</a></li>
                <li aria-hidden="true">/</li>
                <li><a href="/">Кейсы</a></li>
            </ul>
        </nav>
    );
};

export default BreadCrumbs;