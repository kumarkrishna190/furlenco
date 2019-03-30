import React, { Component } from 'react';
import Bloglist from './Bloglist';
import Searchbox from './Searchbox';
import Datebox from './Datebox';
import Navigateblog from './Navigateblog';
class Blogcard extends Component {
    constructor() {
        super()
        this.state = {
          blogRoute: 'card',
          blogRead: false,
            blog: [],
            searchfield: '',
            datefield: '',
            searchtype: ''
        }
    }
    
    componentDidMount() {
        fetch('http://localhost:3000/blog')
        .then(response=> response.json())
        .then(blogs => this.setState({blog : blogs}))
    }


    onSearchchange = (event) => {
        this.setState({ searchfield: event.target.value });
        this.setState({ searchtype: 'searchbox' })

    }

    onDatechange = (event) => {
        this.setState({ datefield: event.target.value });
        this.setState({ searchtype: 'datebox' })
    }

    onBlogRouteChange = (blogRoute) => {
        if (blogRoute === 'discover') {
            this.setState({blogRead: false})
        } else if (blogRoute === 'read') {
            this.setState({blogRead: true})
        }
        this.setState({blogRoute: blogRoute});
        console.log(this.props.blogRoute);
        console.log(this.props.blogRead);
    }

  render() {

      const { blogRoute, blogRead } = this.state;

        const filterblog = this.state.blog.filter(blog =>{
          return blog.title.toLowerCase().includes(this.state.searchfield.toLowerCase());
        })
        const datefilter = this.state.blog.filter(blog =>{
          return blog.last_update.substr(0, 10).toLowerCase().includes(this.state.datefield.toLowerCase());
        })

     if (!this.state.blog) {
        return <h3> blog not found </h3>
     } else {
        
      return (
        <div className='tc'>
            <div className='flex justify-between ma5 br2 shadow-5'> 
              <Searchbox searchChange={this.onSearchchange} />
              <Navigateblog onBlogRouteChange={this.onBlogRouteChange} blogRead={blogRead} />
              <Datebox dateChange={this.onDatechange}/>
            </div>
            <Bloglist blog={ filterblog } date={ datefilter } allblogs={this.state.blog} searchtype={this.state.searchtype} />
        </div>
    );
    }
  }
}

export default Blogcard;