  // UTILITY FUNCTION TO CHECK FILE SIZE
  export const checkFileSize = (file, message,setError) => {
    const maxFileSize = 200 * 1024; // 200KB
    if (file.size > maxFileSize) {
      setError(`${message} should be less than 200KB.`);
      return false;
    }
    return true;
  };
