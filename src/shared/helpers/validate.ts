const latinRegex = /^[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~ ]+$/;
export const emailValidation = {
  required: { value: true, message: "Field is required" },
  validate: (value: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return "Please enter a valid email";
    }

    if (!latinRegex.test(value)) {
      return "Only latin letters are allowed";
    }
  },
};

export const codeValidation = {
  required: { value: true, message: "Field is required" },
  validate: (value: number) => {
    if ((value + "").length !== 6) {
      return "Сode must consist of four digits";
    }

    if (isNaN(+value)) return "Сode must consist of numbers.";
  },
};

export const passwordValidation = {
  required: "Field is required",
  minLength: { value: 8, message: "Minimum 8 letters" },
  maxLength: { value: 20, message: "Maximum 20 letters" },
  validate: {
    hasUpperCase: (value: string) =>
      /[A-Z]/.test(value) || "Must contain at least one capital letter.",
    hasDigit: (value: string) => /\d/.test(value) || "At least one number",
    onlyLatin: (value: string) =>
      /^[a-zA-Z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`~]+$/.test(value) ||
      "Only latin letters and numbers are allowed",
  },
};

export const passwordCheckValidation = (password: string) => ({
  required: "Field is required",
  validate: (value: string) => {
    if (password !== value) return "Passwords do not match";
  },
});

export const fullnameValidation = {
  required: "Field is required",
  minLength: { value: 2, message: "Minimum 2 letters" },
  validate: (value: string) => {
    if (!latinRegex.test(value)) {
      return "Only latin letters are allowed";
    }
  },
};
