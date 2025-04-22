import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppService } from "./customHooks/appHook";
import { useViewFile } from "./customHooks/viewPublicHook";
import { FaEye } from "react-icons/fa";
import { crudFunctions } from "./blackboard_backend/crud_file";
import { canvasInfo } from "./globalTool";
function ViewPublic() {
  const { appService, setAppService } = useAppService();
  const { viewid, setviewid } = useViewFile();
  const [loading, setLoading] = useState(true);
  const [files, setFiles] = useState([]);
  const [loadingProgress, setLoadingProgress] = useState(0);

  async function getpublicfiles() {
    console.log("viewid:", viewid);
    try {
      // Simulate loading progress
      const loadingInterval = setInterval(() => {
        setLoadingProgress(prev => {
          const newProgress = prev + Math.random() * 15;
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 150);
      
      const response = await axios.get("http://localhost:5000/getpublicfiles", {
        params: { viewid },
      });
      
      setFiles(response.data.public || []);
      setLoadingProgress(100);
      clearInterval(loadingInterval);
      
      // Short delay before removing loading screen
      setTimeout(() => {
        setLoading(false);
      }, 300);
    } catch (err) {
      console.error("Error fetching public files:", err);
      setLoadingProgress(100);
      setLoading(false);
    }
  }

  useEffect(() => {
    getpublicfiles();
  }, []);

  if (loading) {
    return (
      <div className="loading-container" style={{ 
        display: "flex", 
        flexDirection: "column", 
        alignItems: "center", 
        justifyContent: "center", 
        height: "70vh",
        width: "100%"
      }}>
        <div style={{ 
          color: "#2f80ed", 
          fontSize: "1.5rem", 
          marginBottom: "1rem",
          fontWeight: "500"
        }}>
          Fetching Public Files
        </div>
        
        <div style={{ 
          width: "60%", 
          maxWidth: "600px", 
          background: "#222", 
          borderRadius: "8px", 
          overflow: "hidden", 
          height: "8px",
        }}>
          <div style={{ 
            width: `${loadingProgress}%`, 
            height: "100%", 
            background: "linear-gradient(90deg, #2f80ed, #56ccf2)", 
            borderRadius: "8px",
            transition: "width 0.3s ease",
            boxShadow: "0 0 10px rgba(47, 128, 237, 0.5)",
          }}></div>
        </div>
        
        <div style={{ 
          marginTop: "0.8rem", 
          color: "#999", 
          fontSize: "0.9rem" 
        }}>
          {loadingProgress.toFixed(0)}% complete
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      padding: "2rem", 
      display: "flex", 
      justifyContent: "center", 
      width: "100%",
      backgroundColor: "#0a0a0a", 
    }}>
      <div style={{
        maxHeight: "80vh",
        overflowY: "auto",
        width: "90%",
        maxWidth: "800px",
        paddingRight: "0.5rem",
      }}>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "2rem",
          borderBottom: "1px solid #333",
          paddingBottom: "1rem"
        }}>
          <div style={{ 
            color: "#fff", 
            fontSize: "1.8rem", 
            fontWeight: "500",
            background: "linear-gradient(90deg, #2f80ed, #56ccf2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>
            Public Files Collection
          </div>
          <div style={{ 
            backgroundColor: "#222",
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            color: "#999",
            fontSize: "0.9rem"
          }}>
            {files.length} files available
          </div>
        </div>

        {files.length > 0 ? (
          <div style={{ 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", 
            gap: "1.5rem" 
          }}>
            {files.map((file) => (
              <div
                key={file._id}
                style={{
                  padding: "1.2rem 1.5rem",
                  borderRadius: "12px",
                  backgroundColor: "#111",
                  color: "#fff",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  overflow: "hidden",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  border: "1px solid #222",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = "0 8px 20px rgba(47, 128, 237, 0.3)";
                  e.currentTarget.style.borderColor = "#2f80ed";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.6)";
                  e.currentTarget.style.borderColor = "#222";
                }}
              >
                <div style={{ 
                  overflow: "hidden", 
                  textOverflow: "ellipsis", 
                  whiteSpace: "nowrap",
                  maxWidth: "75%",
                  fontWeight: "500",
                  fontSize: "1.1rem"
                }}>
                  {file.title}
                </div>
                
                <button
                  style={{
                    backgroundColor: "#2f80ed",
                    border: "none",
                    padding: "0.6rem 1.2rem",
                    borderRadius: "8px",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 8px rgba(47, 128, 237, 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#1a69d4";
                    e.currentTarget.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "#2f80ed";
                    e.currentTarget.style.transform = "scale(1)";
                  }}

                  onClick={async ()=>{
                   const data=await crudFunctions.getFileById(file._id);
                   if(!data){
                     console.log('file not found');
                   }
                   else{
                        console.log('file found',data);
                        console.log('data: ',data.CanvasLines)
                        canvasInfo.save(data.CanvasLines);
                        setAppService('blackboard');
                   }
                  }}

                >
                  <FaEye size={18} style={{ marginRight: "0.5rem" }} />
                  View
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ 
            textAlign: "center", 
            color: "#999", 
            padding: "4rem 0",
            backgroundColor: "#111",
            borderRadius: "12px",
            border: "1px dashed #333"
          }}>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📂</div>
            <div style={{ fontSize: "1.2rem" }}>No public files found</div>
            <div style={{ fontSize: "0.9rem", color: "#666", marginTop: "0.5rem" }}>
              Files shared with you will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ViewPublic;