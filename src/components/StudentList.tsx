import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Award, Medal } from 'lucide-react';
import axiosInstance, { baseURL } from '../../utils/axiosInstance';

const StudentList = () => {
  const navigate = useNavigate();

  const [students, setStudents] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<any[]>([]);
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);

  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [selectedScholarship, setSelectedScholarship] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;

  const getRatingInfo = (rating: string) => {
    if (rating === 'Atlandyrylan') {
      return { text: rating, class: 'rating rating-excellent', icon: Trophy };
    }
    if (rating === 'Ýokarlandyrylan') {
      return { text: rating, class: 'rating rating-good', icon: Award };
    }
    if (rating === 'Adaty') {
      return { text: rating, class: 'rating rating-average', icon: 'x' };
    }
    return { text: 'Developing Student', class: 'rating rating-poor', icon: Medal };
  };

  const priorityOrder: any = {
    'Atlandyrylan': 0,
    'Ýokarlandyrylan': 1,
    'Adaty': 2,
  };

  // FILTERED & PAGINATED STUDENTS
  const sortedStudents = [...students].sort((a, b) => {
    const aText = getRatingInfo(a?.scholarship?.title).text;
    const bText = getRatingInfo(b?.scholarship?.title).text;
    return priorityOrder[aText] - priorityOrder[bText];
  });

  const filteredStudents = sortedStudents.filter((student) =>
    student.fullname.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedFaculty ? student.faculty?.slug === selectedFaculty : true) &&
    (selectedGroup ? student.group?.slug === selectedGroup : true) &&
    (selectedScholarship ? student.scholarship?.slug === selectedScholarship : true)
  );

  const indexOfLast = currentPage * studentsPerPage;
  const indexOfFirst = indexOfLast - studentsPerPage;
  const currentStudents = filteredStudents.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);

  // FETCH ALL DATA
  const fetchAllStudents = async () => {
    try {
      const res = await axiosInstance.get('/students-list/');
      setStudents(res.data.results || res.data); // depends on API structure
    } catch (err) {
      console.error('Yalnyslyk', err);
    }
  };

  const fetchFaculties = async () => {
    const res = await axiosInstance.get('/faculties/');
    setFaculties(res.data.results || res.data);
  };

  const fetchGroups = async () => {
    const res = await axiosInstance.get('/groups/');
    const title = faculties.find(f => f.slug === selectedFaculty)?.title;
    const filteredGroups = res.data.results.filter((group: any) => {
      return title === 'Maglumat howpsuzlygy' ? group.title[0] === '2' :
             title === 'Hukuk' ? group.title[0] === '1' : true;
    });
    setGroups(filteredGroups);
    setSelectedGroup('');
  };

  const fetchScholarships = async () => {
    const res = await axiosInstance.get('/scholarships/');
    setScholarships(res.data.results || res.data);
  };

  // INITIAL LOAD
  useEffect(() => {
    fetchAllStudents();
    fetchFaculties();
    fetchScholarships();
  }, []);

  useEffect(() => {
    if (selectedFaculty) fetchGroups();
  }, [selectedFaculty]);

  return (
    <div>
      <div className="page-header">
        <h1>Talyp Reýting Ulgamy</h1>
      </div>

      <div className="filters">
        <select className='filter-select' value={selectedFaculty} onChange={(e) => setSelectedFaculty(e.target.value)}>
          <option value="">Fakultetler</option>
          {faculties.map((f: any) => (
            <option key={f.id} value={f.slug}>{f.title}</option>
          ))}
        </select>

        <select className='filter-select' value={selectedGroup} onChange={(e) => setSelectedGroup(e.target.value)}>
          <option value="">Toparlar</option>
          {groups.map((g: any) => (
            <option key={g.id} value={g.slug}>{g.title}</option>
          ))}
        </select>

        <select className='filter-select' value={selectedScholarship} onChange={(e) => setSelectedScholarship(e.target.value)}>
          <option value="">Talyp haky</option>
          {scholarships.map((s: any) => (
            <option key={s.id} value={s.slug}>{s.title}</option>
          ))}
        </select>

        <input
         id="search-id"
          type="search"
          placeholder="Gözleg..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <button
              id="reset-btn"
              onClick={() => {
                setSelectedFaculty('');
                setSelectedGroup('');
                setSelectedScholarship('');
                setSearchTerm('');
              }}
            >
              Arassala
            </button>
      </div>

      <table>
        <thead>
          <tr>
            <th>T/b</th>
            <th>Ady we familiýasy</th>
            <th>Fakulteti</th>
            <th>Topary</th>
            <th>Talyp haky</th>
          </tr>
        </thead>
        <tbody>
          {currentStudents.map((student: any, index: number) => {
            const rating = getRatingInfo(student.scholarship?.title);
            const Icon = rating.icon;
            return (
              <tr key={student.id}>
                <td>{indexOfFirst + index + 1}</td>
                <td>
                  <div className="student-info-cell">
                    <img src={baseURL + student.profile_picture || '/default.png'} alt="" className="student-avatar" />
                    <a onClick={() => navigate(`/student/${student.slug}`)} className="student-name">
                      {student.fullname}
                    </a>
                  </div>
                </td>
                <td>{student.faculty?.title}</td>
                <td>{student.group?.title}</td>
                <td>
                  <span className={rating.class}>
                    {Icon !== 'x' && <Icon size={18} />} {rating.text}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button disabled={currentPage === 1}
              className="pagination-button" 
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              Ilkinji
            </button>
        <button className="pagination-button" onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          Öňki
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i + 1} onClick={() => setCurrentPage(i + 1)} className={`pagination-number ${currentPage === i + 1 ? 'active' : ''}`}>
            {i + 1}
          </button>
        ))}
        <button className="pagination-button" onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          Indiki
        </button>
        
      </div>
    </div>
  );
};

export default StudentList;
