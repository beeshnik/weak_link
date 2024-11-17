import React from 'react';
import { useUnit } from 'effector-react'
import { $storeBank } from "../model";

export default function Bank(){
    const bank = useUnit($storeBank)
    return (
        <div>
            {bank}
        </div>
    )
}
