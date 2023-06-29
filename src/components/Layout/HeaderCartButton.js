import React from "react";
import CartIcon from "../ Cart/CartIcon";
import classess from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  return (
    <button className={classess.button} onClick={props.onClick}>
      <span className={classess.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classess.badge}> 3</span>
    </button>
  );
};

export default HeaderCartButton;
