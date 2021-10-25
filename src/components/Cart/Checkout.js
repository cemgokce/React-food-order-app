import { useRef, useState } from "react";
import classes from '../Cart/Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

  const [formInputValdidity, setFormInputValidity] = useState({
    name: true,
    street: true,
    city: true,
    postalCode: true
  });

  const nameInputRef = useRef();
  const streetInputRef = useRef();
  const postalCodeInputRef = useRef();
  const cityInputRef = useRef();





  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreed = streetInputRef.current.value;
    const enteredPostalCode = postalCodeInputRef.current.value;
    const enteredCity = cityInputRef.current.value;
    //validation
    const enteredNameIsValid = !isEmpty(enteredName);
    const enteredStreedIsValid = !isEmpty(enteredStreed);
    const enteredCityIsValid = !isEmpty(enteredCity);
    const enteredPostalCodeIsValid = !isEmpty(enteredPostalCode) && isFiveChars(enteredPostalCode);

    setFormInputValidity({
      name: enteredNameIsValid,
      street: enteredStreedIsValid,
      city: enteredCityIsValid,
      postalCode: enteredPostalCodeIsValid
    })

    //form is valid
    const formIsvalid = enteredPostalCodeIsValid && enteredNameIsValid && enteredCityIsValid && enteredStreedIsValid;
    if (!formIsvalid) {
      return;
    }
    props.onConfirm({
      name:enteredName,
      street:enteredStreed,
      city:enteredCity,
      postalCode:enteredPostalCode
    });
  };

  const nameControlClasses = `${classes.control} ${formInputValdidity.name ? '' : classes.invalid}`;
  const streetControlClasses = `${classes.control} ${formInputValdidity.street ? '' : classes.invalid}`;
  const cityControlClasses = `${classes.control} ${formInputValdidity.city ? '' : classes.invalid}`;
  const postalCodeControlClasses = `${classes.control} ${formInputValdidity.postalCode ? '' : classes.invalid}`;
  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValdidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValdidity.street && <p>Please enter a valid street!</p>}

      </div>
      <div className={cityControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValdidity.postalCode && <p>Please enter a valid postalCode!</p>}

      </div>
      <div className={postalCodeControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValdidity.city && <p>Please enter a valid city!</p>}

      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;