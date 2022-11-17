import { makeAutoObservable } from 'mobx'
import {http} from '@/utils'

class UserStore{
    userInfo = {}
    constructor(){
        makeAutoObservable(this)
    }
   
    getUserInfo = async()=>{
        const res = await http.get('/my/userinfo')
        console.log('res.data.data ........',res.data.data)
        this.userInfo = res.data.data
        console.log(this.userInfo )
    }
    

}

export default UserStore