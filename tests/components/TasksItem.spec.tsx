import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Item } from '../../src/components/Tasks/item'
import { mocked } from 'ts-jest/utils'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../src/styles/theme'
import {
  useCompleteTaskMutation,
  useRemoveTaskMutation
} from '../../src/store/Tasks/Tasks.store'

type taskProps = {
  guid: string
  title: string
  description: string
  situation: 'uncompleted' | 'completed'
}

const task = {
  guid: '1',
  title: 'title1',
  description: 'description1',
  situation: 'uncompleted'
} as taskProps

const taskCompleted = {
  guid: '2',
  title: 'title2',
  description: 'description2',
  situation: 'completed'
} as taskProps

jest.mock('../../src/store/Tasks/Tasks.store')

const useCompleteTaskMutationMocked = mocked(useCompleteTaskMutation)
useCompleteTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

const useRemoveTaskMutationMocked = mocked(useRemoveTaskMutation)
useRemoveTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn()
}))

describe('Task Item Component', () => {
  it('should be able to render item', () => {
    render(
      <ThemeProvider theme={theme}>
        <Item data={task} />
      </ThemeProvider>
    )

    expect(screen.getByText('title1')).toBeInTheDocument()
    expect(screen.getByText('description1')).toBeInTheDocument()
  })

  it('should be able to execute completeTask when task is in progress', () => {
    const handleCompleteTask = jest.fn()
    useCompleteTaskMutationMocked.mockReturnValue([
      handleCompleteTask,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <Item data={task} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText(/Em progresso/i))

    expect(handleCompleteTask).toHaveBeenCalledTimes(1)
  })

  it('should not be able to execute completeTask when task is completed', () => {
    const handleCompleteTask = jest.fn()
    useCompleteTaskMutationMocked.mockReturnValue([
      handleCompleteTask,
      { isLoading: false }
    ])
    render(
      <ThemeProvider theme={theme}>
        <Item data={taskCompleted} />
      </ThemeProvider>
    )

    fireEvent.click(screen.getByText(/Concluído/i))

    expect(handleCompleteTask).toHaveBeenCalledTimes(0)
  })
})
