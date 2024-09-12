import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Projects.module.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); // Отфильтрованные проекты
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); // Сбрасываем ошибку перед новым запросом
      try {
        const projectsResponse = await axios.get(
          "https://api.test.cyberia.studio/api/v1/projects",
        );
        const categoriesResponse = await axios.get(
          "https://api.test.cyberia.studio/api/v1/project-categories",
        );

        // Валидация полученных данных
        if (
          projectsResponse.data &&
          Array.isArray(projectsResponse.data.items)
        ) {
          setProjects(projectsResponse.data.items);
          setFilteredProjects(projectsResponse.data.items);
        } else {
          throw new Error("Неверный формат данных проектов");
        }

        if (
          categoriesResponse.data &&
          Array.isArray(categoriesResponse.data.items)
        ) {
          setCategories(categoriesResponse.data.items);
        } else {
          throw new Error("Неверный формат данных категорий");
        }

        setLoading(false);
      } catch (err) {
        setLoading(false);

        if (err.response && err.response.status === 422) {
          setError(
            "Ошибка валидации данных с сервера. Пожалуйста, проверьте введенные данные.",
          );
        } else {
          setError("Ошибка при получении данных: " + err.message);
        }
      }
    };

    fetchData();
  }, []);

  const handleCategoryClick = (categoryId) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory(null);
      setFilteredProjects(projects);
    } else {
      setSelectedCategory(categoryId);
      setFilteredProjects(
        projects.filter((project) =>
          project.categories.some((cat) => cat.id === categoryId),
        ),
      );
    }
  };
  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div className={styles.Error}>{error}</div>;
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Title}>Кейсы</div>

      <div className={styles.ProjectsCat}>
        <nav className={styles.navigation}>
          <ul className={styles.navigationList}>
            {categories.map((category) => (
              <li
                key={category.id}
                className={`${styles.navigationItem} ${selectedCategory === category.id ? styles.activeCategory : ""}`} // Окрашивание выбранной категории
                onClick={() => handleCategoryClick(category.id)}
                style={{ cursor: "pointer" }}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className={styles.Projects}>
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              style={{
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
              }}
              className={styles.Card}
            >
              <div className={styles.Inner}>
                <div className={styles.Logo}>
                  <svg
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      width="24.9999"
                      height="5.46874"
                      rx="1"
                      transform="matrix(1 0 0 -1 0 24.9995)"
                      fill="#2D76F9"
                    />
                    <rect
                      width="14.0625"
                      height="5.46874"
                      rx="1"
                      transform="matrix(1 0 0 -1 10.938 14.0625)"
                      fill="#2D76F9"
                    />
                    <rect
                      width="24.9999"
                      height="5.46874"
                      rx="1"
                      transform="matrix(0 1 1 0 0 0.00012207)"
                      fill="#2D76F9"
                    />
                    <rect
                      width="14.0625"
                      height="5.46874"
                      rx="1"
                      transform="matrix(0 1 1 0 10.938 0.00012207)"
                      fill="#2D76F9"
                    />
                  </svg>
                </div>
                <div className={styles.CardTitle}>{project.title}</div>
              </div>

              {/*<div className={styles.Description}>*/}
              {/*    Онлайн гипермаркет. Для компании были разработаны сайт и мобильное приложение и т.д.*/}
              {/*</div>*/}
            </div>
          ))
        ) : (
          <div>Проекты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default Projects;
