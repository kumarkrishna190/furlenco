import React from 'react';

const Datebox = ({datefeild, dateChange}) => {
    return (
        <div className='pa2'>
        	<input className='pa2 mt2 ba b--green bg-light-blue br3' type='date' onChange={dateChange} />
        </div>
    );
}

export default Datebox;