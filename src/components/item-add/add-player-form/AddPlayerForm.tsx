import React, {useCallback, useState} from 'react';
import './AddPlayerForm.css';
import {addKeyId, isInDesiredForm, isValidHttpUrl, POSITIONS, QUINN_MMR} from '../../../shared';
import {CheckboxInput, TextInput} from '../../common/inputs'
import {CheckBoxKeys, CommandPH as cph, FIXMELATER, PlayerPH as ph, TextInputKeys} from '../../../shared/Constants';
import {NewCommand, NewPlayer} from "../../../shared/Types";


export const isFieldsInvalid = (player: FIXMELATER, setError: (s: string) => void) => {
    if (!player.Data) {
        setError(`Please, specify your login.`);
        return true;
    }
    if (!isValidHttpUrl(player.Link)) {
        setError(`Bad link ${player.Link} please use valid http/https url.`);
        return true;
    }
    if (!isInDesiredForm(player.MMR)) {
        setError(`Bad MMR ${player.MMR} please use valid.`);
        return true;
    }
    if (Number(player.MMR) > QUINN_MMR) {
        setError(`Bad MMR ${player.MMR}, you are not Quinn, please be straight.`);
        return true;
    }
    if (!Object.values(player.PossiblePos).some((b: boolean) => b)) {
        setError(`Please, specify preferable position.`);
        return true;
    }
    return false;
};

const AddPlayerForm = (props: { onAddPlayer: (v: FIXMELATER) => void; onAddCommand: (v: FIXMELATER) => void; isPlayer: boolean }) => {
    const [player, setPlayer] = useState(NewPlayer());
    const [command, setCommand] = useState(NewCommand());
    const [error, setError] = useState('');
    const {onAddPlayer, onAddCommand, isPlayer} = props;

    const onChange = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        const {type, name, checked, value} = e.target;
        if (type === 'checkbox') {
            if (isPlayer)
                setPlayer({...player, PossiblePos: {...player.PossiblePos, [name]: checked}});
            else
                setCommand({...command, PossiblePos: {...command.PossiblePos, [name]: checked}});
        } else {
            e.preventDefault();
            if (isPlayer)
                setPlayer({...player, [name]: value});
            else
                setCommand({...command, [name]: value});
        }
    }, [player, command, isPlayer]);
    const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        let curItem = command;
        if (isPlayer) curItem = player;
        if (isFieldsInvalid(curItem, setError)) return;
        setError('');
        const nItem = addKeyId(curItem, 'player_') as Player;
        if (isPlayer) {
            onAddPlayer(nItem);
            setPlayer({
                ...NewPlayer(),
            });
        } else {
            onAddCommand(nItem);
            setCommand({
                ...NewCommand(),
            });

        }
    }, [player, command, isPlayer]);
    let cur_ph = cph;
    if (isPlayer) {
        cur_ph = ph;
    }
    const inputs = ['Data', 'Link', 'MMR'].map(el => <TextInput name={el} placeholder={cur_ph[el]}
                                                                player={isPlayer ? player : command} onChange={onChange}
                                                                key={TextInputKeys[el]}/>);
    const checkboxes = POSITIONS.map(el => <CheckboxInput name={el}
                                                          value={(isPlayer ? player : command).PossiblePos[el]}
                                                          onChange={onChange} childrn={el} key={CheckBoxKeys[el]}/>);
    return (
        <form
            className="add_player_form input-group"
            onSubmit={onSubmit}
        >
            {inputs}
            <span className="add_player_item d-flex flex-row justify-content-around">
                {checkboxes}
            </span>
            <span className="field-validation-error">{error}</span>
            <button className="btn btn-primary add-player-item" onClick={onSubmit}>Подтвердить</button>
        </form>
    );
};
export default AddPlayerForm;
