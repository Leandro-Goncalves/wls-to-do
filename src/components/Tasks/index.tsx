import styled from 'styled-components'
import { Item } from './item'
import React, { useEffect, useState } from 'react'
import { useGetTasksQuery } from '../../store/Tasks/Tasks.store'
import { motion } from 'framer-motion'
import { useDispatch } from 'react-redux'
import { open } from '../../store/Tasks/CreateModal.store'
import { Button } from './button'
import { Loading } from '../Loading'

type task = {
  guid: string
  title: string
  description: string
  situation: 'uncompleted' | 'completed'
}

type TasksProps = {
  filter: string
}

const Main = styled(motion.main)`
  width: 100%;
`

const Title = styled(motion.h1)`
  margin: 39px 0 27px 0;
  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.black};

  font-family: 'Montserrat';
  font-weight: 600;
  font-size: 30px;
  line-height: 36.57px;
`

const TasksBody = styled(motion.div)`
  height: 350px;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    background: #b3afb3;
    border-radius: 12px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: #b3afb3;
  }
  ::-webkit-scrollbar-track {
    background: #f0f0f0;
    border-radius: 0px;
    box-shadow: inset 0px 0px 0px 0px #f0f0f0;
  }
`

const fadeRight = {
  initial: {
    opacity: 0,
    x: -100
  },
  animate: {
    opacity: 1,
    x: 0
  }
}

const TasksComponent: React.FC<TasksProps> = ({ filter }) => {
  const { data, error, isLoading } = useGetTasksQuery()
  const [tasks, useTasks] = useState<task[]>([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (!data) {
      return
    }
    const dataFilter = data.filter(
      task => task.title.toLowerCase().indexOf(filter.toLowerCase()) >= 0
    )
    useTasks(dataFilter)
  }, [data, filter])

  function openCreateTaskModal() {
    dispatch(open())
  }

  return (
    <Main initial="initial" animate="animate">
      <Title variants={fadeRight}>Tarefas</Title>
      <TasksBody initial="initial" animate="animate">
        {tasks && tasks.map(task => <Item key={task.guid} data={task} />)}
        {error && 'Alguma coisa deu errado.'}
        <Loading visible={isLoading} />
      </TasksBody>
      <Button onClick={openCreateTaskModal} title="Nova Tarefa" />
    </Main>
  )
}

export const Tasks = TasksComponent
