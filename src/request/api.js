import { get, axiosDelete, post, put } from './http'

export const catalogAdd = (params) => post('/catalog/add', params)

export const catalogDelete = (params) => axiosDelete('/catalog/delete?id=' + params)

export const catalogList = () => get('/catalog/list')

export const catalogUpdate = (params) => put('/catalog/update', params)

export const screenAdd = (params) => post('/screen/add', params)

export const screenDelete = (params) => axiosDelete('/screen/delete/' + String(params))

export const screenList = () => get('/screen/list')

export const screenSearch = (params) => get('/screen/listByName?name=' + String(params))

export const screenUpdate = (params) => put('/screen/update', params)

export const shareList = () => get('/share/list?page=2')

export const shareDelete = (params) => axiosDelete('/share/delete?id=' + params)

export const screenShare = (url, name) => post('/share/add?url=' + url + '&&name=' + name)
