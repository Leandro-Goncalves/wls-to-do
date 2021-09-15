import React, { useState } from 'react'
import { BiDotsVerticalRounded } from 'react-icons/bi'
import styled from 'styled-components'

import { MdModeEdit } from 'react-icons/md'
import { FaTrash } from 'react-icons/fa'
import Menu from './Menu'
import Item from './Item'

type OverlayProps = {
  callback: (type: string) => void
}

const Icon = styled.button`
  position: absolute;
  right: 24px;
  top: 24px;
  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.white};
  cursor: pointer;
  border: 0;
  background-color: transparent;
`

const Overlay: React.FC<OverlayProps> = ({ callback }) => {
  const [show, setShow] = useState(false)

  function handleUpdateTask() {
    callback('update')
    setShow(false)
  }

  function handleDeleteTask() {
    callback('delete')
    setShow(false)
  }

  return (
    <>
      <Icon
        data-testid="IconDots"
        aria-label="Options"
        onClick={() => {
          setShow(!show)
        }}
      >
        <BiDotsVerticalRounded size={24} />
      </Icon>
      <Menu show={show}>
        <Item callback={handleUpdateTask}>
          <MdModeEdit />
          Atualizar tarefa
        </Item>
        <Item callback={handleDeleteTask}>
          <FaTrash />
          Remover tarefa
        </Item>
      </Menu>
    </>
  )
}

export default Overlay
