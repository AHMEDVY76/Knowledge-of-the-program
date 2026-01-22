'use client'

import { useState } from 'react'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('login')
  const [studentId, setStudentId] = useState('')
  const [password, setPassword] = useState('')
  const [grade, setGrade] = useState('')
  const [error, setError] = useState('')

  const ADMIN_ID = '123456789'
  const ADMIN_PASS = 'Admin123!'
  const STORAGE_KEY = 'studentGradesData'

  const [students, setStudents] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedStudents = localStorage.getItem(STORAGE_KEY)
      return savedStudents ? JSON.parse(savedStudents) : []
    }
    return []
  })

  const saveStudentData = (id, pass, grade) => {
    // التحقق إذا كان الطالب موجود بالفعل
    const existingStudent = students.find(s => s.id === id)
    if (existingStudent) {
      // تحديث بيانات الطالب الموجود
      const updatedStudents = students.map(s => 
        s.id === id ? { id, password: pass, grade } : s
      )
      setStudents(updatedStudents)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents))
    } else {
      // إضافة طالب جديد
      const newStudents = [...students, { id, password: pass, grade }]
      setStudents(newStudents)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newStudents))
    }
  }

  const deleteStudent = (studentId) => {
    const updatedStudents = students.filter(s => s.id !== studentId)
    setStudents(updatedStudents)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedStudents))
  }

  const handleLogin = (e) => {
    e.preventDefault()
    setError('')

    if (studentId === ADMIN_ID && password === ADMIN_PASS) {
      setCurrentPage('admin')
      return
    }

    const isIdValid = /^\d{9}$/.test(studentId)
    const isPassValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/.test(password)

    if (!isIdValid) {
      setError('خطأ: رقم الهوية يجب أن يتكون من 9 أرقام بالضبط.')
      return
    }

    if (!isPassValid) {
      setError('خطأ: كلمة المرور يجب أن تحتوي على 8 أحرف على الأقل، وتشمل رقم، حرف كبير، حرف صغير، ورمز خاص.')
      return
    }

    // التحقق إذا كان الطالب موجود بالفعل
    const existingStudent = students.find(s => s.id === studentId)
    
    if (existingStudent) {
      // إذا كان الطالب موجود، استخدم درجته المسجلة
      setGrade(existingStudent.grade)
      // تحديث كلمة المرور فقط إذا كانت مختلفة
      if (existingStudent.password !== password) {
        saveStudentData(studentId, password, existingStudent.grade)
      }
    } else {
      // إذا كان طالب جديد، أعطه درجة عشوائية
      const randomGrade = Math.floor(Math.random() * 6) + 15
      saveStudentData(studentId, password, randomGrade)
      setGrade(randomGrade)
    }
    
    setCurrentPage('grade')
  }

  const handleLogout = () => {
    setCurrentPage('login')
    setStudentId('')
    setPassword('')
    setGrade('')
    setError('')
  }

  return (
    <div style={{
      fontFamily: 'Cairo, sans-serif',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      
      {/* صفحة تسجيل الدخول */}
      {currentPage === 'login' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '450px',
          textAlign: 'center'
        }}>
          <h1 style={{
            color: '#333',
            marginBottom: '10px',
            fontSize: '2em'
          }}>بوابة الطالب</h1>
          
          <h2 style={{
            color: '#005a9c',
            marginBottom: '25px',
            fontSize: '1.2em',
            fontWeight: '700'
          }}>وزارة التربية والتعليم</h2>
          
          <form onSubmit={handleLogin}>
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>رقم الهوية (9 أرقام)</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="مثال: 123456789"
                maxLength={9}
                required
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>
            
            <div style={{ marginBottom: '20px', textAlign: 'right' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#666',
                fontWeight: 'bold'
              }}>كلمة المرور</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="مثال: nnbXGU3?"
                required
                style={{
                  width: '100%',
                  padding: '15px',
                  border: '2px solid #ddd',
                  borderRadius: '10px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s'
                }}
              />
            </div>
            
            {error && (
              <div style={{
                color: '#e74c3c',
                marginBottom: '15px',
                fontSize: '14px',
                textAlign: 'center'
              }}>{error}</div>
            )}
            
            <button
              type="submit"
              style={{
                width: '100%',
                padding: '15px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '10px',
                fontSize: '18px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s, box-shadow 0.2s',
                marginTop: '10px'
              }}
            >
              تسجيل الدخول
            </button>
          </form>
        </div>
      )}

      {/* صفحة عرض درجة الطالب */}
      {currentPage === 'grade' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '450px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#005a9c',
            marginBottom: '25px',
            fontSize: '1.2em',
            fontWeight: '700'
          }}>أهلاً بك!</h2>
          
          <p>درجتك النهائية هي:</p>
          
          <div style={{
            fontSize: '3em',
            fontWeight: 'bold',
            color: '#764ba2',
            margin: '20px 0'
          }}>{grade}</div>
          
          <p>تم حفظ بياناتك بنجاح.</p>
          
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              marginTop: '10px'
            }}
          >
            تسجيل خروج
          </button>
        </div>
      )}

      {/* صفحة المدير */}
      {currentPage === 'admin' && (
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '40px',
          borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '900px',
          textAlign: 'center'
        }}>
          <h2 style={{
            color: '#005a9c',
            marginBottom: '25px',
            fontSize: '1.2em',
            fontWeight: '700'
          }}>لوحة التحكم - بيانات الطلاب</h2>
          
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            marginTop: '20px'
          }}>
            <thead>
              <tr>
                <th style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#667eea',
                  color: 'white'
                }}>رقم الهوية</th>
                <th style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#667eea',
                  color: 'white'
                }}>كلمة المرور</th>
                <th style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#667eea',
                  color: 'white'
                }}>الدرجة</th>
                <th style={{
                  border: '1px solid #ddd',
                  padding: '12px',
                  textAlign: 'center',
                  backgroundColor: '#667eea',
                  color: 'white'
                }}>إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{
                    border: '1px solid #ddd',
                    padding: '12px',
                    textAlign: 'center',
                    color: '#888',
                    fontStyle: 'italic'
                  }}>لا توجد بيانات طلاب بعد.</td>
                </tr>
              ) : (
                students.map((student, index) => (
                  <tr key={`${student.id}-${index}`}>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center'
                    }}>{student.id}</td>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center'
                    }}>{student.password}</td>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center'
                    }}>{student.grade}</td>
                    <td style={{
                      border: '1px solid #ddd',
                      padding: '12px',
                      textAlign: 'center'
                    }}>
                      <button
                        onClick={() => {
                          if (confirm(`هل أنت متأكد من حذف بيانات الطالب صاحب الرقم: ${student.id}؟`)) {
                            deleteStudent(student.id)
                          }
                        }}
                        style={{
                          backgroundColor: '#e74c3c',
                          color: 'white',
                          border: 'none',
                          padding: '8px 12px',
                          borderRadius: '5px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          fontWeight: 'bold'
                        }}
                      >
                        حذف
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          
          <button
            onClick={handleLogout}
            style={{
              width: '100%',
              padding: '15px',
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              marginTop: '20px'
            }}
          >
            تسجيل خروج
          </button>
        </div>
      )}
    </div>
  )
}