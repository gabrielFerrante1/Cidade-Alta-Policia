import {createSlice} from '@reduxjs/toolkit';

export const slice = createSlice({
    name:'user',
    initialState:{
        name:'',
        email:'',
        id:0
    },
    reducers:{
        setId:(state, action) => {
            state.id = action.payload;
        },
        setPassword:(state, action) => {
            state.email = action.payload;
        },
        setName:(state, action) => {
            state.name = action.payload;
        }
    }
});

//Export actions of reducer
export const {setName, setPassword, setId} = slice.actions;

export default slice.reducer;