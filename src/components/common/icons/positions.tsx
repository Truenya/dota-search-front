import BabyChangingStationIcon from '@mui/icons-material/BabyChangingStation'; // hard support
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement'; // soft support
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'; // offlane
import Woman2Icon from '@mui/icons-material/Woman2'; // midlane
import SportsMartialArtsIcon from '@mui/icons-material/SportsMartialArts';
import * as React from "react";
import {Positions} from "../../../shared/Types"; // carry

const PosToIcon = {
    HardSupport: <BabyChangingStationIcon/>,
    SoftSupport: <SelfImprovementIcon/>,
    Offlane: <AccessibleForwardIcon/>,
    Midlane: <Woman2Icon/>,
    Carry: <SportsMartialArtsIcon/>,
};

export const toPositions = (p: Positions) => {
    // @ts-ignore
    return Object.entries(p).filter(([a, b]) => b).map(([a, b]) => PosToIcon[a]);
}
export default PosToIcon;