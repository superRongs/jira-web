import styled from '@emotion/styled'
import { Spin, Typography } from 'antd'
import { DevTools } from 'jira-dev-tool'

export const Row = styled.div<{
  gap?: string | boolean
  between?: boolean
  marginBottom?: number
}>`
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.between ? 'space-between' : undefined)};
  margin-bottom: ${(props) => props.marginBottom + 'rem'};
  > * {
    margin-top: 0px !important;
    margin-bottom: 0px !important;
    margin-right: ${(props) =>
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined};
  }
`
const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`

// 加载loading  全屏
export const FullPageLoading = () => (
  <FullPage>
    <Spin size="large" />
  </FullPage>
)

// 弹出异常错误信息   全屏
export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools />
    <Typography.Text type={'danger'}>{error?.message}</Typography.Text>
  </FullPage>
)
