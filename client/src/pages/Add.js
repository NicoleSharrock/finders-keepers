import React from 'react';
import { ADD_ITEM } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { QUERY_ITEMS, QUERY_ME } from '../utils/queries';

const ItemForm = () => {
    const [itemName, setName] = useState('');
    const [itemLocation, setLocation] = useState('');

    const [addItem, { error }] = useMutation(ADD_ITEM, {
        update(cache, { data: { addItem } }) {
            try {
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, items: [ ...me.items, addItem] } },
                });
            } catch (e) {
                console.warn("First item added!")
            }

            //update thought array cache
            const { items } = cache.readQuery({ query: QUERY_ITEMS });
            cache.writeQuery({
                query: QUERY_ITEMS,
                data: { items: [addItem, ...items] },
            });
        }
    })

 // submit form
 const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addItem({
        variables: { itemName, itemLocation },
      });
      // clear form value
      setText('');
    } catch (e) {
      console.error(e);
    }
  }; 

    return (
        <main>
             <form id="addForm" onSubmit={handleFormSubmit}>
                <label for="iname">Item Name:</label>
                <input type="text" id="iname" name="iname" value={itemName}></input>
                <label for="location">Location:</label>
                <input type="text" id="location" name="location" value={itemLocation}></input>
                <br></br>
                <input type="submit"></input>
             </form>
        </main>
    )
}

export default ItemForm;


