import React from 'react';
import { ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="p-4 border-b border-white/10 bg-secondary/30 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-2 group">
                    <div className="p-2 bg-accent/10 rounded-lg group-hover:bg-accent/20 transition-colors">
                        <ShieldCheck className="w-8 h-8 text-accent" />
                    </div>
                    <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">
                        Datada
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link to="/" className="text-sm font-medium hover:text-accent transition-colors">
                        Scanner
                    </Link>
                    <Link to="/demo" className="text-sm font-medium hover:text-accent transition-colors">
                        Demo Lab
                    </Link>
                    <a href="#" className="text-sm font-medium text-gray-500 cursor-not-allowed">
                        Documentation
                    </a>
                </nav>
            </div>
        </header>
    );
};

export default Header;
