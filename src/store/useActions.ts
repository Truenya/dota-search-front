import {useDispatch} from "react-redux";
import {useMemo} from "react";
import bindActionCreators from "react-redux/es/utils/bindActionCreators";
import {searchActions} from "./slice/search";
import {filterActions} from "./slice/filter";
import {itemActions} from "./slice/item";

const rootActions = {
    ...searchActions,
    ...filterActions,
    ...itemActions,
};

export const useActions = () => {
    const dispatch = useDispatch();
    return useMemo(() => bindActionCreators(rootActions, dispatch), [dispatch]);
}
