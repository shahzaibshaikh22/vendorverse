import { useDecreaseQuantityMutation, useDeleteCartItemMutation, useGetSingleProductQuery, useIncreaseQuantityMutation } from '../redux/features/apiSlices/productApiSlice'
import { useSelector } from 'react-redux'
import { FaMinus, FaPlus, FaTrash } from 'react-icons/fa'
import Loading from "./Loading"
import { loginUser } from '../redux/features/slices/authSlice'

const SingleCartItem = ({ item }) => {
  
  const { mode, user } = useSelector((state) => state.auth)

// mutation for fetching single product in the cart
  const { data, isLoading } = useGetSingleProductQuery(item.productId._id)
  console.log(data);
  


  // increase product quantity
  let userId;
  if(user){
    userId = user._id;
  }

  const [increaseQuantity] = useIncreaseQuantityMutation()

  const handleIncreaseQuantity =  async(productId) => {
   const res  = await  increaseQuantity({ productId, userId})
   if(res.data.err){
   alert(res.data.err)
   }
  };

    // decrease product quantity
  const [decreaseQuantity] = useDecreaseQuantityMutation()
  const handleDecreaseQuantity = async (productId) => {
    const res  = await  decreaseQuantity({ productId, userId})
    
    if(res.data.err){
    alert(res.data.err)
    }
  };

  // delete cart item 
  const [deletecartItem] = useDeleteCartItemMutation()
  const handleDeleteItem = async (productId) => {
    const res  = await  deletecartItem({ productId, userId})
  }

  if(isLoading){
    return(
      <Loading/>
    )
  }




  return (
    <div className="w-full">
      {data && (
        <div className={`grid grid-cols-5 w-full mb-4 p-4 rounded-md ${mode === "dark" ? 'bg-darkfg' : 'bg-lightfg'}`}>
          <div className='h-14 w-14 '>
            <img src={`http://localhost:5000/${data.images[0]}`} className='w-full h-full object-cover' alt="" />
          </div>
          <div className='flex flex-col justify-center'>
            <h3>{data.name}</h3>
            <h3 className='text-gray-400'>{data.subCategory}</h3>
          </div>
          <div className='flex items-center'>
            <h3>Rs:{data.price}</h3>
          </div>
          <div className='flex items-center gap-4'>
            <FaMinus onClick={() => handleDecreaseQuantity(item.productId._id)} />
            <h3 className='bg-emerald-500 text-white w-5 h-5 rounded-sm flex items-center justify-center'>{item.quantity}</h3>
            <FaPlus onClick={() => handleIncreaseQuantity(item.productId._id)} />
          </div>
          <div className='flex items-center'>
            <FaTrash onClick={()=>handleDeleteItem(item.productId._id)} />
          </div>
        </div>
      )}
    </div>
  )
}

export default SingleCartItem
