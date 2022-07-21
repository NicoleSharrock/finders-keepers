import React from 'react';

const Gallery = () => {
    return (
        // <main>
        //     <h1>This is the Gallery Page.</h1>
        // </main>
        <main>
                <ul>
                    <a href="">
                        <li><button class="b1">Add New Item</button></li>
                    </a>
                    <li><button class="b2">Log Out</button></li>
                </ul>
             {/* <div id="gallery-wall"></div> */}

             <footer>
                <p>Click on each name to see more work from the contributors!</p>
                <p class="names">
                    <a href="https://github.com/NicoleSharrock">Nicole Sharrock-Hayes</a> 
                    <a href="https://github.com/Awnasworthy">Ally Nasworthy</a>
                    <a href="https://github.com/Emilyreddy">Emily Reddy</a>
                    <a href="https://github.com/MadStoddard">Madeline Stoddard</a>
                </p>
            </footer>
        </main>
    )
}

export default Gallery;