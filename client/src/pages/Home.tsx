import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, AlertTriangle, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
    const [url, setUrl] = useState('');
    const [consent, setConsent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleScan = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!consent) return;
        if (!url) return;

        setLoading(true);
        setError(null);

        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/scan`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url, consent }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Scan failed');
            }

            navigate('/results', { state: { data } });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-2xl w-full text-center space-y-8"
            >
                <div className="space-y-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-500">
                        Datada
                    </h1>
                    <p className="text-xl text-gray-400">
                        Advanced, ethical web reconnaissance and security analysis platform.
                    </p>
                </div>

                <div className="glass-panel p-8 text-left space-y-6">
                    <form onSubmit={handleScan} className="space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="url" className="text-sm font-medium text-gray-300">
                                Target URL
                            </label>
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />
                                <input
                                    type="text"
                                    id="url"
                                    placeholder="example.com or https://example.com"
                                    className="w-full bg-slate-900/50 border border-white/10 rounded-lg py-4 pl-12 pr-4 text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    disabled={loading}
                                />
                            </div>
                        </div>

                        <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex gap-3 items-start">
                            <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                            <div className="space-y-2">
                                <p className="text-sm text-yellow-500 font-medium">Ethical Usage Disclaimer</p>
                                <p className="text-xs text-yellow-200/70">
                                    This tool is for educational and authorized testing purposes only.
                                    Unauthorized scanning of targets you do not own or have permission to test is illegal.
                                </p>
                                <div className="flex items-center gap-2 pt-2">
                                    <input
                                        type="checkbox"
                                        id="consent"
                                        className="w-4 h-4 rounded border-gray-600 text-accent focus:ring-accent bg-slate-800"
                                        checked={consent}
                                        onChange={(e) => setConsent(e.target.checked)}
                                    />
                                    <label htmlFor="consent" className="text-xs text-gray-300 cursor-pointer select-none">
                                        I confirm that I own this domain or have explicit permission to scan it, and I will use this tool only for educational and ethical purposes.
                                    </label>
                                </div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={!consent || !url || loading}
                            className={`w-full py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2
                ${consent && url
                                    ? 'bg-accent hover:bg-accent/90 text-slate-900 shadow-lg shadow-accent/20'
                                    : 'bg-slate-800 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
                                    Scanning Target...
                                </>
                            ) : (
                                <>
                                    <Lock className="w-5 h-5" />
                                    Initiate Scan
                                </>
                            )}
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-500">
                    <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                        <h3 className="text-gray-300 font-medium mb-1">Non-Intrusive</h3>
                        <p>Passive reconnaissance only. No exploitation.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                        <h3 className="text-gray-300 font-medium mb-1">Anonymous</h3>
                        <p>Scans are logged without personal identifiers.</p>
                    </div>
                    <div className="p-4 rounded-lg border border-white/5 bg-white/5">
                        <h3 className="text-gray-300 font-medium mb-1">Educational</h3>
                        <p>Designed to help you understand web security.</p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Home;
