import React, { useState, useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LabelList
} from 'recharts';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';

const MedalChart = () => {
  const [students, setStudents] = useState<any[]>([]);
  const [faculties, setFaculties] = useState<string[]>([]);


  const fetchStudents = async () => {
    try {
      const response = await axiosInstance.get('/students-list/');
      const studentList = response.data.results;
      setStudents(studentList);

      
      const uniqueFaculties = Array.from(
        new Set(studentList.map((s: any) => s.faculty?.title).filter(Boolean))
      );
      setFaculties(uniqueFaculties);
    } catch (error) {
      console.error('Error, no data', error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const computeChartData = (facultyName: string) => {
    const stats = { gold: 0, silver: 0, bronze: 0 };

    students
      .filter(student => student?.faculty?.title === facultyName)
      .forEach(student => {
        const scholarshipTitle = student?.scholarship?.title;
        if (scholarshipTitle === 'Atlandyrylan') stats.gold += 1;
        else if (scholarshipTitle === 'Ýokarlandyrylan') stats.silver += 1;
        else if (scholarshipTitle === 'Adaty') stats.bronze += 1;
      });

    return [
      {
        name: facultyName,
        ...stats
      }
    ];
  };

  return (
    <div className='statistics-main'>
      <div className='main'>
        <h1>Fakultetler boýunça netijeler</h1>
        <div className='container-statistics'>
          {faculties.map((faculty, index) => {
            const data = computeChartData(faculty);
            return (
              <div className="chart-container" key={index}>
                <h2 className="chart-title">{faculty}</h2>
                <BarChart
                  width={650}
                  height={500}
                  data={data}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="1 1" />
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="gold" fill="#16f771" name="Atlandyrylan" barSize={80}>
                    <LabelList dataKey="gold" position="top" />
                  </Bar>
                  <Bar dataKey="silver" fill="#76b0f3" name="Ýokarlandyrylan" barSize={80}>
                    <LabelList dataKey="silver" position="top" />
                  </Bar>
                  <Bar dataKey="bronze" fill="#f7f260" name="Adaty" barSize={80}>
                    <LabelList dataKey="bronze" position="top" />
                  </Bar>
                </BarChart>
              </div>
            );
          })}
        </div>
      </div>
      <Link to="/" id='back-list'>
        <ArrowLeft size={30} />
        Esasy sahypa
      </Link>
    </div>
  );
};

export default MedalChart;
