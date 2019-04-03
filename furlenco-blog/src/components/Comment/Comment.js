import React from 'react';

const Commentlist = ({ name, comment, comment_date }) => {
    return (
         <div className="w-20 pa2 mt1 ma2 bg-white dib br3 grow bw2 shadow-2 o-80">
            <p className="i pa2 tj mb1 bg-black white f5 tl br-pill b ttc-m"> {name} </p>
            <p className="tl mt0 tj i bg-light-yellow pv1 br3 pl5 f6 b"> {comment} </p>
            <p className="tr i f7">{comment_date}</p>
          </div>
    );
  }

export default Commentlist;