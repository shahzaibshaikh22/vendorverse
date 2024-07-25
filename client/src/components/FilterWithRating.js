import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const FilterWithRating = () => {
    const { mode } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <section className='w-full h-auto flex flex-col gap-3'>
            <h3 className='text-xl'>Rating</h3>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
         
        </section>
    )
}

export default FilterWithRating
