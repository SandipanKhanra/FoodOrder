import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (val) => val.trim() === "";
const isSixChars = (val) => val.trim().length === 6;

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true,
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();
  const confirmHandler = (event) => {
    event.preventDefault();

    const eneteredName = nameInputRef.current.value;
    const eneteredStreet = streetInputRef.current.value;
    const eneteredPostalCode = postalCodeInputRef.current.value;
    const eneteredCity = cityInputRef.current.value;

    const eneterdNameIsValid = !isEmpty(eneteredName);
    const eneterdStreetIsValid = !isEmpty(eneteredStreet);
    const eneterdCityIsValid = !isEmpty(eneteredCity);
    const eneterdPostalCodeIsValid = isSixChars(eneteredPostalCode);

    setFormInputsValidity({
      name: eneterdNameIsValid,
      city: eneterdCityIsValid,
      street: eneterdStreetIsValid,
      postalCode: eneterdPostalCodeIsValid,
    });

    const formIsValid =
      eneterdNameIsValid &&
      eneterdCityIsValid &&
      eneterdPostalCodeIsValid &&
      eneterdStreetIsValid;

    if (!formIsValid) return;

    props.onConfirm({
      name: eneteredName,
      city: eneteredCity,
      street: eneteredStreet,
      postalCode: eneteredPostalCode,
    });
  };

  const nameControlClasses = `${classes.control} ${
    formInputsValidity.name ? "" : classes.invalid
  }`;

  const streetControlClasses = `${classes.control} ${
    formInputsValidity.street ? "" : classes.invalid
  }`;

  const cityControlClasses = `${classes.control} ${
    formInputsValidity.city ? "" : classes.invalid
  }`;

  const postalCodeControlClasses = `${classes.control} ${
    formInputsValidity.postalCode ? "" : classes.invalid
  }`;

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor="name">Your Name</label>
        <input type="text" id="name" ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a valid name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor="street">Street</label>
        <input type="text" id="street" ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a valid street</p>}
      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor="postal">Postal Code</label>
        <input type="text" id="postal" ref={postalCodeInputRef} />
        {!formInputsValidity.postalCode && (
          <p>Please enter a valid postalCode</p>
        )}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor="city">City</label>
        <input type="text" id="city" ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a valid city</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
