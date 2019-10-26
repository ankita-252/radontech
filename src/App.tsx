import React, { Component} from 'react';
import './App.css';
import { debounce } from "debounce";
import { link } from 'fs';
class App  extends Component{

  scrollTop=0;
  anchorClicked=false;
  isScrolled=false;
  activeIndex=0;
  links=[{name:'home',id:0},{name:'about',id:1},{name:'services',id:2},{name:'team',id:3},{name:'projects',id:4},{name:'testimonials',id:5}];
refsCollection:any;
 constructor(props: Readonly<{}>){
   super(props);
 this.refsCollection=[];
 
  }


  componentDidMount() {
  document.addEventListener('scroll',this.handleScroll);


}

handleScroll = debounce((e:any) => { 
  const scrollTop=e.target.scrollingElement.scrollTop;
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
 
}, 100);
  


goToPage(position:string){
  console.log(position);
  console.log(this.activeIndex);
  if(position==='prev'&&this.activeIndex>0){
    this.activeIndex--;
    window.location.hash=`#${this.links[this.activeIndex].name}`;
    this.refsCollection[this.activeIndex].scrollIntoView({behavior: "smooth", block: "start"});

  }else if(position==='next'&&this.activeIndex<this.links.length){
    this.activeIndex++;
    window.location.hash=`#${this.links[this.activeIndex].name}`;
    this.refsCollection[this.activeIndex].scrollIntoView({behavior: "smooth", block: "start"});
  }
}
handleClick(anchorClicked: boolean){
this.anchorClicked=anchorClicked;
}


render(){
  return (
    <div className="App"  ref="app">
     <div className="navbar">
      <a href="#home" onClick={()=>this.handleClick(true)}>home</a>
      <a href="#about" onClick={()=>this.handleClick(true)}>about</a>
      <a href="#services" onClick={()=>this.handleClick(true)}>services</a>
      <a href="#team" onClick={()=>this.handleClick(true)}>team</a>
      <a href="#projects"onClick={()=>this.handleClick(true)}>projects</a>
      <a href="#testimonials"onClick={()=>this.handleClick(true)}>testimonials</a>
     </div>

{this.links.map((link,index)=>{
  return <div className="wrapper"  key={index}>
  
    <div className="view"  id={link.name}  ref={(el)=>{this.refsCollection[index]=el}} >
<div className="view-header">{link.name}</div>
  </div>
</div>
})}

        </div>
  )
  
}

  

}


export default App;
