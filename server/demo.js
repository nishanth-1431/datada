export const getDemoData = () => {
    return {
        url: "http://vulnerable-bank.demo.local",
        scanDate: new Date().toISOString(),
        status: "Completed",
        riskScore: 85,
        riskLevel: "High",
        general: {
            valid: true,
            protocol: "http",
            https: false,
            ip: "192.168.1.105",
            asn: "AS12345 DemoISP",
            provider: "Demo Hosting Provider",
            country: "Unknown"
        },
        ssl: {
            valid: false,
            issuer: "N/A",
            expiry: "N/A",
            protocol: "None"
        },
        redirects: [],
        techStack: {
            frontend: ["jQuery 1.12.4"],
            backend: ["PHP 5.6"],
            server: ["Apache 2.4.18"],
            cms: ["WordPress 4.7"],
            analytics: []
        },
        headers: {
            "x-powered-by": "PHP/5.6.40",
            "server": "Apache/2.4.18 (Ubuntu)",
            "strict-transport-security": "Missing",
            "content-security-policy": "Missing",
            "x-frame-options": "Missing",
            "x-content-type-options": "Missing"
        },
        threats: [
            { type: "SQL Injection", severity: "High", description: "Potential SQL injection vulnerability detected in login parameter." },
            { type: "Outdated Software", severity: "Medium", description: "PHP 5.6 is end-of-life and has known vulnerabilities." },
            { type: "Insecure Protocol", severity: "High", description: "Site is served over HTTP. Data is not encrypted." }
        ]
    };
};
