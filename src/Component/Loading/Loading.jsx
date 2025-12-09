import React from 'react';

const Loading = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-white/50 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4 animate-fadeIn">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="text-primary font-semibold tracking-wide">Loading...</p>
            </div>
        </div>
    );
};

export default Loading;
