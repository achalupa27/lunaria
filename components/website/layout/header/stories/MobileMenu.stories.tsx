import type { Meta, StoryObj } from '@storybook/react';
import MobileMenu from '../components/right-section/mobile-menu';

const meta = {
    title: 'Website/Layout/Header/MobileMenu',
    component: MobileMenu,
    parameters: {
        layout: 'centered',
    },
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
