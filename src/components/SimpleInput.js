// such example,is no longer imported in the app, and is a step by step without custom hooks to handle validation.
// errorDetails should be optimized in this example,
// but the aim was to get an operation idea of how to manage onBlur + onsubmit + onChange validations

/*


*/

// useState can be overkill if we only have few changes
// here we handle both the useRef and useState approaches to chek the value entered (X=useRef()+ref={X}  OR onChange(setY)+const [Y, setY]=useState()+Value={Y})
// and we also manage error handling onBlur (when loosing focus on Input form )  + onchange (on every keystroke) + when submitting (onSubmit)!!!

// other technics not used here: put disabled property to the submit button, inled to the error!==null
// and in css , we could also put a .dsabled class in which we put cursos: not-allowed

import React, { useRef, useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState(""); // 1 -using useState combined to onCHange method
  const [enteredEmail, setEnteredEmail] = useState("");
  const [error, setError] = useState(false);
  const [errorDetails, setErrorDetails] = useState([]);
  const enteredNameRef = useRef(); // 2 - using the useRef method

  const nameInputChangeHandler = (event) => {
    setEnteredName(event.target.value);
    if (event.target.value !== "") {
      setErrorDetails([]);
      setError(false);
    }
  };

  const emailInputChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
    if (event.target.value !== "") {
      setErrorDetails([]);
      setError(false);
    }
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    try {
      /*
      #####################################################################################################
      #####################################################################################################
      */

      // 1 - using useState associated to onChange to catch input value
      if (enteredName.trim() === "") {
        throw new Error("Your name is empty");
        //return;
      }
      // for the eamil, only usung the state + onchange +onblur method (and so not the useref approach)
      if (
        !enteredEmail.includes("@") ||
        !enteredEmail.includes(".") ||
        !enteredEmail.length > 7
      ) {
        throw new Error("Your email must contain @ and a correct syntax ");
        //return;
      }
      setError(false);
      setErrorDetails([]);
      setEnteredName(""); // reseting the value of the input after method 1 treatment
      setEnteredEmail("");
      alert("Nice!");
      /*
      #####################################################################################################
      #####################################################################################################
      */

      // 2 - using useRef to catch input value
      // const enteredValue = enteredNameRef.current.value;
      // if (enteredValue.trim() === "") {
      //   throw new Error("Your name is empty");
      //   // return;
      // }

      // setError(false);
      // setErrorDetails([]);
      // console.log(enteredValue);
      // // here resetting the value is not recommanded, as we do not use the ref(so the DOM) directly with JS, recommanded to manage it staying with React
    } catch (error) {
      setError(true);
      setErrorDetails((prevState) => {
        let newerror = [];
        newerror = prevState.concat(error.message);
        return newerror;
      });
    }
  };

  const nameInputClasses = !error ? "form-control" : "form-control invalid";
  const emailInputClasses = !error ? "form-control" : "form-control invalid";
  const nameInputBlurHandler = (event) => {
    // when the input looses focus! (linked to onBlur JS attribute)
    try {
      /*
        #####################################################################################################
        #####################################################################################################
        */

      // 1 - using useState associated to onChange to catch input value
      if (enteredName.trim() === "") {
        throw new Error("Your name is empty");
        //return;
      }
      setError(false);
      setErrorDetails([]);

      /*
        #####################################################################################################
        #####################################################################################################
        */

      // 2 - using useRef to catch input value
      const enteredValue = enteredNameRef.current.value;
      if (enteredValue.trim() === "") {
        throw new Error("Your name is empty");
        // return;
      }
      setError(false);
      setErrorDetails([]);
      // here resetting the value is not recommanded, as we do not use the ref(so the DOM) directly with JS, recommanded to manage it staying with React
    } catch (error) {
      setError(true);
      setErrorDetails((prevState) => {
        let newerror = [];
        newerror = prevState.concat(error.message);
        return newerror;
      });
    }
  };

  const emailInputBlurHandler = (event) => {
    // when the input email looses focus! (linked to onBlur JS attribute)
    try {
      if (
        !enteredEmail.includes("@") ||
        !enteredEmail.includes(".") ||
        !enteredEmail.length > 7
      ) {
        throw new Error("Your email must contain @ and a correct syntax ");
        //return;
      }
      setError(false);
      setErrorDetails([]);
    } catch (error) {
      setError(true);
      setErrorDetails((prevState) => {
        let newerror = [];
        newerror = prevState.concat(error.message);
        return newerror;
      });
    }
  };

  const finalError = error
    ? errorDetails.map((el) => {
        return (
          <li className="error-text" key={el}>
            {el}
          </li>
        );
      })
    : "";

  return (
    <form onSubmit={formSubmitHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          ref={enteredNameRef} // 2 - using the useref method
          type="text"
          id="name"
          onChange={nameInputChangeHandler} // 1 - using useState combined to onChange method
          value={enteredName} // 1 - using useState combined to onChange method
          onBlur={nameInputBlurHandler} // when the input looses focus!
        />
        {error && <ul>{finalError}</ul>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor="email">Your email</label>
        <input
          type="text"
          id="email"
          onChange={emailInputChangeHandler} // 1 - using useState combined to onChange method
          value={enteredEmail} // 1 - using useState combined to onChange method
          onBlur={emailInputBlurHandler} // when the input looses focus!
        />
        {error && <p className="error-text">{errorDetails}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
