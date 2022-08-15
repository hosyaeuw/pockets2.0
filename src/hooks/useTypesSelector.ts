import {TypedUseSelectorHook, useSelector} from "react-redux";
import { RootState } from "../redux/store";

export const useTypesSelector: TypedUseSelectorHook<RootState> = useSelector;