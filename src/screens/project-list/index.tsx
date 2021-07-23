import styled from '@emotion/styled'
import { Typography } from 'antd'
import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils/index'
import { useProject } from 'utils/project'
import { useUser } from 'utils/user'
import { List } from './list'
import { SearchPanel } from './search-panel'

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // 输入框
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  // const [list, setList] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)
  // 防抖延迟
  const dobounceParam = useDebounce(param, 200)

  //引入useProject hook  （表格列表）
  const { isLoading, error, data: list } = useProject(dobounceParam)
  //引入useUser hook   （用户列表）
  const { data: users } = useUser()
  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
