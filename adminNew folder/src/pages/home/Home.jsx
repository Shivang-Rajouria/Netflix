import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import axios from "axios";
import { useState,useEffect } from "react";
import {useMemo} from "react";
export default function Home() {
  const MONTHS =useMemo(()=>
  [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],[]
  );

  const [userStats,setUserStats]=useState([]);

  useEffect(()=>{
    const getStats=async ()=>{
      try{

        const res = await axios.get("/users/stats",{
          headers:{
            token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWY2Nzk5YzM0YTE2ZDFmMDg5NGUyYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY4NTkwMDA1MCwiZXhwIjoxNjg2MzMyMDUwfQ.IltRke-wRIVGLAoo5aU_cj5fdFE1xcalzJSqhh_FENw"
          },
        });
        const statsList = res.data.sort(function(a,b){
          return a._id - b._id;
        });
        statsList.map(item=>setUserStats(prev=>[...prev,{name:MONTHS[item._id-1],"New User":item.total},
      ]))
        }catch(err){
            console.log(err);
        }
      };
      getStats(); 
  },[MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} 
      title="User Analytics"
       grid 
       dataKey="New User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
