import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App';


export const Form = ({title}) => {
    const [uname,setUname] = useState("");
    const [passwd,setPasswd] = useState("");
    const navigate = useNavigate()

    const onSubmit = async (e) => {
        e.preventDefault();
        
        if(uname !== "" && passwd !== ""){
            if(title === "Login"){
                try{
                    await axios.post('http://localhost:3001/auth/login',{
                        username:uname,
                        password:passwd
                    }).then((res) => {
                        console.log(res.data._id);
                        window.localStorage.setItem("userId",res.data._id);
                        navigate('/')
                        setUname("")
                        setPasswd("")
                    })
                }catch(err){
                    console.log(err);
                }
            }else{
                try{
                    await axios.post('http://localhost:3001/auth/register',{
                        username:uname,
                        password:passwd
                    }).then((res) => {
                        alert(res.data);
                        setUname("");
                        setPasswd("");
                    })
                }catch(err){
                    console.log(err);
                }
            }
        }
    }

  return (
    <div className="col-5 bg-box rounded p-5">
        <form onSubmit={onSubmit}>
            <h5 className='text-light'>{title}</h5>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label text-light text-start">Username</label>
            <input type="text" className="form-control" 
                value={uname}
                onChange={(e) => setUname(e.target.value)}
            />
            </div>
            <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label text-light text-start">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" 
                value={passwd}
                onChange={(e) => setPasswd(e.target.value)}
            />
            </div>
            <button type="submit" className="btn btn-primary" >{title}</button>
        </form>
    </div>
  )
}
