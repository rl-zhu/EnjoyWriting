
import { makeAutoObservable } from 'mobx'
import { http, getToken, setToken, clearToken } from '@/utils'
// import { query } from 'express';
const qs = require('qs');

class LoginStore {
    token = getToken() || ''
    constructor() {
        makeAutoObservable(this)

    }
    getToken = async ({ username, password, functionto }) => {
        // console.log('token', username, password)
        console.log('register in getToken')
        console.log(`to    http://localhost:50000/home/${functionto}`)
        const res = await http.post(`http://localhost:50000/home/${functionto}`,
            qs.stringify({ username, password }),
            {
                params: {
                    ID: 12345
                },
            }
            // {username, password}
        )

        
        this.token = res.data.token
        console.log('token is ', res.data.token)
        // console.log(res)

        //store in loginStore
        setToken(this.token)

    }
    loginOut = ()=>{
        this.token = ''
        clearToken()
    }
}

export default LoginStore