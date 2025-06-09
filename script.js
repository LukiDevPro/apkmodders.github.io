document.addEventListener('DOMContentLoaded', () => {
    const appListContainer = document.getElementById('appListContainer');
    const searchInput = document.getElementById('searchInput');
    let allApps = []; // To store all apps fetched from JSON

    // Fetch app data from apps.json
    fetch('apps.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            allApps = data;
            displayApps(allApps);
        })
        .catch(error => {
            console.error("Could not fetch app data:", error);
            appListContainer.innerHTML = "<p>Error loading app data. Please try again later.</p>";
        });

    // Function to display apps
    function displayApps(appsToDisplay) {
        appListContainer.innerHTML = ''; // Clear previous results

        if (appsToDisplay.length === 0) {
            appListContainer.innerHTML = "<p>No apps found.</p>";
            return;
        }

        appsToDisplay.forEach(app => {
            const appCard = document.createElement('div');
            appCard.className = 'app-card';

            let modFeaturesHTML = '';
            if (app.mod_features && app.mod_features.length > 0) {
                modFeaturesHTML = `
                    <div class="mod-features">
                        <strong>Mod Features:</strong>
                        <ul>
                            ${app.mod_features.map(feature => `<li>${feature}</li>`).join('')}
                        </ul>
                    </div>
                `;
            }

            // Note: For a real site, you'd want to sanitize HTML or be very careful if data comes from users
            appCard.innerHTML = `
                <img src="${app.icon_url}" alt="${app.name} Icon" class="icon">
                <h2>${app.name}</h2>
                <div class="version-category">
                    Version: ${app.version} | Category: ${app.category}
                </div>
                <p>${app.description}</p>
                ${modFeaturesHTML}
                <div class="app-meta">
                    Size: ${app.size} | Updated: ${app.updated_date}
                </div>
                <a href="${app.download_url}" class="download-button" target="_blank" rel="noopener noreferrer">Download APK</a>
            `;
            // To implement detail pages, you would add an event listener here,
            // or generate links that pass app.id as a query parameter.
            // For simplicity, this example doesn't have separate detail pages.

            appListContainer.appendChild(appCard);
        });
    }

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filteredApps = allApps.filter(app => {
            return app.name.toLowerCase().includes(searchTerm) ||
                   app.description.toLowerCase().includes(searchTerm) ||
                   app.category.toLowerCase().includes(searchTerm);
        });
        displayApps(filteredApps);
    });
});
