import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1); // Start from the first page on load
  }

  function goToPreviousPage() {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  }

  return (
    <div className="pdf-div">
      <p>
        Page {pageNumber} of {numPages || "?"}
      </p>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
        />
      </Document>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={pageNumber <= 1}>
          Previous
        </button>
        <button onClick={goToNextPage} disabled={pageNumber >= numPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default PdfComp;
