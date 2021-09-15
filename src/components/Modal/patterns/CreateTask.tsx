import React from 'react'
import styled from 'styled-components'
import ModalItem from '../'
import { Input, InputMultiline } from '../Input'
import { SubmitHandler, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { toast } from 'react-toastify'
import ErrorMessageTranslate from '../../../utils/ErrorMessageTranslate'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../store/Tasks/CreateModal.store'
import { RootState } from '../../../store'
import {
  taskError,
  useCreateTaskMutation
} from '../../../store/Tasks/Tasks.store'
import { Options } from '../Options'
import { Loading } from '../../Loading'

type ItemData = {
  title: string
  description: string
}

const CreateTaskSchema = yup.object().shape({
  title: yup.string().required().min(1).max(100),
  description: yup.string().max(1024)
})

const InputBody = styled.div`
  gap: 34px;
  display: flex;
  flex-direction: column;
`

const Form = styled.form``

const CreateTaskModal: React.FC = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(CreateTaskSchema)
  })

  const dispatch = useDispatch()
  const { isOpen } = useSelector((state: RootState) => state.createModal)

  const [createTask, { isLoading: isCreating }] = useCreateTaskMutation()

  const handlerCreateItem: SubmitHandler<ItemData> = async value => {
    try {
      if (isCreating) {
        return
      }

      createTask({
        title: value.title,
        description: value.description
      })
        .unwrap()
        .then(() => {
          toast.success('Tarefa Adicionada!')
          reset()
          dispatch(close())
        })
        .catch((error: taskError) => {
          toast.error(ErrorMessageTranslate(error.data.title))
          dispatch(close())
        })
    } catch (err) {
      toast.error('Alguma coisa deu errado!')
      dispatch(close())
    }
  }

  return (
    <ModalItem
      title="Criar tarefa"
      isOpen={isOpen}
      onRequestClose={() => dispatch(close())}
      testId="searchBox"
    >
      <Loading visible={isCreating} />
      <Form onSubmit={handleSubmit(handlerCreateItem)}>
        <InputBody>
          <Input
            title="Nome da tarefa"
            {...register('title')}
            error={errors.title}
          />
          <InputMultiline
            title="Descrição da tarefa"
            {...register('description')}
            error={errors.description}
          />
        </InputBody>
        <Options onCancel={() => dispatch(close())} />
      </Form>
    </ModalItem>
  )
}

export default CreateTaskModal
