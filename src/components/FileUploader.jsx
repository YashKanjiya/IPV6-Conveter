import { useState } from 'react';
import * as XLSX from 'xlsx';
import { expandIpv6 } from '../utils/expandIpv6';

const FileUploader = ({ setConverted }) => {
    const [file, setFile] = useState(null);

    const handleFileUpload = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        const reader = new FileReader();
        reader.onload = (event) => {
            const binaryStr = event.target.result;
            const workbook = XLSX.read(binaryStr, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const worksheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], { header: 1 });

            // Map the worksheet to include both original and expanded IPs
            const ipv6Data = worksheet.map(row => {
                return row.map(cell => {
                    if (typeof cell === 'string' && cell.includes(':')) {
                        return [cell, expandIpv6(cell)];  // Store both original and expanded IP
                    }
                    return [cell, cell]; // Keep the same value if it's not an IP
                });
            }).flat(); // Flatten the array of rows

            setConverted(ipv6Data);
        };

        reader.readAsBinaryString(selectedFile);
    };

    return (
        <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
            <input
                type="file"
                accept=".xlsx"
                onChange={handleFileUpload}
                className="p-2 border border-gray-300 rounded cursor-pointer bg-gray-50 hover:bg-gray-100"
            />
            {file && <p className="mt-2 text-sm text-gray-600">File uploaded: {file.name}</p>}
        </div>
    );
};

export default FileUploader;

