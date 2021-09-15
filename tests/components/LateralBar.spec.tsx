import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { mocked } from 'ts-jest/utils'
import { LateralBar } from '../../src/components/LateralBar'
import { useRouter } from 'next/router'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../src/styles/theme'

jest.mock('next/router')

const useRouterMocked = mocked(useRouter)
useRouterMocked.mockReturnValue({
  asPath: '/',
  push: jest.fn()
} as any)

describe('LateralBar component', () => {
  it('should be able to render itens', () => {
    render(
      <ThemeProvider theme={theme}>
        <LateralBar />
      </ThemeProvider>
    )
    expect(screen.getByText('Tarefas')).toBeInTheDocument()
    expect(screen.getByText('Sobre')).toBeInTheDocument()
  })
  it('should be able to click in iten', () => {
    const handleClick = jest.fn()

    useRouterMocked.mockReturnValue({
      asPath: '/',
      push: handleClick
    } as any)

    render(
      <ThemeProvider theme={theme}>
        <LateralBar />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText(/Tarefas/i))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
