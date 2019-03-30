import React from 'react';
import './addblog.css';

class Addblog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      blog: '',
      creation_date: ''
    }
  }



onTitleChange = (event) => {
    this.setState({title: event.target.value})
  }

onBlogChange = (event) => {
    this.setState({blog: event.target.value})
  }

  onSubmitBlog = () => {
    fetch('http://localhost:3000/addblog', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: 'dfgh',
        title: this.state.title,
        blog: this.state.blog
      })
    })
    .then(response => response.json())
    .then(blog => {
      if (blog[0].blog_id) {
        this.props.loadBlog(blog[0])
        this.props.onRouteChange('home');
      }
    })
  }


  render() {
   return(
    <article className="addform white br2  ba b--black-10 w-50 shadow-5 center">
       <main className="pa1">
        <div className="measure">
          <fieldset id="blog" className="ba b--transparent ph1 mh1">
            <legend className="f3 fw2 ph0 mh0">Create New Blog:</legend>
            <div className="mt2">
              <label className="tl db fw6 lh-copy f6 input-reset" htmlFor="title">Title:</label>
              <input onChange={this.onTitleChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-yellow white w-100" type="text" name="title"  id="title" />
            </div>
             <div className="mt3">
              <label className="tl db fw6 lh-copy f6 input-reset" htmlFor="add-blog">Blog:</label>
              <textarea cols="50" rows="6" onChange={ this.onBlogChange } className="pa2 input-reset ba bg-transparent hover-bg-black hover-yellow white w-100 " name="blog"  id="blog" />
             </div>
          </fieldset>
          <div className="mt3">
            <input onClick={this.onSubmitBlog} className="b ph3 pv1 input-reset ba b--black bg-blue grow pointer f6 dib" type="submit" value="Post" />
            <input className="b ph2 pv1 input-reset ba b--black bg-blue grow pointer f6 dib" type="reset" value="Clear" />
          </div>
        
         </div>
       </main>
    </article>
     );
 }
}

export default Addblog;