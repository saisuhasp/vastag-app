// const spawner   = require("child_process").spawn;
//  async function Test(comment){
// const data_to_pass_in = comment;
// console.log("Data sent to the python script is ", data_to_pass_in);
// const python_process =  spawner('python',['nlp.py',JSON.stringify(data_to_pass_in)],);
// var out
// python_process.stdout.on('data',(data)=>{
//     out  =  JSON.parse(data.toString())
//     // console.log("Data received from the python script is ",out );
//     return out
// })
// python_process.stdout.on('end',async function(){
//     console.log('output:',out)
    
// });
// await new Promise(resolve => python_process.on('close',resolve));
// return(out)
// }
// module.exports = Test;
const {PythonShell}  = require("python-shell")
// const Professional = require("./pro.model");
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
