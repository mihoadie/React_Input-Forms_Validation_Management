import { useState } from "react";

const useInput = (validationTestFunction) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validationTestFunction(enteredValue);
  const hasError = isTouched && !valueIsValid;

  const onCHangeHandler = (event) => {
    setEnteredValue(event.target.value);
  };
  const onBlurHandler = (event) => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    onCHangeHandler,
    onBlurHandler,
    reset,
  };
};
export default useInput;
