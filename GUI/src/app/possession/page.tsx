"use client";
import React, { useState, useRef, useEffect } from "react";
import Header from "../components/header/page";
import Head from "../components/head/page";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import SpLoading from "../components/spinnerLoading/spinnerLoading";

interface AddMatchDto {
  userId: string;
  championship: string;
  team1: string;
  possT1: number;
  team2: string;
  possT2: number;
  year: number;
  description?: string;
}

const teams_jersey_colors = {
  "FC Barcelona": [[0, 0, 139], [178, 34, 34], [255, 215, 0]],
  "Real Madrid": [[255, 255, 255], [0, 0, 139], [128, 128, 128]],
  "Manchester United": [[220, 20, 60], [255, 255, 255], [0, 0, 0]],
  "Manchester City": [[135, 206, 235], [0, 0, 128], [0, 0, 0]],
  "Liverpool": [[200, 16, 46], [255, 255, 255], [0, 100, 0]],
  "Chelsea": [[0, 0, 205], [255, 255, 0], [255, 255, 255]],
  "Arsenal": [[255, 0, 0], [255, 255, 255], [255, 215, 0]],
  "Tottenham Hotspur": [[255, 255, 255], [0, 0, 128], [135, 206, 235]],
  "Bayern Munich": [[220, 20, 60], [255, 255, 255], [0, 0, 0]],
  "Borussia Dortmund": [[255, 215, 0], [0, 0, 0], [255, 69, 0]],
  "PSG": [[0, 0, 139], [220, 20, 60], [255, 192, 203]],
  "Juventus": [[255, 255, 255], [0, 0, 0], [0, 0, 255]],
  "AC Milan": [[139, 0, 0], [0, 0, 0], [255, 255, 255]],
  "Inter Milan": [[0, 0, 205], [0, 0, 0], [255, 255, 255]],
  "AS Roma": [[128, 0, 0], [255, 255, 0], [255, 255, 255]],
  "Napoli": [[135, 206, 235], [0, 0, 139], [0, 0, 0]],
  "Atletico Madrid": [[255, 0, 0], [255, 255, 255], [0, 0, 139]],
  "Sevilla": [[255, 255, 255], [220, 20, 60], [0, 0, 0]],
  "Ajax": [[255, 255, 255], [220, 20, 60], [0, 0, 0]],
  "FC Porto": [[0, 0, 205], [255, 255, 255], [255, 215, 0]],
  "Benfica": [[255, 0, 0], [255, 255, 255], [0, 0, 0]],
  "Sporting CP": [[0, 128, 0], [255, 255, 255], [0, 0, 0]],
  "Galatasaray": [[220, 20, 60], [255, 215, 0], [0, 0, 0]],
  "Fenerbahçe": [[255, 255, 0], [0, 0, 139], [255, 255, 255]],
  "Celtic": [[0, 128, 0], [255, 255, 255], [255, 255, 0]],
  "Rangers": [[0, 0, 205], [255, 255, 255], [255, 0, 0]],
  "Lyon": [[255, 255, 255], [0, 0, 139], [255, 0, 0]],
  "Marseille": [[255, 255, 255], [135, 206, 250], [0, 0, 128]],
  "Bayer Leverkusen": [[220, 20, 60], [0, 0, 0], [192, 192, 192]],
  "RB Leipzig": [[255, 255, 255], [255, 0, 0], [0, 0, 0]],
  "Real Betis": [[0, 128, 0], [255, 255, 255], [0, 100, 0]],
  "Elche CF": [[255, 255, 255], [0, 128, 0], [0, 0, 0]]
};

function Possession() {
  const router = useRouter();
  const [league, setLeague] = useState("");
  const [round, setRound] = useState("");
  const [matchDate, setMatchDate] = useState("");
  const [teamA, setTeamA] = useState("");
  const [teamB, setTeamB] = useState("");
  const [otherNotes, setOtherNotes] = useState("");
  const [selectedTeamA, setSelectedTeamA] = useState("");
  const [selectedTeamB, setSelectedTeamB] = useState("");
  const [showCustomTeams, setShowCustomTeams] = useState(false);
  const [teams, setTeams] = useState([
    { name: "Team A", possession: 0 },
    { name: "Team B", possession: 0 },
  ]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [videoId, setVideoId] = useState<string | null>(null);
  const [fieldVideoUrl, setFieldVideoUrl] = useState<string | null>(null);
  const [team1_name, setTeam1_name] = useState<string | null>(null);
  const [team2_name, setTeam2_name] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);
  const [downloadingField, setDownloadingField] = useState(false);
  const [processingComplete, setProcessingComplete] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [possessionData, setPossessionData] = useState({ possT1: 0, possT2: 0 });
  const [subPossessions, setSubPossessions] = useState<number[]>([0, 0, 0, 0]);
  const [showDetailedPossession, setShowDetailedPossession] = useState(false);
  const teamsColorRef = useRef<number[][]>([[], []]);
  const hiddenFileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const sizeInMB = file ? Math.round((file.size / (1024 * 1024)) * 100) / 100 : 0;

  // Event handlers
  const handleUploadButtonClick = () => {
    hiddenFileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setVideoId(null);
      setProcessingComplete(false);
      setVideoError(null);
      setVideoUrl(null);
      setFieldVideoUrl(null);
      
      // Reset teams to initial state when new file is uploaded
      setTeams([
        { name: "Team A", possession: 0 },
        { name: "Team B", possession: 0 },
      ]);
      setPossessionData({ possT1: 0, possT2: 0 });
    }
  };

  
  const handleTeamAChange = (value: string) => {
    setSelectedTeamA(value);
    if (value === "Others") {
      setShowCustomTeams(true);
      setTeamA("");
    } else {
      setShowCustomTeams(false);
      setTeamA(value);
    }
  };

  const handleTeamBChange = (value: string) => {
    setSelectedTeamB(value);
    if (value === "Others") {
      setShowCustomTeams(true);
      setTeamB("");
    } else {
      setShowCustomTeams(false);
      setTeamB(value);
    }
  };

  const downloadVideo = async () => {
    if (!videoId) return;

    const localVideoUrl = localStorage.getItem("videoUrl");
    if (!localVideoUrl) {
      try {
        setDownloading(true);
        const response = await fetch(
          `https://labrador-fresh-eminently.ngrok-free.app/download-video/${videoId}`
          // `http://127.0.0.1:5001/download-video/${videoId}`
        );

        if (!response.ok) throw new Error('Failed to download video');
      } catch (error) {
        console.error('Download error:', error);
        alert('Download failed. Please try again.');
      }
    }

    const finalTeamA = selectedTeamA === "Others" ? teamA : selectedTeamA;
    const finalTeamB = selectedTeamB === "Others" ? teamB : selectedTeamB;

    const a = document.createElement('a');
    a.href = localVideoUrl || "";
    a.download = `processed_${finalTeamA || 'TeamA'}_vs_${finalTeamB || 'TeamB'}.mp4`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    setDownloading(false);
  };

  const downloadFieldVideo = async () => {
    if (!fieldVideoUrl) return;

    try {
      setDownloadingField(true);
      
      const finalTeamA = team1_name || selectedTeamA || (selectedTeamA === "Others" ? teamA : "Team A");
      const finalTeamB = team2_name || selectedTeamB || (selectedTeamB === "Others" ? teamB : "Team B");

      const a = document.createElement('a');
      a.href = fieldVideoUrl;
      a.download = `field_${finalTeamA}_vs_${finalTeamB}.mp4`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

    } catch (error) {
      console.error('Field video download error:', error);
      alert('Field video download failed. Please try again.');
    } finally {
      setDownloadingField(false);
    }
  };

  const saveMatch = async (videoId: string, possT1: number, possT2: number) => {
    if (!videoId) return;

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      router.push("/components/Login");
      return;
    }

    // const finalTeamA = selectedTeamA === "Others" ? teamA : selectedTeamA;
    // const finalTeamB = selectedTeamB === "Others" ? teamB : selectedTeamB;

    const finalTeamA = team1_name || selectedTeamA;
    const finalTeamB = team2_name || selectedTeamB;

    if (!finalTeamA || !finalTeamB) {
      alert("Please select the teams.");
      return;
    }

    // Save match data
    const matchData: AddMatchDto = {
      userId,
      championship: league,
      team1: finalTeamA,
      possT1: Math.round(possT1),
      possT2: Math.round(possT2),
      team2: finalTeamB,
      year: matchDate ? new Date(matchDate).getFullYear() : new Date().getFullYear(),
      description: `Round: ${round}, Notes: ${otherNotes}`,
    };


    try {
      const matchRes = await fetch("https://backstatzone.runasp.net/Match/add-match", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(matchData),
      });

      if (!matchRes.ok) {
        const errorData = await matchRes.json();
        console.warn("Match save warning:", errorData);
      }
      // router.push("/dashboard");

    } catch (err: any) {
      // go to home page
      // router.push("/"); 
      console.error(err.message || "An error occurred during saving match data");
    }
  };

  const calculatePossession = async () => {
    if (!file) {
      alert("Please upload a video first.");
      return;
    }

    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("Please login first.");
      router.push("/components/Login");
      return;
    }

    setLoading(true);
    setProcessingComplete(false);
    setVideoError(null);

    const formData = new FormData();
    formData.append("video", file);
    formData.append("team1", selectedTeamA === "Others" ? teamA : selectedTeamA);
    formData.append("team2", selectedTeamB === "Others" ? teamB : selectedTeamB);

    try {
      const res = await fetch("https://labrador-fresh-eminently.ngrok-free.app/process-video/", {
        // const res = await fetch("http://127.0.0.1:5001/process-video/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to process video");
      }

      const resData = await res.json();
      console.log('Processing response:', resData);

      if (!resData.videoUrl || !resData.videoId) {
        throw new Error("Invalid response from server");
      }
      setTeam1_name(resData.team1);
      setTeam2_name(resData.team2);
      teamsColorRef.current[0] = [resData.team1_colorR, resData.team1_colorG, resData.team1_colorB];
      teamsColorRef.current[1] = [resData.team2_colorR, resData.team2_colorG, resData.team2_colorB];

      setVideoId(resData.videoId);
      setVideoUrl(resData.videoUrl);
      localStorage.setItem("videoUrl", resData.videoUrl);
      
      // Set field video URL if available
      if (resData.fieldVideoUrl) {
        setFieldVideoUrl(resData.fieldVideoUrl);
        localStorage.setItem("fieldVideoUrl", resData.fieldVideoUrl);
      }

      // Handle possession data
      const possessionArray = resData.possession;
      if (!possessionArray?.length) {
        throw new Error("No possession data available");
      }

      // calculate possession every quarter of the possessionArray strating from first element not equal to 0 in both teams
      const startIndex = possessionArray.findIndex(
        (data: { possT1: number; possT2: number }) => data.possT1 !== 0 || data.possT2 !== 0
      );
      if (startIndex === -1) {
        throw new Error("No valid possession data found");
      }
      const possessionArrayExistedSlice = possessionArray.slice(startIndex);
      // if (possessionArrayExistedSlice.length < 2) {
      //   throw new Error("Not enough possession data to calculate");
      // }
      const possessionArrayLength = possessionArrayExistedSlice.length;
      const newSubPossessions = [
        possessionArrayExistedSlice[Math.floor(possessionArrayLength / 4)]?.possT1 ?? 0,
        possessionArrayExistedSlice[Math.floor(possessionArrayLength / 2)]?.possT1 ?? 0,
        possessionArrayExistedSlice[Math.floor(possessionArrayLength * 3 / 4)]?.possT1 ?? 0,
        possessionArrayExistedSlice[possessionArrayLength - 1]?.possT1 ?? 0
      ];
      setSubPossessions(newSubPossessions);

      const newPossessionData = possessionArray[possessionArray.length - 1];
      if (!newPossessionData) {
        throw new Error("Invalid possession data format");
      }
      
      const newPossT1 = Math.round(newPossessionData.possT1);
      const newPossT2 = Math.round(newPossessionData.possT2);
      
      console.log('New possession values:', { newPossT1, newPossT2 });
      console.log('Team names from response:', { team1_name: resData.team1, team2_name: resData.team2 });
      
      setPossessionData({
        possT1: newPossT1,
        possT2: newPossT2
      });
      
        // final teams names
      const finalTeamA = resData.team1 || selectedTeamA || (selectedTeamA === "Others" ? teamA : "Team A");
      const finalTeamB = resData.team2 || selectedTeamB || (selectedTeamB === "Others" ? teamB : "Team B");
      
      console.log('Final team names:', { finalTeamA, finalTeamB });
      
      const updatedTeams = [
        { name: finalTeamA, possession: newPossT1 },
        { name: finalTeamB, possession: newPossT2 }
      ];
      
      console.log('Updated teams:', updatedTeams);
      
      setTeams(updatedTeams);
      setProcessingComplete(true);
      
      // Save possession data to localStorage
      const possessionDataToStore = {
        possT1: newPossT1,
        possT2: newPossT2,
        team1: finalTeamA,
        team2: finalTeamB,
        subPossessions: newSubPossessions,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem("possessionData", JSON.stringify(possessionDataToStore));
      
      // Save match with the correct possession values
      saveMatch(resData.videoId, newPossT1, newPossT2);

    } catch (err: any) {
      console.error("Processing error:", err);
      setVideoError(err.message || "An error occurred during processing");
    } finally {
      setLoading(false);
    }
  };

  // Video event handlers
  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement || !videoUrl) return;

    const handleLoadStart = () => setIsVideoLoading(true);
    const handleLoadedData = () => setIsVideoLoading(false);
    const handleError = () => {
      setVideoError('Failed to load video. Please try reloading.');
      setIsVideoLoading(false);
    };

    videoElement.addEventListener('loadstart', handleLoadStart);
    videoElement.addEventListener('loadeddata', handleLoadedData);
    videoElement.addEventListener('error', handleError);

    return () => {
      videoElement.removeEventListener('loadstart', handleLoadStart);
      videoElement.removeEventListener('loadeddata', handleLoadedData);
      videoElement.removeEventListener('error', handleError);
    };
  }, [videoUrl]);

  return (
    <>
      <Head />
      <Header />
      <div className={styles.possessionPage}>
        <div className={styles.possessionContainer}>
          <h1 className={styles.possessionHeading}>Possession Calculation</h1>

          {/* Match Info Form */}
          <div className={styles.matchInfo}>
            <div className={styles.leftCol}>
              {/* Team A Selector */}
              <div className={styles.formGroup}>
                <label htmlFor="teamASelect">Team A</label>
                <select
                  id="teamASelect"
                  value={selectedTeamA}
                  onChange={(e) => handleTeamAChange(e.target.value)}
                  className={styles.matchInput}
                >
                  <option value="">Choose Team</option>
                  {Object.keys(teams_jersey_colors).map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                  <option value="Others">Other Team</option>
                </select>
              </div>

              {/* Custom Team A Input */}
              {showCustomTeams && (
                <div className={styles.formGroup}>
                  <label htmlFor="teamACustom">Custom Team A</label>
                  <input
                    id="teamACustom"
                    type="text"
                    value={teamA}
                    onChange={(e) => setTeamA(e.target.value)}
                    className={styles.matchInput}
                    placeholder="Enter Team Name"
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="league">League</label>
                <input
                  id="league"
                  type="text"
                  value={league}
                  onChange={(e) => setLeague(e.target.value)}
                  className={styles.matchInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="date">Date</label>
                <input
                  id="date"
                  type="date"
                  value={matchDate}
                  onChange={(e) => setMatchDate(e.target.value)}
                  className={styles.matchInput}
                />
              </div>
            </div>

            <div className={styles.rightCol}>
              {/* Team B Selector */}
              <div className={styles.formGroup}>
                <label htmlFor="teamBSelect">Team B</label>
                <select
                  id="teamBSelect"
                  value={selectedTeamB}
                  onChange={(e) => handleTeamBChange(e.target.value)}
                  className={styles.matchInput}
                >
                  <option value="">Choose Team</option>
                  {Object.keys(teams_jersey_colors).map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                  <option value="Others">Other Team</option>
                </select>
              </div>

              {/* Custom Team B Input */}
              {showCustomTeams && (
                <div className={styles.formGroup}>
                  <label htmlFor="teamBCustom">Custom Team B</label>
                  <input
                    id="teamBCustom"
                    type="text"
                    value={teamB}
                    onChange={(e) => setTeamB(e.target.value)}
                    className={styles.matchInput}
                    placeholder="Enter Team Name"
                  />
                </div>
              )}

              <div className={styles.formGroup}>
                <label htmlFor="round">Round</label>
                <input
                  id="round"
                  type="text"
                  value={round}
                  onChange={(e) => setRound(e.target.value)}
                  className={styles.matchInput}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="otherNotes">Other Notes</label>
                <textarea
                  id="otherNotes"
                  value={otherNotes}
                  onChange={(e) => setOtherNotes(e.target.value)}
                  className={styles.matchTextarea}
                />
              </div>
            </div>
          </div>

          {/* Video Upload Section */}
          <div className={styles.uploadSection}>
            <button className={styles.uploadBtn} onClick={handleUploadButtonClick}>
              Upload a Video
            </button>
            <input
              ref={hiddenFileInputRef}
              type="file"
              accept="video/mp4,video/webm,video/ogg"
              className={styles.hiddenFileInput}
              onChange={handleFileUpload}
            />
            {file && (
              <div className={styles.fileInfo}>
                <span>{file.name} ({sizeInMB} MB)</span>
              </div>
            )}
          </div>

          {/* Processing Button */}
          <button
            className={styles.calculateBtn}
            onClick={calculatePossession}
            disabled={loading || !file}
          >
            {loading ? <SpLoading /> : "Calculate Possession"}
          </button>

          {/* Results Section */}
          {processingComplete && videoUrl && (
            <div className={styles.resultsSection}>
              <h2 className={styles.resultsHeading}>Results</h2>

              {/* Possession Display */}
              <div className={styles.possessionResults}>
                {teams.map((team, index) => (
                  <div key={index} className={styles.teamResult} style={{ display: 'flex', alignItems: 'stretch', width: '100%' }}>
                    {/* Left colored quarter */}
                    <div
                      style={{
                        width: '25%',
                        background: `rgb(${teamsColorRef.current[index][0] || 0},${teamsColorRef.current[index][1] || 0},${teamsColorRef.current[index][2] || 0})`,
                        borderTopLeftRadius: 8,
                        borderBottomLeftRadius: 8,
                      }}
                    />
                    {/* Right content */}
                    <div
                      style={{
                        width: '75%',
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0 12px',
                        background: '#fff',
                        borderTopRightRadius: 8,
                        borderBottomRightRadius: 8,
                        border: '1px solid #eee',
                        borderLeft: 'none',
                      }}
                    >
                      <span className={styles.teamName} style={{ marginRight: 8 }}>{team.name}</span>
                      <span className={styles.teamPossession}>{team.possession}%</span>
                    </div>
                  </div>
                ))}
              </div>


              {/* Video Player */}
              <div className={styles.videoContainer}>

                <video
                  controls
                  src={videoUrl || ""}
                  ref={videoRef}
                  playsInline
                  preload="auto"
                  style={{ width: '100%' }}
                >
                  Your browser does not support the video tag.
                </video>

                <div>
                  <button
                    className={styles.calculateBtn}
                    style={{ marginTop: '16px', marginBottom: '8px' }}
                    onClick={() => setShowDetailedPossession((prev) => !prev)}
                  >
                    {showDetailedPossession ? 'Hide Detailed Possession' : 'Detailed Possession'}
                  </button>
                  {showDetailedPossession && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '8px' }}>
                      {(() => {
                        // final teams names
                        const finalTeamA = team1_name || selectedTeamA;
                        const finalTeamB = team2_name || selectedTeamB;
                        
                        return subPossessions.map((value, idx) => (
                          <div
                            key={idx}
                            style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              marginBottom: '12px',
                              width: '100%',
                            }}
                          >
                            <div
                              style={{
                                textAlign: 'center',
                                width: '100%',
                                fontWeight: 500,
                                marginBottom: 4,
                              }}
                            >
                              Quarter {idx + 1}
                            </div>
                            <div className={styles.possessionResults} style={{ width: '100%' }}>
                              <div className={styles.teamResult}>
                                <span className={styles.teamName}>{finalTeamA || 'Team A'}</span>
                                <span className={styles.teamPossession}>{value.toFixed(2)}%</span>
                              </div>
                              <div className={styles.teamResult}>
                                <span className={styles.teamName}>{finalTeamB || 'Team B'}</span>
                                <span className={styles.teamPossession}>{(100 - value).toFixed(2)}%</span>
                              </div>
                            </div>
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>

                {/* <div> */}
                {/* <a className={styles.calculateBtn} href="/dashboard">
                    Display dashboard
                  </a> */}
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: '16px' }}>
                  <button
                    onClick={downloadVideo}
                    className={styles.calculateBtn}
                    disabled={downloading}
                  >
                    {downloading ? 'Downloading...' : 'Download Match Video'}
                  </button>
                  {fieldVideoUrl && (
                    <button
                      onClick={downloadFieldVideo}
                      className={styles.calculateBtn}
                      disabled={downloadingField}
                    >
                      {downloadingField ? 'Downloading Field Video...' : 'Download Field Video'}
                    </button>
                  )}
                </div>
                <button
                  onClick={() => router.push("/dashboard")}
                  className={styles.calculateBtn}
                >
                  Go to Dashboard  
                </button>
                {/* </div> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Possession;