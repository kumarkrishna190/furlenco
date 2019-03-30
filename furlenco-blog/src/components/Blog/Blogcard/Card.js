import React from 'react';
//import Readblog from './components/Blog/Readblog';

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blogData:{
     	  email: '',
	      title: '',
	      blog: '',
	      last_update: ''
       },
    }
  }


loadBlog = (data) => {
    this.setState({blogData: {
    	  blog_id: data.blog_id,
    	  email: data.email,
	      title: data.title,
	      blog: data.blog,
	      last_update: data.last_update
    }});
    console.log(data);
  }

    
  render() {
  	const { email, title, blog, update_date } = this.props;
    return (
    	<div>
	       <div onClick={() => this.loadBlog({ email, title, blog, update_date })}
	          className="w-40 pa3 mr2 tc bg-light-green dib br3 ma2 grow bw2 shadow-3 pointer o-80">
	          <p className="underline pa2 bg-black white f4 tl br-pill b"> {title.toUpperCase()} </p>
	          <p className="tl f5 b"> {blog.substr(0, 250)} </p>
	          <p className="tr f7">{email} <br />
	          		last update:{update_date.substr(0, 10)}
	          </p>
	        </div>
       </div>

        
       

    );
	}
}

export default Card;

//<Readblog onRead={this.onRead} />