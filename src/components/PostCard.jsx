import React from 'react'
import appwriteService from '../appwrite/conf'
import { Link } from 'react-router-dom'

function PostCard({$id, tittle, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full rounded-xl bg-gray-100 p-4'>
            <div className='w-full justify-center mb-4'>
                <img src={appwriteService.getFilePreview(featuredImage)} alt={tittle} className='rounded-xl' />
            </div>
            <h2 className='text-xl font-bold'>{tittle}</h2>
        </div>
    </Link>
  )
}

export default PostCard