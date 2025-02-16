# Header Component Testing Documentation

This document outlines all test types implemented for the header component.

## Test Types and Commands

### 1. Smoke Tests

**Command:** `npm run test-storybook`  
**File:** `components/website/layout/header/Header.stories.tsx`

Basic "does it render?" tests:

- Verifies component loads without crashing
- Checks basic functionality
- Part of Storybook's test runner

### 2. Accessibility Tests

**Command:** `npm run test:a11y`  
**File:** `components/website/layout/header/__tests__/Header.a11y.test.ts`

Tests WCAG compliance:

- Tests all viewport sizes
- Tests dark theme
- Checks ARIA attributes
- Tests screen reader compatibility

### 3. Visual Regression Tests

**Command:** `npm run test:visual`  
**File:** `components/website/layout/header/Header.snapshot.ts`

Tests for unexpected visual changes:

- Different viewport sizes (mobile, tablet, desktop, fullHD)
- Dark mode snapshots
- Mobile menu open state
- Compares against baseline screenshots

### 4. Interaction Tests

**File:** `components/website/layout/header/Header.stories.tsx`

Tests user interactions in Storybook:

- Button clicks
- Menu toggles
- Hover states
- Focus states

### 5. Snapshot Tests

**Command:** `npm run test:snapshot`  
**File:** `components/website/layout/header/Header.snapshot.ts`

Tests for unexpected DOM changes:

- Component structure
- HTML output
- Class names
- Attributes

### 6. Performance Tests

**Command:** `npm run test:performance`  
**File:** `components/website/layout/header/Header.perf.ts`

Tests performance metrics:

- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Performance timing checks

### 7. Responsive Tests

**Command:** `npm run test:responsive`  
**File:** `components/website/layout/header/Header.responsive.ts`

Tests responsive behavior:

- Mobile view (375x667)
    - Mobile menu visible
    - Desktop nav hidden
- Desktop view (1024x768)
    - Mobile menu hidden
    - Desktop nav visible

### 8. State Tests

**File:** `components/website/layout/header/Header.stories.tsx`

Tests different component states:

- LoggedIn state
- Loading state
- Error state
- Empty state

### 9. User Flow Tests

**Command:** `npm run test:flow`  
**File:** `components/website/layout/header/Header.flow.ts`

Tests complete user journeys:

- Authentication flow
    - Login button click
    - Auth modal appearance
    - Sign up form visibility

### Unit Tests

**Command:** `npm run test:unit`  
**File:** `components/website/layout/header/__tests__/Header.unit.test.tsx`

Tests individual pieces in isolation:

- Component rendering
- Basic state checks
- Simple prop validations

### Integration Tests

**Command:** `npm run test:unit`  
**File:** `components/website/layout/header/__tests__/Header.integration.test.tsx`

Tests components working together:

- Theme provider integration
- Event handling
- State management
- Component interactions

### End to End Tests

**Command:** `npm run test:e2e`  
**File:** `components/website/layout/header/__tests__/Header.e2e.test.tsx`

Tests complete user journeys through the application:

- Authentication Flow

    - Login from header
    - Complete auth form
    - Verify logged-in state
    - Access protected pages

- Navigation Flow

    - Desktop navigation
    - Mobile menu navigation
    - URL changes
    - Page content updates

- Theme Persistence
    - Theme switch in header
    - Verify across page navigation
    - Check local storage

E2E tests run against a complete running application and test full user journeys across multiple pages and features. They are the closest to real user behavior but are also the slowest to run.

## Running Tests

Start Storybook first (required for all tests):

```bash
npm run storybook
```

Then run any of these test commands:

```bash
# Smoke, State, and Interaction tests
npm run test-storybook

# Accessibility tests - WCAG compliance tests
npm run test:a11y

# Visual Regression Tests - Tests for unexpected visual changes
npm run test:visual

# Performance tests - Tests loading times, animations
npm run test:performance

# Responsive behavior tests
npm run test:responsive

# User flow tests
npm run test:flow

# Snapshot tests
npm run test:snapshot
```

## Test Results

Test results and snapshots can be found in:

- `test-results/` - Playwright test results
- `components/website/layout/header/__snapshots__/` - Visual test snapshots
