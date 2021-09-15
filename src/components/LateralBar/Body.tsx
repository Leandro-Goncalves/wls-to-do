import React, { useState, ReactNode } from 'react'
import { IoPersonCircle } from 'react-icons/io5'
import styled from 'styled-components'
import { GiHamburgerMenu } from 'react-icons/gi'

type LateralBarProps = {
  name?: string
  role?: string
  img?: string
  children: ReactNode
}

type LateralBarBodyProps = {
  isOpen: boolean
}
type MobileBackgroundProps = {
  isOpen: boolean
}

const LateralBarBody = styled.div<LateralBarBodyProps>`
  width: 192px;

  background-color: ${({ theme }) => theme.colors.blue};

  > div {
    transition-property: color, border-bottom;
    transition-duration: 0.5s;
    display: flex;
    align-items: center;
    color: ${({ theme }) => theme.colors.white};
    width: 143px;
    margin: 30px auto;
    border-bottom: 1px solid ${({ theme }) => theme.colors.white};
    padding-bottom: 22px;
  }

  nav {
    padding: 0 30px;
  }

  @media (max-width: 750px) {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 2;
    transition: transform 0.2s ease-out;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(-100%)'};
  }
`

const UserInfo = styled.div`
  margin-left: 13px;
  overflow: hidden;

  h4,
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 0;
  }

  h4 {
    font-size: 14px;
    line-height: 16.41px;
  }

  p {
    font-size: 14px;
    line-height: 16.41px;
  }
`

type SelectImageProps = {
  img?: string
  name: string
}

const UserImage = styled.img`
  width: 41px;
  height: 41px;
  border-radius: 50%;
`

const MobileOpenIcon = styled.button`
  background: transparent;
  position: absolute;
  border: 0;

  cursor: pointer;

  top: 24px;
  left: 16px;

  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.black};

  @media (min-width: 750px) {
    display: none;
  }
`

const MobileBackground = styled.button<MobileBackgroundProps>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
  border: 0;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};

  @media (min-width: 750px) {
    display: none;
  }
`

const SelectImage = ({ img, name }: SelectImageProps) => {
  if (img) {
    return <UserImage src={img} alt={name} />
  }
  return <IoPersonCircle size={41} />
}

const Body: React.FC<LateralBarProps> = ({
  name = 'Nome',
  role = 'Função',
  img,
  children
}) => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <MobileOpenIcon
        onClick={() => setOpen(!open)}
        aria-label="Hamburger Menu"
      >
        <GiHamburgerMenu size={42} />
      </MobileOpenIcon>
      <MobileBackground
        aria-label="Mobile background"
        isOpen={open}
        onClick={() => setOpen(!open)}
      />
      <LateralBarBody isOpen={open}>
        <div>
          <SelectImage img={img} name={name} />
          <UserInfo>
            <h4>{name}</h4>
            <p>{role}</p>
          </UserInfo>
        </div>
        <nav>{children}</nav>
      </LateralBarBody>
    </>
  )
}

export default Body
