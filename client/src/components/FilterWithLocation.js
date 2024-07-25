import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { products } from '../Dummydata'
const FilterWithLocation = ({ selectedLocations, setSelectedLocations, }) => {
    const { mode } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);

    const locations = [...new Set(products.map(product => product.location))];

    const handleLocationChange = (location) => {
        setIsChecked(!isChecked);
        setSelectedLocations(prevSelected =>
          prevSelected.includes(location)
            ? prevSelected.filter(item => item !== location)
            : [...prevSelected, location]
        );
    };

    return (
        <section className='w-full h-auto flex flex-col gap-3'>
            <h3 className='text-xl'>Location</h3>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
            <div className='flex flex-col gap-1'>
                {locations.map(location => (
                    <label key={location} className=" flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedLocations.includes(location)}
                            onChange={() => handleLocationChange(location)}
                            className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-sm peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:flex peer-checked:before:justify-center peer-checked:before:items-center peer-checked:before:font-bold peer-checked:before:text-sm peer-hover:border-emerald-500"></div>
                        {location}
                    </label>
                ))}
            </div>
        </section>
    )
}

export default FilterWithLocation