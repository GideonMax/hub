//this object has been clensed from any dependencies like JQuery by our greatest plague doctor, Gideon Max Merling.
//p.s. it does require the Post.js file so keep that in mind
import {Post}from "/Post.js";
/**
 * @observedAttributes
 *  @member {function(x : number)} click runs on click, x is the element's index
 *  @member {HTMLElement} type a string representing the type of elements in the array
 *  @member {string} action the url to make a get request to on click
 * @observedAttributes
 */
class ElementArray extends HTMLElement{
  static get observedAttributes(){
    return ['click','type','action','dataURL','cssFile'];
  }
    
  constructor(){
    super();
    this.shadow=this.attachShadow({mode:'open'});
    if(this.hasAttribute('cssFile')){
      var style = document.createElement("link");
      style.rel="stylesheet";
      style.href=this.getAttribute("cssFile");
      this.shadow.appendChild(style);
    }
    this.container=document.createElement('div');
    this.shadow.appendChild(this.container);
  }
  connectedCallback(){
    var type=this.getAttribute("type")||"div";
    fetch(this.getAttribute("dataURL"))
      .then(res=>res.json())
      .then(data=>{
        for(var i=0;i<data.length;i++){
          var element= document.createElement(type);
          element.innerText=data[i].text;
          if(data[i].hasOwnProperty("properties")){
            var properties=data[i].properties;
            for(var j=0;j<Object.keys(properties).length;j++){
              var key = Object.keys(properties)[j];
              element.setAttribute(key,properties[key]);
            }
          }
                
          ((elem,index)=>{
            if(this.hasAttribute("click")){
              elem.onclick= ()=>{
                var x = index;
                eval(this.getAttribute("click"))(x);
              };}
            else if(this.hasAttribute("action")){
              elem.onclick=()=>{
                Post(this.getAttribute("action"),{index:index});
              };
            }
          })(element,i);
          this.container.appendChild(element);
        }
      });
  }

}
window.customElements.define("element-array",ElementArray);