// frontend/js/app.js

async function startScan() {

    try {

        // Show loading
        document.getElementById("loading").style.display = "block";

        // Get URL
        const url = document.getElementById("urlInput").value;

        // API request
        const response = await fetch(
            "http://127.0.0.1:8000/scan",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ url })
            }
        );

        // Convert response
        const data = await response.json();

        console.log(data);

        // Hide loading
        document.getElementById("loading").style.display = "none";

        // =========================
        // SUMMARY
        // =========================

        document.getElementById(
            "securityScore"
        ).innerText =
            data.summary.security_score;

        document.getElementById(
            "riskLevel"
        ).innerText =
            data.summary.risk_level;

        // =========================
        // SSL
        // =========================

        document.getElementById(
            "sslStatus"
        ).innerText =
            data.scans.ssl.ssl_enabled
                ? "Enabled"
                : "Disabled";

        document.getElementById(
            "sslExpiry"
        ).innerText =
            data.scans.ssl.expiry_date || "-";

        document.getElementById(
            "sslDays"
        ).innerText =
            data.scans.ssl.days_left || "-";

        // =========================
        // PERFORMANCE
        // =========================

        document.getElementById(
            "performanceScore"
        ).innerText =
            data.scans.performance.performance_score || 0;

        document.getElementById(
            "fcp"
        ).innerText =
            data.scans.performance.first_contentful_paint || "-";

        document.getElementById(
            "lcp"
        ).innerText =
            data.scans.performance.largest_contentful_paint || "-";

        document.getElementById(
            "speedIndex"
        ).innerText =
            data.scans.performance.speed_index || "-";

        // =========================
        // SEO
        // =========================

        document.getElementById(
            "seoTitle"
        ).innerText =
            data.scans.seo.title || "-";

        document.getElementById(
            "h1Count"
        ).innerText =
            data.scans.seo.h1_count || 0;

        document.getElementById(
            "missingAlt"
        ).innerText =
            data.scans.seo.missing_alt_images || 0;

        // =========================
        // PORTS
        // =========================

        const portsContainer =
            document.getElementById("portsContainer");

        portsContainer.innerHTML = "";

        data.scans.ports.open_ports.forEach(port => {

            const div =
                document.createElement("div");

            div.className = "port-card";

            div.innerHTML = `
                <h3>${port.port}</h3>
                <p>${port.service}</p>
                <span>${port.status}</span>
            `;

            portsContainer.appendChild(div);
        });

        // =========================
        // HEADERS
        // =========================

        const headersContainer =
            document.getElementById("headersContainer");

        headersContainer.innerHTML = "";

        const headers =
            data.scans.headers.headers;

        for (const key in headers) {

            const row =
                document.createElement("div");

            row.className = "header-row";

            row.innerHTML = `
                <strong>${key}</strong>
                :
                <span>
                    ${headers[key]
                        ? "Present"
                        : "Missing"}
                </span>
            `;

            headersContainer.appendChild(row);
        }

        // =========================
        // RECOMMENDATIONS
        // =========================

        const recommendationList =
            document.getElementById(
                "recommendationsList"
            );

        recommendationList.innerHTML = "";

        data.summary.recommendations.forEach(rec => {

            const li =
                document.createElement("li");

            li.innerText = rec;

            recommendationList.appendChild(li);
        });

        // =========================
        // CHART
        // =========================

        const ctx =
            document.getElementById(
                "scoreChart"
            );

        // Destroy old chart
        if (window.scoreChartInstance) {
            window.scoreChartInstance.destroy();
        }

        window.scoreChartInstance =
            new Chart(ctx, {

                type: "doughnut",

                data: {

                    labels: [
                        "Security Score",
                        "Remaining"
                    ],

                    datasets: [{
                        data: [
                            data.summary.security_score,
                            100 -
                            data.summary.security_score
                        ]
                    }]
                },

                options: {
                    responsive: true
                }
            });

    } catch(error) {

        console.log(error);

        document.getElementById("loading").style.display = "none";

        alert("Scan failed");
    }
}