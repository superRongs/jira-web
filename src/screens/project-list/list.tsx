import { Table } from 'antd'
import { User } from 'screens/project-list/search-panel'

interface Project {
  id: string
  name: string
  personId: string
  organization: string
  pin: boolean
}

interface ListProps {
  users: User[]
  list: Project[]
}

export const List = ({ users, list }: ListProps) => {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: '名称',
          dataIndex: 'name',
          sorter: (a, b) => a.name.localeCompare(b.name),
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
      ]}
      dataSource={list}
    ></Table>
  )
}
