import classes from "./index.module.css";

function StartingPageContent() {
  return (
    <div className={classes["landing-page-background"]}>

      <h1 className={classes["title"]}>Kjærligheten</h1>
      <div className={classes['btn-group']}>
        <button className={classes['btn-signup']}>Opprett konto</button>
        <button className={classes['btn-login']}>Logg inn</button>
      </div>
    </div> 
  );
}

export default StartingPageContent;
