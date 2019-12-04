import React, { Component} from 'react';
import './App.css';
import { debounce } from "debounce";
import { data} from "./config";
class App  extends Component{

  scrollTop=0;
  anchorClicked=false;
  isScrolled=false;
  activeIndex=0;
  links=[{name:'home',id:0,isPageInView:false},{name:'about',id:1,isPageInView:false},{name:'services',id:2,isPageInView:false},{name:'team',id:3,isPageInView:false},{name:'projects',id:4,isPageInView:false},{name:'testimonials',id:5,isPageInView:false}];
  refsCollection:any;
swiper:any;
state:any;

 constructor(props: Readonly<{}>){
   super(props);
 this.refsCollection=[];
 this.swiper=React.createRef();
 this.state={animatePage:false};


  }
  


  componentDidMount() {
this.swiper.addEventListener('scroll',this.handleScroll);
 
}

handleScroll = debounce((e:any) =>{ 
  this.setState({animatePage:false});
  const scrollTop=e.srcElement.scrollTop;
  if(!this.anchorClicked && this.activeIndex===0){
    this.refsCollection[this.activeIndex].scrollIntoView({behavior: "smooth", block: "start"});
  }
  if(!this.anchorClicked){
    if(this.scrollTop>scrollTop){
	   this.goToPage('prev');
        
    }
    else{
      this.goToPage('next');
    }
   }
   this.anchorClicked=!this.anchorClicked;
  this.scrollTop=scrollTop;
  this.setState({animatePage:true});

}, 50);
  


goToPage(position:string){
  if(position==='prev'&&this.activeIndex>0){
    this.activeIndex--;
    for(let i=0;i<this.links.length;i++){
      this.links[i].isPageInView=i===this.activeIndex?true:false;
    }
    window.location.hash=`#${this.links[this.activeIndex].name}`;
    this.refsCollection[this.activeIndex].scrollIntoView(true);
 
  }else if(position==='next'&&this.activeIndex<this.links.length-1){
    this.activeIndex++;
  for(let i=0;i<this.links.length;i++){
    this.links[i].isPageInView=i===this.activeIndex?true:false;
  }
    window.location.hash=`#${this.links[this.activeIndex].name}`;
    this.refsCollection[this.activeIndex].scrollIntoView(true);
   
  }
}
handleClick(anchorClicked: boolean,clickedIndex:number){
  for(let i=0;i<this.links.length;i++){
    this.links[i].isPageInView=i===clickedIndex?true:false;
  }
this.anchorClicked=anchorClicked;
this.activeIndex=clickedIndex;
}


render(){
 


  return (
    <div className="App"  ref="app">
     	<div className="navbar">
			 <div>
			 <a href="#home" onClick={()=>this.handleClick(true,0)}>Home</a>

			 </div>
			 <div>
			 <a href="#about" onClick={()=>this.handleClick(true,1)}>About Us</a>

			 </div>
			 <div>
			 <a href="#services" onClick={()=>this.handleClick(true,2)}>Services</a>

			 </div>
			 <div>
			 <a href="#team" onClick={()=>this.handleClick(true,3)}>Team</a>

			 </div>
			 <div>
			 <a href="#projects"onClick={()=>this.handleClick(true,4)}>Projects</a>

			 </div>

    	</div>

		<div className="page-cover"></div>
    	<div className="section-home">
    		<div className="main-container"></div>
    		<div className="swiper-container" id="swiper" ref={(el)=>{this.swiper=el}}>
     	 		<div className={"swiper-slide home-slide center-vh "+(this.links[0].isPageInView?'appear':'disappear')} id={this.links[0].name}  ref={(el)=>{this.refsCollection[0]=el}}>
     		 		<div className="slide-container home-container">
  						<h1 className={this.state.animatePage?'home-header anim-1':'home-header'}>
					      RADON TECH
  						</h1>
						  <div className={this.state.animatePage?'home-sub-header anim-2':'home-sub-header'}>
					    We are creative experts, build your company with us. Today’s progress was yesterday’s plan.
						  </div>
					</div>
      			</div>
	  			<div className={"swiper-slide about-slide center-vh "+(this.links[0].isPageInView?'appear':'disappear')}  id={this.links[1].name}  ref={(el)=>{this.refsCollection[1]=el}}>
     				 <div className="slide-container about-container">
 							 <div>
								<div className="about-header">
									About Us
								</div>
							</div>
 							 <div className="about-sub-section">
								<div className={this.state.animatePage?'left-col anim-3':'left-col'}>
									Our mission gives solution
								</div>
								<div className="right-col">
									<div className={this.state.animatePage?'right-col-text anim-2':'right-col-text'}>
									<p>
										{data.aboutUs.subHeader[0]}
									</p>
									<p>
										{data.aboutUs.subHeader[1]}

									</p>
								</div>
								</div>
							</div>
					</div>
    			</div>
				<div className="swiper-slide"  id={this.links[2].name}  ref={(el)=>{this.refsCollection[2]=el}}>
      				<div className="slide-container services-container">
						  <div > 
						  <div className="services-header">
							  {data.services.header}
      					</div>
						  <div className="services-subheader">
								{data.services.subHeader}
						  </div>
						  </div>
      					
				  		<div className={'services-description'}>
							  <div className="description-container">
							  <div className="description-wrapper">
								  <div className="description-header">
										{data.services.description[0][0]}
								  </div>
									<div className="description-subheader">
										{data.services.description[0][1]}

									</div>
							  </div>
							  <div className="description-wrapper">
								  <div className="description-header">
										{data.services.description[1][0]}
								  </div>
									<div className="description-subheader">
										{data.services.description[1][1]}

									</div>
							  </div>
							  </div>
							  <div className="description-container">
							  <div className="description-wrapper">
								  <div className="description-header"> 
										{data.services.description[2][0]}
								  </div>
									<div className="description-subheader">
										{data.services.description[2][1]}
									</div>
							  </div>
							  <div className="description-wrapper">
								  <div className="description-header">
										{data.services.description[3][0]}
								  </div>
									<div className="description-subheader">
										{data.services.description[3][1]}
									</div>
							  </div>
							  </div>
							  
							  

              			</div>

      				</div>
    			</div>
				<div className="swiper-slide"  id={this.links[3].name}  ref={(el)=>{this.refsCollection[3]=el}}>
      				<div className="slide-container team-container">
      					<h1 className="about-header">
						  {this.links[3].name}
      					</h1>
						  <div className="home-sub-header">
            				    We are creative experts, build your company with us. Today’s progress was yesterday’s plan.
           				   </div>

      				</div>
    			</div>
				<div className="swiper-slide"  id={this.links[4].name}  ref={(el)=>{this.refsCollection[4]=el}}>
      				<div className="slide-container project-container">
      					<h1 className="about-header">
						  {this.links[4].name}
      					</h1>
						<div className="home-sub-header">
        	    		    We are creative experts, build your company with us. Today’s progress was yesterday’s plan.
        	    		</div>
      				</div>
    			</div>
			
      		</div>
    	</div>
	</div>
  )
}
}


export default App;
