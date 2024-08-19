document.getElementById('searchButton').addEventListener('click', function () {
  const searchInput = document.getElementById('searchInput').value.toLowerCase();
  fetch('travel_recommendation_api.json')
      .then(response => response.json())
      .then(data => {
          let results = '';

          if (searchInput.includes('beach')) {
              results += generateResults(data.beaches, 'Beaches');
          } else if (searchInput.includes('temple')) {
              results += generateResults(data.temples, 'Temples');
          } else if (searchInput.includes('country') || searchInput.includes('countries')) {
              results += generateResults(data.countries, 'Countries'); 
          }
           else {
              results = '<p>No matching results found.</p>';
          }

          document.getElementById('homePage').innerHTML = results;
      })
      .catch(error => console.error('Error fetching data:', error));
});

document.getElementById('clearButton').addEventListener('click', function () {
  document.getElementById('searchInput').value = '';
  document.getElementById('homePage').innerHTML = getHomePageContent();
  window.location.hash = 'homePage'; 
});

function generateResults(items, category) {
  let output = `<h2>${category} Results</h2><div class="row g-4 py-5 row-cols-1 row-cols-lg-3">`;

  if (category === 'Countries') {
      items.forEach(country => {
          country.cities.forEach(city => {
              output += generateCard(city.name, city.imageUrl, city.description);
          });
      });

      
  } else {
      items.forEach(item => {
          output += generateCard(item.name, item.imageUrl, item.description);
      });
  }

  output += '</div>';
  return output;
}



function generateCard(name, imageUrl, description) {
  return `
      <div class="col d-flex align-items-start">
          <div class="card">
              <img src="${imageUrl}" alt="${name}" class="card-img-top">
              <div class="card-body">
                  <h5 class="card-title">${name}</h5>
                  <p class="card-text">${description}</p>
              </div>
          </div>
      </div>`;
}



function getHomePageContent() {
  return `
      <div class="container px-4 py-5" id="hanging-icons">
          <div class="row g-4 py-5 row-cols-1 row-cols-lg-3">
              <div class="col d-flex align-items-start">
                  <div class="icon-square text-body-emphasis bg-body-secondary d-inline-flex align-items-center justify-content-center fs-4 flex-shrink-0 me-3">
                  </div>
                  <div>
                      <h1 class="explore">EXPLORE DREAM DESTINATION</h1>
                      <p>It encourages exploration of unfamiliar territories, embracing diverse cultures and landscapes, while pursuing the desired destination that captivates the heart and ignites a sense of wonder.</p>
                      <a href="#contactUs" class="btn btn-secondary">
                          Book Now
                      </a>
                  </div>
              </div>
          </div>
      </div>`;
}

