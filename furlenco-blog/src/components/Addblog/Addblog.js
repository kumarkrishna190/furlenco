import React from 'react';
import './addblog.css';

class Addblog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      blog: undefined,
      creation_date: undefined,
      postbutton: true
    }
  }

onTitleChange = (event) => this.setState({title: event.target.value});

onBlogChange = (event) => this.setState({blog: event.target.value});

toggleAddBlog = () => (this.state.postbutton === true) ? this.setState({postbutton: false}) : this.setState({postbutton: true});

onSubmitBlog = () => {
    this.toggleAddBlog();
    fetch('http://localhost:3000/addblog', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.props.email,
        title: this.state.title,
        blog: this.state.blog
      })
    })
    .then(response => response.json())
    .then(blog => {
      if (blog[0].blog_id) {
        this.props.loadBlog(blog[0])
      }
    })
  }


  render() {
   return(
    this.state.postbutton === true ?
        <article className="addform white br4 ba b--black-10 w-50 shadow-5 center">
           <main className="pa4">
            <div className="measure">
              <fieldset id="blog" className="ba b--transparent ph1 mh1">
                <legend className="f3 b i fw2">Create New Blog:</legend>
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
                <input onClick={this.toggleAddBlog} className="b ph3 pv1 input-reset ba b--white bg-blue grow pointer br3 f6 dib" type="submit" value="Post" />
              </div>
             </div>
           </main>
        </article>
        : <div className="w-80 pa2 mr2 tc bg-light-yellow dib br3 ma2 bw2 shadow-3">
             <div>
                <p className="pa2 bg-black white f4 tc b"> {this.state.title.toUpperCase()} </p>
                <p className="tl i f5 b">  {this.state.blog}  </p>         
                <p className="tr i f7">  {this.state.email}  </p>
             </div>

              <div className="flex justify-center ma1">
                <div onClick={this.onSubmitBlog} className="w-20 f5 link dim white pa2 ba b--white bg-blue br3 pointer"> Submit and Go back </div>
                <div  onClick = {() => this.toggleAddBlog()} className=' w-20 f5 link dim white pa2 ba b--white bg-blue br3 pointer'> Go back to edit </div>
              </div>

         </div>
     );
 }
}

export default Addblog;