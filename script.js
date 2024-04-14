// Final Sprint
// Author: William Moss
// Date(s): April 14, 2024

fetch(`./data.json`)
.then(response => {
    if (!response.ok) {
        throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
})
.then(data => {
    console.log('Data retrieved:', data);
    listRankAndBreed(data);
})
.catch(error => {
    console.error('Error fetching data:', error);
});


// Function to list the rank, and description of each NBA Player 
function listRankAndBreed(data) {
    const dogList = document.getElementById('dogList');
    const descriptionContainer = document.getElementById('breedDescription');
    
    if (data && data.dogs) {
        data.dogs.forEach(dog => {
            if (dog.rank !== undefined && dog.breed !== undefined) {
                console.log('Adding dog:', dog.breed);
                const listItem = document.createElement('li');
                listItem.textContent = `${dog.rank}. ${dog.breed}`;
                dogList.appendChild(listItem);
                
                // Generate and display description
                const description = getDescription(dog);
                console.log('Description for', dog.breed, ':' , description);
                const descriptionItem = document.createElement('p');
                descriptionItem.textContent = description;
                descriptionContainer.appendChild(descriptionItem);
            }
        });   
    }
}

// Function to generate breed description
function getDescription(breed) {
    let description = `${breed.breed} are ${breed.size} sized dogs`;

    if (breed.coatType && breed.coatType.length > 0) {
        console.log('Coat type for', breed.breed, ':', breed.coatType.join(', '));
        description += ` with ${breed.coatType.join(', ')} coats`;
    }

    if (breed.color !== undefined) {
        if (typeof breed.color === 'string') {
            console.log('Color for', breed.breed, ':', breed.color);
            description += `. They are ${breed.color}`;
        } else if (Array.isArray(breed.color) && breed.color.length > 0) {
            console.log('Colors for', breed.breed, ':', breed.color.join(', '));
            description += ` in various colors including ${breed.color.join(', ')}`;
        }
    }

    if (breed.temperament !== undefined) {
        if (typeof breed.temperament === 'string') {
            console.log('Temperament for', breed.breed, ':', breed.temperament);
            description += `. They are known for being ${breed.temperament}`;
        } else if (Array.isArray(breed.temperament) && breed.temperament.length > 0) {
            console.log('Temperaments for', breed.breed, ':', breed.temperament.join(', '));
            description += `. They are known for being ${breed.temperament.join(', ')}`;
        }
    }

    console.log('Final description for', breed.breed, ':', description);
    return description + '.';
}
