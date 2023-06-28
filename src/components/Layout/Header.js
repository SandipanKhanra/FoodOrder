import React from "react";
import classess from "./Header.module.css";
import mealPic from "../../assets/pexels-ash-376464.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = () => {
  return (
    <>
      <header className={classess.header}>
        <h1>React Meals</h1>
        <HeaderCartButton />
      </header>
      <div className={classess["main-image"]}>
        <img src={mealPic} alt="Delicious meal pic" />
      </div>
    </>
  );
};

export default Header;
