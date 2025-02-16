import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import Header from '../index';

describe('Header Component Unit Tests', () => {
    // Test individual pieces
    test('renders login button when logged out', () => {
        render(<Header isLoggedIn={false} />);
        expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });

    test('renders user menu when logged in', () => {
        render(<Header isLoggedIn={true} user={{ name: 'John Doe' }} />);
        expect(screen.getByRole('button', { name: /user menu/i })).toBeInTheDocument();
    });

    test('shows loading state', () => {
        render(<Header isLoading={true} />);
        expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    });

    test('shows error state', () => {
        render(<Header error='Failed to load' />);
        expect(screen.getByText('Failed to load')).toBeInTheDocument();
    });
});
