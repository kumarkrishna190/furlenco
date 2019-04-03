import React from 'react';
import Comment from './Comment';

const Commentlist = ({ commentfilter }) => { 
      const commentcomponent = commentfilter.map((comments , i) => {
        return <Comment key={i} blog_id={commentfilter[i].blog_id} name={commentfilter[i].name} comment={commentfilter[i].comment} comment_date={commentfilter[i].comment_date} /> 
    })
    } 

  return (
        <div>
            {commentcomponent}
        </div>
    );

export default Commentlist;



















