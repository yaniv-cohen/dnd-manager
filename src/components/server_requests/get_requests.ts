import axios from "axios";

//called when user clicks on a table cell
export const getCharactersByValue = async (value: string, type: string,
    limitForRequest: number, setData: Function) => {
    const url = 'http://localhost:4000/get_characters/' + type +
        '/' + value + '/' + limitForRequest;
    console.log(url);
    let response = await (await fetch(url)).json();
    setData(response);
}

export const getRequest = async (type: string,limitForRequest:number,
     setTableBodyType: Function, setData: Function, setRules:Function, setCurrentPartyName:Function, parameter?: string) => {
    //reset the party name 

    axios.get('http://localhost:4000/' + type, {
        headers: {
            limit: limitForRequest
        }
    })
        .then(async function (response: any
        ) {
            console.log('type', type);
            console.log(response.data);
            // if (type == "get_locations") {
            //     setTableBodyType('locations');
            //     setData(response.data);
            // }
            if (type.includes('search_character')) {
                setTableBodyType('characters');
                setData(response.data);
            }
            else if (type == 'get_characters') {
                setTableBodyType('characters');
                setData(response.data);
            }
            if (type.includes('search_party')) {
                setTableBodyType('parties');
                // setCurrentPartyName(parameter);
                setData(response.data);
            }
            else if (type == 'rules') {
                setRules(response.data[0]);
            }
            else if (type == 'get_parties') {
                setTableBodyType('parties');
                setData(response.data);

            }
        })
        .catch(function (error: Error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}