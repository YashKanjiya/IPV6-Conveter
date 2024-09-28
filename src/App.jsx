import { useState } from 'react';
import FileUploader from './components/FileUploader';
import DownloadButton from './components/DownloadButton';

function App() {
    const [converted, setConverted] = useState([]);

    return (
        // Add a background color using Tailwind CSS
        <div className="min-h-screen flex flex-col items-center justify-center bg-blue-200">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">IPv6 Address Converter</h1>
            {/* The file uploader box will be styled with its own background */}
            <FileUploader setConverted={setConverted} />
            {/* Only show the download button after conversion */}
            {converted.length > 0 && <DownloadButton converted={converted} />}
        </div>
    );
}

export default App;



