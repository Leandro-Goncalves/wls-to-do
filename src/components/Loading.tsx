import React from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { light } from '../styles/theme'

type LoadingProps = {
  visible: boolean
}

const Body = styled(Loader)`
  position: absolute;
  right: 10px;
  top: 10px;
`

export const Loading: React.FC<LoadingProps> = ({ visible }) => {
  return (
    <Body
      type="Oval"
      color={light.colors.blue}
      visible={visible}
      height={25}
      width={25}
    />
  )
}
