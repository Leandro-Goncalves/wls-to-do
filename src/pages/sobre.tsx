import React from 'react'
import { GetStaticProps, NextPage } from 'next'
import styled, { ThemeProvider } from 'styled-components'
import Head from 'next/head'
import { LateralBar } from '../components/LateralBar/index'
import { useSelector } from 'react-redux'
import { RootState } from '../store'

const Container = styled.div`
  display: flex;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
`

const Sobre: NextPage = () => {
  const { theme } = useSelector((state: RootState) => state.ThemeSwitch)
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <title>Sobre | Lista de tarefas </title>
      </Head>
      <Container>
        <LateralBar />
      </Container>
    </ThemeProvider>
  )
}

export default Sobre

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
