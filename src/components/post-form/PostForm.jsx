import React,{useCallback}  from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import {  Input, Button, Select, RTE} from '../index'
import appwriteService from '../../appwrite/conf'
import { useNavigate } from 'react-router-dom'

function PostForm() {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues:{
            title: post?.title ||'',
            slug: post?.title || '',
            content: post?.title || '',
            status: post?.title || 'active'
        }
    })

    const navigate = useNavigate()
    const userData = useSelector(state => state.user.userData)

    const submit = async(data) => {
        if(post){
          const file = data.image[0]? appwriteService.uploadFile(data.image[0]) : null

          if(file){
            appwriteService.deleteFile(post.featuredImage)
          }

          const dbPost = await appwriteService.updateFile(
            post.$id,{
                ...data,
                featuredImage: file ? field.$id : undefined
            } // 24mins
          )
        }
    }

  return (
    <div>PostForm</div>
  )
}

export default PostForm