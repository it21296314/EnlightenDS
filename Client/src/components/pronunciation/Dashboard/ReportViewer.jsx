import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import './ReportViewer.css';

const ReportViewer = ({ userId }) => {
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:5000/generate-report?user_id=${userId}`);
        setReportData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch report data');
        setLoading(false);
      }
    };

    if (userId) {
      fetchReportData();
    }
  }, [userId]);

  const generatePDF = () => {
    if (!reportData) return;
  
    const doc = new jsPDF();
    let currentPage = 1;
    
    // Fixed color constants with proper contrast
    const colors = {
      primary: [33, 97, 140],         // Darker blue for better contrast
      secondary: [184, 134, 11],      // Darker yellow/gold for better readability
      accent: [59, 130, 246],         // Medium blue
      text: [31, 41, 55],             // Dark gray for text
      lightBlue: [239, 246, 255],     // Very light blue
      white: [255, 255, 255],
      background: [248, 250, 252],    // Very light gray-blue
      error: [185, 28, 28],           // Red for incorrect words
      success: [22, 101, 52]          // Green for correct items
    };

    // Helper function to set color with validation
    const setColor = (color, isText = true) => {
      if (!Array.isArray(color) || color.length !== 3) {
        color = isText ? colors.text : colors.white;
      }
      // Ensure values are within 0-255 range
      const validColor = color.map(c => Math.max(0, Math.min(255, c)));
      
      if (isText) {
        doc.setTextColor(...validColor);
      } else {
        doc.setFillColor(...validColor);
      }
    };

    // Footer function
    const addFooter = (pageNumber) => {
      // Footer background
      setColor(colors.primary, false);
      doc.rect(0, 285, 210, 12, 'F');
      
      // Page number with proper font settings
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      setColor(colors.white);
      doc.text(`Page ${pageNumber}`, 105, 291, { align: 'center' });
    };

    // Function to add new page
    const addNewPage = () => {
      addFooter(currentPage);
      currentPage++;
      doc.addPage();
      
      // Background
      setColor(colors.background, false);
      doc.rect(0, 0, 210, 297, 'F');
      
      // Content area with border
      setColor(colors.white, false);
      doc.roundedRect(15, 15, 180, 267, 5, 5, 'F');
      
      // Border
      doc.setDrawColor(...colors.accent);
      doc.setLineWidth(0.5);
      doc.roundedRect(15, 15, 180, 267, 5, 5, 'S');
      
      return 25; // Return starting Y position
    };

    // Check if new page is needed
    const checkPageBreak = (currentY, requiredSpace) => {
      if (currentY + requiredSpace > 270) {
        return addNewPage();
      }
      return currentY;
    };

    // Initialize first page
    setColor(colors.background, false);
    doc.rect(0, 0, 210, 297, 'F');
    
    setColor(colors.white, false);
    doc.roundedRect(15, 15, 180, 267, 5, 5, 'F');
    
    doc.setDrawColor(...colors.accent);
    doc.setLineWidth(0.5);
    doc.roundedRect(15, 15, 180, 267, 5, 5, 'S');

    // Header section
    setColor(colors.primary, false);
    doc.roundedRect(15, 15, 180, 45, 5, 5, 'F');
    
    // Title with proper font settings
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    setColor(colors.white);
    doc.text('AI Feedback Report', 105, 35, { align: 'center' });
    
    // Subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    setColor(colors.white);
    doc.text('Learning Progress Assessment', 105, 50, { align: 'center' });

    // User Information Section
    let yPos = 75;
    
    // Section header with better contrast
    setColor(colors.accent, false);
    doc.roundedRect(25, yPos - 5, 160, 20, 3, 3, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    setColor(colors.white);
    doc.text('Student Information', 30, yPos + 5);
    
    yPos += 25;
    
    // Create info table with better formatting
    const infoData = [
      ['User ID:', String(reportData.user_id || 'N/A')],
      ['Category:', String(reportData.category || 'N/A')],
      ['Time Spent:', String(reportData.time_spent || 'N/A')],
      ['Correct Answers:', String(reportData.correct_count || 0)],
      ['Incorrect Answers:', String(reportData.incorrect_count || 0)],
      ['Score:', `${reportData.marks_percentage !== undefined ? Number(reportData.marks_percentage).toFixed(1) : '0.0'}%`]
    ];

    // Draw table with consistent styling
    const tableStartY = yPos;
    const rowHeight = 11;
    const col1Width = 50;
    const col2Width = 100;
    const tableX = 30;
    
    infoData.forEach((row, index) => {
      const currentY = tableStartY + (index * rowHeight);
      
      // Alternate row background for better readability
      if (index % 2 === 0) {
        setColor([248, 250, 252], false);
        doc.rect(tableX, currentY - 3, col1Width + col2Width, rowHeight, 'F');
      }
      
      // Draw clean borders
      doc.setDrawColor(...colors.accent);
      doc.setLineWidth(0.2);
      doc.rect(tableX, currentY - 3, col1Width, rowHeight, 'S');
      doc.rect(tableX + col1Width, currentY - 3, col2Width, rowHeight, 'S');
      
      // Label with proper contrast
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10);
      setColor(colors.secondary);
      doc.text(row[0], tableX + 2, currentY + 3);
      
      // Value with readable color
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(10);
      setColor(colors.text);
      doc.text(row[1], tableX + col1Width + 2, currentY + 3);
    });

    yPos = tableStartY + (infoData.length * rowHeight) + 20;

    // Incorrect Words Section with improved styling
    if (reportData.incorrect_words && reportData.incorrect_words.length > 0) {
      yPos = checkPageBreak(yPos, 40);
      
      // Section header
      setColor(colors.error, false);
      doc.roundedRect(25, yPos - 5, 160, 18, 3, 3, 'F');
      
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      setColor(colors.white);
      doc.text('Words to Practice', 30, yPos + 5);
      
      yPos += 25;
      
      // Display words in a clean grid
      const wordsPerRow = 3;
      const wordBoxWidth = 48;
      const wordBoxHeight = 12;
      const startX = 32;
      
      reportData.incorrect_words.forEach((word, index) => {
        const row = Math.floor(index / wordsPerRow);
        const col = index % wordsPerRow;
        const x = startX + (col * (wordBoxWidth + 6));
        const y = yPos + (row * (wordBoxHeight + 6));
        
        // Check for page break
        if (y > 270) {
          yPos = addNewPage() + 20;
          return;
        }
        
        // Word box with better styling
        setColor([254, 242, 242], false);
        doc.roundedRect(x, y - 8, wordBoxWidth, wordBoxHeight, 2, 2, 'F');
        
        doc.setDrawColor(...colors.error);
        doc.setLineWidth(0.3);
        doc.roundedRect(x, y - 8, wordBoxWidth, wordBoxHeight, 2, 2, 'S');
        
        // Word text with proper font
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        setColor(colors.error);
        const wordText = String(word || '').substring(0, 12); // Limit length
        doc.text(wordText, x + wordBoxWidth/2, y - 1, { align: 'center' });
      });
      
      yPos += Math.ceil(reportData.incorrect_words.length / wordsPerRow) * 18 + 20;
    }

    // Feedback Section with improved formatting
    yPos = checkPageBreak(yPos, 40);
    
    // Section header
    setColor(colors.primary, false);
    doc.roundedRect(25, yPos - 5, 160, 18, 3, 3, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    setColor(colors.white);
    doc.text('Learning Feedback & Recommendations', 30, yPos + 5);
    
    yPos += 30;

    // Process feedback with consistent formatting
    if (reportData.feedback) {
      const feedbackLines = String(reportData.feedback).split('\n');
      
      feedbackLines.forEach((line) => {
        if (!line.trim()) {
          yPos += 4;
          return;
        }
        
        const cleanLine = line.trim();
        yPos = checkPageBreak(yPos, 15);
        
        // Main headings
        if (cleanLine.match(/^\*\*\d+\.\s+.*:\*\*$/)) {
          yPos += 8;
          
          // Heading background
          setColor(colors.lightBlue, false);
          doc.roundedRect(28, yPos - 6, 154, 14, 2, 2, 'F');
          
          // Left accent bar
          setColor(colors.secondary, false);
          doc.rect(28, yPos - 6, 3, 14, 'F');
          
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          setColor(colors.primary);
          const cleanTitle = cleanLine.replace(/^\*\*\d+\.\s+|\*\*$/g, '');
          doc.text(cleanTitle, 35, yPos + 2);
          yPos += 20;
        }
        // Sub-points with improved formatting
        else if (cleanLine.match(/^\*\s+\*\*.*:\*\*\s+/)) {
          const match = cleanLine.match(/^\*\s+\*\*(.*?):\*\*\s+(.*)$/);
          if (match) {
            const [, boldPart, regularPart] = match;
            
            // Bullet point
            doc.setFontSize(10);
            setColor(colors.secondary);
            doc.text('•', 35, yPos);
            
            // Bold part
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(10);
            setColor(colors.primary);
            doc.text(`${boldPart}:`, 42, yPos);
            
            // Regular part with proper wrapping
            const boldWidth = doc.getTextWidth(`${boldPart}:`);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            setColor(colors.text);
            
            const maxWidth = 140 - boldWidth;
            const wrappedText = doc.splitTextToSize(regularPart, maxWidth);
            
            if (wrappedText.length > 0) {
              doc.text(wrappedText[0], 42 + boldWidth + 3, yPos);
              
              for (let i = 1; i < wrappedText.length; i++) {
                yPos += 5;
                yPos = checkPageBreak(yPos, 5);
                doc.text(wrappedText[i], 45, yPos);
              }
            }
            yPos += 8;
          }
        }
        // Strategy points
        else if (cleanLine.trim() && !cleanLine.match(/^\*\*.*\*\*$/)) {
          doc.setFontSize(9);
          setColor(colors.secondary);
          doc.text('★', 32, yPos);
          
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(9);
          setColor(colors.text);
          
          const wrappedText = doc.splitTextToSize(cleanLine, 150);
          doc.text(wrappedText, 40, yPos);
          yPos += wrappedText.length * 5 + 6;
        }
      });
    } else {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(10);
      setColor([107, 114, 128]); // Gray color
      doc.text('No feedback available at this time.', 30, yPos);
    }
    
    // Add footer to final page
    addFooter(currentPage);
    
    // Save PDF with proper filename
    const filename = `feedback_report_${reportData.user_id || 'user'}_${new Date().getTime()}.pdf`;
    doc.save(filename);
  };

  if (loading) {
    return <div className="loading">Loading report data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!reportData) {
    return <div className="no-data">No report data available.</div>;
  }

  // Function to parse AI feedback formatting
  const renderFormattedFeedback = () => {
    if (!reportData.feedback) return null;
    
    return reportData.feedback.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      if (paragraph.match(/^\*\*\d+\.\s+.*:\*\*$/)) {
        return <h3 key={index}>{paragraph.replace(/^\*\*\d+\.\s+|\*\*$/g, '')}</h3>;
      }
      else if (paragraph.startsWith('##')) {
        return <h4 key={index}>{paragraph.replace(/^##\s+/, '')}</h4>;
      } 
      else if (paragraph.match(/^\*\s+\*\*.*:\*\*\s+/)) {
        const match = paragraph.match(/^\*\s+\*\*(.*?):\*\*\s+(.*)$/);
        if (match) {
          return (
            <div key={index} className="sub-point">
              <strong>{match[1]}:</strong> {match[2]}
            </div>
          );
        }
      }
      else if (paragraph.startsWith('* **')) {
        return <div key={index} className="practice-words">{paragraph.replace(/^\*\s+\*\*|\*\*/g, '')}</div>;
      }
      else if (paragraph.trim()) {
        return <div key={index} className="strategy-point">{paragraph}</div>;
      }
      return null;
    }).filter(element => element !== null);
  };

  return (
    <div className="report-container">
      <h1 className="report-title">AI Feedback Report</h1>
      
      <div className="report-section">
        <h2>Student Information</h2>
        <div className="report-info">
          <p><strong>User ID:</strong> {reportData.user_id}</p>
          <p><strong>Category:</strong> {reportData.category}</p>
          <p><strong>Correct Count:</strong> {reportData.correct_count}</p>
          <p><strong>Incorrect Count:</strong> {reportData.incorrect_count}</p>
          <p><strong>Score:</strong> {reportData.marks_percentage !== undefined ? reportData.marks_percentage.toFixed(2) : '0.00'}%</p>
          <p><strong>Time Spent:</strong> {reportData.time_spent}</p>
        </div>
      </div>
      
      <div className="report-section">
        <h2>Words to Practice</h2>
        {reportData.incorrect_words && reportData.incorrect_words.length > 0 ? (
          <ul className="incorrect-words-list">
            {reportData.incorrect_words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        ) : (
          <p>Great job! No words need additional practice.</p>
        )}
      </div>
      
      <div className="report-section">
        <h2>Learning Feedback & Recommendations</h2>
        <div className="feedback-text ai-feedback-section">
          {renderFormattedFeedback()}
        </div>
      </div>
      
      <div className="download-section">
        <button onClick={generatePDF} className="download-button">
          Download PDF Report
        </button>
      </div>
    </div>
  );
};

export default ReportViewer;