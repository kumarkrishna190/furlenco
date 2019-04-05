import React, { Component } from 'react';
import Bloglist from './Bloglist';
import Searchbox from '../Filters/Searchbox';
import Datebox from '../Filters/Datebox';
import Navigateblog from '../Navigation/Navigateblog';
import Addblog from '../Addblog/Addblog';


const initialState = {
          blogroute: 'read',
            blog: [],
            searchfield: '',
            datefield: '',
            searchtype: '',
            startid: 0 ,
            endid: 10,
            errormessage: undefined,
            loadBlog: []
        }

class Blogcard extends Component {
    constructor(props) {
        super(props)
        this.state = initialState
    }
    
    componentWillMount() {
        fetch('http://localhost:3000/blog')
        .then(response=> response.json())
        .then(blogs => {
          if (blogs[0].blog_id) {
          this.setState({blog : blogs})
        } else if (this.state.loadBlog[0].blog_id) {
          this.setState({blog : this.state.loadBlog})
        } else {
          this.setState({errormessage: 'Nothing to show, be the first one to write a blog..'})
        }
      })
    }


    onSearchchange = (event) => {
        this.setState({ searchfield: event.target.value });
        this.setState({ searchtype: 'searchbox' })

    }

    onDatechange = (event) => {
        this.setState({ datefield: event.target.value });
        this.setState({ searchtype: 'datebox' })
    }

    onNext = () => {
        this.setState({ startid: (this.state.startid + 10), endid: (this.state.endid + 10),  searchtype: 'next' });
    }

    onPrevious = () => {
      if (this.state.startid > 0) {
         this.setState({ startid: (this.state.startid - 10), endid: (this.state.endid - 10),  searchtype: 'next' });
       }
    }

    onBlogRouteChange = (blogroute) => {
      if (this.state.blogroute === 'read') {
       this.setState({blogroute: 'write'})
       } else {
       this.setState({blogroute: 'read'});
     }
    }

  render() {
        const { id, name, email } = this.props;
        const { blogroute, searchtype, blog, errormessage } = this.state;
        const filterblog = this.state.blog.filter(blog =>{
          return blog.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        const datefilter = this.state.blog.filter(blog =>{
          return blog.last_update.substr(0, 10).toLowerCase().includes(this.state.datefield.toLowerCase());
        })
        const pagination = this.state.blog.filter(blog =>( blog.blog_id > this.state.startid && blog.blog_id < this.state.endid));
        console.log(blogroute);

    return (         
          <div>
           <div className='flex justify-between ma0 br2 shadow-5'> 
              <Searchbox searchChange={this.onSearchchange} />           
              <Navigateblog onBlogRouteChange={this.onBlogRouteChange} blogroute={blogroute} id={id} />
              <Datebox dateChange={this.onDatechange} />
           </div>
           { (blogroute === 'read') ?
             <div>
                <div className="f2 white"> {errormessage} </div>
                <Bloglist blog={ filterblog } date={ datefilter } allblogs={ blog } pagination={ pagination } searchtype={ searchtype } id={id} name={name} />
                <div className='w-40 flex justify-between center br2 shadow-5'>
                 <input className="white ph4 pv0 input-reset ba b--white bg-black grow pointer br3 f1 dib" type="button" value="←" onClick={()=>this.onPrevious()} />
                 <input className="white ph4 pv0 input-reset ba b--white bg-black grow pointer br3 f1 dib" type="button" value="→" onClick={()=>this.onNext()} />
                </div>
             </div>
           : <Addblog email={email} onBlogRouteChange={this.onBlogRouteChange} loadBlog={this.state.loadBlog} />
         }
       </div>
     );
    }
  }

export default Blogcard;
    

