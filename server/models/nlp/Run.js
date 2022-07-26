const {PythonShell}  = require("python-shell")
const fetch  = require("node-fetch")


function Run(email,comment){
    
let options ={
    scriptPath:"E:/vastag-app/server/models/nlp",
    args: comment 
};
PythonShell.run("nlp.py",options,(err,res)=>{
    if (err) console.log(err);
    if(res){ 
        var values  =res[0]
        console.log("output:",values)
    
        // for(var i=0;i<values.length;i++){
        //     sum = sum+values[i]
        // }
        // // avg = sum/res[0].length;
        // console.log("avg:",sum)
    const response  =  fetch('http:localhost:5000/rating',{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          email:email,
          rating:values
        })
      });
    
    }
}
);

}
module.exports = Run;
