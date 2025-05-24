import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Trophy, Award, Medal, BookOpen, Star } from 'lucide-react';
// import { mockStudents, mockGrades } from '../data/mockData';
import axiosInstance, { baseURL } from '../../utils/axiosInstance';

const StudentDetails = () => {
  const { slug } = useParams();
  const [student, useStudent] = useState<any>({})
  const [semesters, setSemesters] = useState<any>({})
  const [marks, useMarks] = useState<any>({})
  const [selectedSemester, setSelectedSemester] = useState(1);
  // const id ="1"

  // const student = mockStudents.find(s => s.id === id);
  // const grades = mockGrades[id as string]?.[selectedSemester] || [];


  const getRatingInfo = (rating: String) => {
    if (rating == 'Atlandyrylan') return { text: rating, icon: Trophy };
    if (rating == 'Ýokarlandyrylan') return { text: rating, icon: Award };
    if (rating == 'Adaty') return { text: rating, icon: "null" };
    return { text: 'Developing Student', icon: Medal };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/students/${slug}/`);
        useStudent(response.data);
      } catch (error: any) {
        console.log(error)
      }
    }
    if (slug) fetchData()
  }, [slug])

  if (!student) {
    return <div>Student not found</div>;
  }


  // Bahalary we sapaklary almak
  useEffect(() => {
    const fetchSemesters = async () => {
      try {
        const response = await axiosInstance.get(`/semesters/`);
        setSemesters(response.data)
      }
      catch (error: any) {
        console.log(error);

      }
    }
    fetchSemesters();
  }, [])

  useEffect(() => {
    const fetchmarks = async () => {
      try {
        const response = await axiosInstance.get(`/marks/?student=${slug}&semester=${selectedSemester}`);
        useMarks(response.data)
      }
      catch (error: any) {
        console.log(error);

      }
    }
    if (slug && selectedSemester) fetchmarks();
  }, [slug, selectedSemester])



  const ratingInfo = getRatingInfo(student?.scholarship?.title);
  const RatingIcon = ratingInfo.icon;
  // console.log(ratingInfo.text);
  // console.log(student.group.title);
  
  return (
    <div>
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        Yza dolanmak
      </Link>

      <div className="student-details">
        <div className="student-header">
          <img
            src={baseURL + student?.profile_picture || "/ss.png"}
            alt={student?.fullname}
            className="student-image"
          />
          <div className="student-info">
            <h2>{student?.fullname}</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Fakulteti</span>
                <span>{student?.faculty?.title}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Topary</span>
                <span>{student?.group?.title}</span>
              </div>
              {/* <div className="info-item">
                <span className="info-label">Talyp ID</span>
                <span>{student.studentId}</span>
              </div> */}
              <div className="info-item">
                <span className="info-label">Talyp haky</span>
                <span className="student-rating">
                  <RatingIcon size={16} />
                  {ratingInfo.text}
             
                  
                </span>
              </div>
            </div>


            {/* <div className="achievements-section">
              <h3>
                <Star size={16} />
                Üstünlikleri
              </h3>
              <ul className="achievements-list">
                {student.achievements.map((achievement, index) => (
                  <li key={index}>{achievement}</li>
                ))}
              </ul>
            </div> */}
          </div>
        </div>

        {/* semestrler */}

        <div className="grades-section">
          <h3>Bahalary</h3>

          <div
  className={`semester-tabs columns-${
    Math.ceil((student?.group?.title?.charAt(1) || 1) * 2 / 2)
  }`}
>
  
  {(() => {

    
    const groupTitle = student?.group?.title || "111";
    const courseYear = parseInt(groupTitle.charAt(1)) || 1;
    const maxSemesters = courseYear * 2;

    const sortedSemesters = [...(semesters?.results || [])].sort((a, b) => {
      const getNum = (s: string) => parseInt(s.split('-')[0]);
      return getNum(a.title) - getNum(b.title);
    });

    return sortedSemesters
      .slice(0, maxSemesters)
      .map((semester: any) => (
        <button
          key={semester.id}
          className={`semester-tab ${selectedSemester === semester.slug ? 'active' : ''}`}
          onClick={() => setSelectedSemester(semester.slug)}
        >
          {semester.title}
        </button>
      ));
  })()}
</div>

{/* sapaklar we bahalar */}

          <table className="grades-table">
            <thead>
              <tr>
                <th>Sapagyň ady</th>
                <th>Görnüşi</th>
                <th>Bahasy</th>
              </tr>
            </thead>
            <tbody>
              {marks?.results?.map((mark: any, index: any) => (
                <tr key={index}>
                  <td>{mark.lesson}</td>
                  <td>
                    {mark.mark_type}
                  </td>
                  <td>{mark.mark}</td>
                </tr>
              ))}
              
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;