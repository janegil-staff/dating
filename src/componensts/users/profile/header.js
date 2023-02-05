import Link from "next/link";
import classes from './header.module.css';
const Header = (props) => {
  return (
    <>
    <header className={classes['header-content']}>
      <h2 className={classes['header-title']}>Rediger informasjon</h2>
      <Link href="/profile" className={classes['btn-finish']}>Ferdig</Link>
    
      <div className={classes['header-nav']}>
      
        <button className={classes['btn-edit']}>Rediger</button>  

      <button className={classes['btn-show']}>Forhåndsvisning</button>
  
      
      </div>
    </header>

    </>

  );
};

export default Header;
