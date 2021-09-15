import React, { InputHTMLAttributes } from 'react'
import styled from 'styled-components'
import { BiSearchAlt2 } from 'react-icons/bi'
import { motion } from 'framer-motion'

type SearchBox = InputHTMLAttributes<HTMLInputElement>

const Body = styled(motion.label)`
  width: 100%;
  display: flex;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 10px;
  cursor: pointer;
`

const Input = styled.input`
  height: 52px;
  width: 100%;
  background-color: transparent;
  border: 0;

  font-weight: 300;
  font-size: 18px;
  line-height: 21.09px;
`

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 12px;
  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.black};
`

const fadeDown = {
  initial: {
    opacity: 0,
    y: -100
  },
  animate: {
    opacity: 1,
    y: 0
  }
}
export const SearchBox: React.FC<SearchBox> = ({ ...rest }) => {
  return (
    <Body initial="initial" animate="animate" variants={fadeDown}>
      <Icon>
        <BiSearchAlt2 size={21} />
      </Icon>
      <Input name="SearchBoxInput" placeholder="Procurar tarefas" {...rest} />
    </Body>
  )
}
