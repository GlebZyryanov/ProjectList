import React from "react";
import Header from "./components/Header";
import styles from "./App.module.css";
import BreadCrumbs from "./components/BreadCrumbs";
import Projects from "./components/Projects";
import FeedbackForm from "./components/FeedbackForm";
import Footer from "./components/Footer";
function App() {
  return (
    <div className={styles.Background}>
      <div className={styles.Container}>
          <Header/>
          <BreadCrumbs/>
          <Projects/>
          <FeedbackForm/>

      </div>
        <Footer/>
    </div>
  );
}

export default App;
