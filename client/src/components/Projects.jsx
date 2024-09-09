import React from 'react';
import styles from "./Projects.module.css"
const Projects = () => {
    return (
        <div className={styles.Container}>
            <div className={styles.Title}>
                Кейсы
            </div>
                <div className={styles.ProjectsCat}>
                    <nav className={styles.navigation}>
                        <ul className={styles.navigationList}>
                            <li className={styles.navigationItem}>Продвижение</li>
                            <li className={styles.navigationItem}>Разработка</li>
                            <li className={styles.navigationItem}>Мобильные приложения</li>
                            <li className={styles.navigationItem}>Юзабилити - аудит</li>

                        </ul>
                    </nav>
                </div>
                <div className={styles.Projects}>
                    Карточки проджектов
                </div>

        </div>
    );
};

export default Projects;