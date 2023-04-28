import { createSlice } from "@reduxjs/toolkit";


export const taskSlice = createSlice({
    name: "task",
    initialState: {
        new:[],
        completed:[],
        progress:[],
        canceled:[]
    },
    reducers: {
        SetNewTask: (state, action) => {
            state.new = action.payload
        },
        SetCompletedTask:(state,action)=>{
            state.completed=action.payload
        },
        SetProgressTask:(state,action)=>{
            state.progress=action.payload
        },
        SetCanceledTask:(state,action)=>{
            state.canceled=action.payload
        }

    }
})

export  const {SetNewTask,SetCompletedTask,SetProgressTask,SetCanceledTask}=taskSlice.actions;
export default  taskSlice.reducer;