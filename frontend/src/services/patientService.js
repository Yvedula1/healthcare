import api from './api'

// Patient CRUD + dashboard summary calls against the CareTrack backend.

export const getPatients = () => api.get('/api/patients').then((res) => res.data)

export const getPatient = (id) => api.get(`/api/patients/${id}`).then((res) => res.data)

export const createPatient = (payload) =>
  api.post('/api/patients', payload).then((res) => res.data)

export const updatePatient = (id, payload) =>
  api.put(`/api/patients/${id}`, payload).then((res) => res.data)

export const deletePatient = (id) => api.delete(`/api/patients/${id}`)

export const getDashboardSummary = () =>
  api.get('/api/dashboard').then((res) => res.data)
