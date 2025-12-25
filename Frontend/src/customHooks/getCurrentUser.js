import React from 'react'
import {useDispatch} from "react-redux"
import api from "../utils/api.js"
import { setUserData, setLoading } from '../redux/userSlice.js'
import { useEffect } from 'react'


const useGetCurrentUser = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        const fetchUser = async () => {
            dispatch(setLoading(true));
            try {
                const result = await api.get("/api/user/getcurrentuser");
                dispatch(setUserData(result.data));
            } catch (error) {
                console.log(error);
                dispatch(setUserData(null));
            } finally {
                dispatch(setLoading(false));
            }
        }
            fetchUser()
        }, [])
}

export default useGetCurrentUser