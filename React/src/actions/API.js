import axios from "axios";

export const courseAPIs = (url = "https://localhost:7220/api/course/") => {
    return {
        fetchAll: () => axios.get(url),
        fetchAllByDeptName:name =>axios.get(url+"by_name/"+name),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id,updatedRecord),
        delete: id=>axios.delete(url+id)
    }
}

export const departmentAPIs = (url = "https://localhost:7220/api/department/") => {
    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id,updatedRecord),
        delete: id=>axios.delete(url+id)
    }
}

export const instructorAPIs = (url = "https://localhost:7220/api/instructor/") => {
    return {
        fetchAll: () => axios.get(url),
        fetchAllByDeptName:name =>axios.get(url+"by_name/"+name),
        fetchById: id => axios.get(url + id),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(url + id,updatedRecord),
        delete: id=>axios.delete(url+id)
    }
}