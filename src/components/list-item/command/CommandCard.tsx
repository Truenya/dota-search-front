import {Player} from "../../../shared";

import './CommandCard.css';
import {toPositions} from "../../common/icons/positions";
// @ts-ignore
import {Stack} from "@mui/material";
import React from 'react';

const CommandCard = (props: Player) => {
    const {Data, Link, MMR, PossiblePos} = props;

    return (
        <Stack direction="row" className="row container-fluid list-item list-group-item">
            <div className="col ">
            <span
                className={'list-item-label'}>
                {Data}
            </span>
            </div>
            <div className="col-2 player-positions">
                Pos: {toPositions(PossiblePos)}
            </div>
            <div className="col-3 ">
                MMR: {MMR}
            </div>
            <div className="col float-lg-end ">
                <a href={Link} className="link-success float-lg-end">
                    {Link}
                </a>
            </div>
        </Stack>
    );
};

export default CommandCard;
