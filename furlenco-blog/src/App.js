import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Logo from './components/Logo/Logo';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Blogcard from './components/Blogcard/Blogcard';
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

const initialState = {
	 route: 'signin',
	 isSignedIn: false,
	  id: undefined,
	  name: undefined,
	  email: undefined
	}

class App extends Component {
    constructor() {
        super();
        this.state = initialState;  
    }

    loadUser = (data) => {
        this.setState({
        		id: data.id,
        	  name: data.name,
            email: data.email,
        });
    }



   onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialState)
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
         <div className='tr ph2 pv1 f3 b white ttc 0-70'> welcome {this.state.name} ! </div>
       </div>
       { (route === 'home') ? 
           <div>
             <Scroll>
               <Blogcard id = {this.state.id} name={this.state.name} email={this.state.email} />
             </Scroll>
           </div>
        : (route === 'signin') ?
            <Scroll>
              <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
        	    <Blogcard />
        	 </Scroll>
        : <Scroll>
        	    <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser} />
           	   <Blogcard />
          </Scroll>
        }

      </div>
    );
  }
}

export default App;
