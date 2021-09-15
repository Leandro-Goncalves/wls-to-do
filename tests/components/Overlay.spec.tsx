import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { mocked } from 'ts-jest/utils'
import Overlay from '../../src/components/Overlay'
import { light as theme } from '../../src/styles/theme'
import { useRemoveTaskMutation } from '../../src/store/Tasks/Tasks.store'

jest.mock('../../src/store/Tasks/Tasks.store')
const useRemoveTaskMutationMocked = mocked(useRemoveTaskMutation)
useRemoveTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

describe('Overlay component', () => {
  it('should be able to render itens', () => {
    render(
      <ThemeProvider theme={theme}>
        <Overlay callback={jest.fn()} />
      </ThemeProvider>
    )

    expect(screen.getByText('Atualizar tarefa')).toBeInTheDocument()
    expect(screen.getByText('Remover tarefa')).toBeInTheDocument()
  })
  it('should be able to open UpdateTaskModal', () => {
    const handleUpdateTask = jest.fn()
    render(
      <ThemeProvider theme={theme}>
        <Overlay callback={handleUpdateTask} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /Atualizar tarefa/i }))
    expect(handleUpdateTask).toHaveBeenCalledTimes(1)
    expect(handleUpdateTask.mock.calls[0][0]).toBe('update')
  })
  it('should be able to open RemoveTaskModal', () => {
    const handleUpdateTask = jest.fn()
    render(
      <ThemeProvider theme={theme}>
        <Overlay callback={handleUpdateTask} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByRole('button', { name: /Remover tarefa/i }))
    expect(handleUpdateTask).toHaveBeenCalledTimes(1)
    expect(handleUpdateTask.mock.calls[0][0]).toBe('delete')
  })
})
