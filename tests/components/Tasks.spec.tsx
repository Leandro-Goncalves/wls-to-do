import React from 'react'
import { render, screen } from '@testing-library/react'
import { Tasks } from '../../src/components/Tasks'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../src/styles/theme'
import { mocked } from 'ts-jest/utils'
import {
  useCompleteTaskMutation,
  useRemoveTaskMutation,
  useGetTasksQuery
} from '../../src/store/Tasks/Tasks.store'

const tasks = [
  {
    guid: 1,
    title: 'test1',
    description: 'description1',
    situation: 'uncompleted'
  },
  {
    guid: 2,
    title: 'test2',
    description: 'description2',
    situation: 'uncompleted'
  }
]

jest.mock('../../src/store/Tasks/Tasks.store')

const useCompleteTaskMutationMocked = mocked(useCompleteTaskMutation)
useCompleteTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

const useRemoveTaskMutationMocked = mocked(useRemoveTaskMutation)
useRemoveTaskMutationMocked.mockReturnValue([jest.fn(), { isLoading: false }])

const useGetTasksQueryMocked = mocked(useGetTasksQuery)
useGetTasksQueryMocked.mockReturnValue({
  data: tasks,
  error: undefined,
  isLoading: false,
  refetch: jest.fn()
})

jest.mock('react-redux', () => ({
  useDispatch: jest.fn()
}))

describe('Tasks component', () => {
  it('should be able to render all item', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tasks filter="" />
      </ThemeProvider>
    )

    expect(screen.getByText('test1')).toBeInTheDocument()
    expect(screen.getByText('test2')).toBeInTheDocument()
  })

  it('should be able to filter item', () => {
    render(
      <ThemeProvider theme={theme}>
        <Tasks filter="test1" />
      </ThemeProvider>
    )

    expect(screen.queryByText('test2')).not.toBeInTheDocument()
  })

  it('should not be able to render any item', () => {
    useGetTasksQueryMocked.mockReturnValue({
      data: undefined,
      error: undefined,
      isLoading: false,
      refetch: jest.fn()
    })

    render(
      <ThemeProvider theme={theme}>
        <Tasks filter="" />
      </ThemeProvider>
    )

    expect(screen.queryByText('test1')).not.toBeInTheDocument()
    expect(screen.queryByText('test2')).not.toBeInTheDocument()
  })
})
