import React from 'react';

const Navigateblog = ({ onBlogRouteChange, blogRead }) => {
   if (blogRead) {
    return(
       <nav style={{display: 'flex', justifyContent: 'flex-center'}}>
            <p onClick={() => onBlogRouteChange('discover')} className='f3 link dim white underline pa3 pointer'>Discover Blogs</p>
        </nav>
     );
    } else {
        return(
        <nav className='ma0 flex justify-between'>
            <p onClick={() => onBlogRouteChange('card')} className='f5 link dim blue br-pill pa2 ba b--green bg-light-blue br-pill pointer'> Read Blogs </p>
            <p onClick={() => onBlogRouteChange('write')} className='f5 link dim blue bg-light-blue br-pill pa2 pointer'> Write Blog </p>
        </nav>
        );
    }
}

export default Navigateblog;