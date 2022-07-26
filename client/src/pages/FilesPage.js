import { React, useState } from "react";
import { Link, useSearchParams,useNavigate } from 'react-router-dom'

const FilesPage = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    var email = searchParams.get("email");
    const [file, setFile] = useState();

//      const file  = e.target.files
//      const form = new FormData()
//      form.append("file",file,file.name)
//      console.log(form);
// }

const submitFile= async (e)=>{
  e.preventDefault();
  // var input = document.querySelector('input[type="file"]')
  // console.log(e)
  // const file  = e.target.files[0]
  // var data = new FormData()
  // data.append('file', file)
  
  //  console.log(file);
    
    // const res  = await fetch('/addFile',{
    //   method:"POST",
    //   headers:{
    //     "Content-Type":"application/json"
    //   },
    //   body:JSON.stringify({
    //    file:data,
    //    email:email
    //   })
      
    // });
    
    // const sentData = res.json();
}
  return (
    <div className='filePage'>
        <h1>Please upload your verification documents below</h1>
        <form method="POST" encType="multipart/form-data">
        <input
            type="file"
            value={file}
            onChange = {(e)=> {setFile(e.target.value)
             }
            }
        />
        <input type="submit" value="Submit"
                    onClick={submitFile}
                     />
        </form>
    </div>
  )
}

export default FilesPage