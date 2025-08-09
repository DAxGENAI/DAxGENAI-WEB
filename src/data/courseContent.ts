export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  type: 'video' | 'interactive' | 'project' | 'quiz' | 'assignment';
  content: string;
  resources: string[];
  objectives: string[];
  prerequisites: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  duration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface Course {
  id: string;
  title: string;
  description: string;
  modules: Module[];
  totalDuration: number; // in hours
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  prerequisites: string[];
  learningOutcomes: string[];
  tools: string[];
  certificate: boolean;
  price: number;
  rating: number;
  students: number;
  lastUpdated: string;
}

export const courseContent: Course[] = [
  {
    id: 'intro-data-analysis-ai',
    title: 'Introduction to Data Analysis with Generative AI',
    description: 'Start your journey with the fundamentals of data analysis enhanced by AI tools and techniques.',
    totalDuration: 32,
    difficulty: 'beginner',
    prerequisites: ['Basic computer skills', 'High school mathematics'],
    learningOutcomes: [
      'Understand fundamental data analysis concepts',
      'Master AI-powered data exploration tools',
      'Create compelling data visualizations',
      'Apply statistical methods to real-world data',
      'Use ChatGPT and Claude for data analysis tasks'
    ],
    tools: ['Excel', 'ChatGPT', 'Claude', 'Google Sheets', 'Tableau Public'],
    certificate: true,
    price: 24817,
    rating: 4.9,
    students: 450,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'module-1',
        title: 'Foundations of Data Analysis',
        description: 'Learn the core concepts and principles of data analysis',
        duration: 8,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'lesson-1-1',
            title: 'What is Data Analysis?',
            description: 'Introduction to data analysis and its importance in modern business',
            duration: 45,
            type: 'video',
            content: 'Comprehensive overview of data analysis fundamentals, types of data, and the data analysis process.',
            resources: ['Data Analysis Fundamentals.pdf', 'Sample Dataset.xlsx'],
            objectives: ['Define data analysis', 'Identify different types of data', 'Understand the data analysis workflow'],
            prerequisites: []
          },
          {
            id: 'lesson-1-2',
            title: 'The Data Analysis Process',
            description: 'Step-by-step guide to the data analysis methodology',
            duration: 60,
            type: 'interactive',
            content: 'Hands-on exploration of the data analysis process: Ask, Prepare, Process, Analyze, Share, Act.',
            resources: ['Data Analysis Process Template.xlsx', 'Case Study: Sales Analysis.pdf'],
            objectives: ['Master the data analysis process', 'Apply process to real scenarios', 'Identify common pitfalls'],
            prerequisites: ['What is Data Analysis?']
          },
          {
            id: 'lesson-1-3',
            title: 'Introduction to AI in Data Analysis',
            description: 'How AI tools enhance traditional data analysis',
            duration: 75,
            type: 'project',
            content: 'Practical introduction to using ChatGPT and Claude for data analysis tasks.',
            resources: ['AI Tools Guide.pdf', 'AI Prompt Templates.docx'],
            objectives: ['Understand AI capabilities in data analysis', 'Write effective prompts', 'Validate AI outputs'],
            prerequisites: ['The Data Analysis Process']
          }
        ]
      },
      {
        id: 'module-2',
        title: 'Data Collection and Preparation',
        description: 'Master the art of collecting and preparing data for analysis',
        duration: 10,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'lesson-2-1',
            title: 'Data Sources and Collection Methods',
            description: 'Learn about various data sources and collection techniques',
            duration: 60,
            type: 'video',
            content: 'Comprehensive guide to data sources: primary vs secondary, structured vs unstructured data.',
            resources: ['Data Sources Guide.pdf', 'Collection Methods Checklist.xlsx'],
            objectives: ['Identify reliable data sources', 'Choose appropriate collection methods', 'Ensure data quality'],
            prerequisites: ['Introduction to AI in Data Analysis']
          },
          {
            id: 'lesson-2-2',
            title: 'Data Cleaning and Validation',
            description: 'Techniques for cleaning and validating your data',
            duration: 90,
            type: 'interactive',
            content: 'Hands-on data cleaning using Excel and AI tools. Learn to identify and fix common data issues.',
            resources: ['Data Cleaning Checklist.xlsx', 'Validation Rules.pdf', 'Dirty Dataset.xlsx'],
            objectives: ['Clean messy datasets', 'Validate data integrity', 'Automate cleaning processes'],
            prerequisites: ['Data Sources and Collection Methods']
          }
        ]
      },
      {
        id: 'module-3',
        title: 'Exploratory Data Analysis',
        description: 'Discover patterns and insights in your data',
        duration: 8,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'lesson-3-1',
            title: 'Descriptive Statistics',
            description: 'Learn to summarize and describe your data',
            duration: 75,
            type: 'interactive',
            content: 'Master mean, median, mode, standard deviation, and other descriptive statistics.',
            resources: ['Statistics Formulas.pdf', 'Practice Dataset.xlsx'],
            objectives: ['Calculate descriptive statistics', 'Interpret statistical measures', 'Use Excel for calculations'],
            prerequisites: ['Data Cleaning and Validation']
          },
          {
            id: 'lesson-3-2',
            title: 'Data Visualization Fundamentals',
            description: 'Create compelling charts and graphs',
            duration: 90,
            type: 'project',
            content: 'Learn to create effective visualizations using Excel, Google Sheets, and AI tools.',
            resources: ['Visualization Best Practices.pdf', 'Chart Templates.xlsx'],
            objectives: ['Choose appropriate chart types', 'Design effective visualizations', 'Tell stories with data'],
            prerequisites: ['Descriptive Statistics']
          }
        ]
      },
      {
        id: 'module-4',
        title: 'AI-Powered Analysis',
        description: 'Leverage AI tools for advanced data analysis',
        duration: 6,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'lesson-4-1',
            title: 'ChatGPT for Data Analysis',
            description: 'Use ChatGPT to enhance your data analysis workflow',
            duration: 60,
            type: 'interactive',
            content: 'Learn to use ChatGPT for data interpretation, hypothesis generation, and report writing.',
            resources: ['ChatGPT Prompts for Data Analysis.pdf', 'Sample Analysis Tasks.docx'],
            objectives: ['Write effective ChatGPT prompts', 'Interpret AI-generated insights', 'Validate AI recommendations'],
            prerequisites: ['Data Visualization Fundamentals']
          },
          {
            id: 'lesson-4-2',
            title: 'Final Project: Complete Data Analysis',
            description: 'Apply all learned skills to a comprehensive project',
            duration: 120,
            type: 'project',
            content: 'Complete end-to-end data analysis project using all tools and techniques learned.',
            resources: ['Project Dataset.xlsx', 'Project Guidelines.pdf', 'Submission Template.docx'],
            objectives: ['Complete full data analysis', 'Present findings professionally', 'Receive feedback and improve'],
            prerequisites: ['ChatGPT for Data Analysis']
          }
        ]
      }
    ]
  },
  {
    id: 'advanced-excel',
    title: 'Advanced Excel for Data Analysis',
    description: 'Master advanced Excel features, pivot tables, macros, and data visualization techniques.',
    totalDuration: 24,
    difficulty: 'intermediate',
    prerequisites: ['Basic Excel knowledge', 'Introduction to Data Analysis course recommended'],
    learningOutcomes: [
      'Master advanced Excel functions and formulas',
      'Create dynamic pivot tables and charts',
      'Automate tasks with VBA macros',
      'Build interactive dashboards',
      'Perform complex data analysis efficiently'
    ],
    tools: ['Microsoft Excel', 'Power Query', 'Power Pivot', 'VBA'],
    certificate: true,
    price: 24817,
    rating: 4.8,
    students: 380,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'excel-module-1',
        title: 'Advanced Excel Functions',
        description: 'Master complex Excel functions for data manipulation',
        duration: 8,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'excel-lesson-1-1',
            title: 'Lookup Functions (VLOOKUP, HLOOKUP, INDEX/MATCH)',
            description: 'Master lookup functions for data retrieval and matching',
            duration: 90,
            type: 'interactive',
            content: 'Deep dive into lookup functions with practical examples and real-world scenarios.',
            resources: ['Lookup Functions Guide.pdf', 'Practice Dataset.xlsx', 'Function Templates.xlsx'],
            objectives: ['Use VLOOKUP and HLOOKUP effectively', 'Master INDEX/MATCH combinations', 'Handle lookup errors'],
            prerequisites: []
          },
          {
            id: 'excel-lesson-1-2',
            title: 'Logical Functions and Conditional Logic',
            description: 'Build complex conditional logic with IF, AND, OR, and nested functions',
            duration: 75,
            type: 'interactive',
            content: 'Learn to create sophisticated conditional statements and decision-making formulas.',
            resources: ['Logical Functions Reference.pdf', 'Conditional Logic Examples.xlsx'],
            objectives: ['Build complex IF statements', 'Use AND/OR functions', 'Create nested conditions'],
            prerequisites: ['Lookup Functions (VLOOKUP, HLOOKUP, INDEX/MATCH)']
          }
        ]
      },
      {
        id: 'excel-module-2',
        title: 'Pivot Tables and Data Analysis',
        description: 'Create powerful pivot tables for data summarization and analysis',
        duration: 8,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'excel-lesson-2-1',
            title: 'Pivot Table Fundamentals',
            description: 'Learn to create and customize pivot tables',
            duration: 60,
            type: 'interactive',
            content: 'Step-by-step guide to creating effective pivot tables for data analysis.',
            resources: ['Pivot Table Guide.pdf', 'Sample Data for Pivots.xlsx'],
            objectives: ['Create pivot tables', 'Customize pivot table layout', 'Add calculated fields'],
            prerequisites: ['Logical Functions and Conditional Logic']
          },
          {
            id: 'excel-lesson-2-2',
            title: 'Advanced Pivot Table Techniques',
            description: 'Master advanced pivot table features and analysis',
            duration: 90,
            type: 'project',
            content: 'Advanced pivot table techniques including grouping, calculated fields, and data modeling.',
            resources: ['Advanced Pivot Techniques.pdf', 'Complex Dataset.xlsx'],
            objectives: ['Group data in pivot tables', 'Create calculated fields', 'Use pivot charts'],
            prerequisites: ['Pivot Table Fundamentals']
          }
        ]
      },
      {
        id: 'excel-module-3',
        title: 'Power Query and Data Transformation',
        description: 'Transform and clean data using Power Query',
        duration: 8,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'excel-lesson-3-1',
            title: 'Power Query Basics',
            description: 'Introduction to Power Query for data transformation',
            duration: 75,
            type: 'interactive',
            content: 'Learn to use Power Query to clean, transform, and combine data from multiple sources.',
            resources: ['Power Query Guide.pdf', 'Sample Data Sources.xlsx'],
            objectives: ['Import data with Power Query', 'Apply basic transformations', 'Merge and append queries'],
            prerequisites: ['Advanced Pivot Table Techniques']
          }
        ]
      }
    ]
  },
  {
    id: 'sql-database',
    title: 'SQL & Database Management',
    description: 'Learn SQL from basics to advanced queries, database design, and optimization techniques.',
    totalDuration: 40,
    difficulty: 'beginner',
    prerequisites: ['Basic computer skills', 'Logical thinking'],
    learningOutcomes: [
      'Write complex SQL queries',
      'Design efficient database schemas',
      'Optimize query performance',
      'Work with different database systems',
      'Implement data security best practices'
    ],
    tools: ['MySQL', 'PostgreSQL', 'SQLite', 'pgAdmin', 'MySQL Workbench'],
    certificate: true,
    price: 24817,
    rating: 4.9,
    students: 520,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'sql-module-1',
        title: 'SQL Fundamentals',
        description: 'Learn the basics of SQL and database concepts',
        duration: 10,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'sql-lesson-1-1',
            title: 'Introduction to Databases and SQL',
            description: 'Understanding database concepts and SQL basics',
            duration: 60,
            type: 'video',
            content: 'Comprehensive introduction to databases, SQL, and relational database concepts.',
            resources: ['Database Fundamentals.pdf', 'SQL Syntax Reference.pdf'],
            objectives: ['Understand database concepts', 'Learn SQL syntax basics', 'Set up development environment'],
            prerequisites: []
          },
          {
            id: 'sql-lesson-1-2',
            title: 'SELECT Statements and Basic Queries',
            description: 'Master the SELECT statement and basic querying',
            duration: 90,
            type: 'interactive',
            content: 'Hands-on practice with SELECT statements, filtering, and sorting data.',
            resources: ['Sample Database.sql', 'Query Exercises.pdf'],
            objectives: ['Write SELECT statements', 'Filter data with WHERE', 'Sort results with ORDER BY'],
            prerequisites: ['Introduction to Databases and SQL']
          }
        ]
      }
    ]
  },
  {
    id: 'power-bi',
    title: 'Microsoft Power BI',
    description: 'Create stunning dashboards and reports with Power BI\'s advanced visualization capabilities.',
    totalDuration: 32,
    difficulty: 'intermediate',
    prerequisites: ['Basic Excel knowledge', 'Understanding of data analysis concepts'],
    learningOutcomes: [
      'Create interactive dashboards',
      'Transform data with Power Query',
      'Write DAX formulas',
      'Design effective visualizations',
      'Share and collaborate on reports'
    ],
    tools: ['Power BI Desktop', 'Power BI Service', 'Power Query', 'DAX'],
    certificate: true,
    price: 24817,
    rating: 4.8,
    students: 340,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'powerbi-module-1',
        title: 'Power BI Fundamentals',
        description: 'Get started with Power BI Desktop and basic concepts',
        duration: 8,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'powerbi-lesson-1-1',
            title: 'Introduction to Power BI',
            description: 'Overview of Power BI ecosystem and capabilities',
            duration: 60,
            type: 'video',
            content: 'Comprehensive introduction to Power BI Desktop, Service, and mobile apps.',
            resources: ['Power BI Overview.pdf', 'Installation Guide.pdf'],
            objectives: ['Understand Power BI ecosystem', 'Install Power BI Desktop', 'Navigate the interface'],
            prerequisites: []
          }
        ]
      }
    ]
  },
  {
    id: 'python-data-science',
    title: 'Python Programming for Data Science',
    description: 'Master Python programming with focus on pandas, numpy, matplotlib, and data manipulation.',
    totalDuration: 48,
    difficulty: 'beginner',
    prerequisites: ['Basic computer skills', 'High school mathematics'],
    learningOutcomes: [
      'Write Python code for data analysis',
      'Use pandas for data manipulation',
      'Create visualizations with matplotlib',
      'Perform statistical analysis',
      'Build data science workflows'
    ],
    tools: ['Python', 'Jupyter Notebooks', 'pandas', 'numpy', 'matplotlib', 'seaborn'],
    certificate: true,
    price: 24817,
    rating: 4.9,
    students: 680,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'python-module-1',
        title: 'Python Fundamentals for Data Science',
        description: 'Learn Python programming basics for data analysis',
        duration: 12,
        difficulty: 'beginner',
        lessons: [
          {
            id: 'python-lesson-1-1',
            title: 'Python Basics and Environment Setup',
            description: 'Set up Python environment and learn basic syntax',
            duration: 90,
            type: 'interactive',
            content: 'Install Python, Jupyter Notebooks, and essential data science libraries.',
            resources: ['Python Setup Guide.pdf', 'Jupyter Tutorial.ipynb'],
            objectives: ['Install Python and Jupyter', 'Write basic Python code', 'Use Jupyter Notebooks'],
            prerequisites: []
          }
        ]
      }
    ]
  },
  {
    id: 'statistics',
    title: 'Statistics for Data Analysis',
    description: 'Understand statistical concepts, hypothesis testing, and statistical modeling for data insights.',
    totalDuration: 32,
    difficulty: 'intermediate',
    prerequisites: ['Basic mathematics', 'Introduction to Data Analysis course recommended'],
    learningOutcomes: [
      'Apply statistical methods to data',
      'Conduct hypothesis tests',
      'Build statistical models',
      'Interpret statistical results',
      'Make data-driven decisions'
    ],
    tools: ['R', 'Python', 'Excel', 'SPSS', 'Jupyter Notebooks'],
    certificate: true,
    price: 24817,
    rating: 4.7,
    students: 290,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'stats-module-1',
        title: 'Statistical Foundations',
        description: 'Build strong foundation in statistical concepts',
        duration: 10,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'stats-lesson-1-1',
            title: 'Descriptive Statistics and Probability',
            description: 'Master descriptive statistics and probability concepts',
            duration: 90,
            type: 'interactive',
            content: 'Comprehensive coverage of descriptive statistics, probability distributions, and their applications.',
            resources: ['Statistics Fundamentals.pdf', 'Probability Examples.xlsx'],
            objectives: ['Calculate descriptive statistics', 'Understand probability distributions', 'Apply statistical concepts'],
            prerequisites: []
          }
        ]
      }
    ]
  },
  {
    id: 'machine-learning',
    title: 'Machine Learning Fundamentals',
    description: 'Dive into ML algorithms, model building, evaluation, and practical implementation.',
    totalDuration: 64,
    difficulty: 'advanced',
    prerequisites: ['Python Programming', 'Statistics for Data Analysis', 'Linear algebra basics'],
    learningOutcomes: [
      'Understand machine learning algorithms',
      'Build and evaluate ML models',
      'Handle overfitting and underfitting',
      'Deploy ML models',
      'Apply ML to real-world problems'
    ],
    tools: ['Python', 'scikit-learn', 'TensorFlow', 'Jupyter Notebooks', 'Google Colab'],
    certificate: true,
    price: 24817,
    rating: 4.9,
    students: 420,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'ml-module-1',
        title: 'Introduction to Machine Learning',
        description: 'Understand the fundamentals of machine learning',
        duration: 12,
        difficulty: 'advanced',
        lessons: [
          {
            id: 'ml-lesson-1-1',
            title: 'What is Machine Learning?',
            description: 'Introduction to machine learning concepts and applications',
            duration: 75,
            type: 'video',
            content: 'Comprehensive overview of machine learning types, applications, and the ML workflow.',
            resources: ['ML Fundamentals.pdf', 'ML Applications Examples.pdf'],
            objectives: ['Define machine learning', 'Identify ML types', 'Understand ML workflow'],
            prerequisites: []
          }
        ]
      }
    ]
  },
  {
    id: 'generative-ai-tools',
    title: 'Generative AI & Its Tools',
    description: 'Explore ChatGPT, Claude, and other AI tools for data analysis and business applications.',
    totalDuration: 24,
    difficulty: 'intermediate',
    prerequisites: ['Basic computer skills', 'Understanding of data analysis concepts'],
    learningOutcomes: [
      'Use ChatGPT for data analysis',
      'Leverage Claude for insights',
      'Integrate AI tools in workflows',
      'Evaluate AI outputs critically',
      'Apply AI to business problems'
    ],
    tools: ['ChatGPT', 'Claude', 'Bard', 'GitHub Copilot', 'Notion AI'],
    certificate: true,
    price: 24817,
    rating: 5.0,
    students: 380,
    lastUpdated: '2024-01-15',
    modules: [
      {
        id: 'ai-module-1',
        title: 'Introduction to Generative AI',
        description: 'Understand generative AI and its applications',
        duration: 6,
        difficulty: 'intermediate',
        lessons: [
          {
            id: 'ai-lesson-1-1',
            title: 'Understanding Generative AI',
            description: 'Learn about generative AI, its capabilities, and limitations',
            duration: 60,
            type: 'video',
            content: 'Comprehensive overview of generative AI, how it works, and its applications in business.',
            resources: ['Generative AI Guide.pdf', 'AI Tools Comparison.pdf'],
            objectives: ['Understand generative AI', 'Identify use cases', 'Recognize limitations'],
            prerequisites: []
          }
        ]
      }
    ]
  }
];

export const getCourseById = (id: string): Course | undefined => {
  return courseContent.find(course => course.id === id);
};

export const getModuleById = (courseId: string, moduleId: string): Module | undefined => {
  const course = getCourseById(courseId);
  return course?.modules.find(module => module.id === moduleId);
};

export const getLessonById = (courseId: string, moduleId: string, lessonId: string): Lesson | undefined => {
  const module = getModuleById(courseId, moduleId);
  return module?.lessons.find(lesson => lesson.id === lessonId);
};
