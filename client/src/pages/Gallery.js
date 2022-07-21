import React from 'react';

const Gallery = () => {
    return (
        // <main>
        //     <h1>This is the Gallery Page.</h1>
        // </main>
        <main>
            <h1 class="title">Finder's Keepers Gallery</h1>
            <nav>
                <ul>
                    <a href="Add">
                        <li><button class="b1">Add New Item</button></li>
                    </a>
                    <li><button class="b2">Log Out</button></li>
                </ul>
            </nav>
        </main>
    )
}

export default Gallery;