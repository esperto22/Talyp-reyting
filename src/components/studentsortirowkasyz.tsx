// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Trophy, Award, Medal } from 'lucide-react';
// // import { mockStudents, mockFaculties, mockGroups } from '../data/mockData';
// import axiosInstance, { baseURL } from '../../utils/axiosInstance';


// const StudentList = () => {
//   const navigate = useNavigate();
//   const [students, setStudents] = useState<any>({});
//   const [faculties, setFaculties] = useState<any>({});
//   const [scholarships, setScholarShips] = useState<any>({})
//   const [groups, setGroups] = useState<any>({});
//   const [selectedFaculty, setSelectedFaculty] = useState("");
//   const [selectedGroup, setSelectedGroup] = useState('');
//   const [selectedScholarship, setSelectedScholarship] = useState('');


  

//   // const filteredStudents = mockStudents.filter(student => {
//   //   if (selectedFaculty && student.faculty !== selectedFaculty) return false;
//   //   if (selectedGroup && student.group !== selectedGroup) return false;
//   //   return true;
//   // });
//   console.log(selectedGroup)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         let url = '/students/';
//         const params = new URLSearchParams();

//         if (selectedFaculty) {
//           params.append('faculty', selectedFaculty);
//         }
//         if (selectedGroup) {
//           params.append('group', selectedGroup);
//         }
//         if (selectedScholarship) {
//           params.append('scholarships', selectedScholarship);
//         }

//         if (params.toString()) {
//           url += '?' + params.toString();
//         }
//         console.log(url)
//         const response = await axiosInstance.get(url);
//         setStudents(response.data);
//       } catch (error: any) {
//         console.log(error);
//       }
//     };

//     fetchData();
//   }, [selectedGroup, selectedFaculty, selectedScholarship]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/groups/');
//         let title = faculties?.results?.filter((x:any) => {return x.slug===selectedFaculty})?.[0]?.title
//         let grous  = {...response.data, results:response.data?.results?.filter((x:any)=>{
//           return title==="MHF" ? x.title[0]==="2" : title==="HF" ? x.title[0]==="1" : true
//         })}
        
//         setGroups(grous)
//         setSelectedGroup("")

//       } catch (error: any) {
//         console.log(error)
//       }
//     }
//     fetchData()
//   }, [selectedFaculty])

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/faculties/');
//         setFaculties(response.data);
//       } catch (error: any) {
//         console.log(error)
//       }
//     }
//     fetchData()
//   }, [])

//   // talyp haky ucin
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axiosInstance.get('/scholarships/');
//         setScholarShips(response.data);
//       } catch (error: any) {
//         console.log(error)
//       }
//     }
//     fetchData()
//   }, [])

//   // console.log(students);
//   // console.log(groups)
//   // console.log(faculties)
//   // console.log(selectedScholarship)

//   const getRatingInfo = (rating: String) => {
//     if (rating == 'Atlandyrylan') {
//       return {
//         text: rating,
//         class: 'rating rating-excellent',
//         icon: Trophy
//       };
//     }
//     if (rating == 'Yokarlandyrlan') {
//       return {
//         text: rating,
//         class: 'rating rating-good',
//         icon: Award
//       };
//     }
//     if (rating == 'Adaty') {
//       return {
//         text: rating,
//         class: 'rating rating-average',
//         icon: 'x'
//       };
//     }
//     return {
//       text: 'Developing Student',
//       class: 'rating rating-poor',
//       icon: Medal
//     };
//   };
//   // console.log(baseURL + students?.results?.[0]?.profile_picture);

//   console.log(selectedGroup)
//   return (
//     <div>
//       <div className="page-header">
//         <h1>Talyp Reýting Ulgamy</h1>

//       </div>

//       <div className="table-container">
//         <div className="filters">

        
       

//           {/* Fakultetler */}
//           <select
//             value={selectedFaculty}
//             onChange={(e) => setSelectedFaculty(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Fakultetler</option>

//             {faculties?.results?.map((faculty: any) => (
//               <option key={faculty.id} value={faculty.slug}>{faculty.title}</option>
//             ))}
            
//           </select>


//           {/* toparlary */}

//           <select
//             value={selectedGroup}
//             onChange={(e) => setSelectedGroup(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Ähli toparlar</option>
//             {groups?.results?.map((group: any) => (
              
//                   <option key={group.id} value={group.slug}>
//                     {group.title}
//                   </option>
//                 )
              
//             )}
//           </select>




//           {/* talyp haky boyunca filtr */}

//           <select
//             value={selectedScholarship}
//             onChange={(e) => setSelectedScholarship(e.target.value)}
//             className="filter-select"
//           >
//             <option value="">Talyp haky</option>
//             {scholarships?.results?.map((scholarship: any) => (
//               <option key={scholarship.id} value={scholarship.slug}>{scholarship.title}</option>
//             ))}
//           </select>
//         </div>

//         <table>
//           <thead>
//             <tr>
//               <th>T/b</th>
//               <th>Ady we familiýasy</th>
//               <th>Fakulteti</th>
//               <th>Topary</th>
//               <th id='talyphaky'>Talyp haky</th>
//             </tr>
//           </thead>
//           <tbody>
//             {students?.results?.map((student: any, index: any) => {
//               const ratingInfo = getRatingInfo(student?.scholarship?.title);
//               const RatingIcon = ratingInfo.icon;
              

//               return (
//                 <tr key={student?.id}>
//                   <td>{index + 1}</td>
//                   <td>
//                     <div className="student-info-cell">
//                       <img
//                         src={baseURL + student?.profile_picture || "/salam.png"}
//                         alt={student?.fullName}
//                         className="student-avatar"
//                       />
//                       <a
//                         className="student-name"
//                         onClick={() => navigate(/student/${student?.slug})}
//                       >
//                         {student?.fullname}
//                       </a>
//                     </div>
//                   </td>
//                   <td>{student?.faculty?.title}</td>
//                   <td>{student?.group?.title}</td>
//                   <td>
//                     <span className={ratingInfo.class}>
//                       <RatingIcon size={18} className="rating-icon" />
//                       {ratingInfo.text}
//                     </span>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StudentList; - iste benim tum kodum neresine koymam gerek