import { darken } from 'polished'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

type ItemProps = {
  callback: () => void
  children: ReactNode
}

const Body = styled.button`
  font-family: 'Montserrat';
  font-weight: 500;
  line-height: 16.06px;
  font-size: 13.18px;
  opacity: 0.4;
  border: 0;
  background-color: transparent;
  padding: 10px;

  display: flex;
  width: 100%;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.white)};
  }
`

const Item: React.FC<ItemProps> = ({ callback, children }) => {
  return <Body onClick={callback}>{children}</Body>
}

export default Item
