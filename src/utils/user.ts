import { User } from 'screens/project-list/search-panel'
import { useEffect } from 'react'
import { clearnObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useUser = (param?: Partial<User>) => {
  const { run, ...result } = useAsync<User[]>()
  //引入useHttp hook
  const client = useHttp()
  useEffect(() => {
    run(client('users', { data: clearnObject(param || {}) }))
  }, [param])

  return result
}
