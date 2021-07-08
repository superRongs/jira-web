import { useEffect } from 'react'
import { Project } from 'screens/project-list/list'
import { clearnObject } from 'utils'
import { useHttp } from './http'
import { useAsync } from './use-async'

export const useProject = (param?: Partial<Project>) => {
  const { run, ...result } = useAsync<Project[]>()
  //引入useHttp hook
  const client = useHttp()
  useEffect(() => {
    run(client('projects', { data: clearnObject(param || {}) }))
  }, [param])

  return result
}
