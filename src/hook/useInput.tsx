import React, { ChangeEvent, useState } from "react";

export default function useInput(initialValue:string){
    const [input , setInput] = useState(initialValue)
    
    const onChange = (e:any)=>{
        console.log("확인용")
        const {target:{value}} = e;
        setInput(value)
    }
    

    return [input , onChange] as [string , any]
}