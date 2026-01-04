import DashboardLayout from '@/layout/DashboardLayout'
import UserLayout from '@/layout/UserLayout'
import React,{useEffect} from 'react'
import { getAllPosts } from '@/config/redux/action/postAction'
import {getAllUsers} from '@/config/redux/action/authAction'
import { useDispatch,useSelector } from 'react-redux'
import { Router, useRouter } from 'next/router'
import styles from './index.module.css'
import { BASE_URL } from '@/config'

function Discoverpage() {

const authState= useSelector((state)=>state.auth)
const dispatch=useDispatch();
const router=useRouter();
  useEffect(()=>{
    if(!authState.all_profiles_fetched){
        dispatch(getAllUsers());
    }
  },[])

  return (
    <UserLayout>
         <DashboardLayout>
          <div>
          <h1>Discover</h1>
          <div className={styles.allUserProfile}>
            {
              authState.all_profiles_fetched && authState.all_users  .filter(profile => profile.userId._id !== authState.user?._id).map((profile)=>{
                return (
                  <div onClick={()=>{
                    router.push(`/view_profile/${profile.userId.username}`)
                  }}
                  key={profile._id} className={styles.userCard}>
                    <img className={styles.userCard_image} src={`${BASE_URL}/${profile.userId.profilePicture}`} alt="profile" />
                   <div>
                    <h1>{profile.userId.name}</h1>
                    <p>{profile.userId.email}</p>
                    </div>
                  </div>
                )
              })
            }

          </div>
          </div>
         </DashboardLayout>
        
       </UserLayout>
  )
}

export default Discoverpage
