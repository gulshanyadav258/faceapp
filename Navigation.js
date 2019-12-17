import React from 'react';

const Navigation = (onRouteChange) => {
return(
	<nav style={{display:'flex', justifycontent: 'flex-end'}}>
	<p onClick={() => onRouteChange ('Signin')} className= 'f3 link dim black underline pa3 pointer'> sign out</p>
	</nav>
	);
}
export default Navigation;