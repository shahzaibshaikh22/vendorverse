import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import Loading from "../components/Loading"
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
// import required modules
import { Navigation } from 'swiper/modules';
import ProductCard from '../components/ProductCard'
import { FaChevronRight, FaUser } from 'react-icons/fa';
import Categories from '../components/Categories.js';
import { useFetchAllProductsQuery } from '../redux/features/apiSlices/productApiSlice.js';

const MainHome = () => {
  // theme handling
  const mode = useSelector((state) => state.auth.mode);
  // fetch all products
  const { data, isLoading } = useFetchAllProductsQuery()


  if (isLoading) {
    return (
      <Loading />
    )
  }

  // get product with category
  const categories = [...new Set(data.map(product => product.category))];



  return (
    <>
      <main className={`w-full px-4 ${mode === "dark" ? 'bg-darkbg' : 'bg-lightbg'}`}>
        <section className={`pt-20 w-full max-w-[1440px] py-4 mx-auto  h-[75vh]`}>
          <div className="w-full flex h-full gap-4 xl:max-w-[1440px] lg:max-w-[1024px] mx-auto">
            <div className={`leftCon h-full lg:flex flex-col hidden ${mode === "dark" ? 'bg-darkfg text-lightbg' : 'bg-lightfg text-darkbg'} py-4 rounded-lg space-y-2 drop-shadow-sm h-auto xl:w-[350px] lg:w-[300px]`}>
              <h3 className='text-xl px-4'>Categories</h3>
              {/* <Autocomplete suggestions={categories}/> */}
              <ul className='flex w-full flex-col'>
                {categories.length > 0 && categories.map((elem) => {
                  return (
                    <li key={elem} className='flex cli w-full p-1 text-md items-center justify-between gap-2 px-4 hover:bg-gray-200 hover:text-emerald-700'>
                      <div className='flex gap-2 items-center'><span className='text-sm'><FaUser /></span> <span>{elem}</span></div>
                      <FaChevronRight className='v-arrow' />
                    </li>
                  )
                })}
              </ul>

            </div>
            <Swiper

              slidesPerView={1}
              spaceBetween={30}
              navigation={true}
              modules={[Navigation]}
              className='w-full rightCon h-full'
            >
              <div className=" flex flex-col gap-2 w-full h-full">
                <SwiperSlide>
                  <div className="banersection overflow-hidden bg-gray-200 flex rounded-lg w-full h-full">
                    <div className="banerleft z-[2] relative flex w-1/2 flex-col gap-2 justify-center h-full p-8">
                      <div className="left-overlay"></div>
                      <span className='text-emerald-600'>Men's Style</span>
                      <h1 className='xl:text-6xl lg:text-5xl md:text-4xl font-semibold text-darkbg xl:leading-[4rem] lg:leading-[3.2rem]'>Explore The Wide Range Of Mens Wear</h1>
                      <h3 className='text-darkfg text-lg '>Shop Smarter, Live Better, Discover More, and Save Big</h3>
                      <button className='w-44 bg-darkbg rounded-md text-xl px-10 py-2 text-white mt-4'>Shop Now</button>
                    </div>
                    <div className="bannerright w-1/2 h-full relative">
                      <div className="img-overlay"></div>
                      <div className="rightimg xl:w-[380px] lg:w-[320px] md:w-[300px] z-[2] absolute bottom-0">
                        <img className='w-full h-full' src="./images/men1.png" alt="" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="banersection overflow-hidden bg-gray-200 flex rounded-lg w-full h-full">
                    <div className="banerleft z-[2] relative flex w-1/2 flex-col gap-2 justify-center h-full p-8">
                      <div className="left-overlay"></div>
                      <span className='text-emerald-600'>Men's Style</span>
                      <h1 className='xl:text-6xl lg:text-5xl md:text-4xl font-semibold text-darkbg xl:leading-[4rem] lg:leading-[3.2rem]'>Explore The Wide Range Of Mens Wear</h1>
                      <h3 className='text-darkfg text-lg '>Shop Smarter, Live Better, Discover More, and Save Big</h3>
                      <button className='w-44 bg-darkbg rounded-md text-xl px-10 py-2 text-white mt-4'>Shop Now</button>
                    </div>
                    <div className="bannerright w-1/2 h-full relative">
                      <div className="img-overlay"></div>
                      <div className="rightimg xl:w-[380px] lg:w-[320px] md:w-[300px] z-[2] absolute bottom-0">
                        <img className='w-full h-full' src="./images/men1.png" alt="" />
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              </div>
            </Swiper>
          </div>
        </section>

        {/* categories */}
        <Categories categories={categories} />
        {/* categories */}

        {/* <section className='w-full xl:max-w-[1440px] lg:max-w-[1024px] mx-auto  flex items-center justify-center gap-4'>
          <div className="promotiondiv relative w-1/2 rounded-lg">
            <img className='rounded-lg w-full' src="./images/bn-1.jpg" alt="" />
            <div className='absolute top-1/2 -translate-y-1/2 left-6  w-52'>
              <h2 className='xl:text-6xl lg:text-4xl text-white leading-[3.7rem]'>Explore Electronics Products</h2>
            </div>
          </div>
          <div className="promotiondiv relative w-1/2 rounded-lg">
            <img className='rounded-lg w-full' src="./images/bn-2.jpg" alt="" />
            <div className='absolute top-1/2 -translate-y-1/2 left-6  w-64'>
              <h2 className='xl:text-6xl lg:text-4xl text-gray-500 leading-[3.7rem]'>Products For Your Kitchen</h2>
            </div>
          </div>
        </section> */}

        <section className={`w-full   rounded-lg my-4 xl:max-w-[1440px] lg:max-w-[1024px]  mx-auto ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
          <div className="w-full ">
            <h1 className={`xl:text-4xl font-semibold mb-4 pl-4 ${mode === "dark" ? 'text-lightfg' : 'text-darkbg'}`}>Foot Wears</h1>
            <Swiper
              slidesPerView={4}
              spaceBetween={30}
              navigation={true}
              breakpoints={{
                425: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 40,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
                1440: {
                  slidesPerView: 4,
                  spaceBetween: 30,
                },
              }}
              modules={[Navigation]}
              className='flex footswiper  items-center justify-center '
            >
              <div className="flex items-center  justify-center">
                {data.map(product => (
                  <SwiperSlide key={product._id} className='flex items-center justify-center'>
                    <ProductCard key={product._id} product={product} />
                  </SwiperSlide>
                ))}
              </div>
            </Swiper>
          </div>
        </section>

        {/* <div className='flex gap-4'>
          {categories.map((c) => {
            return (
              <button className='text-white' onClick={() => handlecategoty(c)}>{c}</button>
            )
          })}
        </div> */}
        {/* <div className='w-[300px]'>
          <PriceFilter items={price} />
        </div> */}

        {/* <section className='flex flex-wrap gap-4'>
          {filteredProductsPrice.map(product => (
            <Link className='flex items-center justify-center' key={product.id} to={`/singleproduct`}>
              <ProductCard key={product.name} product={product} />
            </Link>
          ))}
        </section> */}
        {/* <section className='flex flex-wrap gap-4'>
    {filteredProducts.map(product => (
          <Link className='flex items-center justify-center' key={product.id} to={`/singleproduct`}>
          <ProductCard key={product.name} product={product} />
          </Link>
        ))}
    </section> */}
      </main>
    </>
  )
}

export default MainHome
