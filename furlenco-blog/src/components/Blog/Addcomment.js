import React from 'react';

class Addcomment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      comment: '',
      comment_date: ''
    }
  }


  onInputChange = (event) => {
    this.setState({comment: event.target.value})
  }

  onSubmit = () => {
    fetch('http://localhost:3000/addcomment', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        blog_id: this.state.blog_id,
        name: this.state.name,
        comment: this.state.comment,
        comment_date: new Date()
      })
    })
    .then(response => response.json())
    .then(comment => {
      if (comment.blog_id) {
        this.props.loadComment(comment)
        this.props.onRouteChange('home');
      }
    })
  }

  render() {
   return(

        <div className='pa0 br0 shadow-2'>
            <input className='f6 pa1 w-20' type='text' onChange={this.onInputChange}/>
            <button className='di w-8 grow f6 link ph1 pv1 white bg-blue' onClick={this.onSubmit}>Comment</button>
         </div>
     );
 }
}

export default Addcomment;