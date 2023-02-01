import classes from "./signup.module.css";
const Signup = (props) => {

  return (
    <form>
      <div className={classes['form-group']}>
        <label htmlFor="email">E-post</label>
        <input className={classes['form-control']} name="email" type="email" placeholde="eksemper@gmail.com" />
      </div>
      <div className={classes['form-group']}>
        <label htmlFor="password">Passord</label>
        <input className={classes['form-control']} name="password" type="password" placeholde="***" />
      </div>
      <div className={classes['form-group']}>
        <label htmlFor="repeatPassword">Gjenta passord</label>
        <input className={classes['form-control']} name="repeatPassword" type="password" placeholde="***" />
      </div>
    </form>
  );
};

export default Signup;
