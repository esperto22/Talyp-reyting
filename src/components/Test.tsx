import { useState, useEffect } from 'react';

const MyComponent = () => {
  const [faculties, setFaculties] = useState<string[]>([]);

  useEffect(() => {
    fetch('http://192.168.55.110/api/faculties/')
      .then(response => response.json())
      .then(data => {
        const facultyTitles = data.results.map((faculty: { title: string }) => faculty.title);
        setFaculties(facultyTitles);
      })
      .catch(error => console.error('Ошибка при загрузке данных:', error));
  }, []);

  return (
    <div>
      <h1>Список факультетов</h1>
      <ul>
        {faculties.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default MyComponent;