import React, { useEffect, useState } from "react";
import "./Group.css"
import Card from "../Card";

function getHeading(groupByKey,keyValue,data){
    console.log(groupByKey)
    console.log(keyValue)
    console.log(data.users)
    if(groupByKey==="userId"){
        let x = data?.users.filter((user)=>{
            return user.userId===keyValue
        })
        console.log("Hello")
        console.log(x)
        return x.name
    }
}

const Group = ({groupByKey,keyValue,data})=>{
    const [groupData,setGroupData] = useState(null)
    const [heading,setHeading] = useState(null)
    useEffect(()=>{
        let temp = data?.tickets.filter((ticket)=>{
            if(ticket[groupByKey]===keyValue)
                return true
            else
                return false
        })
        setHeading(getHeading(groupByKey,keyValue,data))
        setGroupData(temp)
    },[groupByKey,keyValue,data])
    return(
        <div className="groupDiv">
            <div className="groupHeader">
                <div className="groupHeaderLeftDiv">
                    <div className="groupIconDiv"></div>
                    <span className="groupTitle">{heading}</span>
                    <span className="groupCount">{groupData?.length}</span>
                </div>
            </div>
            <>
            {
                groupData?.map((ticket,index)=>{
                    return <Card {...ticket}/>
                })
            }
            </>
        </div>
    )
}

export default Group;