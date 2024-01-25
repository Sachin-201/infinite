import React from 'react';
import axios from 'axios';
import { render, waitFor, fireEvent, act } from '@testing-library/react';
import App from '../App';

jest.mock('axios');

describe('App Component', () => {  
  it('should fetch posts when scrolled to the bottom', () => {
    const { getByTestId } = render(<App />);
    window.scrollY = 500;
    window.innerHeight = 500;
    Object.defineProperty(document.body, 'offsetHeight', { writable: true, value: 1000 });
    fireEvent.scroll(window);
    expect(axios.get).toHaveBeenCalled();
  });
});

