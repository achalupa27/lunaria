import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import LeftSection from '../index';

describe('LeftSection Component Tests', () => {
    // Test the component as a whole
    test('renders logo and navigation', () => {
        render(<LeftSection />);

        // Check both main pieces exist
        expect(screen.getByRole('img', { name: /logo/i })).toBeInTheDocument();
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    // Test navigation links are correct
    test('displays correct navigation links', () => {
        render(<LeftSection />);

        const nav = screen.getByRole('navigation');
        expect(nav).toContainElement(screen.getByRole('link', { name: /home/i }));
        expect(nav).toContainElement(screen.getByRole('link', { name: /about/i }));
        expect(nav).toContainElement(screen.getByRole('link', { name: /contact/i }));
    });

    // Test component behavior
    test('highlights active link', () => {
        render(<LeftSection currentPath='/about' />);

        const aboutLink = screen.getByRole('link', { name: /about/i });
        expect(aboutLink).toHaveClass('active');
    });

    // Test component responsiveness
    test('hides navigation on mobile', () => {
        render(<LeftSection isMobile={true} />);

        expect(screen.getByRole('img', { name: /logo/i })).toBeVisible();
        expect(screen.queryByRole('navigation')).not.toBeVisible();
    });
});
