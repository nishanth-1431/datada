import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Bug, Database, Unlock, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

const Demo = () => {
    const navigate = useNavigate();

    const startDemo = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const response = await fetch(`${API_URL}/api/demo`);
            const data = await response.json();
            navigate('/results', { state: { data } });
        } catch (error) {
            console.error("Demo failed", error);
        }
    };

    return (
        <div className="container mx-auto p-4 py-12 flex flex-col items-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-4xl w-full text-center space-y-8"
            >
                <div className="inline-block p-4 bg-red-500/10 rounded-full mb-4">
                    <Bug className="w-12 h-12 text-red-500" />
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">Security Demo Lab</h1>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Experience a simulated security scan on an intentionally vulnerable target.
                    No real attacks are performed. This is for educational purposes only.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-12">
                    <div className="card border-red-500/20 bg-red-500/5">
                        <Unlock className="w-8 h-8 text-red-400 mb-4" />
                        <h3 className="font-bold text-lg text-white mb-2">Vulnerable Services</h3>
                        <p className="text-sm text-gray-400">
                            The simulation includes outdated PHP versions and exposed server tokens that real-world scanners look for.
                        </p>
                    </div>
                    <div className="card border-yellow-500/20 bg-yellow-500/5">
                        <Database className="w-8 h-8 text-yellow-400 mb-4" />
                        <h3 className="font-bold text-lg text-white mb-2">SQL Injection</h3>
                        <p className="text-sm text-gray-400">
                            See how heuristic analysis detects potential SQL injection points in URL parameters without exploiting them.
                        </p>
                    </div>
                    <div className="card border-blue-500/20 bg-blue-500/5">
                        <ShieldAlert className="w-8 h-8 text-blue-400 mb-4" />
                        <h3 className="font-bold text-lg text-white mb-2">Missing Headers</h3>
                        <p className="text-sm text-gray-400">
                            Learn why Security Headers like CSP and HSTS are critical for preventing XSS and MITM attacks.
                        </p>
                    </div>
                </div>

                <button
                    onClick={startDemo}
                    className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transition-all transform hover:-translate-y-1"
                >
                    Launch Vulnerable Simulation
                </button>

                <p className="text-xs text-gray-500 mt-4">
                    * Data shown in the simulation is static and generated server-side.
                </p>
            </motion.div>
        </div>
    );
};

export default Demo;
