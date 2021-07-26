import { Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { User } from 'screens/project-list/search-panel'

export interface Project {
  id: string
  name: string
  personId: string
  organization: string
  pin: boolean
  created: number
}

interface ListProps extends TableProps<Project> {
  users: User[]
  // list: Project[]
}

export const List = ({ users, ...props }: ListProps) => {
  /*
    ...props 结构了ListProps所有属性   包括list的属性还有Table组件的属性
  */
  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>
          },
        },
        {
          title: '部门',
          dataIndex: 'organization',
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find((user) => user.id === project.personId)?.name}
              </span>
            )
          },
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          },
        },
      ]}
      {...props}
    ></Table>
  )
}
