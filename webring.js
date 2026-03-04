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
 * Validates the direction requested by the widget
 */
function isValidDirection(direction) {
    return direction === 'next' || direction === 'prev';
}

/**
 * Reads navigation requests from the current URL.
 * Supports both ?nav=prev&from=site.com and the legacy #site.com?nav=prev format.
 */
function getNavigationRequest() {
    const searchParams = new URLSearchParams(window.location.search);
    const queryDirection = searchParams.get('nav');
    const querySiteUrl = searchParams.get('from');

    if (querySiteUrl && isValidDirection(queryDirection)) {
        return {
            direction: queryDirection,
            siteUrl: querySiteUrl
        };
    }

    const hash = window.location.hash;

    if (!hash || !hash.includes('?nav=')) {
        return null;
    }

    const [siteUrl, direction] = hash.substring(1).split('?nav=');

    if (!siteUrl || !isValidDirection(direction)) {
        return null;
    }

    return {
        direction,
        siteUrl: decodeURIComponent(siteUrl)
    };
}

/**
 * Main navigation function - handles redirecting to prev/next site
 * Called when URL contains ?nav=prev&from=site-url or #site-url?nav=prev
 */
function navigateWebring() {
    const request = getNavigationRequest();

    if (!request) {
        return false;
    }

    const { direction, siteUrl } = request;
    const sites = siteData.sites;

    if (!sites.length) {
        return false;
    }

    // Find current site index
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
    module.exports = { formatUrl, webringMatch, isValidDirection, getNavigationRequest, navigateWebring };
}
