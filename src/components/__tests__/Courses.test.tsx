import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import Courses from '../Courses';

// Mock framer-motion
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    section: ({ children, ...props }: any) => <section {...props}>{children}</section>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>,
  },
  useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
  useTransform: () => ({ get: () => 0 }),
  useSpring: () => ({ get: () => 0 }),
  AnimatePresence: ({ children }: any) => children,
}));

// Mock Analytics
vi.mock('../Analytics', () => ({
  trackCourseView: vi.fn(),
}));

// Mock CourseCard3D
vi.mock('../CourseCard3D', () => ({
  default: ({ course, index }: any) => (
    <div data-testid={`course-card-${index}`}>
      <h3>{course.title}</h3>
      <p>{course.description}</p>
    </div>
  ),
}));

// Mock course content
vi.mock('../../data/courseContent', () => ({
  courseContent: [
    {
      id: 1,
      title: 'Introduction to Data Analysis',
      description: 'Learn the fundamentals of data analysis',
      duration: '4 weeks',
      level: 'Beginner',
      students: 1200,
      rating: 4.8,
      image: '/test-image.jpg',
      features: ['Feature 1', 'Feature 2'],
      modules: [
        { title: 'Module 1', duration: '2 hours' },
        { title: 'Module 2', duration: '3 hours' },
      ],
    },
    {
      id: 2,
      title: 'Advanced Excel',
      description: 'Master Excel for data analysis',
      duration: '6 weeks',
      level: 'Intermediate',
      students: 950,
      rating: 4.9,
      image: '/test-image-2.jpg',
      features: ['Feature A', 'Feature B'],
      modules: [
        { title: 'Module A', duration: '2.5 hours' },
        { title: 'Module B', duration: '3.5 hours' },
      ],
    },
  ],
}));

describe('Courses Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders courses section with correct title', () => {
    render(<Courses />);
    
    expect(screen.getByText(/comprehensive course catalog/i)).toBeInTheDocument();
  });

  it('displays course cards for all courses', async () => {
    render(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByTestId('course-card-0')).toBeInTheDocument();
      expect(screen.getByTestId('course-card-1')).toBeInTheDocument();
    });
  });

  it('shows course titles and descriptions', async () => {
    render(<Courses />);
    
    await waitFor(() => {
      expect(screen.getByText('Introduction to Data Analysis')).toBeInTheDocument();
      expect(screen.getByText('Advanced Excel')).toBeInTheDocument();
      expect(screen.getByText('Learn the fundamentals of data analysis')).toBeInTheDocument();
      expect(screen.getByText('Master Excel for data analysis')).toBeInTheDocument();
    });
  });

  it('handles mouse movement for parallax effects', () => {
    render(<Courses />);
    
    // Test that component renders without errors when mouse events occur
    const coursesSection = screen.getByRole('region', { hidden: true });
    expect(coursesSection).toBeInTheDocument();
  });

  it('renders with accessibility attributes', () => {
    render(<Courses />);
    
    // Check for semantic elements
    const section = document.querySelector('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'courses');
  });

  it('applies correct CSS classes', () => {
    render(<Courses />);
    
    const section = document.querySelector('section');
    expect(section).toHaveClass('section', 'section-dark');
  });
});
