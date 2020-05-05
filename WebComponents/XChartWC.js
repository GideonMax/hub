/// I, Gideon Max Merling The Third, declare this file to be JQuery free, ahooooooooooooooooo
import {Post} from '/Post.js';
class Chart extends HTMLElement {
  static get observedAttributes(){
    return ['color','folder'];
  }

  constructor () {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    var link = document.createElement("link");
    link.rel="stylesheet";
    link.href="/XChart.css";
    this.shadow.appendChild(link);
    this.Container = document.createElement("div");
    this.Container.style.height = "250px";
    this.Container.className = 'diagram-Container';
  }

  connectedCallback() {
    Post("/XChart.dat",{folder:this.getAttribute("folder")})
      .then(res=>res.json())
      .then(data=>{
        var values = data.stat_values;
        var names = data.stat_names;
        this.Container.style.width= 55*values.length+"px";
        var Max = values.reduce(function(a,b){return Math.max(a,b);});
        for(var i =0; i<values.length;i++)
        {
          var c_collumn = document.createElement("div");//c_collumn contains the collumn's name, value and bar
          c_collumn.className="Chart-Container";
          if(Max>0)
          {
            c_collumn.style.height="calc("+(values[i]*70/Max)+"% + 35px)";
          }
          else {
            c_collumn.style.height="35px";
          }
          var c_value= document.createElement("div");//number on top of collumn
          c_value.className='Chart-Title';
          c_value.innerText=""+ values[i];
          c_collumn.appendChild(c_value);

          var c_rectangle =document.createElement("div");//collumn's bar
          c_rectangle.className= 'Chart';
          c_rectangle.style.height= "87%";
          if(values[i]==Max)
          {
            if(this.hasAttribute('color'))
            {
              c_rectangle.style.backgroundColor=this.getAttribute('color');
            }
            else
            {
              c_rectangle.style.backgroundColor='#e91e63';
            }
          }
          c_collumn.appendChild(c_rectangle);

          var c_Title = document.createElement("div");
          c_Title.className='Chart-Title';
          c_Title.innerText= names[i];
          c_collumn.appendChild(c_Title);
          this.Container.appendChild(c_collumn);
          this.shadow.appendChild(this.Container);
        }

      });
  }
}
window.customElements.define('x-chart', Chart);


/////PULL BARMEN FROM DATA BASE
/*
$(document).ready( ()=>{
  $.get("/barmen.dat",(data,status)=>{

    data now contains a JSON like object that looks exactly like the "barmen" branch in the database

  })
} )
*/


/////
/*

######################################################################################
#                                                                                    #
#                            ,.--------._                                            #
#                           /            ''.                                         #
#                         ,'                \     |"\                /\          /\  #
#                /"|     /                   \    |__"              ( \\        // ) #
#               "_"|    /           z#####z   \  //                  \ \\      // /  #
#                 \\  #####        ##------".  \//                    \_\\||||//_/   #
#                  \\/-----\     /          ".  \                      \/ _  _ \     #
#                   \|      \   |   ,,--..       \                    \/|(O)(O)|     #
#                   | ,.--._ \  (  | ##   \)      \                  \/ |      |     #
#                   |(  ##  )/   \ `-....-//       |///////////////_\/  \      /     #
#                     '--'."      \                \              //     |____|      #
#                  /'    /         ) --.            \            ||     /      \     #
#               ,..|     \.________/    `-..         \   \       \|     \ 0  0 /     #
#            _,##/ |   ,/   /   \           \         \   \       U    / \_//_/      #
#          :###.-  |  ,/   /     \        /' ""\      .\        (     /              #
#         /####|   |   (.___________,---',/    |       |\=._____|  |_/               #
#        /#####|   |     \__|__|__|__|_,/             |####\    |  ||                #
#       /######\   \      \__________/                /#####|   \  ||                #
#      /|#######`. `\                                /#######\   | ||                #
#     /++\#########\  \                      _,'    _/#########\ | ||                #
#    /++++|#########|  \      .---..       ,/      ,'##########.\|_||                #
#   //++++|#########\.  \.              ,-/      ,'########,+++++\\_\\               #
#  /++++++|##########\.   '._        _,/       ,'######,''++++++++\                  #
# |+++++++|###########|       -----."        _'#######' +++++++++++\                 #
# |+++++++|############\.     \\     //      /#######/++++ S@yaN +++\                #
#      ________________________\\___//______________________________________         #
#     / ____________________________________________________________________)        #
#    / /              _                                             _                #
#    | |             | |                                           | |               #
#     \ \            | | _           ____           ____           | |  _            #
#      \ \           | || \         / ___)         / _  )          | | / )           #
#  _____) )          | | | |        | |           (  __ /          | |< (            #
# (______/           |_| |_|        |_|            \_____)         |_| \_)           #
#                                                                           19.08.02 #
######################################################################################


B r u h

*/
