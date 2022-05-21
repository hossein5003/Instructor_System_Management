import {departmentAPIs} from './API';
import {ACTION_TYPES} from "./actionTypes";


export const fetchAllApi = () => dispatch => {
    departmentAPIs().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL_DEPARTMENT,
                payload: response.data
            });
        })
        .catch(error => console.log(error))
}

export const createApi = (data, onSuccess) => dispatch => {
    departmentAPIs().create(data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.CREATE_DEPARTMENT,
                payload: response.data
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const updateApi = (id, data, onSuccess) => dispatch => {
    departmentAPIs().update(id, data)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.UPDATE_DEPARTMENT,
                payload: {id,...data}
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

export const deleteApi = (id, onSuccess) => dispatch => {
    departmentAPIs().delete(id)
        .then(response => {
            dispatch({
                type: ACTION_TYPES.DELETE_DEPARTMENT,
                payload: id
            })

            onSuccess();
        })
        .catch(error => console.log(error))
}

// export const getByIdApi = (id) => dispatch => {
//     departmentAPIs().fetchById(id)
//         .then(response => {
//             dispatch({
//                 type: ACTION_TYPES.GET_DEPARTMENT,
//                 payload: response.data
//             })
//         })
//         .catch(error => console.log(error))
// }