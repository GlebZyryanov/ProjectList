import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./Projects.module.css";

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("Пытаемся подключиться к api")
                const projectsResponse = await axios.get('https://api.test.cyberia.studio/api/v1/projects');
                console.log("projectsResponse.data:",projectsResponse.data);
                setProjects(projectsResponse.data);
                console.log("Вот тут должен быть массив Projects:",projects);


                const categoriesResponse = await axios.get('https://api.test.cyberia.studio/api/v1/project-categories');
                console.log(categoriesResponse.data);
                setCategories(categoriesResponse.data);

                setLoading(false);
            } catch (error) {
                console.error('Ошибка при получении данных:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    return (
        <div className={styles.Container}>
            <div className={styles.Title}>
                Кейсы
            </div>
            <div className={styles.ProjectsCat}>
                <nav className={styles.navigation}>
                    <ul className={styles.navigationList}>
                        {categories.items.map(category => (
                            <li key={category.id} className={styles.navigationItem}>{category.name}</li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={styles.Projects}>
                {projects.items.map((project) => (
                    <div key={project.id}
                         style={{backgroundImage: `url(${project.image})`, backgroundSize: 'cover'}}
                         className={styles.Card}>
                        <div className={styles.Logo}>
                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <rect width="24.9999" height="5.46874" rx="1" transform="matrix(1 0 0 -1 0 24.9995)"
                                      fill="#2D76F9"/>
                                <rect width="14.0625" height="5.46874" rx="1"
                                      transform="matrix(1 0 0 -1 10.938 14.0625)" fill="#2D76F9"/>
                                <rect width="24.9999" height="5.46874" rx="1" transform="matrix(0 1 1 0 0 0.00012207)"
                                      fill="#2D76F9"/>
                                <rect width="14.0625" height="5.46874" rx="1"
                                      transform="matrix(0 1 1 0 10.938 0.00012207)" fill="#2D76F9"/>
                            </svg>
                        </div>
                        <div className={styles.Inner}>
                            <div className={styles.CardTitle}>{project.title}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Projects;
