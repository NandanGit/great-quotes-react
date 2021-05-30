import { NavLink } from 'react-router-dom';
import classes from './MainNavigation.module.css';

function MainNavigation() {
	return (
		<header className={classes.header}>
			<div className={classes.logo}>Great Quotes</div>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink activeClassName={classes.active} to="/quotes">
							Quotes
						</NavLink>
					</li>
					<li>
						<NavLink
							activeClassName={classes.active}
							to="/add-quote"
						>
							Add Quote
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default MainNavigation;
