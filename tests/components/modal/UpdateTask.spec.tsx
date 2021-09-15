import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../../src/styles/theme'
import UpdateTaskModal from '../../../src/components/Modal/patterns/UpdateTask'
import { mocked } from 'ts-jest/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useEditTaskMutation } from '../../../src/store/Tasks/Tasks.store'

type SetInputValueProps = {
  type: string
  value: string
  name: string | RegExp
}

jest.mock('react-redux')

const useDispatchMocked = mocked(useDispatch)
useDispatchMocked.mockReturnValue(jest.fn())

const useSelectorMocked = mocked(useSelector)
useSelectorMocked.mockReturnValue({
  isOpen: true,
  data: {
    title: 'test1',
    description: 'description1',
    situation: 'completed'
  }
})

jest.mock('../../../src/store/Tasks/Tasks.store')

const useEditTaskMutationMocked = mocked(useEditTaskMutation)
useEditTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

function SetInputValue({ type, name, value }: SetInputValueProps) {
  fireEvent.input(screen.getByRole(type, { name: name }), {
    target: {
      value: value
    }
  })
}

describe('Update Task Modal', () => {
  it('should be able to render information in item', () => {
    render(
      <ThemeProvider theme={theme}>
        <UpdateTaskModal />
      </ThemeProvider>
    )

    expect(screen.getByDisplayValue('test1')).toBeInTheDocument()
    expect(screen.getByDisplayValue('description1')).toBeInTheDocument()
  })
  it('should not be able to update task', async () => {
    const handleUpdate = jest.fn()
    useEditTaskMutationMocked.mockReturnValue([
      handleUpdate,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <UpdateTaskModal />
      </ThemeProvider>
    )

    SetInputValue({ type: 'textbox', name: /Nome da tarefa/i, value: '' })

    fireEvent.submit(screen.getByText(/Salvar/i))

    await waitFor(() => {
      return expect(handleUpdate).toHaveBeenCalledTimes(0)
    })
  })
  it('should be able to update task', async () => {
    const handleUpdate = jest.fn()
    useEditTaskMutationMocked.mockReturnValue([
      handleUpdate,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <UpdateTaskModal />
      </ThemeProvider>
    )

    SetInputValue({ type: 'textbox', name: /Nome da tarefa/i, value: 'title' })

    fireEvent.submit(screen.getByText(/Salvar/i))

    await waitFor(() => {
      return expect(handleUpdate).toHaveBeenCalledTimes(1)
    })
  })
  it('should be able to close', () => {
    const handleClose = jest.fn()
    useDispatchMocked.mockReturnValue(handleClose)
    render(
      <ThemeProvider theme={theme}>
        <UpdateTaskModal />
      </ThemeProvider>
    )
    fireEvent.click(screen.getByText(/Cancelar/i))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
  it('should not be able to render content when modal is closed', () => {
    useSelectorMocked.mockReturnValue({
      isOpen: false,
      data: {
        title: 'test1',
        description: 'description1',
        situation: 'completed'
      }
    })
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <UpdateTaskModal />
      </ThemeProvider>
    )

    const modal = baseElement.getElementsByClassName('ReactModalPortal')[0]
    expect(modal.innerHTML.length).toBe(0)
  })
})
