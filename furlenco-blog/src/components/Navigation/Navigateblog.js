import React from 'react';

const Navigateblog = ({ onBlogRouteChange , blogRoute, id}) => {
    if (id) {
      return (
       (blogRoute === 'read') ?
        <nav>
            <p onClick={() => onBlogRouteChange('write')} className='f5 link dim white pa2 ba b--white bg-black grow br3 pointer'> write Blogs → </p>
        </nav>
    	:
        <nav>
            <p onClick={() => onBlogRouteChange('read')} className='f5 link dim white pa2 ba b--white bg-black br3 grow pointer'> ← Read Blogs </p>
        </nav>
        )
      } else {
        return (
            <div> </div>
        )
      }
    }
    

export default Navigateblog;