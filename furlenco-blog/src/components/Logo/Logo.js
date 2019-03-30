import React from 'react';
import Tilt from 'react-tilt';
import icon from './icon.png'
import './Logo.css';

const Logo = () => {
   return(
      <div className='ma4 mt0'>
       <Tilt className="Tilt br1 shadow-2" options={{ max : 90 }} style={{ height: 100, width: 100 }} >
        <div className="Tilt-inner pa1"> <img style={{paddingTop: '1px'}} alt='Logo' height= '90' width= '90' src={icon} /> </div>
       </Tilt>
      </div>
     );
}

export default Logo;