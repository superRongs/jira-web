import qs from 'qs'
import * as auth from './../auth-provider'
import { useAuth } from './../context/auth-context'
const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
  token?: string
  data?: object
}

export const http = async (
  url: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: 'GET',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
      'Content-Type': data ? 'application/json' : '',
    },
    ...customConfig,
  }
  if (config.method.toUpperCase() === 'GET') {
    url += `?${qs.stringify(data)}`
  } else {
    config.body = JSON.stringify(data || {})
  }

  return window.fetch(`${apiUrl}/${url}`, config).then(async (response) => {
    // 特殊处理
    if (response.status === 401) {
      await auth.logout()
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }

    const data = await response.json()
    // 成功
    if (response.ok) {
      return data
    } else {
      // 处理异常   与axios不同     服务端返回异常   fetch不会补抓异常    axios可以捕获到2**以外的异常
      return Promise.reject(data)
    }
  })
}

//useHttp
export const useHttp = () => {
  const { user } = useAuth()
  // Parameters  Ts操作符
  return (...[url, config]: Parameters<typeof http>) =>
    http(url, { ...config, token: user?.token })
}
