import { render, screen } from '@testing-library/react'
import { expect, test } from 'vitest'
import EngineeringGrid from '../components/EngineeringGrid'

test('EngineeringGrid renders all feature projects', () => {
  render(<EngineeringGrid />)
  
  // Verify main heading
  expect(screen.getByText('Featured Engineering Grid')).toBeInTheDocument()
  
  // Verify projects are rendered using strictly technical summaries
  expect(screen.getByText('Crafts of Joy (COJ) Order Management System')).toBeInTheDocument()
  expect(screen.getByText(/Serverless full-stack architecture leveraging React 19/i)).toBeInTheDocument()
  
  // Check for tech stack badges
  expect(screen.getByText('LangChain')).toBeInTheDocument()
  expect(screen.getByText('React Three Fiber')).toBeInTheDocument()
})
