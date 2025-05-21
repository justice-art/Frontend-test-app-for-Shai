import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import UserTable from './UserTable';

const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30, website: 'john.com' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25, website: 'jane.com' },
];

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('UserTable', () => {
  it('renders table headers', () => {
    renderWithRouter(<UserTable users={[]} />);
    
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders user data', () => {
    renderWithRouter(<UserTable users={mockUsers} />);
    
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('jane@example.com')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('renders empty state when no users', () => {
    renderWithRouter(<UserTable users={[]} />);
    
    expect(screen.queryByRole('row')).not.toBeInTheDocument();
  });
}); 