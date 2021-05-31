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
    <table>
      <thead>
        <tr>
          <td>名称</td>
          <td>负责人</td>
        </tr>
      </thead>
      <tbody>
        {list.map((project) => (
          <tr key={project.id}>
            <td>{project.name}</td>
            {/* 匹配对应的负责人名字 */}
            <td>{users.find((user) => user.id === project.personId)?.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
