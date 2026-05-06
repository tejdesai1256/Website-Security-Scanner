// Scan Website Function
function scanWebsite() {
    const urlInput = document.getElementById('urlInput');
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please enter a website URL');
        return;
    }

    // Validate URL format
    if (!isValidUrl(url)) {
        alert('Please enter a valid URL (e.g., https://example.com)');
        return;
    }

    // Show loading state
    const scanBtn = document.querySelector('.scan-btn');
    const originalText = scanBtn.innerHTML;
    scanBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scanning...';
    scanBtn.disabled = true;

    // Simulate scanning process
    setTimeout(() => {
        console.log('Scanning:', url);
        
        // Generate mock security report
        const report = generateDetailedReport(url);
        
        // Display results
        displayResults(url, report);
        
        // Reset button
        scanBtn.innerHTML = originalText;
        scanBtn.disabled = false;
        
        // Scroll to results
        setTimeout(() => {
            document.getElementById('resultsSection').scrollIntoView({ behavior: 'smooth' });
        }, 500);
    }, 3000);
}

// Generate Detailed Mock Report
function generateDetailedReport(url) {
    const reports = [
        {
            score: 92,
            status: 'Excellent',
            ssl: { status: 'Valid', protocol: 'TLS 1.3', expires: '2025-12-31', cert: 'Valid' },
            ports: { open: 0, vulnerable: 0, services: 3 },
            vulnerabilities: { critical: 0, high: 1, medium: 3, low: 2 },
            performance: { pageLoad: '1.2s', ttfb: '0.4s', lcp: '2.1s', mobile: 'Yes' },
            seo: { metaTags: 95, heading: 88, accessibility: 92 }
        },
        {
            score: 78,
            status: 'Good',
            ssl: { status: 'Valid', protocol: 'TLS 1.2', expires: '2025-08-15', cert: 'Valid' },
            ports: { open: 2, vulnerable: 0, services: 5 },
            vulnerabilities: { critical: 0, high: 2, medium: 5, low: 3 },
            performance: { pageLoad: '1.8s', ttfb: '0.6s', lcp: '2.8s', mobile: 'Yes' },
            seo: { metaTags: 85, heading: 78, accessibility: 80 }
        },
        {
            score: 65,
            status: 'Needs Improvement',
            ssl: { status: 'Expired', protocol: 'TLS 1.2', expires: '2024-05-30', cert: 'Expired' },
            ports: { open: 3, vulnerable: 1, services: 4 },
            vulnerabilities: { critical: 1, high: 3, medium: 7, low: 4 },
            performance: { pageLoad: '2.5s', ttfb: '0.9s', lcp: '3.5s', mobile: 'No' },
            seo: { metaTags: 70, heading: 65, accessibility: 72 }
        },
        {
            score: 88,
            status: 'Excellent',
            ssl: { status: 'Valid', protocol: 'TLS 1.3', expires: '2026-03-20', cert: 'Valid' },
            ports: { open: 1, vulnerable: 0, services: 2 },
            vulnerabilities: { critical: 0, high: 0, medium: 2, low: 1 },
            performance: { pageLoad: '1.0s', ttfb: '0.3s', lcp: '1.9s', mobile: 'Yes' },
            seo: { metaTags: 98, heading: 95, accessibility: 96 }
        }
    ];

    return reports[Math.floor(Math.random() * reports.length)];
}

// Display Results on Page
function displayResults(url, report) {
    // Hide hero section
    document.getElementById('heroSection').style.display = 'none';
    
    // Show results section
    const resultsSection = document.getElementById('resultsSection');
    resultsSection.style.display = 'block';

    // Get domain name for display
    const domain = new URL(url).hostname;

    // Update header
    document.getElementById('resultWebsite').textContent = domain;
    document.getElementById('resultUrl').textContent = url;
    document.getElementById('resultDate').textContent = new Date().toLocaleString();

    // Update Security Score with animation
    const scoreValue = document.getElementById('scoreValue');
    const progressCircle = document.getElementById('progressCircle');
    
    scoreValue.textContent = report.score;
    
    // Animate progress circle
    const circumference = 282.7;
    const offset = circumference - (report.score / 100) * circumference;
    progressCircle.style.strokeDashoffset = circumference;
    
    setTimeout(() => {
        progressCircle.style.strokeDashoffset = offset;
    }, 100);

    // Update score status with color
    const scoreStatus = document.getElementById('scoreStatus');
    scoreStatus.textContent = report.status;
    if (report.score >= 90) {
        scoreStatus.style.color = '#00ff88';
    } else if (report.score >= 75) {
        scoreStatus.style.color = '#00d4ff';
    } else if (report.score >= 60) {
        scoreStatus.style.color = '#ffaa00';
    } else {
        scoreStatus.style.color = '#ff3333';
    }

    // SSL/TLS Certificate
    document.getElementById('sslStatus').textContent = report.ssl.status;
    document.getElementById('sslStatus').className = report.ssl.status === 'Valid' ? 'value success' : 'value danger';
    document.getElementById('sslProtocol').textContent = report.ssl.protocol;
    document.getElementById('sslExpires').textContent = report.ssl.expires;
    document.getElementById('sslCert').textContent = report.ssl.cert;

    // Port Scan
    document.getElementById('openPorts').textContent = report.ports.open;
    document.getElementById('vulnerablePorts').textContent = report.ports.vulnerable;
    document.getElementById('runningServices').textContent = report.ports.services;

    // Vulnerabilities
    document.getElementById('criticalVuln').textContent = report.vulnerabilities.critical;
    document.getElementById('highVuln').textContent = report.vulnerabilities.high;
    document.getElementById('mediumVuln').textContent = report.vulnerabilities.medium;
    document.getElementById('lowVuln').textContent = report.vulnerabilities.low;

    // Performance Metrics
    document.getElementById('pageLoadTime').textContent = report.performance.pageLoad;
    document.getElementById('ttfb').textContent = report.performance.ttfb;
    document.getElementById('lcp').textContent = report.performance.lcp;
    document.getElementById('mobileFriendly').textContent = report.performance.mobile;

    // SEO Metrics - update progress bars
    updateProgressBar('metaTags', report.seo.metaTags);
    updateProgressBar('heading', report.seo.heading);
    updateProgressBar('accessibility', report.seo.accessibility);
}

// Update progress bars
function updateProgressBar(id, percentage) {
    const bars = document.querySelectorAll('.metric-bar');
    bars.forEach(bar => {
        const label = bar.querySelector('.bar-label').textContent.toLowerCase();
        if (label.includes('meta') && id === 'metaTags') {
            const fill = bar.querySelector('.bar-fill');
            fill.style.width = percentage + '%';
            bar.querySelector('.bar-value').textContent = percentage + '%';
        } else if (label.includes('heading') && id === 'heading') {
            const fill = bar.querySelector('.bar-fill');
            fill.style.width = percentage + '%';
            bar.querySelector('.bar-value').textContent = percentage + '%';
        } else if (label.includes('accessibility') && id === 'accessibility') {
            const fill = bar.querySelector('.bar-fill');
            fill.style.width = percentage + '%';
            bar.querySelector('.bar-value').textContent = percentage + '%';
        }
    });
}

// Back to Scanner
function backToScanner() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('heroSection').style.display = 'block';
    document.getElementById('urlInput').value = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Download Report (PDF)
function downloadReport() {
    const website = document.getElementById('resultWebsite').textContent;
    const url = document.getElementById('resultUrl').textContent;
    const score = document.getElementById('scoreValue').textContent;
    const status = document.getElementById('scoreStatus').textContent;
    const date = document.getElementById('resultDate').textContent;

    const reportContent = `
WEBSITE SECURITY SCAN REPORT
========================================

Website: ${website}
URL: ${url}
Scan Date: ${date}

SECURITY SCORE: ${score}/100 (${status})

SSL/TLS CERTIFICATE:
- Status: ${document.getElementById('sslStatus').textContent}
- Protocol: ${document.getElementById('sslProtocol').textContent}
- Expires: ${document.getElementById('sslExpires').textContent}

PORT SCAN:
- Open Ports: ${document.getElementById('openPorts').textContent}
- Vulnerable: ${document.getElementById('vulnerablePorts').textContent}
- Services: ${document.getElementById('runningServices').textContent}

VULNERABILITIES:
- Critical: ${document.getElementById('criticalVuln').textContent}
- High: ${document.getElementById('highVuln').textContent}
- Medium: ${document.getElementById('mediumVuln').textContent}
- Low: ${document.getElementById('lowVuln').textContent}

PERFORMANCE:
- Page Load Time: ${document.getElementById('pageLoadTime').textContent}
- TTFB: ${document.getElementById('ttfb').textContent}
- LCP: ${document.getElementById('lcp').textContent}
- Mobile Friendly: ${document.getElementById('mobileFriendly').textContent}

Generated by JobJockey Security Scanner
${new Date().toLocaleString()}
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(reportContent));
    element.setAttribute('download', `security-report-${website}-${Date.now()}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Validate URL
function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.detector-card, .step-card, .score-card, .risk-card, .value-card, .feature-card, .pricing-card, .result-card').forEach(el => {
    observer.observe(el);
});

// Add animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }

    .fa-spinner {
        animation: spin 1s linear infinite;
    }
`;
document.head.appendChild(style);

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// Form validation for email signup (if forms are added)
document.addEventListener('DOMContentLoaded', function() {
    // Initialize any buttons or forms that need interaction
    const signupBtn = document.querySelector('.signup-btn');
    if (signupBtn && signupBtn.href === '#') {
        signupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Sign up feature would be implemented here');
        });
    }

    const loginBtn = document.querySelector('.login-btn');
    if (loginBtn && loginBtn.href === '#') {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Login feature would be implemented here');
        });
    }
});

// Pricing plan selection
document.addEventListener('DOMContentLoaded', function() {
    const pricingBtns = document.querySelectorAll('.pricing-btn');
    pricingBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const planName = this.parentElement.querySelector('h3').textContent;
            alert(`You selected the ${planName} plan. Proceeding to checkout...`);
        });
    });
});

// Add hover effects to table rows
const tableRows = document.querySelectorAll('.scan-table tbody tr');
tableRows.forEach(row => {
    row.addEventListener('click', function() {
        const website = this.querySelector('td:first-child').textContent;
        console.log('Selected website:', website);
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const navMenu = document.querySelector('.nav-menu');
    navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
}

// Debounce function for window resize
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize for responsive adjustments
const handleResize = debounce(function() {
    console.log('Window resized');
}, 250);

window.addEventListener('resize', handleResize);

// Auto-format URL input
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.addEventListener('blur', function() {
            let value = this.value.trim();
            if (value && !value.startsWith('http')) {
                value = 'https://' + value;
                this.value = value;
            }
        });
    }
});

// Add keyboard shortcut for scan (Enter key)
document.addEventListener('DOMContentLoaded', function() {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                scanWebsite();
            }
        });
    }
});

// Analytics tracking (placeholder)
function trackEvent(eventName, eventData) {
    console.log('Event tracked:', {
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString()
    });
    // In production, this would send data to an analytics service
}

// Track page views
trackEvent('page_view', {
    page: 'home',
    url: window.location.href
});

// Track button clicks
document.querySelectorAll('button, a').forEach(element => {
    element.addEventListener('click', function() {
        trackEvent('button_click', {
            text: this.textContent.trim(),
            type: this.tagName.toLowerCase()
        });
    });
});
