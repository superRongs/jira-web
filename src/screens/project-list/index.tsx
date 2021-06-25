import { useEffect, useState } from 'react'
import { useHttp } from 'utils/http'
import { clearnObject, useDebounce, useMount } from 'utils/index'
import { List } from './list'
import { SearchPanel } from './search-panel'

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // 下列列表
  const [users, setUsers] = useState([])
  // 输入框
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])
  // 防抖延迟
  const dobounceParam = useDebounce(param, 200)

  //引入useHttp hook
  const client = useHttp()

  useEffect(() => {
    client('projects', clearnObject(dobounceParam)).then(setList)
  }, [dobounceParam])

  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async (res) => {
  //     if (res.ok) {
  //       setUsers(await res.json())
  //     }
  //   })
  // }, [])
  useMount(() => {
    client('users').then(setUsers)
  })
  return (
    <div>
      <SearchPanel
        users={users}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      <List users={users} list={list}></List>
    </div>
  )
}
