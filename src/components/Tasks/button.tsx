import React, { memo } from 'react'
import { BsPlus } from 'react-icons/bs'
import { darken } from 'polished'
import styled from 'styled-components'
import { HTMLMotionProps, motion } from 'framer-motion'

type buttonComponentProps = HTMLMotionProps<'button'> & {
  title: string
}

const Body = styled(motion.button)`
  border: 0;
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.blue};
  padding: 15px;
  float: right;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 8px;
  cursor: pointer;

  font-weight: 500;
  font-size: 18px;
  line-height: 21.09px;

  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.blue)};
  }
`

function buttonComponent({ title, ...rest }: buttonComponentProps) {
  return (
    <Body {...rest} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
      <BsPlus size={24} />
      {title}
    </Body>
  )
}

export const Button = memo(buttonComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.title, nextProps.title)
})
