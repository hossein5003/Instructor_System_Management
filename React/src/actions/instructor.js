import {instructorAPIs} from './API';
import {ACTION_TYPES} from "./actionTypes";


export const fetchAllApi = () => dispatch => {
    instructorAPIs().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_INSTRUCTOR,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const fetchAllByDeptNameApi = (name) => dispatch => {
    instructorAPIs().fetchAllByDeptName(name)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_INSTRUCTOR,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const createApi = (data, onSuccess) => dispatch => {
    instructorAPIs().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE_INSTRUCTOR,
                payload: response.data
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const updateApi = (id, data, onSuccess) => dispatch => {
    instructorAPIs().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_INSTRUCTOR,
                payload: {id,...data}
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const deleteApi = (id, onSuccess) => dispatch => {
    instructorAPIs().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_INSTRUCTOR,
                payload: id
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const getByIdApi = (id) => dispatch => {
    instructorAPIs().fetchById(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.GET_INSTRUCTOR,
                payload: response.data
            })
        })
        .catch(error => console.log(error))
}