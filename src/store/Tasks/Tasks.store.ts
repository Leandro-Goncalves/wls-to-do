import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type error = {
  status: number
  title: string
  traceId: string
  type: string
}

type deleteError = {
  id: string
}

type task = {
  guid: string
  title: string
  description: string
  situation: 'uncompleted' | 'completed'
}

export type taskError = {
  status: number
  data: error
}

export type taskDeleteError = {
  status: number
  data: deleteError
}

type editResponse = {
  type: string
  title: string
  status: number
  detail: string
  instance: string
}

type CreateTask = {
  title: string
  description: string
}

export const taskApi = createApi({
  reducerPath: 'taskApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://chronos.compraqui.app/api/'
  }),
  tagTypes: ['Tasks'],
  endpoints: builder => ({
    getTasks: builder.query<task[], void>({
      query: () => 'tasks',

      providesTags: result =>
        result
          ? [
              ...result.map(({ guid }) => ({ type: 'Tasks', guid } as const)),
              { type: 'Tasks', id: 'LIST' }
            ]
          : [{ type: 'Tasks', id: 'LIST' }]
    }),

    createTask: builder.mutation<task, CreateTask>({
      query: body => ({
        url: 'tasks',
        method: 'POST',
        body
      }),

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
    }),

    removeTask: builder.mutation<task, string>({
      query: guid => ({
        url: `tasks/${guid}`,
        method: 'DELETE'
      }),

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
    }),

    editTask: builder.mutation<editResponse, task>({
      query: body => ({
        url: 'tasks',
        method: 'PUT',
        body
      }),

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
    }),

    CompleteTask: builder.mutation<task, string>({
      query: guid => ({
        url: `tasks/${guid}`,
        method: 'PATCH'
      }),

      invalidatesTags: [{ type: 'Tasks', id: 'LIST' }]
    })
  })
})

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useRemoveTaskMutation,
  useEditTaskMutation,
  useCompleteTaskMutation
} = taskApi
