import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const MainLoader: React.FC = () => {
    const wave1Ref = useRef<SVGSVGElement>(null);
    const wave2Ref = useRef<SVGSVGElement>(null);
    const clipRef = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(0);

    // Move waves horizontally
    useEffect(() => {
        gsap.to(wave1Ref.current, {
            x: "-50%",
            repeat: -1,
            duration: 4,
            ease: "linear",
        });

        gsap.to(wave2Ref.current, {
            x: "-50%",
            repeat: -1,
            duration: 6,
            ease: "linear",
        });
    }, []);

    // Simulate loading progress
    useEffect(() => {
        const interval = setInterval(() => {
            setLoading((prev) => {
                if (prev >= 170) {
                    clearInterval(interval);
                    return 170;
                }
                return prev + 1;
            });
        }, 20);

        return () => clearInterval(interval);
    }, []);

    // Animate clip height
    useEffect(() => {
        if (clipRef.current) {
            gsap.to(clipRef.current, {
                y: 170 - loading, // Fully fills the circle
                duration: 0.1,
                ease: "power1.out",
            });
        }
    }, [loading]);

    return (
        <div className="flex items-center justify-center h-screen bg-white">
            <div className="relative w-48 h-48 rounded-full overflow-hidden bg-gray-200 shadow-md">
                <div ref={clipRef} className="absolute bottom-0 left-0 w-[150%] h-[150%] overflow-hidden">
                    {/* back ripple */}
                    <svg
                        ref={wave1Ref}
                        className="absolute bottom-0 left-0 w-[300%] h-[150%] overflow-hidden scale-y-[-1]"
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="
             M0 15 
                        Q 2.5 13, 5 15.2 
                        T 10 15.2
                        T 15 15.2
                        T 20 15.5
                        T 25 15.2
                        T 30 15.1
                        T 35 15.2
                        T 40 15
                        T 45 15
                        T 50 15.2
                        T 55 15
                        T 60 15
                        T 65 15
                        T 70 15
                        T 75 15
                        T 80 15
                        T 85 15
                        T 90 15
                        T 95 15
                        T 100 15
                        V 0 H 0 Z
          "
                            fill="#8d9440"
                        />
                    </svg>
                    {/* Larger Ripple 2 front ripple */}
                    <svg
                        ref={wave2Ref}
                        className="absolute bottom-0 left-0 w-[300%] h-[150%] overflow-hidden scale-y-[-1] "
                        viewBox="0 0 100 30"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="
                             M0 15 
                             Q 2.5 12.5, 5 15 
                             T 10 15
                             T 15 15
                             T 20 15
                             T 25 15
                             T 30 15
                             T 35 15
                             T 40 15
                             T 45 15
                             T 50 15
                             T 55 15
                             T 60 15
                             T 65 15
                             T 70 15
                             T 75 15
                             T 80 15
                             T 85 15
                             T 90 15
                             T 95 15
                             T 100 15
                             V 0 H 0 Z
                         "
                            fill="#d7ff7b"
                        />
                    </svg>
                </div>

                {/* Loading text */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                    <p className="text-gray-700 font-semibold text-lg">Loading...</p>
                </div>
            </div>
        </div>
    );
};

export default MainLoader;
