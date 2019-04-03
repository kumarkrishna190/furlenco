import React from 'react';

const Searchbox = ({searchfeild, searchChange}) => {
    return (
        <div className='pa2'>
        <input className='pa2 ba mt2 b--green bg-light-blue br-pill' type='search' placeholder='search blogs' 
        onChange={searchChange}
        />
        </div>
    );
}

export default Searchbox;