// Main script for the webring homepage

document.addEventListener('DOMContentLoaded', function() {
    // First, check if this is a navigation request (prev/next)
    if (navigateWebring()) {
        return; // Navigation in progress, don't render homepage
    }

    // Render the member list
    renderMembers();

    // Update site count
    updateSiteCount();
});

/**
 * Renders the list of webring members
 */
function renderMembers() {
    const memberList = document.getElementById('member-list');
    if (!memberList) return;

    const sites = siteData.sites;

    sites.forEach(site => {
        const row = document.createElement('div');
        row.className = 'member-row';

        const displayUrl = formatUrl(site.website);

        row.innerHTML = `
            <span class="name">${site.name}</span>
            <span class="year">${site.year}</span>
            <span class="url"><a href="${site.website}" target="_blank" rel="noopener">${displayUrl}</a></span>
        `;

        memberList.appendChild(row);
    });
}

/**
 * Updates the site counter in the footer
 */
function updateSiteCount() {
    const countEl = document.getElementById('site-count');
    if (countEl) {
        countEl.textContent = siteData.sites.length;
    }
}
