import { infinity } from 'ldrs'
import { useSelector } from 'react-redux'
const Loading = () => {
  const mode = useSelector((state)=> state.auth.mode);

  infinity.register()

  return (
    <div className={`w-full h-screen flex items-center justify-center ${mode === "dark" ? 'bg-zinc-900 ' : 'bg-slate-300'} flex items-center justify-center w-full h-auto`}>
      <l-infinity
        size="55"
        stroke="4"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="1.3" 
        color="#34D399" 
      >
      </l-infinity>
    </div>
  )
}

export default Loading



