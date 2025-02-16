import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Header from '../index';
import { ThemeProvider } from 'next-themes';

describe('Header Component Integration Tests', () => {
    // Test pieces working together
    test('login flow works', () => {
        const onLogin = vi.fn();
        render(<Header onLogin={onLogin} />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));
        expect(onLogin).toHaveBeenCalled();
    });

    test('theme switching works', () => {
        render(
            <ThemeProvider attribute='class'>
                <Header />
            </ThemeProvider>
        );

        const themeButton = screen.getByRole('button', { name: /toggle theme/i });
        fireEvent.click(themeButton);

        expect(document.documentElement).toHaveClass('dark');
    });

    test('mobile menu integration', () => {
        const onMenuToggle = vi.fn();
        render(<Header onMenuToggle={onMenuToggle} />);

        // Open menu
        fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
        expect(onMenuToggle).toHaveBeenCalledWith(true);
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // Close menu
        fireEvent.click(screen.getByRole('button', { name: /toggle menu/i }));
        expect(onMenuToggle).toHaveBeenCalledWith(false);
    });

    test('user menu and logout integration', () => {
        const onLogout = vi.fn();
        render(<Header isLoggedIn={true} user={{ name: 'John Doe' }} onLogout={onLogout} />);

        // Open user menu
        fireEvent.click(screen.getByRole('button', { name: /user menu/i }));
        expect(screen.getByRole('menu')).toBeInTheDocument();

        // Click logout
        fireEvent.click(screen.getByRole('button', { name: /logout/i }));
        expect(onLogout).toHaveBeenCalled();
    });
});
