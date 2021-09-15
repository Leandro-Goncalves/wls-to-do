import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../../src/styles/theme'
import { mocked } from 'ts-jest/utils'
import { useDispatch, useSelector } from 'react-redux'
import { useRemoveTaskMutation } from '../../../src/store/Tasks/Tasks.store'
import RemoveTaskModal from '../../../src/components/Modal/patterns/RemoveTask'

jest.mock('react-redux')

const useDispatchMocked = mocked(useDispatch)
useDispatchMocked.mockReturnValue(jest.fn())

const useRemoveTaskMutationMocked = mocked(useRemoveTaskMutation)
useRemoveTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

const useSelectorMocked = mocked(useSelector)
useSelectorMocked.mockReturnValue({
  isOpen: true,
  guid: '0'
})

jest.mock('../../../src/store/Tasks/Tasks.store')

describe('Remove Task Modal', () => {
  it('should be able to render buttons in item', () => {
    render(
      <ThemeProvider theme={theme}>
        <RemoveTaskModal />
      </ThemeProvider>
    )

    expect(screen.getByText(/Sim/i)).toBeInTheDocument()
    expect(screen.getByText(/Não/i)).toBeInTheDocument()
  })
  it('should be able to close modal', () => {
    const handleClose = jest.fn()
    useDispatchMocked.mockReturnValue(handleClose)
    render(
      <ThemeProvider theme={theme}>
        <RemoveTaskModal />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText(/Sim/i))

    expect(handleClose).toHaveBeenCalledTimes(1)
  })
  it('should be able to remove task', () => {
    const handleRemove = jest.fn()
    useRemoveTaskMutationMocked.mockReturnValue([
      handleRemove,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <RemoveTaskModal />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText(/Sim/i))

    return expect(handleRemove).toHaveBeenCalledTimes(1)
  })
  it('should not be able to render content when modal is closed', () => {
    useSelectorMocked.mockReturnValue({
      isOpen: false,
      guid: '0'
    })
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <RemoveTaskModal />
      </ThemeProvider>
    )

    const modal = baseElement.getElementsByClassName('ReactModalPortal')[0]
    expect(modal.innerHTML.length).toBe(0)
  })
})
