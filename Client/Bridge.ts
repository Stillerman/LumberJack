import axios, { AxiosResponse } from 'axios'
import qs from 'qs'

export class Bridge {
  jwt: string
  authenticated = true


  constructor(jwt?: string) {
    if (!jwt) this.authenticated = false
    else this.jwt = jwt
  }

  post(url: string, bodyObject: any): Promise<AxiosResponse<any>> {

    let body = (qs.stringify(bodyObject))

    let config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }

    if (this.authenticated) config.headers['x-access-token'] = this.jwt

    return axios.post('http://localhost:3000' + url, body, config)
  }

  get(url: string): Promise<AxiosResponse<any>> {

    let config = { headers: {} }

    if (this.authenticated) config.headers['x-access-token'] = this.jwt

    return axios.get(url, config)
  }

}


