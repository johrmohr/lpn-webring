// Webring navigation logic

/**
 * Formats a URL for comparison by removing protocol, www, and trailing slashes
 */
function formatUrl(url) {
    return url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
        .toLowerCase();
}

/**
 * Checks if two URLs match (for finding current site in the ring)
 */
function webringMatch(searchUrl, targetUrl) {
    const formattedSearch = formatUrl(searchUrl);
    const formattedTarget = formatUrl(targetUrl);

    return formattedSearch.includes(formattedTarget) ||
           formattedTarget.includes(formattedSearch);
}

/**
 * Main navigation function - handles redirecting to prev/next site
 * Called when URL contains #site-url?nav=prev or #site-url?nav=next
 */
function navigateWebring() {
    const hash = window.location.hash;

    // Check if this is a navigation request
    if (!hash || !hash.includes('?nav=')) {
        return false;
    }

    // Parse the hash: #site-url?nav=direction
    const [siteUrl, params] = hash.substring(1).split('?nav=');
    const direction = params;

    // Validate direction
    if (direction !== 'next' && direction !== 'prev') {
        return false;
    }

    // Find current site index
    const sites = siteData.sites;
    let currentIndex = -1;

    for (let i = 0; i < sites.length; i++) {
        if (webringMatch(siteUrl, sites[i].website)) {
            currentIndex = i;
            break;
        }
    }

    // If site not found, go to first site
    if (currentIndex === -1) {
        currentIndex = 0;
    }

    // Calculate new index with wraparound
    let newIndex;
    if (direction === 'next') {
        newIndex = (currentIndex + 1) % sites.length;
    } else {
        newIndex = (currentIndex - 1 + sites.length) % sites.length;
    }

    // Redirect to new site
    const targetSite = sites[newIndex].website;

    // Show redirecting message
    document.body.innerHTML = `
        <div style="
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background: #1a1a1a;
            color: #888;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        ">
            redirecting to ${formatUrl(targetSite)}...
        </div>
    `;

    // Small delay for UX, then redirect
    setTimeout(() => {
        window.location.href = targetSite;
    }, 300);

    return true;
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { formatUrl, webringMatch, navigateWebring };
}
