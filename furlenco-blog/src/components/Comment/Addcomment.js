import React from 'react';

class Addcomment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blog_id: undefined,
      name: undefined,
      comment: undefined,
      commentbutton: true
    }
  }

  onInputChange = (event) => {
    this.setState({comment: event.target.value})
  }

  onSubmit = () => {
    this.toggleComment();
    fetch('http://localhost:3000/addcomment', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        blog_id: this.props.blog_id,
        name: this.props.name,
        comment: this.state.comment,
      })
    })
    .then(response => response.json())
    .then(comment => {
      if (comment.blog_id) {
        this.props.loadComment(comment)
      }
    })
  }

  toggleComment = () => (this.state.commentbutton === true) ? this.setState({commentbutton: false}) : this.setState({commentbutton: true});

  render() {
    if (this.props.id) {
   return (
      (this.state.commentbutton) ?
         <input type="submit" value="comment" className='w-10 br3 grow f6 link ph1 pv1 white bg-blue' onClick={this.toggleComment} />
       : <div className='pa0 br2 shadow-2'>
            <input id='commentbox' className='f6 pa1 w-90 br3' type='text' onChange={this.onInputChange}/>
            <input type="submit" value="comment" className='di w-10 br3 grow f6 link ph1 pv1 white bg-blue' onClick={this.onSubmit} />
         </div>
     );
     } else {
    return (
       <div> </div>
    );
   }
 }
}

export default Addcomment;