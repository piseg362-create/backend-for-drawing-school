export const generateSixDigitToken = () => {
  // First letter as alphabet (A-Z)
  const letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
  // Remaining 5 as numbers (00000 - 99999)
  const numbers = Math.floor(Math.random() * 100000).toString().padStart(5, '0');
  
  return letter + numbers;
};
