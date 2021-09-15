import React, { ReactNode } from 'react'
import Modal, { Props } from 'react-modal'
import styled from 'styled-components'

type ModalItem = Props & {
  title: string
  children: ReactNode
}

const Title = styled.h1`
  font-family: Montserrat;
  font-weight: 600;
  font-size: 18px;
  line-height: 21.94px;
  margin-bottom: 24px;
`

const ModalItem: React.FC<ModalItem> = ({ title, children, ...rest }) => {
  return (
    <Modal
      ariaHideApp={false}
      style={{
        overlay: {
          background: 'rgba(0, 0, 0, 0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'center',
          padding: 30
        },
        content: {
          background: '#FFFFFF',
          top: '50%',
          right: 'initial',
          left: 'initial',
          bottom: 'initial',
          transform: 'translateY(-50%)',
          padding: 25,
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 315,
          width: 'calc(100% - 60px)',
          borderRadius: 10
        }
      }}
      {...rest}
    >
      <Title>{title}</Title>
      {children}
    </Modal>
  )
}

export default ModalItem
