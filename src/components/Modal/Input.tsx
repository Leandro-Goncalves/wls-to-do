import React, { forwardRef, ForwardRefRenderFunction } from 'react'
import { FieldError } from 'react-hook-form'
import styled from 'styled-components'

type InputProps = {
  title: string
  error?: FieldError
}

type LabelProps = {
  error?: boolean
}

type TitleProps = {
  error?: boolean
}

const Label = styled.label<LabelProps>`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid
    ${({ error }) => (error ? 'rgba(255, 0, 0, 0.746)' : 'rgba(0, 0, 0, 0.38)')};
  border-radius: 8px;
  background-color: ${({ theme }) => theme.colors.white};
  position: relative;
`

const BodyInput = styled.input`
  border: 0;
  width: 100%;

  border-radius: 8px;
  padding: 19px;
  padding-left: 14px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  resize: none;
`

const BodyInputMultiLine = styled.textarea`
  border: 0;
  width: 100%;

  border-radius: 8px;
  padding: 19px;
  padding-left: 14px;

  font-weight: 400;
  font-size: 16px;
  line-height: 19px;

  resize: none;
`
const Title = styled.h4<TitleProps>`
  margin: 0;
  font-weight: 400;
  font-size: 12px;
  line-height: 12px;
  color: ${({ theme, error }) =>
    error ? 'rgba(255, 0, 0, 0.746)' : theme.colors.inputTitle};

  background-color: #ffffff;
  padding: 4px;

  position: absolute;
  left: 12px;
  transform: translateY(-50%);
`

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { title, error, ...rest },
  ref
) => {
  return (
    <Label error={!!error}>
      <Title error={!!error}>{title}</Title>
      <BodyInput {...rest} ref={ref} />
    </Label>
  )
}

const InputBaseMultiline: ForwardRefRenderFunction<
  HTMLTextAreaElement,
  InputProps
> = ({ title, error, ...rest }, ref) => {
  return (
    <Label error={!!error}>
      <Title error={!!error}>{title}</Title>
      <BodyInputMultiLine {...rest} ref={ref} />
    </Label>
  )
}

export const Input = forwardRef(InputBase)
export const InputMultiline = forwardRef(InputBaseMultiline)
