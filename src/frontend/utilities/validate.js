// This validation is more to improve the user's experience.
// The backend should handle the brunt of the validation.

const validate = {
  email: (str) => {
    return /[@]/g.test(str) && /[.]/g.test(str) && !/[ ]/g.test(str);
  },
  name: (str) => {
    if (str.length) {
      return true;
    }

    return false;
  },
  phone: (str) => {
    let compare = str.replace(/-/g, '')
    str = compare.replace(/\D/g, '');

    if (compare !== str) {
      return false;
    }

    if (str.length === 10 || str.length === 7) {
      return true;
    }

    return false;
  }
}

export default validate;
