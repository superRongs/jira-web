import React, { FormEvent } from 'react'
import { useAuth } from 'context/auth-context'
import { Button, Form, Input } from 'antd'

// const apiUrl = process.env.REACT_APP_API_URL
export const LoginScreens = () => {
  const { login, user } = useAuth()

  // onSubmit接受的event泛型 HTMLFormElement
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values)
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
      <Form.Item>
        <Button htmlType={'submit'} type={'primary'}>
          登录1
        </Button>
      </Form.Item>
    </Form>
  )
}
