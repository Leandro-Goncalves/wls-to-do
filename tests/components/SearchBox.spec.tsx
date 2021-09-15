import React from 'react'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { light as theme } from '../../src/styles/theme'
import { SearchBox } from '../../src/components/SearchBox'

describe('SearchBox component', () => {
  it('should be able to render SearchBox', () => {
    render(
      <ThemeProvider theme={theme}>
        <SearchBox />
      </ThemeProvider>
    )

    expect(screen.getByRole('textbox')).toBeInTheDocument()
  })
})
