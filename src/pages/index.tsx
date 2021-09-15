import React, { useState } from 'react'
import type { NextPage } from 'next'
import styled, { ThemeProvider } from 'styled-components'
import { LateralBar } from '../components/LateralBar'
import { SearchBox } from '../components/SearchBox'
import { Tasks } from '../components/Tasks'
import Head from 'next/head'
import CreateTaskModal from '../components/Modal/patterns/CreateTask'
import UpdateTaskModal from '../components/Modal/patterns/UpdateTask'
import { ThemeSwitch } from '../components/ThemeSwitch'
import { useSelector } from 'react-redux'
import { RootState } from '../store'
import RemoveTaskModal from '../components/Modal/patterns/RemoveTask'

const Container = styled.div`
  display: flex;
  min-height: 100vh;
  transition: background-color 0.5s;
  background-color: ${({ theme }) => theme.colors.background};
`

const Center = styled.div`
  margin: 0 auto;
  padding: 0 16px;
  margin-top: 100px;
  max-width: 583px;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Home: NextPage = () => {
  const [searchValue, setSearchValue] = useState('')

  const { theme } = useSelector((state: RootState) => state.ThemeSwitch)

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Tarefas | Lista de tarefas </title>
      </Head>
      <Container>
        <ThemeSwitch />
        <CreateTaskModal />
        <UpdateTaskModal />
        <RemoveTaskModal />
        <LateralBar />
        <Center>
          <SearchBox
            value={searchValue}
            onChange={value => setSearchValue(value.target.value)}
          />
          <Tasks filter={searchValue} />
        </Center>
      </Container>
    </ThemeProvider>
  )
}

export default Home
