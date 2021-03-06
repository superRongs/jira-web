import * as auth from 'auth-provider'
import { FullPageError, FullPageLoading } from 'components/lib'
import React, { ReactNode } from 'react'
import { User } from 'screens/project-list/search-panel'
import { useMount } from 'utils'
import { http } from 'utils/http'
import { useAsync } from 'utils/use-async'

interface AuthForm {
  username: string
  password: string
}

// 验证是否登录
const bootstrapUser = async () => {
  let user = null
  const token = auth.getToken()
  if (token) {
    const data = await http('me', { token })
    user = data.user
  }
  return user
}

const AuthContext =
  React.createContext<
    | {
        user: User | null
        login: (form: AuthForm) => Promise<void>
        register: (form: AuthForm) => Promise<void>
        logout: () => Promise<void>
      }
    | undefined
  >(undefined)
AuthContext.displayName = 'AuthContext'

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    run,
    setData: setUser,
  } = useAsync<User | null>()
  // const [user, setUser] = useState<User | null>(null)   已替换
  // point free 此时的setUser 等同  user=setUser(user)
  const login = (form: AuthForm) => auth.login(form).then(setUser)
  const register = (form: AuthForm) => auth.register(form).then(setUser)
  const logout = () => auth.logout().then(() => setUser(null))

  //页面执行都调用查看
  useMount(() => {
    run(bootstrapUser())
  })
  // useMount(
  //   useCallback(() => {
  //     run(bootstrapUser())
  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  //   }, [])
  // )

  if (isIdle || isLoading) {
    return <FullPageLoading />
  }

  if (error) {
    return <FullPageError error={error} />
  }

  // 导出value要对应的赋值类型   所以在React.createContext定义泛型
  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  )
}

//自定义hook
export const useAuth = () => {
  const context = React.useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth必须在AuthProvider中使用')
  }
  return context
}
