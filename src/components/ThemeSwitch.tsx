import React from 'react'
import styled from 'styled-components'
import Switch from 'react-switch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store'
import { toggle } from '../store/ThemeSwitch.store'

const SwitchComponent = styled(Switch)`
  position: absolute !important;
  right: 10px;
  top: 10px;
`

export const ThemeSwitch: React.FC = () => {
  const dispatch = useDispatch()
  const { theme } = useSelector((state: RootState) => state.ThemeSwitch)

  const toggleTheme = () => {
    dispatch(toggle())
  }

  return (
    <SwitchComponent
      onChange={toggleTheme}
      checkedIcon={false}
      uncheckedIcon={false}
      height={10}
      width={40}
      boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
      handleDiameter={20}
      onColor="#0047FF"
      aria-label="theme switch"
      checked={theme.title === 'dark'}
    />
  )
}
