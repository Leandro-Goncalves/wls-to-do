import React, { memo } from 'react'
import { FaClipboardList } from 'react-icons/fa'
import { MdInfo } from 'react-icons/md'
import Body from './Body'
import { Item } from './Item'

function LateralBarComponent() {
  return (
    <Body
      name="Leandro"
      role="Administrador"
      img="https://github.com/leandro-goncalves.png"
    >
      <Item Icon={FaClipboardList} title="Tarefas" path="/" />
      <Item Icon={MdInfo} title="Sobre" path="/sobre" />
    </Body>
  )
}

export const LateralBar = memo(LateralBarComponent)
