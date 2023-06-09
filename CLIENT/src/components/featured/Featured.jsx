import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import axios from "axios";
import { useEffect,useState } from "react";

export default function Featured({ type }) {
  const [content,setContent]=useState({});

  useEffect(()=>{
    const getRandomContent = async ()=>{
      try{
        const res=await axios.get(`/movies/random?type=${type}`,{
          headers:{
            token:"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY2Nzk5YzM0YTE2ZDFmMDg5NGUyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTcxMDE0NSwiZXhwIjoxNjg2MTQyMTQ1fQ.MKLRT6C2mvKv7Ofadz5noATB3S8cOaGSgdkCZ1VcUj4"
          }
        });
        setContent(res.data[0]);
      }catch(err){
        console.log(err);
      }
    };
    getRandomContent();
  },[type]);

  console.log(content)
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select name="genre" id="genre">
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
          </select>
        </div>
      )}
      <img
        src={content.imgTitle}
        alt=""
      />
      <div className="info">
        <img
          src="https://occ-0-1432-1433.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUZdeG1DrMstq-YKHZ-dA-cx2uQN_YbCYx7RABDk0y7F8ZK6nzgCz4bp5qJVgMizPbVpIvXrd4xMBQAuNe0xmuW2WjoeGMDn1cFO.webp?r=df1"
          alt=""
        />
        <span className="desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
          adipisci repellendus eum quasi illo, velit numquam, maxime tempora
          sint deleniti, aliquid qui? Facilis, adipisci! Ratione hic repudiandae
          temporibus eum earum?
        </span>
        <div className="buttons">
          <button className="play">
            <PlayArrow />
            <span>Play</span>
          </button>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
