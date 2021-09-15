import React from 'react'
import styled from 'styled-components'
import ModalItem from '../'
import { useDispatch, useSelector } from 'react-redux'
import { close } from '../../../store/Tasks/RemoveModal.store'
import { RootState } from '../../../store'
import { motion } from 'framer-motion'
import { FiTrash2, FiXCircle } from 'react-icons/fi'
import {
  taskDeleteError,
  useRemoveTaskMutation
} from '../../../store/Tasks/Tasks.store'
import { toast } from 'react-toastify'
import ErrorMessageTranslate from '../../../utils/ErrorMessageTranslate'
import { Loading } from '../../Loading'

const ButtonContainer = styled.div`
  height: 110px;
  display: flex;
  gap: 20px;
`

const Button = styled(motion.button)`
  flex: 1;
  border: 0;
  cursor: pointer;
  background: transparent;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  color: #646464;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  border-radius: 5px;

  h3 {
    margin: 0;
  }

  transition-property: background-color, color;
  transition-duration: 0.5s;
  &:hover {
    color: white;
    background-color: ${({ theme }) => theme.colors.blue};
  }
`

const RemoveTaskModal: React.FC = () => {
  const dispatch = useDispatch()
  const { isOpen, guid } = useSelector((state: RootState) => state.removeModal)
  const [deleteTask, { isLoading: isDeleting }] = useRemoveTaskMutation()

  function handleClose() {
    dispatch(close())
  }

  async function handleConfirm() {
    try {
      if (isDeleting) {
        return
      }

      deleteTask(guid)
        .unwrap()
        .then(() => {
          toast.success('Tarefa Removida!')
          dispatch(close())
        })
        .catch((error: taskDeleteError) => {
          toast.error(ErrorMessageTranslate(error.data.id))
          dispatch(close())
        })
    } catch (err) {
      toast.error('Alguma coisa deu errado!')
      dispatch(close())
    }
  }

  return (
    <ModalItem
      title="Deletar o item?"
      isOpen={isOpen}
      onRequestClose={() => dispatch(close())}
    >
      <Loading visible={isDeleting} />
      <ButtonContainer>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleConfirm}
        >
          <FiTrash2 size={50} />
          <h3>Sim</h3>
        </Button>

        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
        >
          <FiXCircle size={50} />
          <h3>Não</h3>
        </Button>
      </ButtonContainer>
    </ModalItem>
  )
}

export default RemoveTaskModal
