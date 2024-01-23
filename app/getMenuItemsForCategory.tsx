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
                    <MenuItem value={'Slap the board'}>Slap the board</MenuItem>
                    <MenuItem value={'Sticky ball'}>Sticky ball</MenuItem>
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
                    <MenuItem value={9}>Semi-controlled practice</MenuItem>
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
                        <MenuItem value={'Song'}>Song</MenuItem>
                        <MenuItem value={'Rules'}>Rules</MenuItem>
                    </Select>
                </>
            );
        default:
            return (<></>)

    }

}
