import { useAuth } from 'context/auth-context'
import { Form, Input } from 'antd'
import { LongButton } from 'unauthenticated-app'
import { useAsync } from 'utils/use-async'

// const apiUrl = process.env.REACT_APP_API_URL
export const RegisterScreens = ({
  onError,
}: {
  onError: (error: Error) => void
}) => {
  // 全局引入
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  // onSubmit接受的event泛型 HTMLFormElement
  const handleSubmit = async ({
    cpassword,
    ...values
  }: {
    username: string
    password: string
    cpassword: string
  }) => {
    if (cpassword !== values.password) {
      onError(new Error('请确认两次码输入的密码相同'))
      return
    }

    try {
      await run(register(values))
    } catch (error) {
      onError(error)
    }
  }
  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={'username'}
        rules={[{ required: true, message: '请输入用户名' }]}
      >
        <Input placeholder={'用户名'} type="text" id={'username'} />
      </Form.Item>
      <Form.Item
        name={'password'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'密码'} type="password" id={'password'} />
      </Form.Item>
      <Form.Item
        name={'cpassword'}
        rules={[{ required: true, message: '请输入密码' }]}
      >
        <Input placeholder={'确认密码'} type="password" id={'cpassword'} />
      </Form.Item>
      <Form.Item>
        <LongButton loading={isLoading} htmlType={'submit'} type={'primary'}>
          注册
        </LongButton>
      </Form.Item>
    </Form>
  )
}
