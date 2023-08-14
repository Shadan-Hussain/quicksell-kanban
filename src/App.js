import Group from "./components/Group";
import "./App.css"
import { useEffect, useState } from "react";

function outputTickets(data,grouping,ordering){
  const distinctUserIds = [...new Set(data?.tickets.map(ticket => ticket.userId))];
  const distinctStatus = ["Backlog","Todo","In progress","Done","Cancelled"];
  const distinctPriority = [4,3,2,1,0];
  let newtickets = data?.tickets
  newtickets.sort(function(x,y){
    if(ordering=="priority"){
      if(x.priority>y.priority)
        return -1;
      else if(x.priority<y.priority)
        return 1;
      return 0;
    }
    if(ordering=="title"){
      if(x.title<y.title)
        return -1;
      else if(x.title>y.title)
        return 1;
      return 0;
    }
  })
  let newJSX = []
  if(grouping==="status"){
    distinctStatus.forEach((status)=>{
      let tempJSX = <Group data={data} groupByKey={grouping} keyValue={status}/>
      newJSX.push(tempJSX)
    })
  }
  else if(grouping==="priority"){
    distinctPriority.forEach((priority)=>{
      let tempJSX = <Group data={data} groupByKey={grouping} keyValue={priority}/>
      newJSX.push(tempJSX)
    })
  }
  else if(grouping==="userId"){
    distinctUserIds.forEach((userId)=>{
      let tempJSX = <Group data={data} groupByKey={grouping} keyValue={userId}/>
      newJSX.push(tempJSX)
    })
  }
  console.log(newJSX)
  return newJSX
}

const App = ()=>{
  const [data,setData] = useState(null);
  const [grouping,setGrouping] = useState("userId")
  const [ordering,setOrdering] = useState("title")
  const [distinctStates,setDistinctStates] = useState(null)
  const [groupJSX,setGroupJSX] = useState(null)
  useEffect(()=>{
    fetch("https://apimocha.com/quicksell/data")
    .then(response => response.json())
    .then(data => {
      setData(data)
      setGroupJSX(outputTickets(data,grouping,ordering))
    })
  },[])
  return (
    <>
    <div className="headerDiv">
      <div className="displayDiv">
        <div className="displayFilter"></div>
        <span>Display</span>
        <div className="arrowDiv"></div>
      </div>
    </div>
    <div className="filterDiv">
      <div className="firstFilterDiv">
        <span className="filterText">Grouping</span>
      </div>
      <div className="firstFilterDiv">
        <span className="filterText">Ordering</span>
      </div>
    </div>
    <div className="groupDivs">
      {groupJSX}
    </div>
    </>
  );
}

export default App;
