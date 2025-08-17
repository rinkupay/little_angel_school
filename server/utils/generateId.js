const generateId = () => {
    const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 9999
    return `${process.env.STUDENT_ID_PREFIX}${randomNumber.toString().padStart(4, '0')}`; // Add prefix and pad the number with leading zeros
  };
  
module.exports = generateId