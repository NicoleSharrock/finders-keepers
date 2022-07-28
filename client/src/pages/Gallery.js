import React from 'react';
import { QUERY_ME } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Gallery = () => {
    const { loading, data } = useQuery(QUERY_ME)
    console.log(data)

    const userData = data?.me || []

    console.log(userData)

    if (loading) {
        return (
            <h2>LOADING...</h2>
        )
    }

    return (
        <main>
            {
                userData.items?.length ? 
                userData.items.map((item) => {
                    return (

                        <div class="card">
                            <div class="container">
                                <h4>Item Name: {item.itemName}</h4>
                                <p>Location: {item.itemLocation}</p>
                            </div>
                        </div>
                    )
                }) : null
            }

        </main>
    )
}

export default Gallery;