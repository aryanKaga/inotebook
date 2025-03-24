export const cursortype = {
    Type: "none",
    cursorurl: "",
    toolSize:"3"
  };
  
  export const tool = {
    toolType: "pen",
    toolColor: "white",
    toolSize :"3"
  };
  
  export const getCursorURL = (IconComponent, size = 32, color = "black") => {
    // Create an SVG string from the React icon
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${color}">
        ${IconComponent().props.children}
      </svg>`;
  
   
    const base64SVG = btoa(unescape(encodeURIComponent(svg)));
  
    
    return `url("data:image/svg+xml;base64,${base64SVG}") ${size / 4} ${size / 4}, auto`;
  };
  
  
  export const changeTool = (toolName, iconComponent) => {
    tool.toolType = toolName;
    
  };
  export const changeToolSize=(size)=>{
    tool.toolSize=size;
  }

  export const canvasInfo={
    CanvasLines:[],
    save(lines){
      this.CanvasLines=lines;
    },
    title:"",
    shareStatus:"locked"
  }


  export const userFiles = {
    savedFiles: [],
    public:[],
    private:[],
    locked:[],
    fileId: function (filename) {  // Use a regular function to access "this"
      const file = this.savedFiles.find(element => element.title === filename);
      console.log(file.docId);
      return file ? file.docId: false;
     
    }
  };
  

  export default tool;

  
  
  