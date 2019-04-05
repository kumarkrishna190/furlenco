import React from 'react';
import Addcomment from '../Comment/Addcomment'


class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        cardsize: 'card',
        commentarrey: [],
        loadComment: []
       }
  }

  componentWillUpdate() {
        fetch('http://localhost:3000/comment/' + this.props.blogid)
        .then(response=> response.json())
        .then(comment => {
          if (comment[0].blog_id) {
          this.setState({commentarrey : comment})
        } else {
          this.setState({commentarrey : this.state.loadComment})
        }
      })
    }

  

toggleCardSize = () => (this.state.cardsize === 'card') ? this.setState({cardsize: 'page'}) : this.setState({cardsize: 'card'});

    
  render() {
  	const { blogid, email, title, blog, update_date, name, id } = this.props;

    return (
      this.state.cardsize === 'card' ?
	       <div onClick={() => this.toggleCardSize()}
	          className="w-40 pa3 mt2 ma2 tc bg-light-green dib br3 grow bw2 shadow-3 pointer o-80">
	          <p className="i pa2 tj mb0 bg-black white f4 tl br-pill b ttc-m"> {title} </p>
	          <p className="tl mt0 tj i bg-light-yellow pv4 br3 pa2 f5 b"> {blog.substr(0, 250)} </p>
	          <p className="tr i f7">{email} <br />
	          		last update:{update_date.substr(0, 10)}
	          </p>

	        </div>
        :
        <div className="w-80 pa2 mr2 tc bg-white dib br3 ma2 bw2 shadow-3 pointer">
          <div onClick={() => this.toggleCardSize()}>
            <p className="pa2 tj bg-black white f4 tc b ttu tracked"> {title} </p>
            <p className="tl tj i f5 b"> {blog} </p>         
            <p className="tr i f7"> {email} <br />
                last update: {update_date.substr(0, 10)}
            </p>
          </div>
          <hr />
          <Addcomment blog_id={blogid} name={name} id={id} loadComment={this.state.loadComment}/>

          {this.state.commentarrey.map((comment,key)=>{
          return(
            <div className="ml5">
              <div className="w-90 ma2 pa1 flex o-80 shadow-1 br-pill"  onClick={() => this.toggleCardSize()}>
                  <div className="i tj pa1 mb1 blue f5 tl b ttc"> {comment.name}: </div>
                  <div className="tj i pa1 pl2 f6 b"> {comment.comment} </div>
                  <span className="i pa2 f7">{comment.comment_date.substr(0, 10)}</span>
              </div>
            </div>
              )
          })
          }
        </div>   

    );
	}
}
export default Card;