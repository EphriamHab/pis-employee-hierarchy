'use client';

import {useDispatch, useSelector } from "react-redux";
import { RootState } from "@reduxjs/toolkit/query";

// eslint-disable-next-line react-hooks/rules-of-hooks
const positions = useSelector((state: RootState) => state.positions.positions);
import PositionForm from './PositionForm';
import { useState } from "react";




const renderTree = (positions:any, parentId:number | null=null) => {

    return positions
      .filter((p:any) => p.parentId === parentId)
      .map((p:any) => (
         <li key={p.id}>
            <div className="flex items-center">
              <span className="text-lg">{p.name}</span>
                <button className="ml-2" onClick={()=>setEditingPosition(p)}>Edit</button>
                <button className="ml-2" onClick={()=>handleDelete(p)}>Delete</button>
            </div>
         </li>
      ));
}

const PositionList = () => {
    const positions = useSelector((state: RootState<any, any, any>)=>state.positions)
    const dispatch = useDispatch();
    const [editigPosition, setEditingPosition] = useState<any | null>(null);

    const handleDelete = (id:number)=>{
        dispatch(deletePosition(id));
    }


    return(
        <div>
            <h2>Positions</h2>
            <ul>
                {renderTree(positions)}
            </ul>
            {editigPosition && <PositionForm position={editigPosition} onClose={()=>setEditingPosition(null)} /> }
        </div>
    )
}

export default PositionList;


