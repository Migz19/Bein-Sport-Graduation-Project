"use client";
import React, { useEffect, useState } from "react";
import Header from "../../app/components/header/page";
import Head from "../../app/components/head/page";
import styles from "./page.module.css";
import Footer from "../components/footer/page";
import { useRouter } from "next/navigation";

interface Match {
  championship: string;
  team1: string;
  possT1: string;
  team2: string;
  possT2: string;
  year: number;
  description?: string;
}

export default function Dashboard() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const userId = localStorage.getItem("userId");
  const possession = localStorage.getItem("possessionData");

  if (!userId) {
    alert("Please login first");
    router.push("/components/Login");
    return;
  }

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`https://backstatzone.runasp.net/Match/display-matches?userId=${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch matches");
        }

        const data = await response.json();
        setMatches(data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Display possession from localStorage as colored bars
  const renderPossessionBars = () => {
    if (!matches || matches.length === 0) return null;

    // Show the last match possession as a visual example
    const lastMatch = matches[matches.length - 1];
    var team1Poss = 0, team2Poss = 0;

    if (possession !== null) {
      try {
        const parsedData = JSON.parse(possession);
        // Use the correct property names that match what we save in possession/page.tsx
        team1Poss = parsedData.possT1 || 0;
        team2Poss = parsedData.possT2 || 0;
        
        console.log('Dashboard - Parsed possession data:', parsedData);
        console.log('Dashboard - Team possession values:', { team1Poss, team2Poss });
      } catch (error) {
        console.error('Error parsing possession data:', error);
        // Fallback to database values if localStorage parsing fails
        team1Poss = parseInt(lastMatch.possT1) || 0;
        team2Poss = parseInt(lastMatch.possT2) || 0;
      }
    } else {
      // Fallback to database values if no localStorage data
      team1Poss = parseInt(lastMatch.possT1) || 0;
      team2Poss = parseInt(lastMatch.possT2) || 0;
    }

    return (
      <div className="mb-8 p-8 rounded-xl shadow-lg border-2 border-gray-600" style={{ backgroundColor: 'black !important' }}>

        {/* Title section */}
        {/* <div className="mb-6">
          <h2 className="text-l font-bold text-center text-indigo-800">
            Latest Match Possession Analysis
          </h2>
        </div> */}
        {/* Rest of the content remains the same */}
        {/* Match title */}
        <div className="mb-4 text-center">
          <h3 className="text-lg" style={{ color: 'white' }}>
            <span className="font-bold" style={{ color: '#93c5fd' }}>{lastMatch.team1}</span>
            <span className="mx-2" style={{ color: '#d1d5db' }}>vs</span>
            <span className="font-bold" style={{ color: '#fdba74' }}>{lastMatch.team2}</span>
          </h3>
        </div>

        <div className="text-center mb-4">
          <span className="px-3 py-1 rounded-md text-sm font-medium" style={{ backgroundColor: '#374151', color: 'white' }}>
            Championship: {lastMatch.championship} ({lastMatch.year})
          </span>
          {/* <span className="ml-2 text-sm text-gray-500"></span> */}
        </div>

        {/* Team 1 possession */}
        <div className="flex items-center mb-6">
          <span className="w-32 font-semibold text-right pr-4" style={{ color: '#93c5fd' }}>{lastMatch.team1}: {team1Poss}%</span>
          {/* <div className="flex-1 h-12 bg-indigo-100 rounded-lg overflow-hidden flex shadow-inner">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-full flex items-center justify-end pr-3 text-white font-bold shadow-md"
              style={{ width: `${team1Poss}%` }}
            >
              {team1Poss}%
            </div>
          </div> */}
        </div>

        {/* Team 2 possession */}
        <div className="flex items-center">
          <span className="w-32 font-semibold text-right pr-4" style={{ color: '#fdba74' }}>{lastMatch.team2}: {team2Poss}%</span>
          {/* <div className="flex-1 h-12 bg-orange-100 rounded-lg overflow-hidden flex shadow-inner">
            <div 
              className="bg-gradient-to-r from-orange-400 to-orange-500 h-full flex items-center justify-end pr-3 text-white font-bold shadow-md"
              style={{ width: `${team2Poss}%` }}
            >
              {team2Poss}%
            </div>
          </div> */}
        </div>
      </div>
    );
  };

  // Function to dynamically select championship color
  const getChampionshipColor = (championship: string) => {
    const colors = {
      default: { bg: "bg-gray-100", text: "text-gray-800" },
      "Premier League": { bg: "bg-purple-100", text: "text-purple-800" },
      "La Liga": { bg: "bg-red-100", text: "text-red-800" },
      "Serie A": { bg: "bg-blue-100", text: "text-blue-800" },
      "Bundesliga": { bg: "bg-yellow-100", text: "text-yellow-800" },
      "Champions League": { bg: "bg-indigo-100", text: "text-indigo-800" },
      "World Cup": { bg: "bg-green-100", text: "text-green-800" }
    };

    // Check if the championship exists in our color mapping
    const key = Object.keys(colors).find(k =>
      championship.toLowerCase().includes(k.toLowerCase())
    );

    return key ? colors[key as keyof typeof colors] : colors.default;
  };

  return (
    <>
      <Head />
      <Header />
      <div className={`${styles.dashboardPage} px-0 py-8 max-w-full mx-auto`}>
        <div className="px-6 md:px-12 lg:px-16 xl:px-20">
          <h1 className="text-3xl font-bold text-center mb-8 text-indigo-800">Match Dashboard</h1>

          {/* Possession visualization */}
          {renderPossessionBars()}

          {/* Match data table */}
          <div className="overflow-x-auto rounded-lg shadow-lg border-2 border-indigo-200 w-full">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider border-r border-indigo-400" style={{ width: "30%" }}>Possession</th>
                  <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider border-r border-indigo-400" style={{ width: "20%" }}>Championship</th>
                  <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider border-r border-indigo-400" style={{ width: "15%" }}>Year</th>
                  <th className="px-6 py-4 text-center text-sm font-medium uppercase tracking-wider" style={{ width: "35%" }}>Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-indigo-200">
                {matches.length > 0 ? (
                  matches.map((match, index) => {
                    const champColors = getChampionshipColor(match.championship);
                    return (
                      <tr
                        key={index}
                        className={`bg-indigo-50 hover:bg-indigo-100 transition-colors duration-150`}
                      >
                        <td className="px-6 py-4 text-center text-black border-r border-indigo-100">
                          <div className="mb-2">
                            <span className="font-medium">{match.team1}:</span>
                            <span className="ml-2 px-3 py-1 bg-indigo-500 text-white rounded-full text-xs font-semibold">
                              {match.possT1}%
                            </span>
                          </div>
                          <div>
                            <span className="font-medium">{match.team2}:</span>
                            <span className="ml-2 px-3 py-1 bg-orange-500 text-white rounded-full text-xs font-semibold">
                              {match.possT2}%
                            </span>
                          </div>
                        </td>
                        <td className={`px-6 py-4 font-medium ${champColors.bg} ${champColors.text} border-r border-indigo-100`}>
                          {match.championship}
                        </td>
                        <td className="px-6 py-4 text-center text-black border-r border-indigo-100 bg-indigo-50">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md">
                            {match.year}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center text-black bg-indigo-50">
                          {match.description || "N/A"}
                        </td>
                        {/* <td className="px-6 py-4 text-center text-black bg-indigo-50">
                          {match.description || "N/A"}
                        </td> */}
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-4 text-center text-indigo-600 bg-indigo-50">
                      No matches found. Upload a match to get started.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}