export const expandIpv6 = (ipv6) => {
    const parts = ipv6.split("::");
    let left = parts[0] ? parts[0].split(":") : [];
    let right = parts[1] ? parts[1].split(":") : [];

    // Calculate the number of missing blocks to make 8
    const missingBlocks = 8 - (left.length + right.length);

    // Fill in missing blocks with '0000'
    const expandedIp = [...left, ...Array(missingBlocks).fill('0000'), ...right];

    // Ensure all blocks are 4 characters long (pad with zeros if needed)
    return expandedIp.map(block => block.padStart(4, '0')).join(":");
};
