import {courseAPIs} from './API';
import {ACTION_TYPES} from "./actionTypes";


export const fetchAllApi = () => dispatch => {
    courseAPIs().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_COURSE,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const fetchAllByDeptNameApi = (deptName) => dispatch => {
    courseAPIs().fetchAllByDeptName(deptName)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_COURSE,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const createApi = (data, onSuccess) => dispatch => {
    courseAPIs().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE_COURSE,
                payload: response.data
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const updateApi = (id, data, onSuccess) => dispatch => {
    courseAPIs().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_COURSE,
                payload: {id,...data}
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const deleteApi = (id, onSuccess) => dispatch => {
    courseAPIs().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_COURSE,
                payload: id
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const getByIdApi = (id) => dispatch => {
    courseAPIs().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GET_COURSE,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}