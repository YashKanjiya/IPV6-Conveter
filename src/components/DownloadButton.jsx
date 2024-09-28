import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const s2ab = (s) => {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
};

const DownloadButton = ({ converted }) => {
    const downloadConvertedFile = () => {
        // Prepare the data for the Excel file: including header row
        const dataWithHeaders = [["Original IP", "Expanded IPv6"], ...converted];

        const worksheet = XLSX.utils.aoa_to_sheet(dataWithHeaders);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Converted_IPs');
        const file = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });
        
        const blob = new Blob([s2ab(file)], { type: 'application/octet-stream' });
        saveAs(blob, 'converted_ipv6.xlsx');
    };

    return (
        <button
            onClick={downloadConvertedFile}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none mt-4 shadow"
        >
            Download Converted File
        </button>
    );
};

export default DownloadButton;
