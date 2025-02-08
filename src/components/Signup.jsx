import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Button, Logo, Input} from "./index"
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")

    const create = async(data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if(userData){
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div>Signup</div>
  )
}

export default Signup