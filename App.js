import React ,{Component} from 'react';
import Particles from 'react-particles-js';
import clarifai from 'clarifai';
import FaceRecognition from './Component/FaceRecognition/FaceRecognition';
import Navigation from './Component/Navigation/Navigation';
import Signin from './Component/Signin/Signin';
import Logo from './Component/Logo/Logo';
import ImageLinkForm from './Component/ImageLinkForm/ImageLinkForm';
import Rank from './Component/Rank/Rank';
import './App.css';

const app = new clarifai.App({
 apiKey: '3ae654aaaa33444e834c723f3ff6a3ab'
});

const Particlesoption = {
	particles: {
		number:{
           value:150,
            density :{
	           enable:true,
	           value_area: 800
	                          }
            				} 
            			}
}
            	
class App extends Component {
	constructor()
	{super();
		
		this.state = {

			input:'',
			imageUrl:'',
				box : {},
				route: 'Signin'
		}}

		calculateFaceLocation= (data)=>{
			const clarifaiFace = data.response.output[0].data.regions[0].region_info.bounding_box
		const image = document.getElementById('inputimage');
		const width = Number(image.width);
		const height = Number(image.height);
		return{
			leftCol: clarifaiFace.left_col*width,
			topRow: clarifaiFace.top_row*height,
			rightCol: width - (clarifaiFace.right_col*width),
			bottomRow: height - (clarifaiFace.bottom_row*height)

			}}
			displayFaceBox = (box) => {
				console.log(box);
				this.setState({box: box});
		
		}
		onInputchange = (event) => {
			this.setState=({input: event.target.value});

		}

			onButtonSubmit = () => {
				
				this.setState=({imageUrl:this.state.input});

				app.models.predict(
					clarifai.FACE_DETECT_MODEL,
					this.state.input)
				.then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
			.catch(err => console.log(err));
			}
			onRouteChange = (route) => {
				this.setState({route: route});
			}	
	
	render(){
  return (
    <div className="App">
     <Particles className='particles'
                params={Particlesoption} />
      <Navigation onRouteChange = {this.onRouteChange}/>
      	{this.state.route === 'Signin'
      ?<Signin onRouteChange={this.onRouteChange}/>
      : <div> 
      <Logo/>
      <Rank/>
      <ImageLinkForm onInputchange={this.onInputchange} 
      onButtonSubmit={this.onButtonSubmit}/>
     <FaceRecognition  box={this.state.box} imageUrl={this.state.imageUrl}/>
</div>
}
    </div>
  );
}
}
export default App;
