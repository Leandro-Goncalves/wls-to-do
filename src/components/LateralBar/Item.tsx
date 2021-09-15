import React from 'react'
import { useRouter } from 'next/router'
import { darken } from 'polished'
import styled from 'styled-components'
import { IconType } from 'react-icons'

type ItemProps = {
  Icon: IconType
  title: string
  path: string
}

type ItemBarProps = {
  selected: boolean
}

const ItemBar = styled.button<ItemBarProps>`
  border: 0;
  width: 100%;
  transition-property: background-color, color;
  transition-duration: 0.5s;

  background-color: ${({ theme, selected }) =>
    selected ? darken(0.1, theme.colors.blue) : 'transparent'};
  color: ${({ theme }) => theme.colors.white};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 25px;
  border-radius: 10px;
  cursor: pointer;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 16.41px;
  }

  & + button {
    margin-top: 13px;
  }

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.blue)};
  }
`

export const Item: React.FC<ItemProps> = ({ Icon, title, path }) => {
  const { asPath, push } = useRouter()
  function handleClickItem() {
    push(path)
  }

  return (
    <ItemBar selected={path === asPath} onClick={handleClickItem}>
      <Icon size={24} />
      <p>{title}</p>
    </ItemBar>
  )
}
