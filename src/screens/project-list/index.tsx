import styled from '@emotion/styled'
import { Typography } from 'antd'
// import { useState } from 'react'
import { useDebounce, useDocumentTitle } from 'utils/index'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'
import { useUser } from 'utils/user'
import { List } from './list'
import { SearchPanel } from './search-panel'

// const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  // const [list, setList] = useState([])
  // const [isLoading, setIsLoading] = useState(false)
  // const [error, setError] = useState<null | Error>(null)

  // 定义keys
  // 在react中  useState定义的初始值  obj不会直接做比较   只有当setObj时候才会去执行比较
  // const [keys] = useState<('name' | 'personId')[]>(['name', 'personId'])

  // 切记   基础类型可以放在依赖里    组件状态也可以放在组件里    非组件状态的对象，决不能放在依赖里   （会出现是死循环）
  // react 机制   组件渲染后触发useEffce  组件状态setObj也触发组件渲染   然后接着触发useEffce
  // ussMemo 只有在组件状态中改变才会触发
  const [param, setParam] = useUrlQueryParam(['name', 'personId'])
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
