import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { scheduleService } from '../services/scheduleService';
import './ScheduleBuilder.css';

const ScheduleBuilder = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [schedule, setSchedule] = useState({});
  const [selectedClass, setSelectedClass] = useState('');
  const [semestre, setSemestre] = useState(1);
  const [draggedItem, setDraggedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Créneaux horaires standards
  const timeSlots = [
    '08:00-09:30',
    '09:45-11:15', 
    '11:30-13:00',
    '14:00-15:30',
    '15:45-17:15'
  ];

  // Jours de la semaine
  const weekDays = [
    'Lundi',
    'Mardi', 
    'Mercredi',
    'Jeudi',
    'Vendredi'
  ];

  useEffect(() => {
    loadData();
    
    // Check if we're in edit mode with params
    const classIdParam = searchParams.get('classId');
    const semestreParam = searchParams.get('semestre');
    const modeParam = searchParams.get('mode');
    
    if (classIdParam) {
      setSelectedClass(classIdParam);
    }
    if (semestreParam) {
      setSemestre(parseInt(semestreParam));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Charger les données depuis la base de données via admin-service
      const [classesData, teachersData, subjectsData, roomsData] = await Promise.all([
        scheduleService.getClasses(),
        scheduleService.getTeachers(), 
        scheduleService.getSubjects(),
        scheduleService.getRooms()
      ]);

      setClasses(classesData);
      setTeachers(teachersData);
      setSubjects(subjectsData);
      setRooms(roomsData);
      
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des données:', err);
      setError('Erreur lors du chargement des données: ' + (err.message || 'Service indisponible'));
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedClass && teachers.length > 0 && subjects.length > 0 && rooms.length > 0) {
      loadExistingSchedule();
    } else if (!selectedClass) {
      initializeSchedule();
    }
    // If selectedClass is set but data not loaded, wait for data to load
  }, [selectedClass, semestre, teachers, subjects, rooms]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadExistingSchedule = async () => {
    if (!selectedClass) return;
    
    // Make sure we have the required data loaded
    if (teachers.length === 0 || subjects.length === 0 || rooms.length === 0) {
      console.log('Waiting for data to load...');
      return;
    }
    
    try {
      setLoading(true);
      const data = await scheduleService.getScheduleByClass(parseInt(selectedClass), semestre);
      
      console.log('Loaded schedule data:', data);
      
      const newSchedule = {};
      weekDays.forEach(day => {
        newSchedule[day] = {};
        timeSlots.forEach(slot => {
          newSchedule[day][slot] = null;
        });
      });
      
      if (data && Object.keys(data).length > 0) {
        Object.entries(data).forEach(([jour, courses]) => {
          courses.forEach(course => {
            const timeSlot = `${course.heureDebut}-${course.heureFin}`;
            if (newSchedule[jour] && timeSlots.includes(timeSlot)) {
              // Find matching items from loaded data
              const subject = subjects.find(s => s.nom === course.matiere || s.id === course.matiereId);
              const teacherName = course.enseignant.split(' ');
              const teacher = teachers.find(t => 
                `${t.nom} ${t.prenom}` === course.enseignant || 
                t.id === course.enseignantId
              );
              const room = rooms.find(r => r.nom === course.salle || r.id === course.salleId);
              
              console.log(`Matching for ${jour} ${timeSlot}:`, { subject, teacher, room, course });
              
              if (subject && teacher && room) {
                newSchedule[jour][timeSlot] = {
                  id: course.id,
                  subject,
                  teacher,
                  room,
                  day: jour,
                  timeSlot,
                  class: selectedClass
                };
              }
            }
          });
        });
      }
      
      console.log('Final schedule:', newSchedule);
      setSchedule(newSchedule);
      setLoading(false);
    } catch (err) {
      console.error('Erreur chargement emploi existant:', err);
      initializeSchedule();
      setLoading(false);
    }
  };

  const initializeSchedule = () => {
    const newSchedule = {};
    weekDays.forEach(day => {
      newSchedule[day] = {};
      timeSlots.forEach(slot => {
        newSchedule[day][slot] = null;
      });
    });
    setSchedule(newSchedule);
  };

  const handleDragStart = (e, item, type) => {
    setDraggedItem({ ...item, type });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, day, timeSlot) => {
    e.preventDefault();
    
    if (!draggedItem) return;
    
    // Créer un nouveau cours
    const newCourse = {
      id: Date.now(), // ID temporaire
      subject: draggedItem,
      day,
      timeSlot,
      teacher: null,
      room: null,
      class: selectedClass,
      isNew: true
    };

    // Vérifier les conflits
    if (schedule[day][timeSlot]) {
      if (!window.confirm('Un cours existe déjà à ce créneau. Remplacer ?')) {
        return;
      }
    }

    // Mettre à jour l'emploi du temps
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: newCourse
      }
    }));

    setDraggedItem(null);
  };

  const assignTeacher = (day, timeSlot, teacherId) => {
    const teacher = teachers.find(t => t.id === parseInt(teacherId));
    if (!teacher) return;

    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...prev[day][timeSlot],
          teacher
        }
      }
    }));
  };

  const assignRoom = (day, timeSlot, roomId) => {
    const room = rooms.find(r => r.id === parseInt(roomId));
    if (!room) return;

    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: {
          ...prev[day][timeSlot],
          room
        }
      }
    }));
  };

  const removeCourse = (day, timeSlot) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [timeSlot]: null
      }
    }));
  };

  const saveSchedule = async () => {
    if (!selectedClass) {
      alert('Veuillez sélectionner une classe');
      return;
    }

    try {
      // Valider l'emploi du temps
      const coursesToCreate = [];
      const coursesToUpdate = [];
      const dayToDate = {
        'Lundi': 1,
        'Mardi': 2,
        'Mercredi': 3,
        'Jeudi': 4,
        'Vendredi': 5
      };

      Object.entries(schedule).forEach(([day, slots]) => {
        Object.entries(slots).forEach(([timeSlot, course]) => {
          if (course && course.teacher && course.room && course.isNew) {
            const [heureDebut, heureFin] = timeSlot.split('-');
            
            // Créer une date pour le jour de la semaine
            const today = new Date();
            const currentDay = today.getDay(); // 0 = dimanche, 1 = lundi, etc.
            const targetDay = dayToDate[day];
            let diff = targetDay - currentDay;
            if (diff < 0) diff += 7;
            const targetDate = new Date(today);
            targetDate.setDate(today.getDate() + diff);
            
            const courseData = {
              subjectId: course.subject.id,
              teacherId: course.teacher.id,
              roomId: course.room.id,
              date: targetDate.toISOString().split('T')[0],
              heureDebut: heureDebut.trim(),
              heureFin: heureFin.trim()
            };
            
            // Check if this is an existing course (has id) or a new one
            if (course.id) {
              coursesToUpdate.push({
                id: course.id,
                ...courseData
              });
            } else {
              coursesToCreate.push(courseData);
            }
          }
        });
      });

      if (coursesToCreate.length === 0 && coursesToUpdate.length === 0) {
        alert('Aucun cours complet défini dans l\'emploi du temps.\nAssurez-vous d\'assigner un enseignant ET une salle à chaque cours.');
        return;
      }

      // Update existing courses
      for (const course of coursesToUpdate) {
        try {
          await scheduleService.updateEmploi(course.id, {
            matiereId: course.subjectId,
            enseignantId: course.teacherId,
            salleId: course.roomId,
            date: course.date,
            heureDebut: course.heureDebut,
            heureFin: course.heureFin,
            semestre
          });
        } catch (err) {
          console.error('Erreur lors de la mise à jour du cours:', err);
          throw err;
        }
      }

      // Create new courses
      if (coursesToCreate.length > 0) {
        const scheduleData = {
          classId: parseInt(selectedClass),
          courses: coursesToCreate,
          semestre
        };
        
        await scheduleService.saveSchedule(scheduleData);
      }
      
      alert(`Emploi du temps sauvegardé avec succès !\n${coursesToUpdate.length} cours mis à jour, ${coursesToCreate.length} cours créés.`);
      
      // Rediriger vers le visualiseur d'emploi du temps pour la classe créée
      navigate(`/schedule-viewer?classId=${selectedClass}&semestre=${semestre}`);
      
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err);
      
      // Afficher le message d'erreur spécifique du backend
      const errorMessage = err.response?.data?.message || err.message || 'Erreur inconnue';
      alert('Erreur lors de la sauvegarde: ' + errorMessage);
    }
  };

  const getCourseStyle = (course) => {
    if (!course) return {};
    
    return {
      backgroundColor: course.subject.couleur || '#ccc',
      color: 'white',
      padding: '5px',
      borderRadius: '4px',
      fontSize: '0.8rem',
      height: '100%',
      position: 'relative'
    };
  };

  if (loading) {
    return (
      <div className="schedule-builder-loading">
        <div className="loading-spinner"></div>
        <p>Chargement des données...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="schedule-builder-error">
        <h2>❌ Erreur</h2>
        <p>{error}</p>
        <button onClick={() => navigate('/director-dashboard')}>
          Retour au dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="schedule-builder">
      <header className="schedule-header">
        <div className="header-left">
          <button 
            className="back-btn"
            onClick={() => navigate('/director-dashboard')}
          >
            ← Retour
          </button>
          <div>
            <h1>📋 Créateur d'Emploi du Temps</h1>
            <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.8 }}>
              Connecté en tant que: {user?.prenom} {user?.nom} ({user?.role})
            </p>
          </div>
        </div>
        <div className="header-right">
          <select
            value={semestre}
            onChange={(e) => setSemestre(parseInt(e.target.value))}
            className="semestre-selector"
          >
            <option value={1}>Semestre 1</option>
            <option value={2}>Semestre 2</option>
          </select>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="class-selector"
          >
            <option value="">Sélectionner une classe</option>
            {classes.map(classe => (
              <option key={classe.id} value={classe.id}>
                {classe.nom}
              </option>
            ))}
          </select>
          <button 
            className="save-btn"
            onClick={saveSchedule}
            disabled={!selectedClass}
          >
            💾 Sauvegarder
          </button>
        </div>
      </header>

      <div className="schedule-content">
        <div className="subjects-panel">
          <h3>📚 Matières disponibles</h3>
          <div className="subjects-list">
            {subjects.map(subject => (
              <div
                key={subject.id}
                className="subject-card"
                draggable
                onDragStart={(e) => handleDragStart(e, subject, 'subject')}
                style={{ borderLeft: `4px solid ${subject.couleur || '#ccc'}` }}
              >
                <span className="subject-name">{subject.nom}</span>
                {subject.code && <span className="subject-code">{subject.code}</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="schedule-grid">
          <div className="grid-header">
            <div className="time-header">Créneaux</div>
            {weekDays.map(day => (
              <div key={day} className="day-header">{day}</div>
            ))}
          </div>
          
          {timeSlots.map(timeSlot => (
            <div key={timeSlot} className="grid-row">
              <div className="time-slot">{timeSlot}</div>
              {weekDays.map(day => (
                <div
                  key={`${day}-${timeSlot}`}
                  className="schedule-cell"
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, day, timeSlot)}
                >
                  {schedule[day]?.[timeSlot] ? (
                    <div 
                      className="course-card"
                      style={getCourseStyle(schedule[day][timeSlot])}
                    >
                      <div className="course-header">
                        <span className="course-name">
                          {schedule[day][timeSlot].subject.nom}
                        </span>
                        <button
                          className="remove-btn"
                          onClick={() => removeCourse(day, timeSlot)}
                        >
                          ×
                        </button>
                      </div>
                      
                      <div className="course-details">
                        <select
                          value={schedule[day][timeSlot].teacher?.id || ''}
                          onChange={(e) => assignTeacher(day, timeSlot, e.target.value)}
                          className="teacher-select"
                        >
                          <option value="">👨‍🏫 Enseignant</option>
                          {teachers.map(teacher => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.prenom} {teacher.nom}
                            </option>
                          ))}
                        </select>

                        <select
                          value={schedule[day][timeSlot].room?.id || ''}
                          onChange={(e) => assignRoom(day, timeSlot, e.target.value)}
                          className="room-select"
                        >
                          <option value="">🏢 Salle</option>
                          {rooms.map(room => (
                            <option key={room.id} value={room.id}>
                              {room.nom} ({room.type})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  ) : (
                    <div className="empty-cell">
                      Glisser une matière ici
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScheduleBuilder;