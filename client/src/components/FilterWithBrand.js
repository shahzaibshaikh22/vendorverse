import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const FilterWithBrand = ({selectedBrands, data, setSelectedBrands}) => {
    
    const { mode } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);

    let brands;
   if(data){
    brands = [...new Set(data.map(product => product.storeName))];    
   }

    

    const handleBrandChange = (brand) => {
        setIsChecked(!isChecked);
        setSelectedBrands(prevSelected =>
          prevSelected.includes(brand)
            ? prevSelected.filter(item => item !== brand)
            : [...prevSelected, brand]
        );
    };

    return (
        <section className='w-full h-auto flex flex-col gap-3'>
            <h3 className='text-xl'>Brand</h3>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
            <div className='flex flex-col gap-1'>
                {data && brands.map((brand,index)=>{
                    return(
                        <label key={index} className=" flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={selectedBrands.includes(brand)}
                            onChange={() => handleBrandChange(brand)}
                            className="peer hidden"
                        />
                        <div className="w-5 h-5 border-2 border-gray-300 rounded-sm peer-checked:bg-emerald-500 peer-checked:border-emerald-500 peer-checked:before:content-['✓'] peer-checked:before:text-white peer-checked:before:flex peer-checked:before:justify-center peer-checked:before:items-center peer-checked:before:font-bold peer-checked:before:text-sm peer-hover:border-emerald-500"></div>
                        {brand}
                    </label>
                    )
                })}
            </div>
        </section>
    )
}

export default FilterWithBrand