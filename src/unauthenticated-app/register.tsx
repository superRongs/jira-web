import { useAuth } from 'context/auth-context'
import { FormEvent } from 'react'

// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreens = () => {
  // 全局引入
  const { register, user } = useAuth()

  // onSubmit接受的event泛型 HTMLFormElement
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    // 阻止默认事件
    event.preventDefault()

    const username = (event.currentTarget.elements[0] as HTMLInputElement).value
    const password = (event.currentTarget.elements[1] as HTMLInputElement).value

    register({ username, password })
  }
  return (
    <form onSubmit={handleSubmit}>
      {user ? <div>用户名：{user?.name}</div> : ''}
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id={'username'} />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id={'password'} />
      </div>
      <button type={'submit'}>注册</button>
    </form>
  )
}
