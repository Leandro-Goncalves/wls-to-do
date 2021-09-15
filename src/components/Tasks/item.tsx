import React, { memo } from 'react'
import styled from 'styled-components'
import { BsCheck } from 'react-icons/bs'
import Overlay from '../Overlay'
import { darken } from 'polished'
import { motion } from 'framer-motion'
import { useCompleteTaskMutation } from '../../store/Tasks/Tasks.store'
import { useDispatch } from 'react-redux'
import { open as updateOpen } from '../../store/Tasks/UpdateModal.store'
import { open as removeOpen } from '../../store/Tasks/RemoveModal.store'

type task = {
  guid: string
  title: string
  description: string
  situation: 'uncompleted' | 'completed'
}

type itemProps = {
  data: task
}

const fadeUp = {
  initial: {
    opacity: 0,
    y: 100
  },
  animate: {
    opacity: 1,
    y: 0
  }
}

const Body = styled(motion.div)`
  max-width: 583px;
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 146px;
  background-color: ${({ theme }) => theme.colors.blue};
  border-radius: 10px;
  position: relative;

  padding: 24px;

  & + & {
    margin-top: 21px;
  }
`

const Information = styled.div`
  padding-right: 30px;
`

const Title = styled.h2`
  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  font-weight: 700;
  font-size: 18px;
  line-height: 21.09px;
  margin-bottom: 4px;

  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

const Description = styled.h2`
  transition: color 0.5s;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  font-weight: 400;
  font-size: 18px;
  line-height: 21.09px;
  overflow: hidden;
`

const ButtonBody = styled(motion.button)`
  height: 32px;
  border: 0;
  padding: 8px;
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.white};

  cursor: pointer;

  font-weight: 500;
  font-size: 14px;
  line-height: 16.41px;

  margin-top: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;

  max-width: 105px;

  transition: background-color 0.2s;

  &:disabled {
    color: #000000;
    cursor: auto;
  }

  &:not([disabled]):hover {
    background-color: ${({ theme }) => darken(0.1, theme.colors.white)};
  }
`

function ItemComponent({ data }: itemProps) {
  const [completeTask] = useCompleteTaskMutation()
  const dispatch = useDispatch()

  async function handleCompleteTask() {
    alert(
      'Por mais que a requisição esteja funcionando, a rota PATCH não está salvando os dados por isso não está sendo atualizado.'
    )
    const response = await completeTask(data.guid)
    console.log(response)
  }

  function handleOverlay(type: string) {
    switch (type) {
      case 'update':
        dispatch(updateOpen(data))
        break
      case 'delete':
        dispatch(removeOpen(data.guid))
        break
    }
  }

  return (
    <Body variants={fadeUp}>
      <Overlay callback={handleOverlay} />
      <Information>
        <Title>{data.title}</Title>
        <Description>{data.description}</Description>
      </Information>
      <ButtonBody
        onClick={handleCompleteTask}
        whileHover={data.situation === 'uncompleted' ? { scale: 1.1 } : {}}
        whileTap={data.situation === 'uncompleted' ? { scale: 0.9 } : {}}
        disabled={data.situation === 'completed'}
      >
        {data.situation === 'completed' ? (
          <>
            <BsCheck size={24} />
            Concluído
          </>
        ) : (
          'Em progresso'
        )}
      </ButtonBody>
    </Body>
  )
}

export const Item = memo(ItemComponent)
