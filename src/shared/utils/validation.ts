const MIN_PASSWORD_LENGTH = 8;

export const isValidPassword = (password: string) => password.length >= MIN_PASSWORD_LENGTH;

export const isValidPasswordAgain = (password: string, passwordAgain: string) => password === passwordAgain;
