import React from 'react';
import { ADD_ITEM } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const Add = () => {
    // Combine those two to create a mutation function
    return (
        <main>
             <form id="addForm">
                <label for="iname">Item Name:</label>
                <input type="text" id="iname" name="iname"></input>
                <label for="location">Location:</label>
                <input type="text" id="location" name="location"></input>
                <br></br>
                <input type="submit" value="Submit"></input>
             </form>
        </main>
    )
}

export default Add;


