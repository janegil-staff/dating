import { useState } from "react";
import classes from "./signup.module.css";
import DatePicker from "react-datepicker";
import { useRouter } from "next/router";
import useInput from "@/hooks/use-input";
import { createUser, signInUser } from "@/helpers/user-helper";
import moment from "moment";
import { sendStatusCode } from "next/dist/server/api-utils";
const SignUp = (props) => {
  const [startDate, setStartDate] = useState(moment().subtract(18, "years")._d);
  const { setIsOpen } = props;
  const [error, setError] = useState(null);
  const router = useRouter();
  const [sex, setSex] = useState('male');
  
  const {
    value: enteredName,
    isValid: enteredNamesValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => /^[A-Za-z]\w{7,14}$/.test(value.trim()));

  const {
    value: enteredPasswordConfirmation,
    isValid: enteredPasswordIsValidConfirmation,
    hasError: passwordConfirmationInputHasError,
    valueChangeHandler: passwordConfirmationChangeHandler,
    inputBlurHandler: passwordConfirmationBlurHandler,
    reset: resetPasswordConfirmationInput,
  } = useInput((value) => value === enteredPassword);

  const namenputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  const passwordConfirmationInputClasses = passwordConfirmationInputHasError
    ? "form-control invalid"
    : "form-control";

  const submitHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await createUser({
        name: enteredName,
        email: enteredEmail,
        password: enteredPassword,
        sex,
        birthdate: startDate,
        setError,
      });

      if (error) return;
      // Signing in new user

      let options = {
        redirect: false,
        email: enteredEmail,
        password: enteredPassword,
      };
      await signInUser({
        type: "credentials",
        options,
        setError,
      });
      router.replace("/profile");
    } catch (error) {
      setError(error.message);
    }
  };
  const onSexChange = (event) => {
    setSex(event.target.value);
    console.log(sex);
  };
  return (
    <>
      <div className={classes.contain}>
        <div className={classes.wrapper}>
          <div className={classes.contacts}>
            <h3>Kjærligheten</h3>

            <ul className={classes.info}>
              <li>Helt gratis</li>
              <li>Ingen reklame</li>
              <li>Enkel å bruke</li>
            </ul>
          </div>

          <div className={classes.form}>
            <h3>Registrer deg</h3>
            <form onSubmit={submitHandler}>
              <p>
                {error && <p className={"error-text"}>{error}</p>}
                <div className={classes["form-group"]}>
                  <label htmlFor="name">Brukernavn</label>
                  <input
                    className={namenputClasses}
                    type="text"
                    id="name"
                    onChange={nameChangeHandler}
                    onBlur={nameBlurHandler}
                    value={enteredName}
                    required
                    aria-describedby="nameHelp"
                    placeholder="Ola Normann"
                  />
                  {nameInputHasError && (
                    <p className={"error-text"}>Navn feltet må ha innhold</p>
                  )}
                </div>
              </p>
              <p>
                <div className={classes["form-group"]}>
                  <label htmlFor="email">E-post</label>
                  <input
                    className={emailInputClasses}
                    type="email"
                    id="email"
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler}
                    value={enteredEmail}
                    required
                    aria-describedby="emailHelp"
                    placeholder="ola@normann.com"
                  />
                  {emailInputHasError && (
                    <p className={"error-text"}>E-post må inneholde @</p>
                  )}
                </div>{" "}
              </p>
              <p>
                <label for="">Fødselsdato</label>
                <DatePicker
                  minDate={moment().subtract(150, "years")._d}
                  maxDate={moment().subtract(18, "years")._d}
                  scrollableYearDropdown
                  dropdownMode="select"
                  showMonthDropdown
                  showYearDropdown
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                />
              </p>
              <p>
                <ul>
                  <li></li>
                  <li>
                    <label for="radio-1">Mann</label>
                    <input
                      type="radio"
                      name="sex"
                      id="radio-1"
                      value="male"
                      onChange={onSexChange}
                      checked 
                    />
                  </li>
                  <li>
                    <label for="radio-2">Dame</label>
                    <input
                      type="radio"
                      name="sex"
                      id="radio-2"
                      value="female"
                      onChange={onSexChange}
                    />
                  </li>
                </ul>
              </p>
              <p>
                <div className={classes["form-group"]}>
                  <label htmlFor="password">Passord</label>
                  <input
                    className={passwordInputClasses}
                    type="password"
                    id="password"
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler}
                    value={enteredPassword}
                    required
                    aria-describedby="paswordHelp"
                    placeholder="Velg et pasord"
                  />
                  {passwordInputHasError && (
                    <p className={"error-text"}>
                      Passord må inneholed mellom 8-16 tegn, minst en bokstav
                    </p>
                  )}
                </div>
              </p>
              <p>
                <div className={classes["form-group"]}>
                  <label htmlFor="passwordConfirmation">Gjenta passord</label>
                  <input
                    className={passwordConfirmationInputClasses}
                    type="password"
                    id="password"
                    onChange={passwordConfirmationChangeHandler}
                    onBlur={passwordConfirmationBlurHandler}
                    value={enteredPasswordConfirmation}
                    required
                    aria-describedby="paswordHelp"
                    placeholder="Gjenta pasord"
                  />
                  {passwordConfirmationInputHasError && (
                    <p className={"error-text"}>
                      Må være lik dit valgte pasord
                    </p>
                  )}
                </div>{" "}
              </p>
              <p className={classes["full-width"]}>
                <button>Send</button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
