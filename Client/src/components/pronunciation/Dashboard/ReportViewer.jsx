import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
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
  
    // Create new PDF document
    const doc = new jsPDF();
    
    // Define the footer function within the main function scope
    const addFooter = (doc, pageNumber) => {
      const totalPages = doc.internal.getNumberOfPages();
      doc.setFontSize(10);
      doc.setTextColor(65, 145, 225); // Blue text
      doc.text(`Page ${pageNumber} of ${totalPages}`, 105, 290, { align: 'center' });
      
      // Add yellow decorative elements to footer
      doc.setDrawColor(255, 215, 0); // Yellow line
      doc.setLineWidth(0.5);
      doc.line(80, 287, 130, 287);
      
      // Add small logo or icon
      doc.setFillColor(255, 215, 0); // Yellow
      doc.circle(105, 283, 2, 'F');
      doc.setFillColor(65, 145, 225); // Blue
      doc.circle(105, 283, 1, 'F');
    };
    
    // Change background to blue
    doc.setFillColor(65, 145, 225); // Blue background instead of orange
    doc.rect(0, 0, 210, 297, 'F'); // Fill the entire page
    
    // Add white content area with yellow border
    doc.setFillColor(255, 255, 255);
    doc.setDrawColor(255, 215, 0); // Gold/yellow border color
    doc.roundedRect(10, 10, 190, 277, 5, 5, 'FD'); // Rounded rectangle with fill and border
    
    // Add title with yellow shadow effect
    doc.setFont('bold');
    doc.setFontSize(28);
    doc.setTextColor(30, 100, 200); // Blue title
    // Title shadow effect (offset)
    doc.text('AI Feedback Report', 106, 30, { align: 'center' });
    doc.setTextColor(255, 215, 0); // Yellow shadow color
    doc.text('AI Feedback Report', 107, 31, { align: 'center' });
    doc.setTextColor(30, 100, 200); // Back to blue for main color
    doc.text('AI Feedback Report', 105, 29, { align: 'center' });
    
    // User information section with light blue background
    doc.setFillColor(210, 235, 255); // Lighter blue background
    doc.roundedRect(20, 40, 170, 30, 3, 3, 'F');
    doc.setDrawColor(65, 145, 225); // Blue border color
    doc.roundedRect(20, 40, 170, 30, 3, 3, 'S');
    
    const leftColX = 25;
    const rightColX = 120;
    let yPos = 50;
    
    // Left column info with yellow labels
    doc.setFontSize(12);
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('User ID:', leftColX, yPos);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51); // #333333
    doc.text(String(reportData.user_id), leftColX + 40, yPos);
    
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('Category:', leftColX, yPos + 10);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(String(reportData.category || ''), leftColX + 40, yPos + 10);
    
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('Time Spent:', leftColX, yPos + 20);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(String(reportData.time_spent || ''), leftColX + 40, yPos + 20);
    
    // Right column info with yellow labels
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('Correct Count:', rightColX, yPos);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(String(reportData.correct_count || 0), rightColX + 50, yPos);
    
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('Incorrect Count:', rightColX, yPos + 10);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51);
    doc.text(String(reportData.incorrect_count || 0), rightColX + 50, yPos + 10);
    
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow label color
    doc.text('Marks:', rightColX, yPos + 20);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(51, 51, 51);
    
    const marksPercentage = reportData.marks_percentage !== undefined ? 
      Number(reportData.marks_percentage).toFixed(2) + '%' : '0.00%';
    doc.text(marksPercentage, rightColX + 50, yPos + 20);
    
    // Incorrect words section with light yellow background
    yPos = 80;
    doc.setFillColor(255, 253, 230); // Very light yellow background
    doc.roundedRect(20, yPos - 5, 170, 60, 3, 3, 'F');
    doc.setDrawColor(255, 215, 0); // Yellow border
    doc.roundedRect(20, yPos - 5, 170, 60, 3, 3, 'S');
    
    doc.setFontSize(18);
    doc.setFont('Comic', 'bold');
    doc.setTextColor(30, 120, 210); // Bright blue for headings
    doc.text('Incorrect Words', 25, yPos);
    
    // Add dotted border under the heading
    for (let i = 0; i < 15; i++) {
      doc.setDrawColor(255, 215, 0); // Yellow dots
      doc.circle(25 + (i*10), yPos + 3, 1, 'F');
    }
    
    // List incorrect words with blue cross marks
    yPos += 15;
    doc.setFontSize(12);
    doc.setFont('Comic', 'normal');
    doc.setTextColor(30, 100, 200); // Blue color for incorrect words
    
    if (reportData.incorrect_words && reportData.incorrect_words.length > 0) {
      reportData.incorrect_words.forEach((word, index) => {
        // Draw cross mark in blue
        doc.setDrawColor(30, 100, 200); // Blue cross
        doc.setLineWidth(0.5);
        doc.line(25, yPos - 2, 30, yPos + 2);
        doc.line(30, yPos - 2, 25, yPos + 2);
        
        doc.text(String(word || ''), 35, yPos);
        yPos += 10;
        
        // Add a new page if we're running out of space
        if (yPos > 280) {
          // Add footer to current page
          addFooter(doc, 1);
          
          // Add new page with same background
          doc.addPage();
          doc.setFillColor(65, 145, 225); // Blue background
          doc.rect(0, 0, 210, 297, 'F');
          
          // Add white content area with yellow border
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(255, 215, 0); // Gold/yellow border
          doc.roundedRect(10, 10, 190, 277, 5, 5, 'FD');
          
          yPos = 20;
        }
      });
    } else {
      doc.text('No incorrect words.', 35, yPos);
      yPos += 10;
    }
    
    // AI Feedback section with blue background
    yPos += 10;
    doc.setFillColor(230, 242, 255); // Light blue background
    doc.roundedRect(20, yPos - 5, 170, 180, 3, 3, 'F');
    doc.setDrawColor(65, 145, 225); // Blue border color
    doc.roundedRect(20, yPos - 5, 170, 180, 3, 3, 'S');
    
    doc.setFontSize(18);
    doc.setFont('Comic', 'bold');
    doc.setTextColor(255, 200, 0); // Yellow heading for contrast
    doc.text('Feedback', 25, yPos);
    
    // Add dotted border under the heading
    for (let i = 0; i < 15; i++) {
      doc.setDrawColor(255, 215, 0); // Yellow dots
      doc.circle(25 + (i*10), yPos + 3, 1, 'F');
    }
    
    yPos += 15;
    
    // Make sure feedback exists before trying to parse it
    if (reportData.feedback) {
      const cleanedFeedback = reportData.feedback.replace(/\*\*\d+\.\s+[^:]*:\*\*\s*\*[^*]*\*[^*]*\*[^*]*\*/g, '');
      const feedbackLines = cleanedFeedback.split('\n');
      
      feedbackLines.forEach((line) => {
        // Skip empty lines after filtering
        if (!line.trim()) return;
        
        // Check if we need a new page
        if (yPos > 270) {
          // Add footer to current page
          addFooter(doc, doc.internal.getNumberOfPages());
          
          // Add new page with same styling
          doc.addPage();
          doc.setFillColor(65, 145, 225); // Blue background
          doc.rect(0, 0, 210, 297, 'F');
          
          // Add white content area with yellow border
          doc.setFillColor(255, 255, 255);
          doc.setDrawColor(255, 215, 0); // Gold/yellow border
          doc.roundedRect(10, 10, 190, 277, 5, 5, 'FD');
          
          yPos = 20;
        }
        
        // Convert line to string (just to be safe)
        line = String(line);
        
        // Check if this is a heading line (starts with ## or similar)
        if (line.startsWith('##')) {
          // Add some space before a heading unless it's the first item
          if (yPos > 40) yPos += 5;
          
          // Add yellow section background
          doc.setFillColor(255, 250, 230); // Very light yellow
          doc.roundedRect(25, yPos - 7, 160, 12, 2, 2, 'F');
          
          // Add blue bar on left
          doc.setFillColor(30, 100, 200); // Blue accent bar
          doc.rect(25, yPos - 7, 6, 12, 'F');
          
          // Format as a heading
          doc.setFontSize(14);
          doc.setFont('Comic', 'bold');
          doc.setTextColor(30, 100, 200); // Blue text
          doc.text(line.replace(/^##\s+/, ''), 35, yPos);
          yPos += 12;
        } 
        // Check if this is a category line (starts with ** or similar)
        else if (line.startsWith('**For')) {
          yPos += 5;
          doc.setFontSize(12);
          doc.setFont('Comic', 'bold');
          doc.setTextColor(0, 80, 170); // Darker blue
          
          // Draw wavy underline
          const text = line.replace(/\*\*/g, '');
          doc.text(text, 25, yPos);
          
          const textWidth = doc.getStringUnitWidth(text) * 12 / doc.internal.scaleFactor;
          // Wavy underline effect in yellow
          for (let i = 0; i < textWidth * 2; i++) {
            const x = 25 + (i * 2);
            const y = yPos + 3 + Math.sin(i * 0.8) * 0.8;
            doc.setFillColor(255, 215, 0); // Yellow dots
            doc.circle(x, y, 0.4, 'F');
          }
          
          yPos += 8;
        }
        // Check if this is a word list line
        else if (line.startsWith('* **')) {
          doc.setFontSize(11);
          doc.setFont('Comic', 'italic');
          doc.setTextColor(0, 120, 200); // Blue for word list
          
          // Format the line and wrap text if needed
          const formattedText = line.replace(/\*\s\*\*|\*\*/g, '');
          const splitText = doc.splitTextToSize(formattedText, 150);
          
          doc.text(splitText, 30, yPos);
          yPos += (splitText.length * 7);
        }
        // Regular paragraph becomes a strategy point
        else if (line.trim()) {
          doc.setFontSize(12);
          doc.setFont('Comic', 'normal');
          doc.setTextColor(51, 51, 51); // #333333
          
          // Add star bullet point in yellow
          doc.setTextColor(255, 215, 0); // Yellow star
          doc.text('★', 22, yPos);
          doc.setTextColor(51, 51, 51); // Back to black for main text
          
          // Format the line and wrap text if needed
          const splitText = doc.splitTextToSize(line, 150);
          doc.text(splitText, 32, yPos);
          
          // Increase Y position based on how many lines were needed
          yPos += (splitText.length * 7);
        }
      });
    } else {
      // If there's no feedback, just display a message
      doc.setFontSize(12);
      doc.setFont('Comic', 'normal');
      doc.text('No feedback available.', 35, yPos);
    }
    
    // Add footer to last page
    addFooter(doc, doc.internal.getNumberOfPages());
    
    // Save the PDF
    doc.save(`feedback_report_${reportData.user_id || 'user'}.pdf`);
  };
  
  // Helper function to add a footer to each page
  const addFooter = (doc, pageNumber) => {
    const totalPages = doc.internal.getNumberOfPages();
    doc.setFontSize(10);
    doc.setTextColor(150, 150, 150);
    doc.setFont('Comic', 'normal');
    doc.text(`Page ${pageNumber} of ${totalPages}`, 105, 290, { align: 'center' });
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
    
    // Filter out the specific pattern of numbered points with italic explanations
    // This regex targets patterns like "**1. Break Down the Words:** *explanation* *more explanation*"
    const cleanedFeedback = reportData.feedback.replace(/\*\*\d+\.\s+[^:]*:\*\*\s*\*[^*]*\*\s*\*[^*]*\*/g, '');
    
    return cleanedFeedback.split('\n').map((paragraph, index) => {
      // Skip empty paragraphs that might result from the filtering
      if (!paragraph.trim()) return null;
      
      // Check if this is a heading line (starts with ## or similar)
      if (paragraph.startsWith('##')) {
        return <h3 key={index}>{paragraph.replace(/^##\s+/, '')}</h3>;
      } 
      // Check if this is a category line (starts with ** or similar)
      else if (paragraph.startsWith('**For')) {
        return <div key={index} className="practice-category">{paragraph.replace(/\*\*/g, '')}</div>;
      }
      // Check if this is a word list line
      else if (paragraph.startsWith('* **')) {
        return <div key={index} className="practice-words">{paragraph.replace(/\*\s\*\*|\*\*/g, '')}</div>;
      }
      // Regular paragraph becomes a strategy point
      else if (paragraph.trim()) {
        return <div key={index} className="strategy-point">{paragraph}</div>;
      }
      return null;
    }).filter(element => element !== null); // Filter out any null elements
  };

  return (
    <div className="report-container">
      <h1 className="report-title">Feedback Report</h1>
      
      <div className="report-section">
        <div className="report-info">
          <p><strong>User ID:</strong> {reportData.user_id}</p>
          <p><strong>Category:</strong> {reportData.category}</p>
          <p><strong>Correct Count:</strong> {reportData.correct_count}</p>
          <p><strong>Incorrect Count:</strong> {reportData.incorrect_count}</p>
          <p><strong>Marks Percentage:</strong> {reportData.marks_percentage !== undefined ? reportData.marks_percentage.toFixed(2) : '0.00'}%</p>
          <p><strong>Time Spent:</strong> {reportData.time_spent}</p>
        </div>
      </div>
      
      <div className="report-section">
        <h2>Incorrect Words</h2>
        {reportData.incorrect_words && reportData.incorrect_words.length > 0 ? (
          <ul className="incorrect-words-list">
            {reportData.incorrect_words.map((word, index) => (
              <li key={index}>{word}</li>
            ))}
          </ul>
        ) : (
          <p>No incorrect words.</p>
        )}
      </div>
      
      <div className="report-section">
        <h2>AI Feedback</h2>
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