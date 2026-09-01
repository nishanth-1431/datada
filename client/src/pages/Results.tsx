import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ShieldAlert, ShieldCheck, Shield, Globe, Server, Code, Activity, ArrowRight, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state?.data;

    useEffect(() => {
        if (!data) {
            navigate('/');
        }
    }, [data, navigate]);

    if (!data) return null;

    const RiskBadge = ({ level, score }: { level: string, score: number }) => {
        const colors = {
            Low: 'bg-green-500 text-green-950',
            Medium: 'bg-yellow-500 text-yellow-950',
            High: 'bg-red-500 text-red-950'
        };

        return (
            <div className={`flex flex-col items-center justify-center w-32 h-32 rounded-full border-4 border-white/10 ${colors[level as keyof typeof colors] || colors.Medium}`}>
                <span className="text-3xl font-bold">{score}</span>
                <span className="text-xs uppercase font-bold tracking-wider">{level} Risk</span>
            </div>
        );
    };

    return (
        <div className="container mx-auto p-4 py-8 space-y-6">
            <Link to="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 mb-4">
                &larr; Back to Scanner
            </Link>

            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-panel p-6 flex flex-col md:flex-row items-center justify-between gap-6"
            >
                <div className="flex items-center gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                        <Globe className="w-10 h-10 text-accent" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{data.url}</h1>
                        <p className="text-sm text-gray-400">Scanned on: {new Date(data.scanDate).toLocaleString()}</p>
                        <div className="flex gap-2 mt-2">
                            <span className="px-2 py-1 rounded-md bg-white/10 text-xs font-mono">{data.general.ip}</span>
                            <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300">{data.general.country}</span>
                        </div>
                    </div>
                </div>
                <RiskBadge level={data.riskLevel} score={data.riskScore} />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* SSL & Security */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="card space-y-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-5 h-5 text-accent" />
                        <h2 className="font-bold text-lg">SSL & Encryption</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">Status</span>
                            <span className={`text-sm font-bold ${data.ssl.valid ? 'text-green-400' : 'text-red-400'}`}>
                                {data.ssl.valid ? 'Valid' : 'Invalid / Insecure'}
                            </span>
                        </div>
                        {data.ssl.valid ? (
                            <>
                                <div className="flex justify-between items-center p-3 rounded bg-black/20">
                                    <span className="text-sm text-gray-400">Issuer</span>
                                    <span className="text-sm text-white truncate max-w-[150px]">{data.ssl.issuer}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 rounded bg-black/20">
                                    <span className="text-sm text-gray-400">Expires</span>
                                    <span className="text-sm text-white">{new Date(data.ssl.expiry).toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : (
                            <div className="p-3 bg-red-500/10 text-red-300 text-xs rounded">
                                Connection is not secure. Data interception possible.
                            </div>
                        )}
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">Protocol</span>
                            <span className="text-sm text-white">{data.ssl.protocol || 'HTTP'}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Infrastructure */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="card space-y-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Server className="w-5 h-5 text-accent" />
                        <h2 className="font-bold text-lg">Infrastructure</h2>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">Hosting Provider</span>
                            <span className="text-sm text-white truncate w-32 text-right" title={data.general.provider}>{data.general.provider}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">ASN</span>
                            <span className="text-sm text-white">{data.general.asn}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">Powered By</span>
                            <span className="text-sm text-white">{data.headers["x-powered-by"]}</span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded bg-black/20">
                            <span className="text-sm text-gray-400">Server</span>
                            <span className="text-sm text-white">{data.headers["server"]}</span>
                        </div>
                    </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="card space-y-4"
                >
                    <div className="flex items-center gap-2 mb-2">
                        <Code className="w-5 h-5 text-accent" />
                        <h2 className="font-bold text-lg">Technology Stack</h2>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {Object.entries(data.techStack).map(([category, items]: [string, any[]]) => (
                            items.map((tech, idx) => (
                                <span key={`${category}-${idx}`} className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold">
                                    {tech} <span className="text-gray-500 ml-1 opacity-75">({category})</span>
                                </span>
                            ))
                        ))}
                        {Object.values(data.techStack).flat().length === 0 && (
                            <span className="text-sm text-gray-500 italic">No technologies detected.</span>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Redirects & Headers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="card"
                >
                    <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                        <Activity className="w-5 h-5 text-accent" /> Redirect Chain
                    </h3>
                    <div className="space-y-2">
                        {data.redirects.length > 0 ? (
                            data.redirects.map((hop: string, i: number) => (
                                <div key={i} className="flex items-center gap-2 text-sm text-gray-300 p-2 bg-black/20 rounded border-l-2 border-accent">
                                    <ArrowRight className="w-4 h-4 text-gray-500" /> {hop}
                                </div>
                            ))
                        ) : (
                            <div className="text-sm text-gray-500">No redirects detected (Direct).</div>
                        )}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="card"
                >
                    <h3 className="font-bold text-lg mb-4">Security Headers</h3>
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(data.headers).map(([key, value]) => {
                            if (key === 'server' || key === 'x-powered-by') return null;
                            const isMissing = value === 'Missing';
                            return (
                                <div key={key} className={`p-2 rounded text-xs border ${isMissing ? 'bg-red-500/10 border-red-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                                    <div className="font-bold mb-1 uppercase text-gray-400">{key.replace(/-/g, ' ')}</div>
                                    <div className={isMissing ? 'text-red-400' : 'text-green-400'}>{value as string}</div>
                                </div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* Threats / Analysis */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="glass-panel p-6 border-l-4 border-red-500"
            >
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <AlertTriangle className="w-6 h-6 text-red-500" />
                    Detected Risks & Heuristics
                </h2>

                {data.threats.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.threats.map((threat: any, idx: number) => (
                            <div key={idx} className="bg-red-500/5 border border-red-500/10 p-4 rounded-lg">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-red-400">{threat.type}</h3>
                                    <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${threat.severity === 'High' ? 'bg-red-500 text-white' :
                                            threat.severity === 'Medium' ? 'bg-yellow-500 text-black' :
                                                'bg-blue-500 text-white'
                                        }`}>
                                        {threat.severity}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-400">{threat.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8 text-green-400">
                        <ShieldCheck className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p>No high-severity heuristics detected.</p>
                    </div>
                )}
            </motion.div>

        </div>
    );
};

export default Results;
