/* eslint-disable react/react-in-jsx-scope */
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function getMenuItemsForCategory (
    category: string,
    name: string,
    id: string,
    func: Function
) {

    switch (category) {

    case "Group receptive":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Grass skirts'}>Grass skirts</MenuItem>
                    <MenuItem value={'Vocab bingo'}>Vocab bingo</MenuItem>
                    <MenuItem value={'Vocab on board'}>Vocab on board</MenuItem>
                </Select>
            </>
        );
    case "Individual productive":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Hot potato'}>Hot potato</MenuItem>
                </Select>
            </>
        );
    case "Group productive":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    name={id}
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Dragon drilling'}>Dragon drilling</MenuItem>
                    <MenuItem value={'Zombie'}>Zombie</MenuItem>
                </Select>
            </>
        );
    case "Individual receptive":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Slap the board - collage'}>Slap the board - collage</MenuItem>
                    <MenuItem value={'Slap the board - targets'}>Slap the board - targets</MenuItem>
                    <MenuItem value={'Sticky ball - collage'}>Sticky ball - collage</MenuItem>
                    <MenuItem value={'Sticky ball - targets'}>Sticky ball - targets</MenuItem>
                    <MenuItem value={'Charades'}>Charades</MenuItem>
                </Select>
            </>
        );
    case "Controlled practice":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Worksheet'}>Worksheet</MenuItem>
                </Select>
            </>
        );
    case "Semi-controlled practice":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={'Whiteboard race'}>Whiteboard race</MenuItem>
                    <MenuItem value={'Whiteboard race'}>Mini whiteboard race</MenuItem>
                </Select>
            </>
        );
    case "Freer practice":
        return (
            <>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={name}
                    label="Name"
                    onChange={(e) => func(e, id, 'name')}
                >
                    <MenuItem value={10}>Freer practice</MenuItem>
                </Select>
            </>
        );
        case "Other":
            return (
                <>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={name}
                        label="Name"
                        onChange={(e) => func(e, id, 'name')}
                    >
                        <MenuItem value={'Intro Song'}>Intro Song</MenuItem>
                        <MenuItem value={'Song/video 1'}>Song/video 1</MenuItem>
                        <MenuItem value={'Song/video 2'}>Song/video 2</MenuItem>
                        <MenuItem value={'Song/video 3'}>Song/video 3</MenuItem>
                        <MenuItem value={'Cleanup song'}>Cleanup song</MenuItem>
                        <MenuItem value={'Goodbye song'}>Goodbye song</MenuItem>
                        <MenuItem value={'Rules'}>Rules</MenuItem>
                    </Select>
                </>
            );
        default:
            return (<></>)

    }

}
