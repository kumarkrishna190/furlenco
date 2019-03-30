import React from 'react';

const Datebox = ({datefeild, dateChange}) => {
    return (
        <div className='pa2'>
        	<input className='pa2 w-60 ba b--green bg-light-blue' type='search' onChange={dateChange} placeholder='yyyy-mm-dd'/>
        </div>
    );
}

export default Datebox;