'use client'

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function PossessionDisplay({ team1Possession, team2Possession }) {
    return (
        <div style={{ backgroundColor: 'white', padding: '10px', borderRadius: '8px' }}>
            <h3>Team 1 Possession: {team1Possession}%</h3>
            <h3>Team 2 Possession: {team2Possession}%</h3>
        </div>
    );
}

function SpLoading() {
    const router = useRouter();
    const [text, setText] = useState("Processing...");
    const [loading, setLoading] = useState(true);
    const [possessionData, setPossessionData] = useState(null);

    useEffect(() => {
        const checkForData = () => {
            const data = localStorage.getItem("possession");
            console.info("Data:", data);
            if (data) {
                try {
                    const parsedData = JSON.parse(data);
                    
                    // Handle different data formats
                    const formattedData = {
                        team1Possession: parsedData.team1Possession ?? parsedData[0] ?? 50,
                        team2Possession: parsedData.team2Possession ?? parsedData[1] ?? 50
                    };

                    setPossessionData(formattedData);
                    localStorage.removeItem("possessionData");
                    return true;
                } catch (error) {
                    console.error("Error parsing possession data:", error);
                    setPossessionData({ team1Possession: 50, team2Possession: 50 });
                    return true;
                }
            }
            return false;
        };

        if (checkForData()) return;

        const interval = setInterval(checkForData, 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (possessionData !== null) {
            setText("Possession is calculated");
            setLoading(false);
        }
    }, [possessionData]);

    const team1Possession = Number(possessionData?.team1Possession) || 50;
    const team2Possession = Number(possessionData?.team2Possession) || 50;

    return (
        <div className="text-center">
            {loading ? (
                <img src="/images/loading.gif" alt="Loading..." />
            ) : (
                <>
                    <h3>{text}</h3>
                    <PossessionDisplay 
                        team1Possession={team1Possession} 
                        team2Possession={team2Possession} 
                    />
                </>
            )}
        </div>
    );
}

export default SpLoading;