import React from "react";
import useInput from "../hooks/use-input";

const BasicForm = (props) => {
  // the functions that will be passed as parameter to the personal hook useInput (./hook/use-input.js).those function checks the validity of the param
  const isNotEmpty = (value) => {
    return value.trim() !== "";
  };
  const isEmail = (value) => {
    return (
      value.includes("@") && value.includes(".") && value.trim().length > 7
    );
  };

  // destructuring of the personal hook return (useInput), providing alias to each return element of the personal hook, and saying that the function needed as parameter for the personal hook is our previous declared check function (isEmpty & isEmail!
  const {
    value: firstNameInput,
    isValid: firstNameisValid,
    hasError: firstNamehasError,
    onCHangeHandler: firstNameCHangeHandler,
    onBlurHandler: firstNameBlurHandler,
    reset: resetFirstName,
  } = useInput(isNotEmpty);
  const {
    value: lastNameInput,
    isValid: lastNameisValid,
    hasError: lastNamehasError,
    onCHangeHandler: lastNameCHangeHandler,
    onBlurHandler: lastNameBlurHandler,
    reset: resetLastName,
  } = useInput(isNotEmpty);
  const {
    value: emailInput,
    isValid: emailisValid,
    hasError: emailhasError,
    onCHangeHandler: emailCHangeHandler,
    onBlurHandler: emailBlurHandler,
    reset: resetEmail,
  } = useInput(isEmail);

  // check the global form validity
  let formIsValid = false;
  if (emailisValid && firstNameisValid && lastNameisValid) {
    formIsValid = true;
  }
  // manage the global submit form
  const formSubmitHandler = (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }
    console.log("Submitted!");
    resetEmail();
    resetFirstName();
    resetLastName();
  };

  // manage condition styling

  const firstNameClasses = firstNamehasError
    ? "form-control invalid"
    : "form-control";
  const lastNameClasses = lastNamehasError
    ? "form-control invalid"
    : "form-control";
  const emailClasses = emailhasError ? "form-control invalid" : "form-control";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="control-group">
        <div className={firstNameClasses}>
          <label htmlFor="name">First Name</label>
          <input
            type="text"
            id="name"
            value={firstNameInput}
            onBlur={firstNameBlurHandler}
            onChange={firstNameCHangeHandler}
          />
          {firstNamehasError && (
            <p className="error-text">Please enter your First Name</p>
          )}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor="name">Last Name</label>
          <input
            type="text"
            id="name"
            value={lastNameInput}
            onBlur={lastNameBlurHandler}
            onChange={lastNameCHangeHandler}
          />
          {lastNamehasError && (
            <p className="error-text">Please enter your Last Name</p>
          )}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor="name">E-Mail Address</label>
        <input
          type="text"
          id="name"
          value={emailInput}
          onBlur={emailBlurHandler}
          onChange={emailCHangeHandler}
        />
        {emailhasError && (
          <p className="error-text">Please enter your valid email</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
