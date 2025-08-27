import { NavLink } from "react-router-dom";
import PtzControls from "./PtzControls";
import classes from "./MainNavigation.module.css";

export default function MainNavigation() {
  return (
    <header className={classes.header}>
      <h1 className={classes.header_title}>VMS Demo</h1>
      <nav className={classes.nav}>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Live
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/database"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Database
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/settings"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Settings
            </NavLink>
          </li>
        </ul>
      </nav>
      <PtzControls />
    </header>
  );
}
