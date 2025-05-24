export const mockStudents = [
  {
    id: '1',
    fullName: 'Amanow Aman',
    faculty: 'Maglumat howpsuzlygy',
    group: '211',
    rating: 'Atlandyrylan',
    // studentId: 'CS2023001',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
    achievements: ['Dean\'s List', 'Programming Contest Winner'],
    specialization: 'Artificial Intelligence'
  },
  {
    id: '2',
    fullName: 'Myradow Myrat',
    faculty: 'Hukuk',
    group: '111',
    rating: 'Atlandyrylan',
    studentId: 'ENG2023002',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400&h=400',
  
  },
  {
    id: '3',
    fullName: 'Durdyyew Durdy',
    faculty: 'Maglumat howpsuzlygy',
    group: '221',
    rating: 'Yokarlandyrlan',
    studentId: 'CS2023003',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
  
  },
  {
    id: '4',
    fullName: 'Atayew Gurban',
    faculty: 'Maglumat howpsuzlygy',
    group: '212',
    rating: 'Yokarlandyrlan',
    studentId: 'BUS2023004',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400&h=400',
   
  },
  {
    id: '5',
    fullName: 'Gurbanow Gurban',
    faculty: 'Hukuk',
    group: '112',
    rating: 'Yokarlandyrlan',
    studentId: 'ENG2023005',
    image: 'https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400&h=400',
   
  },

  {
    id: '6',
    fullName: 'Merdanow Merdan',
    faculty: 'Hukuk',
    group: '112',
    rating: 'Adaty',
    studentId: 'CS2023003',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400&h=400',
  
  },
];

export const mockFaculties = [
  'Maglumat howpsuzlygy',
  'Hukuk'
];

export const mockGroups = [
 '111',
 '112',

 '211',
 '212',

 '121',
 '122',

 '221',
 '222',

 '131',
 '132',

 '231',
 '232',

 '141',
 '142',

 '241',
 '242',
];

export const mockGrades: Record<string, Record<number, Array<{ subject: string; grade: number; }>>> = {
  '1': {
    1: [
      { subject: 'Programmirleme', grade: 5 },
      { subject: 'Matematika', grade: 5 },
      { subject: 'Fizika', grade: 5 },
      { subject: 'Iňlis dili', grade: 5 }
    ],
    2: [
      { subject: 'Programmirleme', grade: 5 },
      { subject: 'Matematika', grade: 5 },
      { subject: 'Fizika', grade: 5 },
      { subject: 'Iňlis dili', grade: 5 }
    ]
  },
  '2': {
    1: [
      { subject: 'Programmirleme', grade: 5 },
      { subject: 'Matematika', grade: 5 },
      { subject: 'Fizika', grade: 4 },
      { subject: 'Rus dili', grade: 5 }
    ]
  }
};

export const mockAdmins = [
  {
    username: 'admin',
    password: 'admin123', // In a real app, this would be hashed
    role: 'admin'
  }
];