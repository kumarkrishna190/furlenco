import React from 'react';
import Card from './Card';

const Bloglist = ({ blog, date, allblogs, searchtype }) => {
   
    if (searchtype === 'searchbox') {
      var cardcomponent = blog.map((blogs, i) => {
        return <Card key={i} blog_id={blog[i].id} email={blog[i].email} title={blog[i].title} blog={blog[i].blog} creation_date={blog[i].creation_date} update_date={blog[i].last_update} /> 
    })
    } else if (searchtype === 'datebox') {
        cardcomponent = date.map((blogs, i) => {
        return <Card key={i} blog_id={date[i].id} email={date[i].email} title={date[i].title} blog={date[i].blog} creation_date={date[i].creation_date} update_date={date[i].last_update} /> 
    })
    } else {
        cardcomponent = allblogs.map((blogs, i) => {
        return <Card key={i} blog_id={allblogs[i].id} email={allblogs[i].email} title={allblogs[i].title} blog={allblogs[i].blog} creation_date={allblogs[i].creation_date} update_date={allblogs[i].last_update} /> 
    })
    }

  return (
        <div>
            {cardcomponent}
        </div>
    );
}
export default Bloglist;
