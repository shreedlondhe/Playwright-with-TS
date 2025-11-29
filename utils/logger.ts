
 const now = new Date();

  const date = now.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = now.toTimeString().split(' ')[0]; 
export const log = (msg: string, level: 'info' | 'error' | 'warn' | 'debug' = 'info') => {
  console.log(`[PyxTech Lenovo] [${level.toUpperCase()}] [${date} ${time}] ${msg}`);
};

// export const log = (msg: string) => {
//   console.log(`[PyxTech Lenovo] [${date} ${time}] ${msg}`);
// };