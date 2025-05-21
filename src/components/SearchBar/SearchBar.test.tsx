import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  it('renders search input and button', () => {
    render(<SearchBar query="" onChange={() => {}} onSearch={() => {}} />);
    
    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument();
  });

  it('calls onChange when typing in input', async () => {
    const onChange = vi.fn();
    function Wrapper() {
      const [value, setValue] = React.useState('');
      return (
        <SearchBar
          query={value}
          onChange={val => {
            setValue(val);
            onChange(val);
          }}
          onSearch={() => {}}
        />
      );
    }
    render(<Wrapper />);
    const input = screen.getByPlaceholderText('Search users...');
    await userEvent.type(input, 'test');
    expect(onChange).toHaveBeenCalledWith('t');
    expect(onChange).toHaveBeenCalledWith('te');
    expect(onChange).toHaveBeenCalledWith('tes');
    expect(onChange).toHaveBeenCalledWith('test');
  });

  it('calls onSearch when clicking search button', () => {
    const onSearch = vi.fn();
    render(<SearchBar query="test" onChange={() => {}} onSearch={onSearch} />);
    
    fireEvent.click(screen.getByRole('button', { name: 'Search' }));
    
    expect(onSearch).toHaveBeenCalledTimes(1);
  });

  it('calls onSearch when pressing Enter', () => {
    const onSearch = vi.fn();
    render(<SearchBar query="test" onChange={() => {}} onSearch={onSearch} />);
    
    const input = screen.getByPlaceholderText('Search users...');
    fireEvent.keyDown(input, { key: 'Enter' });
    
    expect(onSearch).toHaveBeenCalledTimes(1);
  });
}); 