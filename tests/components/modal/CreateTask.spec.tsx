import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../../src/styles/theme'
import { mocked } from 'ts-jest/utils'
import { useDispatch, useSelector } from 'react-redux'
import CreateTaskModal from '../../../src/components/Modal/patterns/CreateTask'
import { useCreateTaskMutation } from '../../../src/store/Tasks/Tasks.store'

type SetInputValueProps = {
  type: string
  value: string
  name: string | RegExp
}

jest.mock('react-redux')
jest.mock('../../../src/store/Tasks/Tasks.store')

const useDispatchMocked = mocked(useDispatch)
useDispatchMocked.mockReturnValue(jest.fn())

const useSelectorMocked = mocked(useSelector)
useSelectorMocked.mockReturnValue({
  isOpen: true
})

const useCreateTaskMutationMocked = mocked(useCreateTaskMutation)
useCreateTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

function SetInputValue({ type, name, value }: SetInputValueProps) {
  fireEvent.input(screen.getByRole(type, { name: name }), {
    target: {
      value: value
    }
  })
}

describe('Create Task Modal', () => {
  it('should be able to close', () => {
    const handleClose = jest.fn()
    useDispatchMocked.mockReturnValue(handleClose)
    render(
      <ThemeProvider theme={theme}>
        <CreateTaskModal />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByText(/Cancelar/i))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
  it('should be able to create task', async () => {
    const handleCreateTask = jest.fn()
    useCreateTaskMutationMocked.mockReturnValue([
      handleCreateTask,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <CreateTaskModal />
      </ThemeProvider>
    )

    SetInputValue({ type: 'textbox', name: /Nome da tarefa/i, value: 'title' })
    SetInputValue({
      type: 'textbox',
      name: /Descrição da tarefa/i,
      value: 'description'
    })

    fireEvent.submit(screen.getByText(/Salvar/i))

    await waitFor(() => {
      return expect(handleCreateTask).toHaveBeenCalledTimes(1)
    })
  })
  it('should not be able to create task', async () => {
    const handleCreateTask = jest.fn()
    useCreateTaskMutationMocked.mockReturnValue([
      handleCreateTask,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <CreateTaskModal />
      </ThemeProvider>
    )

    fireEvent.submit(screen.getByText(/Salvar/i))

    await waitFor(() => {
      return expect(handleCreateTask).toHaveBeenCalledTimes(0)
    })
  })
  it('should not be able to render content when modal is closed', () => {
    useSelectorMocked.mockReturnValue({
      isOpen: false
    })
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <CreateTaskModal />
      </ThemeProvider>
    )

    const modal = baseElement.getElementsByClassName('ReactModalPortal')[0]
    expect(modal.innerHTML.length).toBe(0)
  })
})
