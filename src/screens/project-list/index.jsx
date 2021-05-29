import * as qs from 'qs'
import { useEffect, useState } from 'react'
import { clearnObject, useDebounce, useMount } from 'utils/index'
import { List } from './list.jsx'
import { SearchPanel } from './search-panel'

const apiUrl = process.env.REACT_APP_BASE_URL

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
  const dobounceParam = useDebounce(param, 2000)

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${qs.stringify(clearnObject(dobounceParam))}`
    ).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [dobounceParam])

  // useEffect(() => {
  //   fetch(`${apiUrl}/users`).then(async (res) => {
  //     if (res.ok) {
  //       setUsers(await res.json())
  //     }
  //   })
  // }, [])
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
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
