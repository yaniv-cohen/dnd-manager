import { InputLabel, MenuItem, Select } from "@mui/material"

export const SelectorFromArray = (type: string, arr: any[], setFunction: Function) => {
    setFunction(type, arr[0])
    return (
        <>
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Select
                onChange={(e) => { setFunction(type, e.target.value) }} name={type}>
                {
                    arr.map((item: any) => {
                        return (<MenuItem key={item} value={item}>{item}</MenuItem>)

                    })
                }
            </Select>
        </>
    )
}

export default SelectorFromArray