import React from 'react';
import Addcomment from '../Comment/Addcomment';
//import Commentlist from '../Comment/Commentlist'


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cardsize: 'card',
        blog_id: 0,
        email: undefined,
        title: undefined,
        blog: undefined,
        last_update: undefined,
        commentarrey: [],

       }
  }


  componentDidMount() {
        fetch('http://localhost:3000/comment')
        .then(response=> response.json())
        .then(comment => this.setState({commentarrey : comment}))
    }


toggleCardSize = () => (this.state.cardsize === 'card') ? this.setState({cardsize: 'page'}) : this.setState({cardsize: 'card'});


loadBlog = (data) => {
    this.toggleCardSize();
    this.setState({
    	  blog_id: data.blogid,
    	  email: data.email,
	      title: data.title,
	      blog: data.blog,
	      last_update: data.update_date
    });
  }

    
  render() {
  	const { blogid, email, title, blog, update_date, name, id } = this.props;
    // const commentfilter = this.state.commentarrey.filter(commentarrey =>{
    //       return commentarrey.blog_id.includes(this.state.blog_id);
    //     });

    return (
      this.state.cardsize === 'card' ?
	       <div onClick={() => this.loadBlog({ blogid, email, title, blog, update_date })}
	          className="w-40 pa3 mt2 ma2 tc bg-light-green dib br3 grow bw2 shadow-3 pointer o-80">
	          <p className="i pa2 tj mb0 bg-black white f4 tl br-pill b ttc-m"> {title} </p>
	          <p className="tl mt0 tj i bg-light-yellow pv4 br3 pa2 f5 b"> {blog.substr(0, 250)} </p>
	          <p className="tr i f7">{email} <br />
	          		last update:{update_date.substr(0, 10)}
	          </p>
	        </div>
        :
        <div className="w-80 pa2 mr2 tc bg-light-yellow dib br3 ma2 bw2 shadow-3 pointer">
          <div onClick={() => this.toggleCardSize()}>
            <p className="pa2 tj bg-black white f4 tc b ttu tracked"> {title} </p>
            <p className="tl tj i f5 b"> {blog} </p>         
            <p className="tr i f7"> {email} <br />
                last update: {update_date.substr(0, 10)}
            </p>
          </div> 
          <Addcomment blog_id={this.state.blog_id} name={name} id={id} />
        </div>   

    );
	}
}

export default Card;


//<Commentlist commentfilter={commentfilter} />
