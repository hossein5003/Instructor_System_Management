import {ACTION_TYPES} from "../actions/actionTypes";

const initialState = {
    instructors: [],
    instructorDetails:{},
    courses:[],
    courseDetails:{},
    departments:[]
}

export const dCandidate = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.FETCH_ALL_INSTRUCTOR:
            return {
                ...state,
                instructors: [...action.payload]
            };

        case ACTION_TYPES.CREATE_INSTRUCTOR:
            return {
                ...state,
                instructors: [...state.instructors, action.payload]
            };

        case ACTION_TYPES.UPDATE_INSTRUCTOR:
            return {
                ...state,
                instructors: state.list.map(x => x.id === action.payload.id ? action.payload : x)
            };

        case ACTION_TYPES.DELETE_INSTRUCTOR:
            return {
                ...state,
                instructors: state.instructors.filter(x => x.id !== action.payload)
            };

        case ACTION_TYPES.GET_INSTRUCTOR:
            return {
                ...state,
                instructorDetails: action.payload
            };

        case ACTION_TYPES.FETCH_ALL_DEPARTMENT:
            return {
                ...state,
                departments: [...action.payload]
            };

        case ACTION_TYPES.CREATE_DEPARTMENT:
            return {
                ...state,
                departments: [...state.list, action.payload]
            };

        case ACTION_TYPES.UPDATE_DEPARTMENT:
            return {
                ...state,
                departments: state.list.map(x => x.id === action.payload.id ? action.payload : x)
            };

        case ACTION_TYPES.DELETE_DEPARTMENT:
            return {
                ...state,
                departments: state.list.filter(x => x.id === action.payload.id)
            };

        case ACTION_TYPES.FETCH_ALL_COURSE:
            return {
                ...state,
                courses: [...action.payload]
            };

        case ACTION_TYPES.GET_COURSE:
            return {
                ...state,
                courseDetails: action.payload
            };

        case ACTION_TYPES.CREATE_COURSE:
            return {
                ...state,
                courses: [...state.courses, action.payload]
            };

        case ACTION_TYPES.UPDATE_COURSE:
            return {
                ...state,
                courses: state.list.map(x => x.id === action.payload.id ? action.payload : x)
            };

        case ACTION_TYPES.DELETE_COURSE:
            return {
                ...state,
                courses: state.list.filter(x => x.id === action.payload.id)
            };

        default:
            return state;
    }
}