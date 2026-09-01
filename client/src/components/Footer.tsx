import React from 'react';
import { Shield, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="relative border-t border-white/5 bg-black/20 backdrop-blur-md pt-16 pb-8 overflow-hidden z-10">
            {/* Decorative gradients */}
            <div className="absolute top-0 left-1/4 w-96 h-1 bg-gradient-to-r from-transparent via-neon-blue to-transparent opacity-50"></div>

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2 space-y-4">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="relative p-2 bg-gradient-to-br from-white/10 to-transparent border border-white/10 rounded-lg group-hover:border-neon-blue/50 transition-colors">
                                <Shield className="w-5 h-5 text-neon-blue" />
                            </div>
                            <span className="text-xl font-black tracking-widest text-white">
                                DATA<span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-purple">DA</span>
                            </span>
                        </Link>
                        <p className="text-gray-400 text-sm max-w-sm leading-relaxed">
                            Advanced non-intrusive web reconnaissance for security researchers and educational purposes.
                            Built to visualize the invisible layers of the web.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider text-sm uppercase">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><Link to="/" className="hover:text-neon-blue transition-colors">Scanner</Link></li>
                            <li><Link to="/demo" className="hover:text-neon-blue transition-colors">Demo Lab</Link></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">API (Coming Soon)</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">CLI Tool</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-white font-bold tracking-wider text-sm uppercase">Legal & Ethical</h4>
                        <ul className="space-y-2 text-sm text-gray-500">
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-neon-blue transition-colors">Responsible Disclosure</a></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-600">
                        © 2026 Datada Security. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Github className="w-4 h-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Twitter className="w-4 h-4" /></a>
                        <a href="#" className="text-gray-500 hover:text-white transition-colors"><Linkedin className="w-4 h-4" /></a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
