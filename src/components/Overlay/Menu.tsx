import React, { ReactNode } from 'react'
import styled from 'styled-components'

type MenuProps = {
  children: ReactNode
  show: boolean
}

const Body = styled.nav`
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2.93px 6.59px rgba(0, 0, 0, 0.25);
  border-radius: 3.66px;
`
type DropdownProps = {
  show: boolean
  children: ReactNode
}

type DropdownBobyProps = {
  isShow: boolean
}

const DropdownBoby = styled.div<DropdownBobyProps>`
  opacity: ${({ isShow }) => (isShow ? 1 : 0)};
  pointer-events: ${({ isShow }) => (isShow ? 'all' : 'none')};

  transition: opacity 0.2s ease-out;
  position: absolute;
  right: 50px;
  top: 20px;
`
function Dropdown({ show, children }: DropdownProps) {
  return <DropdownBoby isShow={show}>{children}</DropdownBoby>
}

const Menu: React.FC<MenuProps> = ({ show, children }) => {
  return (
    <Dropdown show={show}>
      <Body>{children}</Body>
    </Dropdown>
  )
}

export default Menu
