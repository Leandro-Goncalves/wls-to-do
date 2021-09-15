import React, { useEffect, useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { SubmitHandler, useForm } from 'react-hook-form'
import styled from 'styled-components'
import ModalItem from '../'
import { Input, InputMultiline } from '../Input'
import Switch from '../Switch'
import {
  taskError,
  useEditTaskMutation
} from '../../../store/Tasks/Tasks.store'
import ErrorMessageTranslate from '../../../utils/ErrorMessageTranslate'
import { toast } from 'react-toastify'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../store'
import { close } from '../../../store/Tasks/UpdateModal.store'
import { Options } from '../Options'
import { Loading } from '../../Loading'

type handlerUpdateTaskProps = {
  title: string
  description: string
}

const InputBody = styled.div`
  gap: 34px;
  display: flex;
  flex-direction: column;
`

const Form = styled.form``

const UpdateTaskSchema = yup.object().shape({
  title: yup.string().required().min(1).max(100),
  description: yup.string().required().max(1024)
})

const UpdateTaskModal: React.FC = () => {
  const [EditTask, { isLoading: isEditing }] = useEditTaskMutation()
  const { isOpen, data } = useSelector((state: RootState) => state.updateModal)
  const dispatch = useDispatch()

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(UpdateTaskSchema)
  })

  const [completed, setCompleted] = useState(data.situation === 'completed')

  useEffect(() => {
    setValue('title', data.title)
    setValue('description', data.description)
    setCompleted(data.situation === 'completed')
    clearErrors()
  }, [data])

  const handlerUpdateTask: SubmitHandler<handlerUpdateTaskProps> =
    async value => {
      try {
        if (isEditing) {
          return
        }

        EditTask({
          guid: data.guid,
          title: value.title,
          description: value.description,
          situation: completed ? 'completed' : 'uncompleted'
        })
          .unwrap()
          .then(() => {
            toast.success('Tarefa Modificada!')
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
      title="Editar tarefa"
      isOpen={isOpen}
      onRequestClose={() => dispatch(close())}
    >
      <Loading visible={isEditing} />
      <Form onSubmit={handleSubmit(handlerUpdateTask)}>
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
        <Switch value={completed} onChange={() => setCompleted(!completed)} />
        <Options onCancel={() => dispatch(close())} />
      </Form>
    </ModalItem>
  )
}

export default UpdateTaskModal
