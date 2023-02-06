import { updateUser } from "@/helpers/fetch-helper";
import Link from "next/link";
import classes from "./header.module.css";
const Header = props => {
  const { user, about, setAbout, refAbout } = props;

  const editProfileHandler = event => {
   
    const options = {
        about: refAbout.current.value
    }
    updateUser(user, options)
    
  }

  return (
    <>
      <header className={classes["header-content"]}>
        <h2 className={classes["header-title"]}>Rediger informasjon</h2>
        <button className={classes["btn-finish"]} onClick={editProfileHandler}>
          Ferdig
        </button>

        <div className={classes["header-nav"]}>
          <button className={classes["btn-edit"]}>Rediger</button>

          <button className={classes["btn-show"]}>Forhåndsvisning</button>
        </div>
      </header>
    </>
  );
};

export default Header;
