import axios from 'axios';
import * as cheerio from 'cheerio';
import sslChecker from 'ssl-checker';
import dns from 'dns';
import * as whoiser from 'whoiser';
import { promisify } from 'util';
import NodeCache from 'node-cache';
import axiosRetry from 'axios-retry';

const lookup = promisify(dns.lookup);

// Setup Cache (TTL 10 mins)
const cache = new NodeCache({ stdTTL: 600 });

// Setup Axios Retry
axiosRetry(axios, {
  retries: 3,
  retryDelay: axiosRetry.exponentialDelay,
  retryCondition: (error) => {
    return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.code === 'ECONNABORTED';
  }
});

const lookup = promisify(dns.lookup);

export const scanUrl = async (inputUrl) => {
    let url = inputUrl;
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
        url = 'http://' + url;
    }

    // Check Cache
    const cachedResult = cache.get(url);
    if (cachedResult) {
        console.log(`Cache hit for ${url}`);
        return cachedResult;
    }

    const result = {
        url: url,
        scanDate: new Date().toISOString(),
        status: "Completed",
        riskScore: 0,
        riskLevel: "Low",
        general: {},
        ssl: {},
        redirects: [],
        techStack: { frontend: [], backend: [], server: [], cms: [], analytics: [], js: [] },
        headers: {},
        threats: []
    };

    try {
        // 1. SSL Analysis
        const hostname = new URL(url).hostname;
        if (url.startsWith('https')) {
            try {
                const sslData = await sslChecker(hostname);
                result.ssl = {
                    valid: sslData.valid,
                    issuer: sslData.issuer ? sslData.issuer.O : 'Unknown',
                    expiry: sslData.validTo,
                    daysRemaining: sslData.daysRemaining,
                    protocol: "TLS"
                };
            } catch {
                result.ssl = { valid: false, error: "SSL Handshake Failed" };
                result.riskScore += 20;
                result.threats.push({
                    type: "SSL Error",
                    severity: "High",
                    description: "SSL Certificate invalid or handshake failed."
                });
            }
        } else {
            result.ssl = { valid: false, protocol: "None" };
            result.riskScore += 30;
            result.threats.push({
                type: "Insecure Protocol",
                severity: "High",
                description: "Site is using HTTP. Upgrade to HTTPS."
            });
        }

        // 2. DNS & Infrastructure
        try {
            const { address } = await lookup(hostname);
            result.general.ip = address;

            // ✅ CORRECT WHOIS USAGE
            const whoisData = await whoiser(address);
            const range = whoisData.range || Object.values(whoisData)[0] || {};

            result.general.asn = range.ASName || range.OrgName || range.org || "Unknown";
            result.general.provider = range.NetName || range.netname || "Unknown";
            result.general.country = range.Country || range.country || "Unknown";
        } catch {
            result.general.ip = "Unresolved";
        }

        // 3. HTTP, Headers & Tech Detection
        try {
            const response = await axios.get(url, {
                validateStatus: () => true,
                timeout: 10000,
                maxRedirects: 10
            });

            if (response.request?.res?.responseUrl &&
                response.request.res.responseUrl !== url) {
                result.redirects.push(
                    `${url} -> ${response.request.res.responseUrl}`
                );
            }

            const headers = response.headers;
            result.headers = {
                "x-powered-by": headers['x-powered-by'] || "Hidden",
                "server": headers['server'] || "Hidden",
                "strict-transport-security": headers['strict-transport-security'] || "Missing",
                "content-security-policy": headers['content-security-policy'] || "Missing",
                "x-frame-options": headers['x-frame-options'] || "Missing",
                "x-content-type-options": headers['x-content-type-options'] || "Missing"
            };

            if (result.headers['strict-transport-security'] === "Missing" && url.startsWith('https')) {
                result.riskScore += 10;
                result.threats.push({
                    type: "Missing HSTS",
                    severity: "Medium",
                    description: "HSTS header missing."
                });
            }

            if (result.headers['content-security-policy'] === "Missing") {
                result.riskScore += 10;
                result.threats.push({
                    type: "Missing CSP",
                    severity: "Medium",
                    description: "Content Security Policy missing."
                });
            }

            if (result.headers['x-powered-by'] !== "Hidden") {
                result.riskScore += 5;
                result.threats.push({
                    type: "Info Leak",
                    severity: "Low",
                    description: `Server reveals technology: ${result.headers['x-powered-by']}`
                });
            }

            // 4. HTML & Tech Stack
            const html = response.data;
            const $ = cheerio.load(html);

            if (headers['server']) result.techStack.server.push(headers['server']);
            if (headers['x-powered-by']) result.techStack.backend.push(headers['x-powered-by']);

            if ($('script[src*="react"]').length || html.includes('data-reactroot'))
                result.techStack.frontend.push('React');
            if ($('script[src*="vue"]').length)
                result.techStack.frontend.push('Vue.js');
            if ($('script[src*="angular"]').length || html.includes('ng-app'))
                result.techStack.frontend.push('Angular');
            if ($('script[src*="jquery"]').length)
                result.techStack.js.push('jQuery');

            const metaGenerator = $('meta[name="generator"]').attr('content');
            if (metaGenerator) {
                if (metaGenerator.includes('WordPress')) result.techStack.cms.push('WordPress');
                if (metaGenerator.includes('Joomla')) result.techStack.cms.push('Joomla');
                if (metaGenerator.includes('Drupal')) result.techStack.cms.push('Drupal');
            }
            if (html.includes('/wp-content/'))
                result.techStack.cms.push('WordPress');

        } catch {
            result.riskScore += 10;
            result.threats.push({
                type: "Unreachable",
                severity: "High",
                description: "Site could not be reached or timed out."
            });
        }

        if (result.riskScore > 100) result.riskScore = 100;
        if (result.riskScore < 30) result.riskLevel = "Low";
        else if (result.riskScore < 70) result.riskLevel = "Medium";
        else result.riskLevel = "High";

        // Save to cache
        cache.set(url, result);

        return result;

    } catch (err) {
        throw err;
    }
};
