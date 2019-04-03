import React from 'react';
import Card from './Card';

const Bloglist = ({ blog, date, allblogs, pagination, searchtype, name, id }) => {
    if (searchtype === 'searchbox') {
      var cardcomponent = blog.map((blogs, i) => {
        return <Card id={id} name={name} key={i} blogid={blog[i].blog_id} email={blog[i].email} title={blog[i].title} blog={blog[i].blog} creation_date={blog[i].creation_date} update_date={blog[i].last_update} /> 
    })
    } else if (searchtype === 'datebox') {
        cardcomponent = date.map((blogs, i) => {
        return <Card id={id} name={name} key={i} blogid={date[i].blog_id} email={date[i].email} title={date[i].title} blog={date[i].blog} creation_date={date[i].creation_date} update_date={date[i].last_update} /> 
    })
    } else {
        cardcomponent = pagination.map((blogs, i) => {
        return <Card id={id} name={name} key={i} blogid={pagination[i].blog_id} email={pagination[i].email} title={pagination[i].title} blog={pagination[i].blog} creation_date={pagination[i].creation_date} update_date={pagination[i].last_update} /> 
    })
    }

    // to show all the blogs before using any filters
    //  else {
    //     cardcomponent = allblogs.map((blogs, i) => {
    //     return <Card key={i} blogid={allblogs[i].blog_id} email={allblogs[i].email} title={allblogs[i].title} blog={allblogs[i].blog} creation_date={allblogs[i].creation_date} update_date={allblogs[i].last_update} /> 
    // })
    // }

  return (
        <div>
            {cardcomponent}
        </div>
    );
}
export default Bloglist;
