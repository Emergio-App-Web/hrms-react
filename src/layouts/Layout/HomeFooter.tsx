import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HomeFooter = () => {
  const navigate=useNavigate()
  const [active,setActive]=useState<string>('profile')

  const handleNavigate=(item:string):void=>{
    setActive(item)
    navigate(item.toLowerCase().replace(/\s+/g, ""))
  }
  return (
    <ul className='flex gap-5 flex-wrap font-montserrat font-semibold'>
      {['profile','Digital Business Card','Details','Skills','Documents','Bank','Job History','Seperation Request','Education','Certification','Family','Emergency','Memos/Disciplinary','Change Password','Reference'].map((item,index)=>(
       <li key={index} 
        className={`text-[14px] ${active === item ? " bg-[#DDFF8F]" : "bg-black text-white"}  rounded-2xl px-3 py-1`}
        onClick={()=>{handleNavigate(item)}}
        >
        {item}
       </li>
      ))}
    </ul>
  )
}

export default HomeFooter
