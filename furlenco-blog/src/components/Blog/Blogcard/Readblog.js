import React from 'react';

class Readblog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        title: '',
        blog: '',
        last_update: ''
  	 }
    }


    render () {
      const { email, title, blog, update_date  } = this.props;
      return (
       <div>
        className="w-100 pa3 mr2 tc bg-light-yellow dib br3 ma2 grow bw2 shadow-3 pointer o-80">
          <p className="underline pa2 bg-black white f4 tl br-pill b"> {title.toUpperCase()} </p>
          <p className="tl f5 b"> {blog} </p>
          <p className="tr f7">{email} <br />
              last update:{update_date.substr(0, 10)}
          </p>
        </div> 
      );
    }
}

export default Readblog;