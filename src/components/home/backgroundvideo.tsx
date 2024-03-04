import React from 'react';

interface BackgroundVideoProps {
    source: string;
    children: React.ReactNode;
}

const BackgroundVideo: React.FC<BackgroundVideoProps> = ({ source, children }) => {
    return (
        <div className='relative w-full h-[600px] overflow-hidden'>
            <video
                autoPlay
                disablePictureInPicture
                loop
                muted
                className='absolute w-auto min-w-full min-h-full max-w-none'
                style={{ 
                    transform: 'translate(-50%, -50%)', top: '50%', left: '50%',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }}
            >    
                <source src={source} type='video/mp4' />
                Your browser does not support video
            </video>
            <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-30"></div>
            <div className='absolute top-0 right-0 bottom-0 left-0 flex justify-center items-center text-white text-center'>
                {children}
            </div>
            
        </div>
    )
}

export default BackgroundVideo;