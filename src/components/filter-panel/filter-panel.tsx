import {POSITIONS} from "../../shared";
import * as React from "react";
import {FormGroup} from '@mui/material';
import {CheckboxesFromPositions, CheckboxesFromPositionsNoText} from "../common/inputs/checkbox";
import {MySlider} from "../common/inputs/my-slider";
import {useAppSelector} from "../app/hooks";
import {useActions} from "../../store/useActions";

export const FilterPanel = () => {
    const {itemType, positions, MMR} = useAppSelector(state => state.filter);
    const mmr = MMR;
    const {togglePos, setMMR} = useActions();
    const onChangeCheckbox =
        (e) => togglePos(e.target.name);

    if (itemType === 'message') {
        return <div/>;
    }
    const isAndroid = navigator.userAgent.toLowerCase().indexOf("android") > -1;
    const checkboxes = POSITIONS.map(CheckboxesFromPositions(positions, onChangeCheckbox));
    const androidCheckboxes = POSITIONS.map(CheckboxesFromPositionsNoText(positions, onChangeCheckbox));
    const valuetext = (e: any) => (e + "pts").toString();

    const onChangeSlider =
        (e) => setMMR(e.target.value);
    return (
        <form>
            <MySlider ariaLabel={() => 'Temperature range'} value={mmr} onChange={onChangeSlider}
                      ariaValueText={valuetext}/>
            <FormGroup row>
                {isAndroid ? androidCheckboxes : checkboxes}
            </FormGroup>
        </form>
    );
}