import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Blogcard from './components/Blog/Blogcard/Blogcard';
import Addblog from './components/Blog/Addblog';
//import Addcomment from './components/Blog/Addcomment';
import Scroll from './components/Scroll/Scroll';
import './App.css';


const particlesOption = {
         particles: {
           number: {
               value: 150,
                density: {
                    enable: true,
                     value_area: 800,
                  }
                }
             }
          }

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: '',
            route: 'signin',
            isSignedIn: false,
            user: {
            	id: '',
                name: '',
                email: '',
                phone_num: '',
                joined: ''
            },
        }
    }

    loadUser = (data) => {
        this.setState({user: {
        		id: data.id,
        	    name: data.name,
                email: data.email
        }})
    }

    // loadBlog = (data) => {
    //     this.setState({blog: {
    //     		blog_id: data.blog_id,
    //             title: data.title,
    //             blog: data.blog,
    //             creation_date: data.creation_date,
    //             last_update: data.last_update
    //     }})
    // }

    // loadComment = (data) => {
    //     this.setState({comment: {
    //             blog_id: data.blog_id,
    //             name: data.name,
    //             comment: data.comment,
    //             comment_date: data.comment_date
    //     }})
    // }



   onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState({isSignedIn: false})
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route})
    }


  render() {
  	const { isSignedIn, route } = this.state;
    return (
      <div className="App">
         <div className="topbar">
         <Particles className='particles' params={particlesOption} />
         <Logo />
         <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} />
       </div>
       { (route === 'home') ? 
         <div>
           <Scroll>
            <Addblog />
            <Blogcard />
           </Scroll>
        </div>
        : (route === 'signin') ?
            <Scroll>
             <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        	 <Blogcard />
        	</Scroll>
        :   <Scroll>
        	  <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
           	  <Blogcard />
            </Scroll>
        }

      </div>
    );
  }
}

export default App;

// List all blogs
// Adding Blogs
// Editing Blogs
// Date Filters on Blog
// Pagination (mandatory)