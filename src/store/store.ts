import {configureStore} from '@reduxjs/toolkit'
import {itemSlice} from "./slice/item";
import {filtersSlice} from "./slice/filter";
import {searchSlice} from "./slice/search";

const store = configureStore({
        reducer: {
            item: itemSlice.reducer,
            filter: filtersSlice.reducer,
            search: searchSlice.reducer,
        }
    }
);

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch