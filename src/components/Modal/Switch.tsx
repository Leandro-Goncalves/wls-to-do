import React from 'react'
import styled from 'styled-components'

type SwitchProps = {
  value: boolean
  onChange: () => void
}

type ButtonProps = {
  selected: boolean
}

const Body = styled.button`
  border: 0;
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.gray};
  border-radius: 5px;
  margin-top: 19px;
  margin-bottom: 13px;
  padding: 5px 6px;
  gap: 9px;
  display: flex;

  cursor: pointer;
`

const Button = styled.div<ButtonProps>`
  width: 100%;
  height: 100%;
  border-radius: 5px;

  transition: background-color 0.2s ease-out;
  background-color: ${({ selected }) => (selected ? '#FFFFFF' : 'transparent')};

  display: flex;
  justify-content: center;
  align-items: center;

  font-family: Montserrat;
  font-size: 14px;
  line-height: 17.07px;
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
`

const Switch: React.FC<SwitchProps> = ({ value, onChange }) => {
  return (
    <Body type="button" onClick={onChange}>
      <Button selected={!value}>Em progresso</Button>
      <Button selected={value}>Concluído</Button>
    </Body>
  )
}

export default Switch
