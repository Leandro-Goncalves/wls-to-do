import { darken } from 'polished'
import React from 'react'
import styled from 'styled-components'

type OptionsProps = {
  onCancel: () => void
}

const Body = styled.div`
  display: flex;
  justify-content: end;
  gap: 14px;

  button {
    margin: 0;
    margin-top: 16px;
    color: ${({ theme }) => theme.colors.blue};
    background: transparent;
    border: 0;
    cursor: pointer;

    font-family: Montserrat;
    font-weight: 600;
    font-size: 14px;
    line-height: 17.07px;

    transition: color 0.2s;
    &:hover {
      color: ${({ theme }) => darken(0.1, theme.colors.blue)};
    }
  }
`

export const Options: React.FC<OptionsProps> = ({ onCancel }) => {
  return (
    <Body>
      <button type="button" onClick={onCancel}>
        Cancelar
      </button>
      <button type="submit">Salvar</button>
    </Body>
  )
}
