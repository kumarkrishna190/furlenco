import React from 'react';

const Scroll = (props) => {
    return (
        <div style={{ overflow: 'scroll', border: '0.05px solid white', height:'605px'}}>
            {props.children}
        </div>
    );
};

export default Scroll;