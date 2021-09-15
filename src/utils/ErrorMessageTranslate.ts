export default function ErrorMessageTranslate(message: string) {
  switch (message) {
    case 'One or more validation errors occurred.':
      return 'Ocorreram um ou mais erros de validação.'
    case 'This ID was not found in our database':
      return 'O id do item não foi encontrado.'
    default:
      return message
  }
}
