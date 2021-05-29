import * as qs from 'qs'
import { useEffect, useState } from 'react'
import { clearnObject } from 'utils/index'
import { List } from './list.jsx'
import { SearchPanel } from './search-panel'

const apiUrl = process.env.REACT_APP_BASE_URL

export const ProjectListScreen = () => {
  console.log('apiUrl', apiUrl)
  // 下列列表
  const [users, setUsers] = useState([])
  // 输入框
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const [list, setList] = useState([])

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`).then(
      async (res) => {
        if (res.ok) {
          setList(await res.json())
        }
      }
    )
  }, [param])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])
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
