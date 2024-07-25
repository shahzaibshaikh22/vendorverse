import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const FilterWithWarenty = () => {
    const { mode } = useSelector((state) => state.auth)
    const [isChecked, setIsChecked] = useState(false);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <section className='w-full h-auto flex flex-col gap-3'>
            <h3 className='text-xl'>Warranty Type</h3>
            <div className={`divider w-full h-[1px] ${mode === "dark" ? 'bg-darkufg' : 'bg-gray-200'} `}></div>
            <div className='flex flex-col gap-1'>
                <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            className={`hidden`}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor="custom-checkbox"
                            className={`w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-sm cursor-pointer transition-colors duration-200
          ${isChecked ? 'bg-emerald-400 border-emerald-400  text-white' : 'text-transparent'}
          hover:border-emerald-500`}

                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 6L9 17L4 12" />
                            </svg>
                        </label>
                    </div>
                    <span>warenty</span>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            className={`hidden`}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor="custom-checkbox"
                            className={`w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-sm cursor-pointer transition-colors duration-200
          ${isChecked ? 'bg-emerald-400 border-emerald-400  text-white' : 'text-transparent'}
          hover:border-emerald-500`}

                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 6L9 17L4 12" />
                            </svg>
                        </label>
                    </div>
                    <span>seller warenty</span>
                </div>
                <div className='flex items-center gap-3'>
                    <div className="flex items-center">
                        <input
                            type="checkbox"
                            id="custom-checkbox"
                            className={`hidden`}
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                        />
                        <label
                            htmlFor="custom-checkbox"
                            className={`w-5 h-5 flex items-center justify-center border-2 border-gray-300 rounded-sm cursor-pointer transition-colors duration-200
          ${isChecked ? 'bg-emerald-400 border-emerald-400  text-white' : 'text-transparent'}
          hover:border-emerald-500`}

                        >
                            <svg
                                className="w-4 h-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M20 6L9 17L4 12" />
                            </svg>
                        </label>
                    </div>
                    <span>no warenty</span>
                </div>
            </div>
        </section>
    )
}

export default FilterWithWarenty
