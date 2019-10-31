import axios from '../config/axios'
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        payload: user
    }
}
export const removeUser = () => {
    return {
        type: "REMOVE_USER"
    }
}

export const startSetUser = (formData) => {
    return (dispatch) => {
        axios.post('/api/login', formData)
            .then((response) => {
                if (response.data._id) {
                    localStorage.setItem('token', response.data.token)
                    dispatch(setUser(response.data))
                }
                else {
                    window.alert(response.data)
                }
            })

    }
}