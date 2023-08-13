import './player.css';
import {toPositions} from "../../common/icons/positions";
import {Stack} from "@mui/material";
import React from 'react';
import {Player} from "../../../shared";

const PlayerCard = (props: Player) => {
    const {Data, MMR, PossiblePos} = props;
    const link = props.Link;
    return (
        <Stack direction={"row"} justifyContent={"center"} className="row container-fluid list-group-item">
            <div className="col">
            <span
                className={'list-item-label'}>
                {Data}
            </span>
            </div>
            <div className="col-2  player-positions">
                Pos: {toPositions(PossiblePos)}
            </div>
            <div className="col-3 ">
                MMR: {MMR}
            </div>
            <div className="col float-lg-end ">
                <a href={link} className="link-success float-lg-end">
                    {link}
                </a>
            </div>
        </Stack>
    );
};

export default PlayerCard;
