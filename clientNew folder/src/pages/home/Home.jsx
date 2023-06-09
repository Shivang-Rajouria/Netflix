import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import "./home.scss";
import List from "../../components/list/List";
import axios from "axios";
import { useState,useEffect } from "react";

const Home = ({type}) => {
  const [lists,setLists]=useState([]);
  const [genre,setGenre]=useState(null);
  useEffect(()=>{
    const getRandomLists=async()=>{
      try{
        const res=await axios.get(
          `lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`,{
            headers:{
              token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY2Nzk5YzM0YTE2ZDFmMDg5NGUyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTcxMDE0NSwiZXhwIjoxNjg2MTQyMTQ1fQ.MKLRT6C2mvKv7Ofadz5noATB3S8cOaGSgdkCZ1VcUj4"
            }
          }

        );
          // console.log(res);
          setLists(res.data);
        }catch(err){
        console.log(err);
    }
    };
    getRandomLists();
  },[type,genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type}/>
      {lists.map((list) => (
      <List list={list}/>  
      ))}
    </div>
  );
};

export default Home;
