import { styles } from '@/app/styles/style'
import { useUpdatePasswordMutation } from '@/redux/features/user/userApi'
import React ,{FC, useEffect, useState}from 'react'
import toast from 'react-hot-toast'

type Props ={
    user:any
}

const ChangePassword:FC<Props>=({user}) =>{
  const [oldPassword,setOldPassword] = useState('')
  const [newPassword , setNewPassword]=useState('')
  const [confirmPassword,setConfirmPasword]=useState('')
  const[updatePassword,{isSuccess,error}] = useUpdatePasswordMutation()

  const passwordChangeHandler = async(e:any)=>{
    if(newPassword !== oldPassword){
        toast.error("Password do not match")
    }else{
        await updatePassword({oldPassword,newPassword})
    }
  }

  useEffect(()=>{
    if(isSuccess){
        toast.success("Password changed successfully")
    }
    if(error){
        if("data" in error){
            const erroData = error as any
            toast.error(erroData.data.message)
        }
    }
  },[isSuccess,error])
  return (
    <div className='w-full pl-7 px-2 800px:px-5 800px:pl-0'>
        <h1 className='block text:[25px] 800:text-[30px] font-popins text-center font-[500] text-black dark:text-[#fff] pb-2'>
            Chnage Password
        </h1>
        <div className='w-full'>
            <form aria-required
            onSubmit={passwordChangeHandler}
            className='flex flex-col items-center'
            >
            <div className='w-[100] 800px:w-[60%] mt-5'>
                <label className='block pb-2  text-black dark:text-[#fff] '>Enter your old Password</label>
                <input 
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                    required
                    value={oldPassword}
                    onChange={(e)=>setOldPassword(e.target.value)}
                />
            </div>
            <div className='w-[100] 800px:w-[60%] mt-5'>
                <label className='block pb-2  text-black dark:text-[#fff] '>Enter your new Password</label>
                <input 
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                    required
                    value={newPassword}
                    onChange={(e)=>setNewPassword(e.target.value)}
                />
            </div>
            <div className='w-[100] 800px:w-[60%] mt-5  text-black dark:text-[#fff] '>
                <label className='block pb-2'>Enter your confirm Password</label>
                <input 
                    type="password"
                    className={`${styles.input} !w-[95%] mb-4 800px:mb-0`} 
                    required
                    value={confirmPassword}
                    onChange={(e)=>setConfirmPasword(e.target.value)}
                />
                 <input 
                    type="submit"
                    className={`w-[95%] h-[40px] border border-[#37a39a] text-center text-black dark:text-[#fff] rounded-[3px] mt-8 cursor-pointer`} 
                    required
                    value="Update"
                />
            </div>

            </form>
        </div>
    </div>
  )
}

export default ChangePassword
